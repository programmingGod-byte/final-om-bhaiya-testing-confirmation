require('dotenv').config();

// #
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const authRoutes = require('./src/routes/authRoutes')
const workSpaceRoutes = require('./src/routes/workSpaceRoutes')
const morgan = require('morgan');
// Load env vars
const moduleRoutes = require('./src/routes/ModulesConf')
const adminRoutes = require('./src/routes/adminRoutes')
const generalRoute = require('./src/routes/generalRoute')
const paymentRoute = require("./src/routes/payment")
const { SitemapStream, streamToPromise } = require('sitemap');
const { Readable } = require('stream');
const Course = require('./src/models/ModuleSchema'); // Adjust path as needed
const compression = require('compression');
const {updateAllCourseContents} = require('./src/controllers/courseMerge')
const app = express();

app.use(express.json({ limit: '50mb' })); // for JSON payloads
app.use(express.urlencoded({ extended: true, limit: '50mb' })); // for form data

// Middleware
app.use(cors({
  origin:"*"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(compression());

// Serve static files
app.use('/images', express.static(path.join(__dirname, '../public/images')));




// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/verilog_forum';
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes

app.use('/api/auth',authRoutes)
app.use('/api/workspace/',workSpaceRoutes)
app.use('/api/modules',moduleRoutes)
app.use('/api/admin',adminRoutes)
app.use('/api/payment',paymentRoute)
app.use('/api/general',generalRoute)

app.get('/sitemap.xml', async (req, res) => {
  // updateAllCourseContents()
  try {
    // 1. Get all course IDs with updatedAt for lastmod
    const courses = await Course.find(
      { _id: { $exists: true, $ne: null } }, 
      '_id updatedAt'
    ).lean();
    console.log(`Found ${courses.length} courses for sitemap`);
    
    // 2. Static routes with lastmod
    const staticLinks = [
      { url: '/', changefreq: 'daily', priority: 1.0, lastmod: new Date().toISOString() },
      { url: '/modules', changefreq: 'daily', priority: 0.8, lastmod: new Date().toISOString() },
      { url: '/blog', changefreq: 'daily', priority: 0.7, lastmod: new Date().toISOString() },
      { url: '/contact', changefreq: 'daily', priority: 0.5, lastmod: new Date().toISOString() },
       { url: '/careers', changefreq: 'daily', priority: 0.5, lastmod: new Date().toISOString() },
       { url: '/resources', changefreq: 'daily', priority: 0.5, lastmod: new Date().toISOString() },
    ];
    
    // 3. Dynamic course/module links with proper validation and lastmod
    const moduleLinks = courses
      .filter(course => course && course._id) // Ensure course exists and has _id
      .map(course => {
        const courseId = course._id.toString();
        // Strict validation - must be a valid MongoDB ObjectId format
        if (!courseId || 
            courseId === 'undefined' || 
            courseId === 'null' || 
            courseId.length !== 24 || 
            !/^[0-9a-fA-F]{24}$/.test(courseId)) {
          console.warn('Invalid course ID found:', course);
          return null;
        }
        return {
          url: `/modules/${courseId}`,
          changefreq: 'daily',
          priority: 1,
          lastmod: new Date().toISOString(), // Use current date for simplicity
        };
      })
      .filter(link => link !== null); // Remove any null entries
    
    console.log(`Generated ${moduleLinks.length} valid module links`);
    
    // 4. Additional validation before combining
    const validModuleLinks = moduleLinks.filter(link => 
      link && 
      link.url && 
      link.url.length > 0 && 
      !link.url.includes('undefined') &&
      !link.url.includes('null')
    );
    
    if (validModuleLinks.length !== moduleLinks.length) {
      console.warn(`Filtered out ${moduleLinks.length - validModuleLinks.length} invalid module links`);
    }
    
    // 5. Combine all links
    const allLinks = [...staticLinks, ...validModuleLinks];
    
    console.log(`Total sitemap entries: ${allLinks.length}`);
    
    // 6. Set header and generate XML
    res.writeHead(200, {
      'Content-Type': 'application/xml',
    });
    
    const stream = new SitemapStream({ hostname: 'https://www.verigeek.xyz' });
    const xml = await streamToPromise(Readable.from(allLinks).pipe(stream)).then(data =>
      data.toString()
    );
    
    res.end(xml);
  } catch (error) {
    console.error('Sitemap generation failed:', error);
    res.status(500).end();
  }
});


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });
}




// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Define PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app; 