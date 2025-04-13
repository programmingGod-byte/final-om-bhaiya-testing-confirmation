import React, { useState, useEffect, useCallback } from 'react';
import { 
  Box, Typography, Container, Grid, TextField, MenuItem, 
  FormControl, InputLabel, Select, Card, CardContent, CardMedia, 
  Chip, Button, CircularProgress, InputAdornment, Divider,
  IconButton, Snackbar, Alert, Tooltip, Paper, ToggleButton,
  ToggleButtonGroup, Fade, Zoom, Stack, Pagination
} from '@mui/material';
import { 
  Search, ArrowForward, Refresh, Bookmark, BookmarkBorder,
  Share, FiberNew, FilterAlt, ElectricBolt, Memory, Code, Explore, RssFeed
} from '@mui/icons-material';
import '../styles/Blog.css';

const Blog = () => {
  // State
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 9;
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info'
  });
  const [bookmarkedPosts, setBookmarkedPosts] = useState(() => {
    const saved = localStorage.getItem('blogBookmarks');
    return saved ? JSON.parse(saved) : [];
  });
  
  // Mock categories based on the blog-fetcher.js file
  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'vlsi', label: 'VLSI' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'diy-electronics', label: 'DIY Electronics' },
    { value: 'electrical-engineering', label: 'Electrical Engineering' },
    { value: 'electronics-design', label: 'Electronics Design' },
    { value: 'fpga', label: 'FPGA' }
  ];
  
  // Fetch blogs function
  const fetchBlogs = useCallback(() => {
    setLoading(true);
    setError(null);
    
    // In a real app, this would be an API call
    // For demo, we simulate network delay
    setTimeout(() => {
      try {
        const mockBlogs = [
          // VLSI blogs
          {
            id: 1,
            title: 'An Introduction to RISC-V Architecture',
            link: 'https://riscv.org/technical/specifications/',
            pubDate: '2023-10-15T10:30:00Z',
            source: 'IEEE Spectrum',
            category: 'VLSI',
            description: 'RISC-V is an open-source hardware instruction set architecture (ISA) based on established reduced instruction set computer (RISC) principles.',
            image: 'https://tse2.mm.bing.net/th?id=OIP.L9UGTbq3m8yaLCyWvLGgfAHaEU&pid=Api&P=0&h=180'
          },
          {
            id: 6,
            title: 'SystemVerilog for FPGA Design Verification',
            link: 'https://www.intel.com/content/www/us/en/docs/programmable/683671/current/systemverilog-support.html',
            pubDate: '2023-11-02T13:45:00Z',
            source: 'IEEE Spectrum',
            category: 'VLSI',
            description: 'SystemVerilog offers powerful features for FPGA design verification, helping engineers ensure correct functionality before hardware implementation.',
            image: 'https://tse3.mm.bing.net/th?id=OIP.EgPsTipFoMIIu77aDfj_mgHaEa&pid=Api&P=0&h=180'
          },
          {
            id: 10,
            title: 'Next-Generation Silicon Photonics',
            link: 'https://www.intel.com/content/www/us/en/architecture-and-technology/silicon-photonics/silicon-photonics-overview.html',
            pubDate: '2023-11-08T08:10:00Z',
            source: 'IEEE Spectrum',
            category: 'VLSI',
            description: 'Silicon photonics is revolutionizing data center interconnects and promises to enable new architectures for optical computing.',
            image: 'https://tse4.mm.bing.net/th?id=OIP.dHU7N0K9osbYg2DjRhTuawAAAA&pid=Api&P=0&h=180'
          },
          {
            id: 12,
            title: 'Advances in EDA Tools for Advanced Node Designs',
            link: 'https://www.cadence.com/en_US/home/tools/custom-ic-analog-rf-design.html',
            pubDate: new Date(Date.now() - 5400000).toISOString(), // 1.5 hours ago
            source: 'Semiconductor Engineering',
            category: 'VLSI',
            description: 'Electronic Design Automation tools are evolving to address the complexities of designing for 3nm and below process nodes.',
            image: 'https://tse3.mm.bing.net/th?id=OIP.4JPZWCwrjSlBtY0P9rVwsAHaEK&pid=Api&P=0&h=180',
            isNew: true
          },
          {
            id: 13,
            title: 'Understanding FinFET Technology',
            link: 'https://www.synopsys.com/glossary/what-is-finfet.html',
            pubDate: '2023-11-14T09:15:00Z',
            source: 'Synopsys Blog',
            category: 'VLSI',
            description: 'FinFET technology has revolutionized transistor design, offering better performance and lower power consumption for modern semiconductor devices.',
            image: 'https://tse4.mm.bing.net/th?id=OIP.X37fwrrZlZNrVOI4h5uPpgHaEI&pid=Api&P=0&h=180'
          },
          {
            id: 14,
            title: 'The Impact of Quantum Computing on VLSI Design',
            link: 'https://spectrum.ieee.org/quantum-computing',
            pubDate: '2023-11-04T11:30:00Z',
            source: 'IEEE Spectrum',
            category: 'VLSI',
            description: 'Quantum computing is poised to transform VLSI design methodologies, introducing new paradigms for circuit simulation and verification.',
            image: 'https://tse3.mm.bing.net/th?id=OIP.Kz5EmGV3JiGU8zwp3isIOQHaEP&pid=Api&P=0&h=180'
          },
          
          // FPGA blogs
          {
            id: 2,
            title: 'The Future of FPGAs in Edge Computing',
            link: 'https://www.eetimes.com/lattice-targets-low-power-edge-ai-with-new-small-fpga/',
            pubDate: '2023-09-22T14:20:00Z',
            source: 'EE Times',
            category: 'FPGA',
            description: 'As edge computing continues to grow, FPGAs are becoming increasingly important for real-time processing and low-latency applications.',
            image: 'https://tse1.mm.bing.net/th?id=OIP.73i22c7Jmu2Z26caAhrfhgHaEq&pid=Api&P=0&h=180'
          },
          {
            id: 7,
            title: 'Exploring the AMD Acquisition of Xilinx',
            link: 'https://www.amd.com/en/corporate/xilinx-acquisition',
            pubDate: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
            source: 'EE Times',
            category: 'FPGA',
            description: 'AMD\'s acquisition of Xilinx creates a powerhouse in the FPGA market, with implications for product roadmaps and competitive landscape.',
            image: 'https://tse3.mm.bing.net/th?id=OIP.zSmanO1kM358s9T6bXtqhwHaEK&pid=Api&P=0&h=180',
            isNew: true
          },
          {
            id: 15,
            title: 'High-Level Synthesis for FPGAs',
            link: 'https://www.xilinx.com/products/design-tools/vitis/vitis-hls.html',
            pubDate: '2023-10-18T13:40:00Z',
            source: 'FPGA Journal',
            category: 'FPGA',
            description: 'High-Level Synthesis tools are changing how engineers approach FPGA design, enabling C/C++ code to be directly implemented in hardware.',
            image: 'https://tse3.mm.bing.net/th?id=OIP.oGO7TgQn74v45BoZtmwC7QHaE8&pid=Api&P=0&h=180'
          },
          {
            id: 16,
            title: 'Partial Reconfiguration Techniques in Modern FPGAs',
            link: 'https://www.intel.com/content/www/us/en/programmable/documentation/lat1578341945488.html',
            pubDate: '2023-11-07T10:25:00Z',
            source: 'Intel FPGA',
            category: 'FPGA',
            description: 'Partial reconfiguration allows portions of an FPGA to be reconfigured while the rest of the device continues to operate, enabling dynamic system adaptation.',
            image: 'https://tse2.mm.bing.net/th?id=OIP.5ZNwCog-DOqEX_pf4OYIOQHaFC&pid=Api&P=0&h=180'
          },
          {
            id: 17,
            title: 'FPGA Security Considerations',
            link: 'https://www.design-reuse.com/articles/48257/fpga-security.html',
            pubDate: '2023-10-22T09:30:00Z',
            source: 'Design & Reuse',
            category: 'FPGA',
            description: 'As FPGAs become more prevalent in critical infrastructure, understanding and implementing robust security measures is essential for system integrity.',
            image: 'https://tse1.mm.bing.net/th?id=OIP.nDepN5kschboP1d716U8CgHaE8&pid=Api&P=0&h=180'
          },
          
          // DIY Electronics blogs
          {
            id: 3,
            title: 'Build Your Own Logic Analyzer with Raspberry Pi',
            link: 'https://r.search.yahoo.com/_ylt=Awr1TVHOVPJnCQIA84S7HAx.;_ylu=Y29sbwNzZzMEcG9zAzYEdnRpZAMEc2VjA3Ny/RV=2/RE=1745144271/RO=10/RU=https%3a%2f%2fhackaday.com%2f2023%2f08%2f31%2flogic-analyzers-tapping-into-raspberry-pi-secrets%2f/RK=2/RS=x8zMOc_50N4Ad39peNRnZgZraDg-',
            pubDate: '2023-11-05T08:40:00Z',
            source: 'Hackaday',
            category: 'DIY Electronics',
            description: 'Learn how to build a cost-effective logic analyzer using Raspberry Pi and some basic components to debug your digital circuits.',
            image: 'https://tse2.mm.bing.net/th?id=OIP.DZe6p211sJOBGJEojRttWgHaE7&pid=Api&P=0&h=180'
          },
          {
            id: 11,
            title: 'Building a Retro Computing Platform with Modern FPGAs',
            link: 'https://github.com/MiSTer-devel/Main_MiSTer/wiki',
            pubDate: '2023-10-25T16:40:00Z',
            source: 'Hackaday',
            category: 'DIY Electronics',
            description: 'Learn how to recreate vintage computer architectures using modern FPGA development boards for a blend of nostalgia and cutting-edge technology.',
            image: 'https://cdna.artstation.com/p/assets/images/images/018/894/572/large/gil-monteiro-1.jpg?1561133409'
          },
          {
            id: 18,
            title: 'Arduino-Based Spectrum Analyzer',
            link: 'https://create.arduino.cc/projecthub/mircemk/diy-audio-spectrum-analyzer-with-rgb-led-strip-71bc1e',
            pubDate: '2023-11-10T14:20:00Z',
            source: 'Arduino Project Hub',
            category: 'DIY Electronics',
            description: 'Create your own audio spectrum analyzer with RGB LED visualization using an Arduino and a few common electronic components.',
            image: 'https://tse2.mm.bing.net/th?id=OIP.Mu8n68KvboW76Jrt3vf5aAHaEK&pid=Api&P=0&h=180'
          },
          {
            id: 19,
            title: 'DIY Electronic Load for Testing Power Supplies',
            link: 'https://hackaday.io/project/180636-diy-electronic-load',
            pubDate: '2023-10-12T11:15:00Z',
            source: 'Hackaday.io',
            category: 'DIY Electronics',
            description: 'Build a versatile electronic load capable of testing power supplies, batteries, and other current sources with adjustable parameters.',
            image: 'https://tse3.mm.bing.net/th?id=OIP.psdp6S53gwaa2nq6rboaxAHaFc&pid=Api&P=0&h=180'
          },
          {
            id: 20,
            title: 'ESP32 Weather Station with E-Ink Display',
            link: 'https://randomnerdtutorials.com/esp32-esp8266-e-paper-display-spi/',
            pubDate: '2023-11-02T15:45:00Z',
            source: 'Random Nerd Tutorials',
            category: 'DIY Electronics',
            description: 'Create a low-power weather station using an ESP32 microcontroller and an e-ink display that can run for months on a single battery charge.',
            image: 'https://tse1.mm.bing.net/th?id=OIP.SzIvTmvLM7csgsuN4KcGCgHaEu&pid=Api&P=0&h=180'
          },
          
          // Electrical Engineering blogs
          {
            id: 4,
            title: 'Understanding Power Integrity in PCB Design',
            link: 'https://www.intel.com/content/www/us/en/developer/articles/technical/power-delivery-for-intel-xeon-phi-processor.html',
            pubDate: '2023-10-30T11:15:00Z',
            source: 'All About Circuits',
            category: 'Electrical Engineering',
            description: 'Power integrity is a critical aspect of PCB design that ensures your circuit receives clean and stable power, essential for reliable operation.',
            image: 'https://tse1.mm.bing.net/th?id=OIP.vsCLQJ03vliSTnK91wrI1wHaEo&pid=Api&P=0&h=180'
          },
          {
            id: 21,
            title: 'Thermal Management in High-Power Electronics',
            link: 'https://www.electronics-cooling.com/2017/07/thermal-management-high-power-electronics/',
            pubDate: '2023-10-14T09:20:00Z',
            source: 'Electronics Cooling',
            category: 'Electrical Engineering',
            description: 'Effective thermal management is crucial for high-power electronic systems to ensure reliability and performance over their operational lifetime.',
            image: 'https://tse2.mm.bing.net/th?id=OIP.KoBBf9r8NYHLSP-nCGS8OQAAAA&pid=Api&P=0&h=180'
          },
          {
            id: 22,
            title: 'Signal Integrity Analysis for High-Speed Interfaces',
            link: 'https://www.keysight.com/us/en/assets/7018-03406/application-notes/5989-5699.pdf',
            pubDate: '2023-11-09T14:30:00Z',
            source: 'Keysight Technologies',
            category: 'Electrical Engineering',
            description: 'High-speed digital interfaces require careful signal integrity analysis to ensure reliable data transmission across PCB traces and connectors.',
            image: 'https://tse3.mm.bing.net/th?id=OIP.SDihwWZT1nmtETJm7ZS0PQHaEK&pid=Api&P=0&h=180'
          },
          {
            id: 23,
            title: 'EMC/EMI Design Considerations for Electronic Products',
            link: 'https://incompliancemag.com/article/emc-design-fundamentals/',
            pubDate: '2023-10-28T12:45:00Z',
            source: 'In Compliance Magazine',
            category: 'Electrical Engineering',
            description: 'Electromagnetic compatibility (EMC) and interference (EMI) are critical design considerations for ensuring electronic products meet regulatory requirements.',
            image: 'https://tse1.mm.bing.net/th?id=OIP.mEEh6Aruk3y6XTm2unMSSwAAAA&pid=Api&P=0&h=180'
          },
          {
            id: 24,
            title: 'Battery Management Systems for Electric Vehicles',
            link: 'https://www.ti.com/applications/automotive/hev-ev-powertrain/battery-management-system.html',
            pubDate: '2023-11-01T10:10:00Z',
            source: 'Texas Instruments',
            category: 'Electrical Engineering',
            description: 'Battery management systems (BMS) are essential for monitoring and controlling the state of lithium-ion battery packs in electric vehicles.',
            image: 'https://tse3.mm.bing.net/th?id=OIP.T-YbKFRTsw2dJhmNA-dX7gHaEv&pid=Api&P=0&h=180'
          },
          
          // Electronics Design blogs
          {
            id: 5,
            title: 'Advances in Analog-to-Digital Converters',
            link: 'https://www.analog.com/en/products/analog-to-digital-converters.html',
            pubDate: '2023-11-10T09:30:00Z',
            source: 'EDN Network',
            category: 'Electronics Design',
            description: 'Explore the latest innovations in ADC technology, including improved resolution, lower power consumption, and higher sampling rates.',
            image: 'https://tse2.mm.bing.net/th?id=OIP.XS5ZfOwso2I_U1W3Fwg-bQHaEK&pid=Api&P=0&h=180'
          },
          {
            id: 8,
            title: 'The Evolution of PCB Design Software',
            link: 'https://www.altium.com/solution/pcb-design-software',
            pubDate: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
            source: 'All About Circuits',
            category: 'Electronics Design',
            description: 'Modern PCB design software has evolved to include advanced features like simulation, collaborative workflows, and AI-powered routing assistance.',
            image: 'https://tse4.mm.bing.net/th?id=OIP.PVcV78klISs55AZ3i6mfJQHaE4&pid=Api&P=0&h=180',
            isNew: true
          },
          {
            id: 25,
            title: 'Designing Mixed-Signal Circuits for IoT Applications',
            link: 'https://www.maximintegrated.com/en/design/technical-documents/tutorials/7/7279.html',
            pubDate: '2023-11-05T11:20:00Z',
            source: 'Maxim Integrated',
            category: 'Electronics Design',
            description: 'IoT devices require optimized mixed-signal circuits to balance power consumption, performance, and connectivity requirements.',
            image: 'https://tse2.mm.bing.net/th?id=OIP.pBWPzXxQYnKmfSDW6WxsPgHaEc&pid=Api&P=0&h=180'
          },
          {
            id: 26,
            title: 'Low-Power Design Techniques for Wearable Electronics',
            link: 'https://www.eetimes.com/techniques-for-reducing-power-consumption-in-wearable-electronics/',
            pubDate: '2023-10-19T14:15:00Z',
            source: 'EE Times',
            category: 'Electronics Design',
            description: 'Wearable electronic devices demand ultra-low power consumption while maintaining functionality, requiring specialized design approaches.',
            image: 'https://tse1.mm.bing.net/th?id=OIP.K7qsJ3JxIIKIijC7fY9rPwHaEK&pid=Api&P=0&h=180'
          },
          {
            id: 27,
            title: 'RF Circuit Design Considerations for 5G Applications',
            link: 'https://www.keysight.com/us/en/assets/7018-06235/white-papers/5992-3309.pdf',
            pubDate: '2023-10-27T09:45:00Z',
            source: 'Keysight Technologies',
            category: 'Electronics Design',
            description: 'Designing RF circuits for 5G applications presents unique challenges in terms of bandwidth, power efficiency, and signal integrity.',
            image: 'https://tse3.mm.bing.net/th?id=OIP.azYQ1fw7-YNIaAiK__RL1gHaFf&pid=Api&P=0&h=180'
          },
          
          // Electronics blogs
          {
            id: 9,
            title: 'Embedded Machine Learning on Microcontrollers',
            link: 'https://www.tensorflow.org/lite/microcontrollers',
            pubDate: '2023-11-12T15:20:00Z',
            source: 'Embedded.com',
            category: 'Electronics',
            description: 'Implementing ML on microcontrollers opens new possibilities for edge computing with minimal power consumption and small form factors.',
            image: 'https://tse3.mm.bing.net/th?id=OIP.Rd7-fYT4aSZH8BiVg1LPJQHaEK&pid=Api&P=0&h=180'
          },
          {
            id: 28,
            title: 'The Role of GaN Semiconductors in Power Electronics',
            link: 'https://www.powerelectronicsnews.com/gallium-nitride-gan-the-future-of-power-semiconductors/',
            pubDate: '2023-11-08T10:45:00Z',
            source: 'Power Electronics News',
            category: 'Electronics',
            description: 'Gallium Nitride (GaN) semiconductors are transforming power electronics with higher efficiency and smaller form factors compared to silicon alternatives.',
            image: 'https://tse1.mm.bing.net/th?id=OIP.OhcY9wRYablTK5m5mLFxYgHaFS&pid=Api&P=0&h=180'
          },
          {
            id: 29,
            title: 'Open Hardware Platforms for Electronics Prototyping',
            link: 'https://www.openhardware.io/',
            pubDate: '2023-10-20T13:45:00Z',
            source: 'Open Hardware IO',
            category: 'Electronics',
            description: 'Open hardware platforms provide accessible resources for electronics prototyping, fostering innovation and collaboration in the maker community.',
            image: 'https://tse3.mm.bing.net/th?id=OIP.w4TbSxghBH67Ct8e7cnZXQHaEo&pid=Api&P=0&h=180'
          },
          {
            id: 30,
            title: 'Energy Harvesting Technologies for IoT Devices',
            link: 'https://www.mouser.com/applications/energy-harvesting-for-iot/',
            pubDate: '2023-11-03T09:15:00Z',
            source: 'Mouser Electronics',
            category: 'Electronics',
            description: 'Energy harvesting technologies enable IoT devices to operate without batteries by capturing energy from ambient sources like light, vibration, or heat.',
            image: 'https://tse2.mm.bing.net/th?id=OIP.Ov3nBvQBzNCl2MsES_rk1gHaEK&pid=Api&P=0&h=180'
          },
          {
            id: 31,
            title: 'Flexible and Printed Electronics Applications',
            link: 'https://www.idtechex.com/en/reports/printed-and-flexible-electronics/1',
            pubDate: '2023-10-31T11:30:00Z',
            source: 'IDTechEx',
            category: 'Electronics',
            description: 'Flexible and printed electronics enable new form factors and applications, from wearable sensors to rollable displays and smart packaging.',
            image: 'https://tse4.mm.bing.net/th?id=OIP.8K8FjZN_BBWiJzIZm4gESwHaEc&pid=Api&P=0&h=180'
          }
        ];
        
        setBlogs(mockBlogs);
        setFilteredBlogs(searchTerm || category !== 'all' 
          ? filterBlogs(mockBlogs, searchTerm, category)
          : mockBlogs);
        
        setLastUpdated(new Date());
        setLoading(false);
        
        // Reset to page 1 when filter changes
        setCurrentPage(1);
        
        // Schedule next periodic check (in a real app)
        // This simulates the app checking for new content periodically
        const timer = setTimeout(() => {
          // In a real app, this would do an actual check for new content
          // For demo, we just show a snackbar occasionally
          if (Math.random() > 0.7) { // Occasionally show update notification
            setSnackbar({
              open: true,
              message: 'New blog posts are available',
              severity: 'info'
            });
          }
        }, 60000); // Check every minute
        
        return () => clearTimeout(timer);
      } catch (err) {
        setError('Failed to load blog posts. Please try again later.');
        setLoading(false);
      }
    }, [searchTerm, category]);
  }, [searchTerm, category]);
  
  // Initial fetch
  useEffect(() => {
    fetchBlogs();
    
    // Save bookmarks to localStorage when they change
    localStorage.setItem('blogBookmarks', JSON.stringify(bookmarkedPosts));
  }, [fetchBlogs, bookmarkedPosts]);
  
  // Handle manual refresh
  const handleRefresh = () => {
    setRefreshing(true);
    
    // Simulate fetching new data
    setTimeout(() => {
      fetchBlogs();
      setRefreshing(false);
      setSnackbar({
        open: true,
        message: 'Blog feed updated successfully',
        severity: 'success'
      });
    }, 1000);
  };
  
  // Handle category change
  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory);
    
    setFilteredBlogs(filterBlogs(blogs, searchTerm, selectedCategory));
  };
  
  // Handle search
  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    
    setFilteredBlogs(filterBlogs(blogs, term, category));
  };
  
  // Helper function to filter blogs by search term and category
  const filterBlogs = (blogsToFilter, term, selectedCategory) => {
    let filtered = [...blogsToFilter];
    
    // Filter by category if not 'all'
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(blog => 
        blog.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    
    // Filter by search term if provided
    if (term) {
      const searchTermLower = term.toLowerCase();
      filtered = filtered.filter(blog => 
        blog.title.toLowerCase().includes(searchTermLower) || 
        blog.description.toLowerCase().includes(searchTermLower) ||
        blog.source.toLowerCase().includes(searchTermLower) ||
        blog.category.toLowerCase().includes(searchTermLower)
      );
    }
    
    return filtered;
  };
  
  // Toggle bookmark for a blog post
  const toggleBookmark = (blogId) => {
    if (bookmarkedPosts.includes(blogId)) {
      setBookmarkedPosts(bookmarkedPosts.filter(id => id !== blogId));
      setSnackbar({
        open: true,
        message: 'Removed from bookmarks',
        severity: 'info'
      });
    } else {
      setBookmarkedPosts([...bookmarkedPosts, blogId]);
      setSnackbar({
        open: true,
        message: 'Added to bookmarks',
        severity: 'success'
      });
    }
  };
  
  // Share blog post
  const shareBlogPost = (blog) => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.description,
        url: blog.link
      })
      .then(() => {
        setSnackbar({
          open: true,
          message: 'Shared successfully',
          severity: 'success'
        });
      })
      .catch((error) => {
        console.error('Error sharing:', error);
      });
    } else {
      // Fallback - copy link to clipboard
      navigator.clipboard.writeText(blog.link).then(
        () => {
          setSnackbar({
            open: true,
            message: 'Link copied to clipboard',
            severity: 'success'
          });
        },
        () => {
          setSnackbar({
            open: true,
            message: 'Failed to copy link',
            severity: 'error'
          });
        }
      );
    }
  };
  
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.round(diffMs / 60000);
    const diffHours = Math.round(diffMs / 3600000);
    
    if (diffMins < 60) {
      return diffMins <= 1 ? 'Just now' : `${diffMins} mins ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };
  
  // Format last updated time
  const formatLastUpdated = () => {
    return lastUpdated.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Truncate text to specified length
  const truncateText = (text, maxLength) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };
  
  // Close snackbar
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar({ ...snackbar, open: false });
  };
  
  // Handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    // Scroll to top of blog content
    document.querySelector('.blog-content').scrollIntoView({ behavior: 'smooth' });
  };
  
  // Get current blogs for pagination
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  
  return (
    <Box className="blog-page">
      {/* Blog Header Section - Enhanced */}
      <Box className="blog-header">
        <Container maxWidth="lg">
          <Box sx={{ position: 'relative', zIndex: 2, py: 4 }}>
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
              <Code sx={{ fontSize: 100, color: 'white' }} />
            </Box>

            {/* Main heading with animation */}
            <Fade in={true} timeout={1000}>
              <Box sx={{ mb: 3 }}>
                <Typography 
                  variant="overline" 
                  sx={{ 
                    color: 'rgba(255,255,255,0.9)', 
                    letterSpacing: 3, 
                    fontWeight: 500,
                    fontSize: '0.95rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    mb: 1
                  }}
                >
                  <ElectricBolt fontSize="small" /> LATEST TECH INSIGHTS
                </Typography>
                <Typography 
                  variant="h2" 
                  component="h1" 
                  sx={{ 
                    fontWeight: 800, 
                    letterSpacing: -0.5,
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    lineHeight: 1.1,
                    background: 'linear-gradient(90deg, #ffffff 0%, #e1bee7 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 3
                  }}
                >
                  Engineering <br />
                  Knowledge Hub
                </Typography>
              </Box>
            </Fade>

            {/* Subheading with animation */}
            <Fade in={true} timeout={1500} style={{ transitionDelay: '300ms' }}>
              <Box>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    maxWidth: '700px',
                    fontWeight: 400,
                    fontSize: { xs: '1rem', md: '1.25rem' },
                    lineHeight: 1.5,
                    color: 'rgba(255,255,255,0.85)'
                  }}
                >
                  Explore curated insights from the world of VLSI design, FPGAs, and electronic systems. 
                  Stay at the forefront of technological innovation with our expert-driven content.
                </Typography>

                {/* Quick stats */}
                <Stack 
                  direction="row" 
                  spacing={3} 
                  sx={{ 
                    mt: 4, 
                    display: { xs: 'none', sm: 'flex' },
                    color: 'rgba(255,255,255,0.8)'
                  }}
                  divider={<Divider orientation="vertical" flexItem sx={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />}
                >
                  <Box>
                    <Typography variant="h5" fontWeight="bold" sx={{ color: '#e1bee7' }}>
                      {blogs.length}+
                    </Typography>
                    <Typography variant="body2">Articles</Typography>
                  </Box>
                  <Box>
                    <Typography variant="h5" fontWeight="bold" sx={{ color: '#e1bee7' }}>
                      {categories.length - 1}
                    </Typography>
                    <Typography variant="body2">Categories</Typography>
                  </Box>
                  <Box>
                    <Typography variant="h5" fontWeight="bold" sx={{ color: '#e1bee7' }}>
                      Weekly
                    </Typography>
                    <Typography variant="body2">Updates</Typography>
                  </Box>
                </Stack>
              </Box>
            </Fade>
          </Box>

          {/* Updated Blog Controls */}
          <Zoom in={true} style={{ transitionDelay: '600ms' }}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 3, 
                mt: 5, 
                borderRadius: 3,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
                transform: 'translateY(20px)'
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search for articles, topics, or keywords..."
                    value={searchTerm}
                    onChange={handleSearch}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search color="primary" />
                        </InputAdornment>
                      ),
                      sx: { 
                        borderRadius: 2,
                        backgroundColor: '#f5f5f5',
                        '&:hover': {
                          backgroundColor: '#ffffff',
                          boxShadow: '0 0 0 2px #e1bee7'
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'transparent'
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#9c27b0'
                        },
                        transition: 'all 0.3s ease'
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: { xs: 'stretch', sm: 'center' },
                    justifyContent: 'space-between',
                    gap: 2
                  }}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      gap: 1
                    }}>
                      <FilterAlt color="primary" fontSize="small" />
                      <Typography variant="subtitle2" fontWeight="bold">
                        Filter by category:
                      </Typography>
                    </Box>
                    <ToggleButtonGroup
                      value={category}
                      exclusive
                      onChange={(e, newCategory) => {
                        if (newCategory !== null) {
                          handleCategoryChange({ target: { value: newCategory } });
                        }
                      }}
                      aria-label="category filter"
                      sx={{ 
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        '& .MuiToggleButtonGroup-grouped': {
                          m: 0.5,
                          borderRadius: '16px !important',
                          border: '1px solid #e0e0e0 !important',
                          '&.Mui-selected': {
                            backgroundColor: '#9c27b0',
                            color: 'white',
                            '&:hover': {
                              backgroundColor: '#7b1fa2',
                            }
                          }
                        }
                      }}
                    >
                      {categories.map((option) => (
                        <ToggleButton 
                          key={option.value} 
                          value={option.value}
                          sx={{ 
                            px: 2, 
                            py: 0.5, 
                            textTransform: 'none',
                            fontSize: '0.875rem',
                            transition: 'all 0.2s ease',
                            backgroundColor: 'white'
                          }}
                        >
                          {option.label}
                        </ToggleButton>
                      ))}
                    </ToggleButtonGroup>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Zoom>
        </Container>
      </Box>

      {/* Blog Content Section */}
      <Box className="blog-content" sx={{ py: 6, bgcolor: '#f5f5f5' }}>
        <Container maxWidth="lg">
          {/* Last updated info and refresh button */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Last updated: {formatLastUpdated()} • {filteredBlogs.length} articles
            </Typography>
            <Tooltip title="Refresh content">
              <IconButton 
                onClick={handleRefresh} 
                disabled={loading || refreshing}
                color="primary"
              >
                <Refresh />
              </IconButton>
            </Tooltip>
          </Box>
          
          {/* Loading Indicator */}
          {loading ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 8 }}>
              <CircularProgress color="primary" size={60} thickness={4} />
              <Typography variant="body1" sx={{ mt: 2 }}>
                Fetching the latest articles...
              </Typography>
            </Box>
          ) : error ? (
            <Box className="error-message" sx={{ p: 3, bgcolor: '#fee', borderRadius: 2 }}>
              <Typography color="error">{error}</Typography>
              <Button 
                variant="outlined" 
                color="primary" 
                sx={{ mt: 2 }}
                onClick={handleRefresh}
              >
                Try Again
              </Button>
            </Box>
          ) : filteredBlogs.length === 0 ? (
            <Box className="no-results" sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6">No blogs found matching your criteria</Typography>
              <Button 
                variant="outlined" 
                color="primary" 
                sx={{ mt: 2 }}
                onClick={() => {
                  setSearchTerm('');
                  setCategory('all');
                }}
              >
                Clear Filters
              </Button>
            </Box>
          ) : (
            <>
              <Grid container spacing={3} className="blog-grid">
                {currentBlogs.map((blog) => (
                  <Grid item xs={12} sm={6} md={4} key={blog.id}>
                    <Card className="blog-card" elevation={2} sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                      {blog.isNew && (
                        <Chip 
                          icon={<FiberNew />}
                          label="New" 
                          color="secondary"
                          size="small"
                          sx={{ 
                            position: 'absolute',
                            top: 10,
                            right: 10,
                            zIndex: 2,
                            fontWeight: 'bold'
                          }}
                        />
                      )}
                      {blog.image && (
                        <CardMedia
                          component="img"
                          height="180"
                          image={blog.image}
                          alt={blog.title}
                          onError={(e) => {
                            // If image fails to load, replace with default
                            e.target.onerror = null; // Prevent infinite loop
                            e.target.src = '/logo192.png'; // Fallback to React logo which should always be present
                          }}
                          sx={{
                            objectFit: 'cover',
                            background: 'linear-gradient(to right, #f5f5f5, #e0e0e0)'
                          }}
                        />
                      )}
                      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                        <Chip 
                          label={blog.category} 
                          size="small" 
                          sx={{ 
                            alignSelf: 'flex-start', 
                            mb: 1.5,
                            bgcolor: '#e1bee7',
                            color: '#6a1b9a',
                            fontWeight: 500
                          }} 
                        />
                        <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 500 }}>
                          <a 
                            href={blog.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{ color: 'inherit', textDecoration: 'none' }}
                          >
                            {blog.title}
                          </a>
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                          <Typography variant="caption" color="text.secondary">
                            {blog.source}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {formatDate(blog.pubDate)}
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary" paragraph sx={{ mb: 2 }}>
                          {truncateText(blog.description, 120)}
                        </Typography>
                        <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Button 
                            variant="text" 
                            color="primary" 
                            href={blog.link} 
                            target="_blank"
                            rel="noopener noreferrer"
                            endIcon={<ArrowForward />}
                            size="small"
                          >
                            Read More
                          </Button>
                          <Box>
                            <IconButton 
                              size="small" 
                              onClick={() => toggleBookmark(blog.id)}
                              color="primary"
                            >
                              {bookmarkedPosts.includes(blog.id) ? <Bookmark /> : <BookmarkBorder />}
                            </IconButton>
                            <IconButton 
                              size="small"
                              onClick={() => shareBlogPost(blog)}
                              color="primary"
                            >
                              <Share />
                            </IconButton>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                  <Pagination 
                    count={totalPages} 
                    page={currentPage} 
                    onChange={handlePageChange} 
                    color="primary"
                    size="large"
                    showFirstButton
                    showLastButton
                    sx={{
                      '& .MuiPaginationItem-root': {
                        fontSize: '1rem',
                      },
                      '& .Mui-selected': {
                        backgroundColor: 'rgba(156, 39, 176, 0.15) !important',
                        fontWeight: 'bold',
                      }
                    }}
                  />
                </Box>
              )}
            </>
          )}
        </Container>
      </Box>

      {/* Newsletter Section */}
      <Box className="newsletter" sx={{ bgcolor: '#9c27b0', color: 'white', py: 6 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Never Miss an Update
          </Typography>
          <Typography variant="body1" paragraph sx={{ mb: 4, maxWidth: '600px', mx: 'auto' }}>
            Subscribe to our newsletter for weekly curated content on VLSI, digital design, and more.
          </Typography>
          <Box 
            component="form" 
            sx={{ 
              display: 'flex', 
              maxWidth: '500px', 
              mx: 'auto',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 2, sm: 0 }
            }}
            onSubmit={(e) => {
              e.preventDefault();
              // Handle newsletter subscription
              setSnackbar({
                open: true,
                message: 'Newsletter subscription successful!',
                severity: 'success'
              });
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Your email address"
              type="email"
              required
              InputProps={{
                sx: { 
                  bgcolor: 'white', 
                  borderRadius: { xs: 1, sm: '4px 0 0 4px' },
                  '& fieldset': {
                    borderColor: 'white',
                    borderRight: { sm: 'none' }
                  }
                }
              }}
            />
            <Button 
              type="submit" 
              variant="contained" 
              sx={{ 
                bgcolor: '#6a1b9a', 
                borderRadius: { xs: 1, sm: '0 4px 4px 0' },
                '&:hover': { bgcolor: '#4a148c' },
                px: 3
              }}
            >
              Subscribe
            </Button>
          </Box>
        </Container>
      </Box>
      
      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Blog; 