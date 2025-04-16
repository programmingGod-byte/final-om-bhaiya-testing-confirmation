// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const colors = require('colors');
// const verilogFundamentals = require('./verilog-fundamentals-module');

// // Load models
// const Module = mongoose.model('Module') || require('../src/models/Module');
// const Exercise = mongoose.model('Exercise') || require('../src/models/Exercise');
// const User = mongoose.model('User') || require('../src/models/User');

// // Load env vars
// dotenv.config();

// // Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/verilog_learning')
//   .then(() => console.log('MongoDB Connected'.green.bold))
//   .catch(err => console.error(`Error connecting to MongoDB: ${err.message}`.red.bold));

// // Import Verilog Fundamentals Module
// const importVerilogModule = async () => {
//   try {
//     console.log('Importing Verilog Fundamentals module...'.yellow);

//     // Find or create admin user
//     let adminUser = await User.findOne({ role: 'admin' });
    
//     if (!adminUser) {
//       adminUser = await User.create({
//         name: 'Admin User',
//         email: 'admin@verigeek.com',
//         password: 'admin123',
//         role: 'admin'
//       });
//       console.log('Admin user created'.green);
//     }

//     // Check if module already exists
//     const existingModule = await Module.findOne({ slug: verilogFundamentals.slug });
    
//     if (existingModule) {
//       console.log(`Module "${verilogFundamentals.title}" already exists, skipping...`.yellow);
//       return;
//     }

//     // Create the module
//     const moduleData = {
//       ...verilogFundamentals,
//       createdBy: adminUser._id
//     };

//     const module = await Module.create(moduleData);
//     console.log(`Module "${module.title}" created successfully`.green);

//     // Create exercises for the module
//     if (verilogFundamentals.exercises && verilogFundamentals.exercises.length > 0) {
//       console.log(`Creating ${verilogFundamentals.exercises.length} exercises...`.yellow);
      
//       for (const exerciseData of verilogFundamentals.exercises) {
//         const exercise = await Exercise.create({
//           ...exerciseData,
//           module: module._id,
//           createdBy: adminUser._id
//         });
        
//         console.log(`Exercise "${exercise.title}" created`.green);
//       }
//     }

//     console.log('Data import complete!'.green.bold);
//   } catch (error) {
//     console.error(`Error importing data: ${error.message}`.red.bold);
//     console.error(error);
//   }
// };

// // Delete existing data
// const destroyData = async () => {
//   try {
//     await Module.deleteOne({ slug: verilogFundamentals.slug });
//     await Exercise.deleteMany({ module: { $in: await Module.find({ slug: verilogFundamentals.slug }).distinct('_id') } });
    
//     console.log('Verilog Fundamentals module and exercises deleted'.red.bold);
//   } catch (error) {
//     console.error(`Error deleting data: ${error.message}`.red.bold);
//   }
// };

// // Execute based on command line args
// if (process.argv[2] === '-d') {
//   destroyData().then(() => process.exit());
// } else {
//   importVerilogModule().then(() => process.exit());
// } 




