import React, { useState, useEffect, useCallback } from 'react';
import { 
  Box, Typography, Grid, Paper, Tabs, Tab, Card, CardContent, 
  CardActions, Button, Divider, List, ListItem, ListItemIcon, 
  ListItemText, TextField, InputAdornment, Chip, CircularProgress,
  Container, Fade, Grow, Slide, Zoom, useMediaQuery, useTheme,
  IconButton, Tooltip, CardActionArea, Badge, MenuItem
} from '@mui/material';
import { 
  MenuBook, Code, YouTube, School, Search, FilterList,
  ImportContacts, Laptop, Link as LinkIcon, DesignServices, Assignment,
  Bookmark, BookmarkBorder, ArrowForward, Sort, FilterAlt,
  ThumbUp, Share, ElectricBolt, Memory, Architecture
} from '@mui/icons-material';
import '../styles/Resources.css';

// Custom hook for image preloading
const useImagePreloader = (images) => {
  const [loadedImages, setLoadedImages] = useState({});
  
  useEffect(() => {
    // Create an array of image loading promises
    const imagePromises = Object.entries(images).map(([id, src]) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          setLoadedImages(prev => ({ ...prev, [id]: true }));
          resolve(id);
        };
        img.onerror = () => {
          setLoadedImages(prev => ({ ...prev, [id]: false }));
          reject(id);
        };
      });
    });
    
    // Load all images in parallel
    Promise.allSettled(imagePromises).then(results => {
      console.log('All images processed');
    });
  }, [images]);
  
  return [loadedImages, setLoadedImages];
};

