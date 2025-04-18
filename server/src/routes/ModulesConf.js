const express = require('express');
const router = express.Router();
const CourseModel = require('../models/ModuleSchema');
const CourseContentModel = require('../models/Chapters')
const fs = require('fs-extra');
const path = require('path');
const { exec } = require('child_process');
const uuid = require('uuid').v4;





const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const crypto = require('crypto');

const s3 = new S3Client({
  region: 'ap-south-1',
  credentials: {
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
  },
});

const BUCKET_NAME = 'om-bhaiya-testing';

function generateRandomFilename(ext = '.vcd') {
  return `${crypto.randomBytes(32).toString('hex')}${ext}`;
}

async function uploadToS3AndGetSignedUrl(localFilePath) {
  const fileContent = fs.readFileSync(localFilePath);
  const fileName = generateRandomFilename();

  // Upload the file
  const uploadCommand = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: fileName,
    Body: fileContent,
    ContentType: 'text/plain', // for .vcd file
  });

  await s3.send(uploadCommand);

  // Generate signed URL (1 hour = 3600 seconds)
  const getCommand = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: fileName,
  });

  const signedUrl = await getSignedUrl(s3, getCommand, {
    expiresIn: 3600, // 1 hour in seconds
  });

  const contentUntilVCD = signedUrl.split('.vcd')[0] + '.vcd';

  console.log(contentUntilVCD);
  return contentUntilVCD;
}










router.get('/create-module',(req,res)=>{
    res.send("hello")
})

router.post('/create-module',async(req,res)=>{
    console.log(req.body)
    try {
        let courseData = req.body
    
        const newCourse = new CourseModel(courseData);
        await newCourse.save();
        // res.status(201).json({ message: 'Saved successfully' });
        res.status(200).json({
            success:true
        })
    } catch (error) {
        console.log(error)
        res.status(401).json({
            success:false,
            error:error
        })        
    }
    
   
})


router.post('/get-modules', async (req, res) => {
    try {
      const courses = await CourseModel.find({}, '_id title description'); // Only fetch required fields
  
      const formattedCourses = courses.map(course => ({
        id: course._id,
        title: course.title,
        description: course.description,
      }));
  
      res.status(200).json({ success: true, modules: formattedCourses });
    } catch (error) {
      console.error('Error fetching courses:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch courses.' });
    }
  });




  router.post('/upload-chapter',async(req,res)=>{
    console.log("################UPLOAD CAMHPTER##################")
    console.log(req.body)
    
    try {
        let courseData = req.body
        let moduleId = courseData.moduleId
        const newCourse = new CourseContentModel(courseData);
        const saved = await newCourse.save();

        let sectionUploadData = {
            chapterId:saved._id,
            title:saved.title,
            description:saved.description  
        }

        const updatedUser = await CourseModel.findByIdAndUpdate(
            moduleId,
            { $push: { chapters: sectionUploadData } },
            { new: true, runValidators: true }
          );

          // console.log(updatedUser)


        // res.status(201).json({ message: 'Saved successfully' });
        res.status(200).json({
            success:true
        })
    } catch (error) {
        console.log(error)
        res.status(401).json({
            success:false,
            error:error
        })        
    }
    
   
})  









router.post('/compile-verilog', async (req, res) => {
  console.log("$$$$$$$$$$$$$$$$$4 compile verilog $$$$$$$$$$$$$");
  console.log(req.body);
  const { verilogCode, testbenchCode } = req.body;

  if (!verilogCode || !testbenchCode) {
    // Cleanup folder before returning if validation fails
    const folderPath = path.join(__dirname, 'temp', uuid());
    await cleanup(folderPath);
    return res.status(400).json({ error: 'Both Verilog code and testbench code are required.' });
  }

  // Create a new unique folder to store the files
  const folderName = uuid();
  const folderPath = path.join(__dirname, 'temp', folderName);

  try {
    await fs.ensureDir(folderPath);

    // Create Verilog and testbench files in the new folder
    const verilogFilePath = path.join(folderPath, 'top.v');
    const testbenchFilePath = path.join(folderPath, 'testbench.v');

    await fs.writeFile(verilogFilePath, verilogCode);
    await fs.writeFile(testbenchFilePath, testbenchCode);

    // Ensure absolute paths for the executables
    const iverilogPath = process.env.IVERILOG; // Update with correct path
    const vvpPath = process.env.VVP;  // Update with correct path

    // Correct shell invocation to handle spaces and special characters in file paths
    const compileCommand = `"${iverilogPath}" -o "${folderPath}/output.out" "${verilogFilePath}" "${testbenchFilePath}"`;

    exec(compileCommand, { cwd: folderPath }, (err, stdout, stderr) => {
      if (err) {
        console.error('Compilation failed:', stderr);
        cleanup(folderPath); // Cleanup before returning
        return res.status(500).json({ error: 'Compilation failed.', details: stderr });
      }

      console.log('Compilation stdout:', stdout);

      // Run the compiled output file using vvp
      const runCommand = `"${vvpPath}" output.out`;
      exec(runCommand, { cwd: folderPath }, async(err, stdout, stderr) => {
        if (err) {
          console.error('Execution failed:', stderr);
          cleanup(folderPath); // Cleanup before returning
          return res.status(500).json({ error: 'Execution failed.', details: stderr });
        }

        const output = stdout;
        console.log('Execution stdout:', output);

        // Check if any .vcd file was generated
        const vcdFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.vcd'));
        console.log('Generated VCD files:', vcdFiles);

        if (vcdFiles.length > 0) {
          // Send the first .vcd file and the output
          const waveformFilePath = path.join(folderPath, vcdFiles[0]);
          cleanup(folderPath); // Cleanup before sending the response
          let file = await uploadToS3AndGetSignedUrl(waveformFilePath)
          console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$4")
          console.log(file)
          cleanup(folderPath); // Cleanup before sending the response
          return res.json({
            output,
            waveform: file,
          });
        } else {
          // Just send the output if no waveform file
          cleanup(folderPath); // Cleanup before sending the response
          return res.json({ output });
        }
      });
    });
  } catch (err) {
    console.error('Error creating files or folders:', err);
    cleanup(folderPath); // Cleanup before returning
    return res.status(500).json({ error: 'Internal server error', details: err.message });
  }
});

// Helper function to cleanup the folder
async function cleanup(folderPath) {
  try {
    await fs.remove(folderPath);
    console.log('Temporary folder cleaned up successfully.');
  } catch (cleanupError) {
    console.error('Error cleaning up the temporary folder:', cleanupError);
  }
}





module.exports = router;