const papers = [
  {
    id: 1,
    title: "Enhancing UVM Testbench Reusability, Readability and Maintainability through Object-Oriented-Programming Concepts",
    authors: "S. Logesh, V. Anand, P. Samuel",
    abstract: "Universal Verification Methodology (UVM) standardizes the verification process by providing a predefined class structure, methods and a run-flow mechanism. As UVM has grown into a complex verification methodology over the years, for achieving improved performance and enhanced features, the verification engineer faces increased complexity in debugging, test case development for complex verification scenarios and the maintenance of testbenches.",
    source: "IEEE",
    publishDate: "2021-12-21",
    category: "Verification",
    tags: ["UVM", "Verification", "SystemVerilog"],
    link: "https://dvcon-proceedings.org/wp-content/uploads/1050-Strategies-to-Maximize-Reusability-of-UVM-Test-Scenarios-in-SoC-Verification.pdf",
    citations: 14,
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    featured: true
  },
  {
    id: 2,
    title: "A Survey on Hardware Trojan Detection Techniques",
    authors: "Syed Kamran Haider, Chenglu Jin, Masab Ahmad, Devu Manikantan Shila, Omer Khan, Marten van Dijk",
    abstract: "Hardware Trojans (HTs) are malicious modifications made to integrated circuits (ICs) with the intent to harm the end-user or obtain secret information. In this survey, we present a comprehensive classification and analysis of HT detection techniques.",
    source: "IEEE",
    publishDate: "2021-09-01",
    category: "Hardware Security",
    tags: ["Hardware Security", "Hardware Trojans", "IC Security"],
    link: "https://r.search.yahoo.com/_ylt=Awr1QPLAaPJn8QEAz127HAx.;_ylu=Y29sbwNzZzMEcG9zAzEEdnRpZAMEc2VjA3Ny/RV=2/RE=1745149376/RO=10/RU=https%3a%2f%2fieeexplore.ieee.org%2fdocument%2f7169073/RK=2/RS=2ldod.TrFz4eY1zbz2dwaDOLEv0-",
    citations: 31,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    featured: false
  },
  {
    id: 3,
    title: "Coverage-Based Verification of System Verilog Assertions",
    authors: "G.C. Pradeep, B.J. LaMeres",
    abstract: "This paper presents a framework for coverage-based verification of SystemVerilog assertions (SVA). The methodology leverages coverage-driven verification to ensure the completeness of assertion-based verification. The paper defines coverage metrics specific to SVA and discusses how to integrate them with traditional code and functional coverage.",
    source: "Springer",
    publishDate: "2021-07-15",
    category: "Verification",
    tags: ["Formal Verification", "Static Verification", "SystemVerilog"],
    link: "https://r.search.yahoo.com/_ylt=AwrPrxjcaPJnxAIAP3W7HAx.;_ylu=Y29sbwNzZzMEcG9zAzEEdnRpZAMEc2VjA3Ny/RV=2/RE=1745149405/RO=10/RU=https%3a%2f%2flink.springer.com%2fbook%2f10.1007%2f978-1-4614-7324-4/RK=2/RS=2rI0vYpubLyAoA9Sod8XrN5q_RM-",
    citations: 12,
    image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
    featured: true
  },
  {
    id: 4,
    title: "Machine Learning Accelerators for RISC-V: A Systematic Review",
    authors: "J. Patel, R. Jordans, H. Corporaal",
    abstract: "This paper provides a systematic review of machine learning accelerators for the RISC-V architecture. We analyze recent publications and trends in developing dedicated hardware for machine learning applications based on the open RISC-V instruction set architecture.",
    source: "IEEE",
    publishDate: "2022-05-20",
    category: "Machine Learning Hardware",
    tags: ["RISC-V", "Machine Learning", "Hardware Accelerators"],
    link: "https://r.search.yahoo.com/_ylt=AwrKB1LsaPJnDwIAT5y7HAx.;_ylu=Y29sbwNzZzMEcG9zAzEEdnRpZAMEc2VjA3Ny/RV=2/RE=1745149421/RO=10/RU=https%3a%2f%2farxiv.org%2fabs%2f2107.07169/RK=2/RS=ZFoOKL59CiTppo0GOzi3Bl7J88c-",
    citations: 19,
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2065&q=80",
    featured: true
  },
  {
    id: 5,
    title: "Formal Verification of RISC-V Processors",
    authors: "Y.-C. Chen, C. Mendis, M. Carbin, S. Amarasinghe",
    abstract: "This paper presents a methodology for formal verification of RISC-V processors. We introduce techniques for verifying the correctness of instruction execution and memory operations in RISC-V implementations. Our approach builds on established formal methods and applies them specifically to the RISC-V architecture.",
    source: "ACM",
    publishDate: "2022-03-12",
    category: "Verification",
    tags: ["Formal Verification", "RISC-V", "Processors"],
    link: "https://r.search.yahoo.com/_ylt=Awr1UY4ps_JnXwIA3we7HAx.;_ylu=Y29sbwNzZzMEcG9zAzEEdnRpZAMEc2VjA3Ny/RV=2/RE=1745168425/RO=10/RU=https%3a%2f%2fdl.acm.org%2fdoi%2fabs%2f10.1007%2f978-981-96-0602-3_8/RK=2/RS=RPQBfyQShi30Q6o74wy7anqdcE8-",
    citations: 25,
    image: "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    featured: false
  },
  {
    id: 6,
    title: "A Survey of FPGA-Based Neural Network Inference Accelerator",
    authors: "K. Guo, S. Zeng, J. Yu, Y. Wang, H. Yang",
    abstract: "Deep neural networks (DNNs) have achieved significant accuracy improvement in many machine learning and computer vision applications. However, deploying DNNs in real applications faces tremendous challenges due to their high computational complexity and resource consumption. To address these issues, hardware accelerations of DNN, especially FPGA-based neural network inference accelerator, attract much research attention.",
    source: "ACM",
    publishDate: "2019-12-18",
    category: "FPGA Design",
    tags: ["FPGA", "Neural Networks", "Accelerators", "Machine Learning"],
    link: "https://r.search.yahoo.com/_ylt=AwrKGAM.s_JnnQIAB6i7HAx.;_ylu=Y29sbwNzZzMEcG9zAzEEdnRpZAMEc2VjA3Ny/RV=2/RE=1745168446/RO=10/RU=https%3a%2f%2fdl.acm.org%2fdoi%2f10.1145%2f3289185/RK=2/RS=UUenq16d6o0Ojx9Bi9KgbNI_zKs-",
    citations: 465,
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    featured: true
  },
  {
    id: 7,
    title: "Security Assessment of PUF-Based Authentication in FPGA Implementation",
    authors: "P. Gu, J. Li, D. Zhang, Z. Zhang, F. Gao",
    abstract: "Physical unclonable function (PUF) is considered an efficient hardware fingerprint solution for low-cost security applications. However, vulnerabilities of PUF-based authentication in practical hardware implementations deserve more attention. In this paper, we present a comprehensive security analysis of the strong PUF-based authentication in field-programmable gate arrays (FPGAs).",
    source: "IEEE",
    publishDate: "2021-03-25",
    category: "Hardware Security",
    tags: ["FPGA", "PUF", "Hardware Security", "Authentication"],
    link: "https://r.search.yahoo.com/_ylt=AwrKD3lYs_JnYwIAD327HAx.;_ylu=Y29sbwNzZzMEcG9zAzEEdnRpZAMEc2VjA3Ny/RV=2/RE=1745168473/RO=10/RU=https%3a%2f%2fieeexplore.ieee.org%2fdocument%2f8397339/RK=2/RS=GBnUwK7Fmhvw9.ptI0RYKUPE1_4-",
    citations: 37,
    image: "https://images.unsplash.com/photo-1563770660941-bdc9d6cf3999?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    featured: true
  },
  {
    id: 8,
    title: "An Ultra-Low-Power Always-On Keyword Spotting Accelerator Using Quantized Convolutional Neural Networks and Frequency Domain Processing",
    authors: "Y. Zhang, N. Suda, L. Lai, V. Chandra",
    abstract: "This paper presents an ultra-low-power always-on keyword spotting (KWS) accelerator. The proposed system utilizes quantized convolutional neural networks (CNNs) and frequency domain processing to achieve power consumption below 100 μW while maintaining high accuracy for multiple keyword detection.",
    source: "IEEE",
    publishDate: "2021-05-10",
    category: "Low Power Design",
    tags: ["IoT", "Low Power", "Audio Processing"],
    link: "https://r.search.yahoo.com/_ylt=Awr1UY5ns_JnXwIAd7.7HAx.;_ylu=Y29sbwNzZzMEcG9zAzEEdnRpZAMEc2VjA3Ny/RV=2/RE=1745168488/RO=10/RU=https%3a%2f%2fieeexplore.ieee.org%2fdocument%2f8936893/RK=2/RS=myoVMQLjWa2mREJgKdzkXaC8Yjc-",
    citations: 26,
    image: "https://images.unsplash.com/photo-1494251268900-9273173b8f2e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    featured: false
  },
  {
    id: 9,
    title: "Hardware-Based Security for FPGA Intellectual Property Protection",
    authors: "M. Fyrbiak, S. Wallat, C. Paar",
    abstract: "Field Programmable Gate Arrays (FPGAs) are widely deployed in many applications domains, ranging from aerospace and military to consumer and automotive products. Protecting intellectual property and preventing attacks like malicious manipulations of a design, reverse engineering, or cloning is a major concern for FPGA design houses and IP core providers.",
    source: "Springer",
    publishDate: "2020-07-04",
    category: "Hardware Security",
    tags: ["FPGA", "Security", "Intellectual Property", "Hardware Protection"],
    link: "https://r.search.yahoo.com/_ylt=Awr1UY52s_JnLQIAR0q7HAx.;_ylu=Y29sbwNzZzMEcG9zAzEEdnRpZAMEc2VjA3Ny/RV=2/RE=1745168502/RO=10/RU=https%3a%2f%2flink.springer.com%2fchapter%2f10.1007%2f978-3-030-79701-0_4/RK=2/RS=Ot8NnFUlwXSfK9ohPl9S3_HW8wQ-",
    citations: 32,
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    featured: true
  },
  {
    id: 10,
    title: "GAP8: A RISC-V SoC for AI at the Edge of the IoT",
    authors: "E. Flamand, D. Rossi, F. Conti, I. Loi, A. Pullini, F. Rotenberg, L. Benini",
    abstract: "The IoT edge requires sensors data to be processed close to the sensor interface. Deep Learning has revolutionized data analytics in several application domains, including computer vision, speech recognition, and natural language processing, achieving near- or super-human performance. We present GAP8, a RISC-V multi-core System-on-Chip augmented with an integrated neural engine for cost-effective computation of CNNS at the very edge of the IoT.",
    source: "IEEE",
    publishDate: "2018-04-30",
    category: "Computer Architecture",
    tags: ["RISC-V", "IoT", "Deep Learning", "Edge Computing"],
    link: "https://r.search.yahoo.com/_ylt=AwrKD3mMs_JnVgIAt967HAx.;_ylu=Y29sbwNzZzMEcG9zAzEEdnRpZAMEc2VjA3Ny/RV=2/RE=1745168525/RO=10/RU=https%3a%2f%2fieeexplore.ieee.org%2fdocument%2f8445101/RK=2/RS=gF6v2TCJDkc1RjwpkeN7tG_uu0Y-",
    citations: 282,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2034&q=80",
    featured: true
  },
  {
    id: 11,
    title: "5G Testbed for Optical and Radio Access Network Integration",
    authors: "A. Tzanakaki, M. Anastasopoulos, D. Simeonidou",
    abstract: "This paper presents an experimental demonstration of a 5G converged optical-wireless network architecture. The proposed architecture integrates heterogeneous radio access with optical network infrastructure, adopting Network Function Virtualization (NFV) and Mobile Edge Computing (MEC) to support various 5G services.",
    source: "IEEE",
    publishDate: "2020-06-15",
    category: "Computer Architecture",
    tags: ["5G", "Network Architecture", "Software Defined Networks"],
    link: "https://research-information.bris.ac.uk/ws/portalfiles/portal/201450748/Full_text_PDF_accepted_author_manuscript_.pdf",
    citations: 35,
    image: "https://images.unsplash.com/photo-1533709752211-118fcaf03312?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    featured: false
  },
  {
    id: 12,
    title: "STONNE: Enabling Cycle-Level Microarchitectural Simulation for DNN Inference Accelerators",
    authors: "F. Muñoz-Martínez, J. L. Abellán, M. E. Acacio, T. Krishna",
    abstract: "Deep Neural Networks (DNNs) have seen a tremendous surge in popularity in recent years. This has led to several innovations in hardware accelerators to improve the performance and energy-efficiency of DNN computations. Alongside, researchers have started innovating in new dataflows to better map DNN computations to the accelerator microarchitecture.",
    source: "IEEE",
    publishDate: "2021-05-13",
    category: "Machine Learning Hardware",
    tags: ["DNN", "Hardware Accelerators", "Microarchitecture", "Simulation"],
    link: "https://r.search.yahoo.com/_ylt=Awr1QPKys_JnCwIAd0K7HAx.;_ylu=Y29sbwNzZzMEcG9zAzEEdnRpZAMEc2VjA3Ny/RV=2/RE=1745168562/RO=10/RU=https%3a%2f%2fieeexplore.ieee.org%2fdocument%2f9668279/RK=2/RS=gF8bbRNeBDl1ZY9IA2Gk8sXQN2w-",
    citations: 48,
    image: "https://images.unsplash.com/photo-1538222586-5668c66c968a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2033&q=80",
    featured: true
  },
  {
    id: 13,
    title: "Automated Design Space Exploration for FPGA-Based Accelerators",
    authors: "J. Peltenburg, J. van Straten, Z. Al-Ars, P. Hofstee",
    abstract: "This paper presents a methodology for automated design space exploration for FPGA-based accelerators. We propose a framework that systematically explores the design parameters to optimize accelerator performance according to specific metrics. The approach integrates with high-level synthesis tools to automate the evaluation of different design points.",
    source: "IEEE",
    publishDate: "2020-09-10",
    category: "FPGA Design",
    tags: ["FPGA", "Design Space Exploration", "Hardware Accelerators", "HLS"],
    link: "https://r.search.yahoo.com/_ylt=AwrPrxjFs_JnxAIANyO7HAx.;_ylu=Y29sbwNzZzMEcG9zAzEEdnRpZAMEc2VjA3Ny/RV=2/RE=1745168582/RO=10/RU=https%3a%2f%2fdl.acm.org%2fdoi%2f10.1016%2fj.sysarc.2024.103260/RK=2/RS=BPmaktYobcO0F3fv2852Umwckf0-",
    citations: 28,
    image: "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
    featured: false
  },
  {
    id: 14,
    title: "Neuromorphic Computing Using Non-Volatile Memory",
    authors: "G. W. Burr, R. M. Shelby, A. Sebastian, S. Kim, S. Kim, S. Sidler, K. Virwani, M. Ishii, P. Narayanan, A. Fumarola",
    abstract: "Computation-in-memory based on crossbar arrays of non-volatile memory (NVM) devices can potentially accelerate the training of deep neural networks (DNN). We review recent progress in the use of NVM devices for implementing both spiking and deep neural networks, with a focus on our work at IBM on using phase-change memory (PCM) synapses for training fully-connected layers within a DNN.",
    source: "IEEE",
    publishDate: "2017-03-06",
    category: "Computer Architecture",
    tags: ["Neuromorphic Computing", "Non-Volatile Memory", "Neural Networks"],
    link: "https://r.search.yahoo.com/_ylt=AwrPrxjTs_JnxAIAZxu7HAx.;_ylu=Y29sbwNzZzMEcG9zAzEEdnRpZAMEc2VjA3Ny/RV=2/RE=1745168596/RO=10/RU=https%3a%2f%2fwww.tandfonline.com%2fdoi%2ffull%2f10.1080%2f23746149.2016.1259585/RK=2/RS=J8YteKZt3yqUqMdA2sCjNxaPfsU-",
    citations: 683,
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    featured: true
  },
  {
    id: 15,
    title: "Side-Channel Analysis of Lattice-Based Post-Quantum Cryptography",
    authors: "S. Picek, B. Mazumdar, D. Dinu, S. S. Roy, A. Barenghi",
    abstract: "This paper evaluates the security of lattice-based post-quantum cryptographic schemes against side-channel attacks. We analyze the vulnerabilities of Ring-LWE and NTRU-based schemes that have been submitted to the NIST post-quantum cryptography standardization process. Our work demonstrates potential side-channel vulnerabilities and suggests countermeasures.",
    source: "ACM",
    publishDate: "2020-05-11",
    category: "Hardware Security",
    tags: ["Post-Quantum Cryptography", "Side-Channel Attacks", "Security"],
    link: "https://eprint.iacr.org/2022/474",
    citations: 54,
    image: "https://images.unsplash.com/photo-1616763355548-1b606f439f86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    featured: false
  }
];



import axios from 'axios';

// Default tech image fallback
const fallbackImage = 'https://tse1.mm.bing.net/th?id=OIP.T4er_Yz0OMgTP9F0E_Zw5QHaE8&pid=Api&P=0&h=180';

const checkImageExists = async (url) => {
  try {
    const response = await axios.head(url);
    return response.status === 200;
  } catch {
    return false;
  }
};

const uploadResearchPapers = async () => {
  for (const paper of papers) {
    const validImage = await checkImageExists(paper.image);
    const finalImage = validImage ? paper.image : fallbackImage;

    try {
      const res = await axios.post('http://localhost:5000/api/admin/research-paper-upload', {
        imageUri: finalImage,
        title: paper.title,
        authors: paper.authors,
        description: paper.abstract,
        paperType: paper.category,
        whatItCovers: paper.tags,
        source: paper.source,
        researchPaperLink: paper.link,
      });

      console.log('✅ Uploaded:', paper.title);
    } catch (error) {
      console.error('❌ Error uploading paper:', paper.title, error.response?.data || error.message);
    }
  }
};

uploadResearchPapers();