const Resources = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [bookmarkedResources, setBookmarkedResources] = useState(() => {
    const saved = localStorage.getItem('bookmarkedResources');
    return saved ? JSON.parse(saved) : [];
  });
  const [visibleFilterMenu, setVisibleFilterMenu] = useState(false);
  const [sortOrder, setSortOrder] = useState('newest');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Resource categories
  const categories = ['All', 'Books', 'Tools', 'Videos', 'Courses', 'Papers', 'Communities'];

  // Resources data
  const resources = [
    // Books
    {
      id: 1,
      title: "Digital Design and Computer Architecture: RISC-V Edition",
      author: "Sarah Harris, David Harris",
      description: "Comprehensive textbook covering digital design principles and RISC-V architecture implementation.",
      link: "https://www.amazon.com/Digital-Design-Computer-Architecture-RISC-V/dp/0128200642",
      category: "Books",
      tags: ["Digital Design", "RISC-V", "Computer Architecture"],
      featured: true,
      image: process.env.PUBLIC_URL + '/images/resources/books/digital-design-riscv.jpg',
      date: '2023-10-15'
    },
    {
      id: 2,
      title: "SystemVerilog for Verification",
      author: "Chris Spear, Greg Tumbush",
      description: "A guide to learning the SystemVerilog for hardware verification and comprehensive coverage of the language features.",
      link: "https://www.amazon.com/SystemVerilog-Verification-Learning-Testbench-Language/dp/1461407141",
      category: "Books",
      tags: ["SystemVerilog", "Verification", "HDL"],
      featured: true,
      image: process.env.PUBLIC_URL + '/images/resources/books/systemverilog.jpg'
    },
    {
      id: 3,
      title: "CMOS VLSI Design",
      author: "Neil Weste, David Harris",
      description: "Essential textbook covering CMOS circuit design principles, layout, and system-level considerations.",
      link: "https://www.amazon.com/CMOS-VLSI-Design-Systems-Perspective/dp/0321547748",
      category: "Books",
      tags: ["CMOS", "VLSI", "Circuit Design"],
      featured: false,
      image: process.env.PUBLIC_URL + '/images/resources/books/cmos-vlsi.jpg'
    },
    {
      id: 4,
      title: "Verilog HDL Guide",
      author: "Samir Palnitkar",
      description: "Comprehensive guide to Verilog HDL, covering language basics to advanced design techniques.",
      link: "https://d1.amobbs.com/bbs_upload782111/files_33/ourdev_585395BQ8J9A.pdf",
      category: "Books",
      tags: ["Verilog", "HDL", "Digital Design"],
      featured: false,
      image: process.env.PUBLIC_URL + '/images/resources/books/verilog-guide.jpg'
    },
    {
      id: 5,
      title: "Advanced ASIC Chip Synthesis",
      author: "Himanshu Bhatnagar",
      description: "Practical guide to ASIC design flow using industry-standard tools for synthesis and timing analysis.",
      link: "https://www.amazon.com/Advanced-ASIC-Chip-Synthesis-Publication/dp/0792375688",
      category: "Books",
      tags: ["ASIC", "Synthesis", "Timing Analysis"],
      featured: false,
      image: process.env.PUBLIC_URL + '/images/resources/books/asic-synthesis.jpg'
    },

    // Tools
    {
      id: 6,
      title: "Xilinx Vivado Design Suite",
      author: "Xilinx",
      description: "Industry-standard FPGA design tool for RTL development, synthesis, implementation, and verification.",
      link: "https://www.xilinx.com/products/design-tools/vivado.html",
      category: "Tools",
      tags: ["FPGA", "Synthesis", "Implementation"],
      featured: true,
      image: process.env.PUBLIC_URL + '/images/resources/tools/vivado.jpg'
    },
    {
      id: 7,
      title: "ModelSim FPGA Edition",
      author: "Mentor Graphics",
      description: "Popular HDL simulator for Verilog and VHDL design verification.",
      link: "https://www.intel.com/content/www/us/en/software/programmable/quartus-prime/model-sim.html",
      category: "Tools",
      tags: ["Simulation", "Verification", "FPGA"],
      featured: false,
      image: 'https://tse2.mm.bing.net/th?id=OIP.tihMTqO4UlgqEuVvLRm0SwHaFj&pid=Api&P=0&h=180'
    },
    {
      id: 8,
      title: "Synopsys Design Compiler",
      author: "Synopsys",
      description: "Industry-leading logic synthesis tool for transforming RTL into optimized gate-level netlists.",
      link: "https://www.synopsys.com/implementation-and-signoff/rtl-synthesis-test/design-compiler-graphical.html",
      category: "Tools",
      tags: ["Synthesis", "ASIC", "Optimization"],
      featured: true,
      image: "https://tse2.mm.bing.net/th?id=OIP.nbqfletMaBmPGrh4vtswrAAAAA&pid=Api&P=0&h=180"
    },
    {
      id: 9,
      title: "Cadence Innovus Implementation System",
      author: "Cadence",
      description: "Advanced physical implementation tool for digital SoC designs with focus on power, performance, and area optimization.",
      link: "https://www.cadence.com/en_US/home/tools/digital-design-and-signoff/soc-implementation-and-floorplanning/innovus-implementation-system.html",
      category: "Tools",
      tags: ["Physical Design", "Place & Route", "Timing"],
      featured: false,
      image: 'https://tse2.mm.bing.net/th?id=OIP.nbqfletMaBmPGrh4vtswrAAAAA&pid=Api&P=0&h=180'
    },
    {
      id: 10,
      title: "Synopsys VCS",
      author: "Synopsys",
      description: "High-performance simulator for Verilog, SystemVerilog, VHDL, and mixed-language designs.",
      link: "https://www.synopsys.com/verification/simulation/vcs.html",
      category: "Tools",
      tags: ["Simulation", "Verification", "UVM"],
      featured: false,
      image: 'https://tse3.mm.bing.net/th?id=OIP.m_9JB7yZuw48pI7pgnPdoQAAAA&pid=Api&P=0&h=180'
    },

    // Videos
    {
      id: 11,
      title: "Digital Design with Verilog",
      author: "NPTEL",
      description: "Comprehensive course on digital design using Verilog HDL from basic concepts to advanced designs.",
      link: "https://www.youtube.com/playlist?list=PLJ5C_6qdAvBGKh_GssdOLz5SSGwU__3Hh",
      category: "Videos",
      tags: ["Verilog", "Digital Design", "HDL"],
      featured: true,
      image:'https://tse3.mm.bing.net/th?id=OIP.FVMsud99reUkR6VARapNiQHaHa&pid=Api&P=0&h=180'
    },
    {
      id: 12,
      title: "SystemVerilog for Verification",
      author: "Verification Guide",
      description: "Tutorial series on SystemVerilog for hardware verification, covering OOP concepts, testbench architecture, and advanced features.",
      link: "https://www.youtube.com/playlist?list=PLxqLblRbXVJ5Qf4lN6v1wL5pJES5bYpMY",
      category: "Videos",
      tags: ["SystemVerilog", "Verification", "UVM"],
      featured: false,
      image: 'https://tse4.mm.bing.net/th?id=OIP.xIkkZnnlbUM_y2sXgDlL9gHaE4&pid=Api&P=0&h=180'
    },
    {
      id: 13,
      title: "RISC-V CPU Design",
      author: "Onur Mutlu",
      description: "Comprehensive lectures on CPU architecture and RISC-V processor design from basic concepts to implementation.",
      link: "https://www.youtube.com/playlist?list=PL5Q2soXY2Zi-EXLVgkrbIQrkrISBxCBCY",
      category: "Videos",
      tags: ["RISC-V", "Processor Design", "Architecture"],
      featured: true,
      image: 'https://tse3.mm.bing.net/th?id=OIP.GM3zSqly7b0MLNbWNUOfzAHaEL&pid=Api&P=0&h=180'
    },

    // Courses
    {
      id: 14,
      title: "VLSI CAD: Logic to Layout",
      author: "University of Illinois",
      description: "A comprehensive course on VLSI design flow from logic synthesis to physical design and layout.",
      link: "https://www.coursera.org/learn/vlsi-cad-logic",
      category: "Courses",
      tags: ["VLSI", "CAD", "Physical Design"],
      featured: true,
      image:  'https://tse2.mm.bing.net/th?id=OIP.o3H8zhypXIzjgNRjTN2M_wHaGi&pid=Api&P=0&h=180'
    },
    {
      id: 15,
      title: "Hardware Description Languages for FPGA Design",
      author: "University of Colorado Boulder",
      description: "Course covering HDL design for FPGAs, including Verilog and VHDL implementation techniques.",
      link: "https://www.coursera.org/learn/fpga-hardware-description-languages",
      category: "Courses",
      tags: ["HDL", "FPGA", "Verilog"],
      featured: false,
      image:  'https://tse3.mm.bing.net/th?id=OIP.GxlD1kPHN4gOs_E6Fl_-ogHaHa&pid=Api&P=0&h=180'
    },
    {
      id: 16,
      title: "Functional Hardware Verification",
      author: "EDA Playground",
      description: "Practical course on SystemVerilog and UVM for functional verification of digital designs.",
      link: "https://www.edaplayground.com/",
      category: "Courses",
      tags: ["Verification", "SystemVerilog", "UVM"],
      featured: false,
      image:'https://tse4.mm.bing.net/th?id=OIP.y3ZitubCLhn2DkMEUw0kaQAAAA&pid=Api&P=0&h=180'
    },

    // Papers
    {
      id: 17,
      title: "The RISC-V Instruction Set Manual",
      author: "RISC-V Foundation",
      description: "Official specification of the RISC-V instruction set architecture, covering the base and standard extension instruction sets.",
      link: "https://riscv.org/technical/specifications/",
      category: "Papers",
      tags: ["RISC-V", "ISA", "Specification"],
      featured: true,
      image: 'https://tse1.mm.bing.net/th?id=OIP.T5X7UbWZedVZMHdzB9YPCQHaE8&pid=Api&P=0&h=180'
    },
    {
      id: 18,
      title: "A Survey of Architectural Approaches for Data Compression in Cache and Main Memory Systems",
      author: "Sparsh Mittal, Jeffrey S. Vetter",
      description: "Comprehensive survey of memory compression techniques in modern computer architectures.",
      link: "https://ieeexplore.ieee.org/document/7556912",
      category: "Papers",
      tags: ["Memory Systems", "Compression", "Architecture"],
      featured: false,
      image: process.env.PUBLIC_URL + '/images/resources/papers/survey-architectural-approaches.jpg'
    },
    {
      id: 19,
      title: "A Survey Of Techniques for Architecting and Managing Asymmetric DRAM Cache",
      author: "Sparsh Mittal",
      description: "Survey of DRAM cache architecture techniques for improving memory system performance.",
      link: "https://arxiv.org/abs/1607.04508",
      category: "Papers",
      tags: ["DRAM", "Cache", "Memory Systems"],
      featured: false,
      image: process.env.PUBLIC_URL + '/images/resources/papers/survey-architecting-managing.jpg'
    },

    // Communities
    {
      id: 20,
      title: "Stack Overflow Hardware",
      author: "Stack Exchange",
      description: "Q&A forum for hardware design, Verilog, VHDL, and FPGA-related questions.",
      link: "https://stackoverflow.com/questions/tagged/verilog",
      category: "Communities",
      tags: ["Q&A", "Verilog", "FPGA"],
      featured: false,
      image: process.env.PUBLIC_URL + '/images/resources/communities/stackoverflow.png'
    },
    {
      id: 21,
      title: "RISC-V International",
      author: "RISC-V",
      description: "The official community and working groups for the RISC-V instruction set architecture.",
      link: "https://riscv.org/",
      category: "Communities",
      tags: ["RISC-V", "ISA", "Open Source"],
      featured: true,
      image:  'https://tse3.mm.bing.net/th?id=OIP.5NSprjwGUqgQY7ZIxR93PwHaHa&pid=Api&P=0&h=180'
    },
    {
      id: 22,
      title: "FPGA",
      author: "Reddit",
      description: "Active community for FPGA designers, students, and hobbyists to discuss projects, tools, and techniques.",
      link: "https://www.reddit.com/r/FPGA/",
      category: "Communities",
      tags: ["FPGA", "Community", "Discussion"],
      featured: true,
      image: 'https://tse4.mm.bing.net/th?id=OIP.uyS3KHUP6ZA_LggIY4b6WAHaHL&pid=Api&P=0&h=180'
    }
  ];

  // Simply extend the existing resources with date properties
  // This would be manually done for the whole resource list to add dates
  // I'm just showing a function that could do it programmatically
  const resourcesWithDates = resources.map(resource => ({
    ...resource,
    date: resource.date || '2023-01-01' // Default date if not specified
  }));

  // Prepare image map for preloading
  const imageMap = resourcesWithDates.reduce((acc, resource) => {
    acc[resource.id] = resource.image;
    return acc;
  }, {});
  
  // Use the custom hook to preload images
  const [loadedImages, setLoadedImages] = useImagePreloader(imageMap);

  // Save bookmarks to localStorage
  useEffect(() => {
    localStorage.setItem('bookmarkedResources', JSON.stringify(bookmarkedResources));
  }, [bookmarkedResources]);

  // Toggle bookmark for a resource
  const toggleBookmark = (resourceId) => {
    setBookmarkedResources(prev => {
      if (prev.includes(resourceId)) {
        return prev.filter(id => id !== resourceId);
      } else {
        return [...prev, resourceId];
      }
    });
  };

  // Share resource
  const shareResource = (resource) => {
    if (navigator.share) {
      navigator.share({
        title: resource.title,
        text: `Check out this resource: ${resource.title} by ${resource.author}`,
        url: resource.link
      }).catch(err => {
        console.error('Error sharing resource:', err);
      });
    } else {
      // Fallback - copy URL to clipboard
      navigator.clipboard.writeText(resource.link)
        .then(() => {
          // Could show a snackbar notification here
          alert('Link copied to clipboard!');
        })
        .catch(err => {
          console.error('Failed to copy link:', err);
        });
    }
  };

  // Filter resources based on search and category
  const getFilteredResources = () => {
    let filtered = resourcesWithDates;
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(resource => 
        resource.title.toLowerCase().includes(query) ||
        resource.description.toLowerCase().includes(query) ||
        resource.author.toLowerCase().includes(query) ||
        resource.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Filter by category
    if (categoryFilter !== 'All') {
      filtered = filtered.filter(resource => resource.category === categoryFilter);
    }
    
    // Filter by tab
    if (tabValue === 1) {
      // Featured resources
      filtered = filtered.filter(resource => resource.featured);
    } else if (tabValue === 2) {
      // Bookmarked resources
      filtered = filtered.filter(resource => bookmarkedResources.includes(resource.id));
    }
    
    // Sort resources
    if (sortOrder === 'newest') {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortOrder === 'oldest') {
      filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortOrder === 'az') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrder === 'za') {
      filtered.sort((a, b) => b.title.localeCompare(a.title));
    }
    
    return filtered;
  };

  const filteredResources = getFilteredResources();
  
  // Function to render resource cards
  const renderResourceCard = (resource) => {
    const isImageLoaded = loadedImages[resource.id];
    const isBookmarked = bookmarkedResources.includes(resource.id);
    
    return (
      <Grid item xs={12} md={6} key={resource.id}>
        <Card elevation={3} className="resources-card" sx={{ 
          display: 'flex', 
          height: '100%', 
          overflow: 'hidden', 
          border: '1px solid #eaeaea',
          position: 'relative',
          transition: 'box-shadow 0.3s ease',
          '&:hover': {
            boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
          }
        }}>
          {/* Fixed size image container to prevent flickering */}
          <Box sx={{ 
            width: '150px', 
            minWidth: '150px',
            height: '180px',
            position: 'relative',
            bgcolor: 'white',
            borderRight: '1px solid #eaeaea',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}>
            {/* Static white background */}
            <Box sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bgcolor: 'white',
              zIndex: 0
            }}/>
            
            {/* Loading indicator */}
            {isImageLoaded === undefined && (
              <CircularProgress 
                size={24} 
                sx={{ 
                  position: 'absolute',
                  zIndex: 1,
                  color: 'primary.light'
                }}
              />
            )}
            
            {/* Image or placeholder */}
            {(isImageLoaded !== false) && (
              <Box
                component="img"
                className="resources-card-image"
                sx={{
                  position: 'relative',
                  zIndex: 1,
                  maxWidth: '130px',
                  maxHeight: '160px',
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain',
                  display: 'block',
                  opacity: isImageLoaded ? 1 : 0,
                  transition: 'opacity 0.3s ease-in-out',
                  backgroundColor: 'white'
                }}
                src={resource.image}
                alt={resource.title}
                onLoad={(e) => {
                  // Add a small delay before showing the image to ensure smooth transition
                  setTimeout(() => {
                    e.target.style.opacity = 1;
                    if (!loadedImages[resource.id]) {
                      setLoadedImages(prev => ({ ...prev, [resource.id]: true }));
                    }
                  }, 50);
                }}
                onError={(e) => {
                  console.error(`Failed to load image for ${resource.title}: ${resource.image}`);
                  e.target.onerror = null;
                  // Use a more specific fallback image based on resource category
                  const fallbackImage = getFallbackImage(resource.category);
                  e.target.src = fallbackImage;
                  setLoadedImages(prev => ({ ...prev, [resource.id]: false }));
                }}
              />
            )}
            
            {/* Fallback for failed images */}
            {isImageLoaded === false && (
              <Box
                component="img"
                className="resources-card-image"
                sx={{
                  position: 'relative',
                  zIndex: 1,
                  maxWidth: '130px',
                  maxHeight: '160px',
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain',
                  display: 'block',
                  backgroundColor: 'white'
                }}
                src={getFallbackImage(resource.category)}
                alt={resource.title}
              />
            )}
            
            {/* Bookmark indicator */}
            {isBookmarked && (
              <Box sx={{
                position: 'absolute',
                top: 5,
                right: 5,
                zIndex: 2
              }}>
                <Bookmark color="primary" fontSize="small" className="bookmark-animation" />
              </Box>
            )}
          </Box>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
            <CardContent sx={{ flex: '1 0 auto', pb: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                {getResourceLogo(resource.author) && (
                  <Box
                    component="img"
                    src={getResourceLogo(resource.author).src}
                    alt={getResourceLogo(resource.author).alt}
                    sx={{
                      width: 20,
                      height: 20,
                      mr: 1,
                      objectFit: 'contain'
                    }}
                  />
                )}
                <Typography variant="h6" component="div" sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                  {resource.title}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                By {resource.author}
              </Typography>
              <Typography variant="body2" paragraph sx={{ 
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
              }}>
                {resource.description}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {resource.tags.map((tag, index) => (
                  <Chip 
                    key={index} 
                    label={tag} 
                    size="small"
                    className="category-chip" 
                    sx={{ 
                      backgroundColor: 'rgba(106, 13, 173, 0.08)', 
                      fontSize: '0.7rem',
                      mb: 0.5
                    }} 
                  />
                ))}
              </Box>
            </CardContent>
            <CardActions sx={{ pt: 0, display: 'flex', justifyContent: 'space-between' }}>
              <Button 
                size="small" 
                color="primary" 
                href={resource.link} 
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<LinkIcon />}
                variant="contained"
                sx={{ borderRadius: 2 }}
              >
                Visit Resource
              </Button>
              
              <Box>
                <IconButton 
                  size="small" 
                  onClick={(e) => toggleBookmark(resource.id)}
                  color={isBookmarked ? "primary" : "default"}
                >
                  {isBookmarked ? <Bookmark fontSize="small" /> : <BookmarkBorder fontSize="small" />}
                </IconButton>
                
                <IconButton 
                  size="small" 
                  onClick={(e) => shareResource(resource)}
                >
                  <Share fontSize="small" />
                </IconButton>
              </Box>
            </CardActions>
          </Box>
        </Card>
      </Grid>
    );
  };

  // Resource category icons
  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Books': return <MenuBook fontSize="small" />;
      case 'Tools': return <DesignServices fontSize="small" />;
      case 'Videos': return <YouTube fontSize="small" />;
      case 'Courses': return <School fontSize="small" />;
      case 'Papers': return <Assignment fontSize="small" />;
      case 'Communities': return <Laptop fontSize="small" />;
      default: return <ImportContacts fontSize="small" />;
    }
  };

  // Get resource platform logo
  const getResourceLogo = (author) => {
    switch(author) {
      case 'Reddit':
        return {
          src: process.env.PUBLIC_URL + '/images/reddit-logo.png',
          alt: 'Reddit Logo'
        };
      case 'Stack Exchange':
        return {
          src: process.env.PUBLIC_URL + '/images/stackoverflow-icon.png',
          alt: 'Stack Overflow Logo'
        };
      case 'RISC-V':
        return {
          src: process.env.PUBLIC_URL + '/images/riscv-logo.png',
          alt: 'RISC-V Logo'
        };
      default:
        return null;
    }
  };

  // Update the getFallbackImage function to use absolute path
  const getFallbackImage = () => {
    // Use absolute path from public directory
    return process.env.PUBLIC_URL + '/images/BACKGROUNDLESS_LOGO.png';
  };

  // Sort order options
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'az', label: 'A-Z' },
    { value: 'za', label: 'Z-A' }
  ];

  return (
    <Box sx={{ overflow: 'hidden' }} className="resources-page">
      {/* Hero Section */}
      <Box className="resources-hero">
        <Container maxWidth="lg">
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={7}>
              <Fade in={true} timeout={1000}>
                <Box sx={{ position: 'relative', zIndex: 2 }}>
                  {/* Decorative elements */}
                  <Box sx={{ 
                    position: 'absolute', 
                    top: -15, 
                    right: { xs: -15, md: 20 }, 
                    opacity: 0.15, 
                    transform: 'rotate(15deg)',
                    display: { xs: 'none', md: 'block' }
                  }}>
                    <Memory sx={{ fontSize: 120, color: 'white' }} />
                  </Box>
                  
                  <Box sx={{ 
                    position: 'absolute', 
                    bottom: -30, 
                    left: { xs: -15, md: 50 }, 
                    opacity: 0.15,
                    transform: 'rotate(-10deg)',
                    display: { xs: 'none', md: 'block' }
                  }}>
                    <Architecture sx={{ fontSize: 100, color: 'white' }} />
                  </Box>
                  
                  <Typography 
                    variant="overline" 
                    sx={{ 
                      fontSize: '1rem', 
                      fontWeight: 500,
                      letterSpacing: 2,
                      opacity: 0.9,
                      mb: 1,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}
                  >
                    <ElectricBolt fontSize="small" /> KNOWLEDGE HUB
                  </Typography>
                  
                  <Typography 
                    variant="h2" 
                    component="h1" 
                    sx={{ 
                      fontWeight: 800,
                      fontSize: { xs: '2.5rem', md: '3.5rem' },
                      mb: 2,
                      lineHeight: 1.2,
                      background: 'linear-gradient(90deg, #ffffff 0%, #e1bee7 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Engineering Learning Resources
                  </Typography>
                  
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 400,
                      opacity: 0.9,
                      maxWidth: '700px',
                      mb: 4
                    }}
                  >
                    Explore our curated collection of high-quality resources to accelerate your learning in VLSI, digital design, and computer architecture.
                  </Typography>
                  
                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <Button 
                      variant="contained" 
                      color="secondary" 
                      size="large"
                      sx={{ 
                        borderRadius: 2,
                        fontWeight: 600,
                        px: 3,
                        py: 1,
                        textTransform: 'none'
                      }}
                      onClick={() => {
                        setTabValue(1);
                        document.getElementById('resources-section').scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      Featured Resources
                    </Button>
                    
                    <Button 
                      variant="outlined" 
                      color="inherit" 
                      size="large"
                      sx={{ 
                        borderRadius: 2,
                        fontWeight: 600,
                        px: 3,
                        py: 1,
                        textTransform: 'none',
                        borderColor: 'rgba(255,255,255,0.5)',
                        '&:hover': {
                          borderColor: 'white',
                          backgroundColor: 'rgba(255,255,255,0.1)'
                        }
                      }}
                      onClick={() => {
                        document.getElementById('resource-suggestion').scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      Suggest Resource
                    </Button>
                  </Box>
                </Box>
              </Fade>
            </Grid>
            
            <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Zoom in={true} style={{ transitionDelay: '300ms' }}>
                <Box
                  component="img"
                  src={process.env.PUBLIC_URL + '/images/resource-hero-image.png'}
                  alt="Learning resources"
                  sx={{
                    width: '100%',
                    maxWidth: '450px',
                    filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.2))',
                    transform: 'translateY(20px)'
                  }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                  }}
                />
              </Zoom>
            </Grid>
          </Grid>
          
          {/* Stats */}
          <Slide direction="up" in={true} style={{ transitionDelay: '500ms' }}>
            <Box sx={{ 
              display: 'flex',
              flexWrap: 'wrap',
              gap: { xs: 4, md: 8 },
              mt: 8,
              justifyContent: { xs: 'center', md: 'flex-start' },
              color: 'rgba(255,255,255,0.9)'
            }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                  {resources.length}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  Learning Resources
                </Typography>
              </Box>
              
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                  {resources.filter(r => r.featured).length}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  Featured Resources
                </Typography>
              </Box>
              
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                  {categories.length - 1}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  Categories
                </Typography>
              </Box>
              
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                  {resources.reduce((total, resource) => total + resource.tags.length, 0)}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  Topics & Tags
                </Typography>
              </Box>
            </Box>
          </Slide>
        </Container>
        
        {/* Wave shape divider */}
        <Box className="wave-shape">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none"
          >
            <path 
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            ></path>
          </svg>
        </Box>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 6 }} id="resources-section" className="resources-section">
        {/* Tabs */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap',
          mb: 4 
        }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            sx={{
              '& .MuiTabs-indicator': {
                height: 3,
                borderRadius: 3
              },
              '& .MuiTab-root': {
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 600,
                minWidth: { xs: 'auto', sm: 120 }
              }
            }}
          >
            <Tab label="All Resources" />
            <Tab label="Featured" />
            <Tab 
              label={
                <Badge 
                  badgeContent={bookmarkedResources.length} 
                  color="secondary"
                  sx={{ 
                    '& .MuiBadge-badge': { 
                      fontWeight: 'bold',
                      fontSize: '0.7rem'
                    }
                  }}
                >
                  Bookmarked
                </Badge>
              } 
            />
          </Tabs>

          <Box sx={{ display: 'flex', alignItems: 'center', mt: { xs: 2, sm: 0 } }}>
            <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
              Sort:
            </Typography>
            <TextField
              select
              size="small"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              sx={{ 
                minWidth: 130,
                '& .MuiSelect-select': {
                  py: 1
                }
              }}
            >
              {sortOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Box>

        {/* Search and Filters */}
        <Paper 
          elevation={2} 
          className="resources-filters"
          sx={{ 
            p: 3, 
            mb: 4, 
            borderRadius: 3,
            backgroundColor: 'white',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
          }}
        >
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  placeholder="Search resources by title, author, description or tags..."
                  variant="outlined"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search color="primary" />
                      </InputAdornment>
                    ),
                    sx: { 
                      borderRadius: 2,
                      pr: 1
                    }
                  }}
                />
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Box sx={{ 
                  position: 'relative',
                  height: '100%'
                }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="primary"
                    onClick={() => setVisibleFilterMenu(!visibleFilterMenu)}
                    sx={{ 
                      height: '100%',
                      justifyContent: 'space-between',
                      textTransform: 'none',
                      borderRadius: 2
                    }}
                    startIcon={<FilterAlt />}
                    endIcon={<ArrowForward sx={{ 
                      transform: visibleFilterMenu ? 'rotate(90deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease'
                    }} />}
                  >
                    Filter by category: {categoryFilter}
                  </Button>
                  
                  {visibleFilterMenu && (
                    <Paper
                      elevation={3}
                      sx={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        mt: 1,
                        p: 2,
                        zIndex: 10,
                        borderRadius: 2,
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 1
                      }}
                    >
                      {categories.map(category => (
                        <Chip
                          key={category}
                          label={category}
                          icon={category !== 'All' ? getCategoryIcon(category) : null}
                          onClick={() => {
                            setCategoryFilter(category);
                            setVisibleFilterMenu(false);
                          }}
                          className="category-chip"
                          sx={{ 
                            backgroundColor: categoryFilter === category ? 'primary.main' : 'rgba(0, 0, 0, 0.05)',
                            color: categoryFilter === category ? 'white' : 'text.primary',
                            fontWeight: categoryFilter === category ? 600 : 400,
                            '&:hover': {
                              backgroundColor: categoryFilter === category ? 'primary.dark' : 'rgba(0, 0, 0, 0.1)',
                            },
                            px: 1
                          }}
                        />
                      ))}
                    </Paper>
                  )}
                </Box>
              </Grid>
            </Grid>

            {/* Active Filters Display */}
            {(searchQuery || categoryFilter !== 'All') && (
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                flexWrap: 'wrap',
                gap: 1,
                mt: 2
              }}>
                <Typography variant="body2" color="text.secondary">
                  Active filters:
                </Typography>
                
                {searchQuery && (
                  <Chip
                    label={`Search: "${searchQuery}"`}
                    onDelete={() => setSearchQuery('')}
                    size="small"
                    sx={{ fontWeight: 500 }}
                  />
                )}
                
                {categoryFilter !== 'All' && (
                  <Chip
                    icon={getCategoryIcon(categoryFilter)}
                    label={categoryFilter}
                    onDelete={() => setCategoryFilter('All')}
                    size="small"
                    color="primary"
                    sx={{ fontWeight: 500 }}
                  />
                )}
                
                {(searchQuery || categoryFilter !== 'All') && (
                  <Button
                    size="small"
                    onClick={() => {
                      setSearchQuery('');
                      setCategoryFilter('All');
                    }}
                    sx={{ 
                      ml: 'auto',
                      textTransform: 'none'
                    }}
                  >
                    Clear all
                  </Button>
                )}
              </Box>
            )}
          </Box>
        </Paper>

        {/* Results Summary */}
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="text.secondary">
            Showing {filteredResources.length} of {resources.length} resources
            {categoryFilter !== 'All' && ` in ${categoryFilter}`}
            {tabValue === 1 && ' (Featured)'}
            {tabValue === 2 && ' (Bookmarked)'}
          </Typography>
        </Box>

        {/* Resource Grid */}
        {filteredResources.length > 0 ? (
          <Grid container spacing={3} sx={{ mb: 6 }}>
            {filteredResources.map(resource => renderResourceCard(resource))}
          </Grid>
        ) : (
          <Paper
            elevation={0}
            sx={{ 
              textAlign: 'center', 
              py: 8, 
              px: 3,
              borderRadius: 3,
              bgcolor: 'rgba(106, 13, 173, 0.04)',
              mb: 6
            }}
          >
            <Typography variant="h5" gutterBottom>No resources found matching your criteria</Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Try adjusting your search terms or filters to find what you're looking for
            </Typography>
            <Button 
              variant="outlined" 
              color="primary" 
              onClick={() => {
                setSearchQuery('');
                setCategoryFilter('All');
                setTabValue(0);
              }}
              sx={{ 
                mt: 2,
                borderRadius: 2,
                textTransform: 'none'
              }}
            >
              Reset all filters
            </Button>
          </Paper>
        )}

        {/* Resource Submission */}
        <Paper 
          id="resource-suggestion"
          className="resources-suggestion"
          sx={{ 
            p: { xs: 3, md: 6 }, 
            mb: 4, 
            borderRadius: 3,
            background: 'linear-gradient(135deg, rgba(156, 39, 176, 0.08) 0%, rgba(106, 27, 154, 0.16) 100%)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Grid container spacing={4} sx={{ position: 'relative', zIndex: 2 }}>
            <Grid item xs={12} md={8}>
              <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
                Suggest a Resource
              </Typography>
              <Typography variant="body1" paragraph>
                Know of a great resource related to VLSI, digital design, or computer architecture that's not listed? Help our community grow by suggesting it for inclusion in our curated collection.
              </Typography>
              <Typography variant="body1" paragraph>
                We value high-quality resources that provide clear explanations, practical examples, and up-to-date information on relevant topics. Your contributions help make VeriGeek a comprehensive learning hub.
              </Typography>
              <Button 
                variant="contained" 
                color="primary"
                size="large"
                onClick={() => window.open('https://forms.gle/2HaiM9RCd7HbpPmJ7', '_blank')}
                sx={{ 
                  mt: 2,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                  px: 4
                }}
              >
                Submit Resource
              </Button>
            </Grid>
            
            <Grid 
              item 
              xs={12} 
              md={4} 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: { xs: 'center', md: 'flex-end' } 
              }}
            >
              <Box 
                sx={{ 
                  width: 180,
                  height: 180, 
                  backgroundImage: `url("${process.env.PUBLIC_URL}/images/BACKGROUNDLESS_LOGO.png")`,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  opacity: 0.9
                }}
                aria-label="VeriGeek Logo"
              />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default Resources; 