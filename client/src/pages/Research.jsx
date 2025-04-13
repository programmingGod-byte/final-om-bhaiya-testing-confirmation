import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Container, Grid, Paper, Tabs, Tab, Card, CardContent,
  CardMedia, CardActions, Button, Chip, TextField, InputAdornment, MenuItem,
  IconButton, Divider, Badge, CircularProgress, Pagination
} from '@mui/material';
import {
  Search, FilterList, Bookmark, BookmarkBorder, Share, School,
  MenuBook, ScienceOutlined, ElectricBolt, Timer, Download, Link as LinkIcon,
  Architecture, ChevronRight, ArrowForward, FilterAlt, Article, CheckCircle
} from '@mui/icons-material';
import '../styles/Research.css';

const Research = () => {
  // State for filters and search
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sourceFilter, setSourceFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All');
  const [tabValue, setTabValue] = useState(0);
  const [bookmarkedPapers, setBookmarkedPapers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleFilterMenu, setVisibleFilterMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filteredPapers, setFilteredPapers] = useState([]);
  
  // Add state for newsletter subscription
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [subscribing, setSubscribing] = useState(false);

  // Categories for papers with icons
  const categoriesWithIcons = [
    { name: 'All', icon: <FilterList /> },
    { name: 'Verification', icon: <ScienceOutlined /> },
    { name: 'FPGA Design', icon: <Architecture /> },
    { name: 'Computer Architecture', icon: <Architecture /> },
    { name: 'Machine Learning Hardware', icon: <ElectricBolt /> },
    { name: 'Hardware Security', icon: <Article /> },
    { name: 'Low Power Design', icon: <ElectricBolt /> },
    { name: 'RISC-V', icon: <MenuBook /> }
  ];
  
  // Old categories list without icons (keeping for compatibility)
  const categories = categoriesWithIcons.map(cat => cat.name);
  
  // Sources for papers
  const sources = ['All', 'IEEE', 'Springer', 'ACM', 'arXiv', 'Elsevier'];
  
  // Date filters
  const dateFilters = [
    'All', 'Last Week', 'Last Month', 'Last 3 Months', 'Last Year', 'Last 5 Years'
  ];
  
  // Popular tags
  const popularTags = [
    'UVM', 'RISC-V', 'FPGA', 'SystemVerilog', 'Verification', 'Low Power',
    'Machine Learning', 'EDA Tools', 'RTL Design', 'Formal Verification',
    'Power Analysis', 'Hardware Security'
  ];
  
 
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
  
  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  // Handle category filter change
  const handleCategoryChange = (category) => {
    setCategoryFilter(category);
    setVisibleFilterMenu(false);
  };
  
  // Handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    // Scroll to top of research content
    document.querySelector('.research-section').scrollIntoView({ behavior: 'smooth' });
  };
  
  // Filter papers based on search and filters
  const getFilteredPapers = () => {
    let filtered = [...papers];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(paper => 
        paper.title.toLowerCase().includes(query) ||
        paper.abstract.toLowerCase().includes(query) ||
        paper.authors.toLowerCase().includes(query) ||
        paper.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Filter by category
    if (categoryFilter !== 'All') {
      filtered = filtered.filter(paper => paper.category === categoryFilter);
    }
    
    // Filter by source
    if (sourceFilter !== 'All') {
      filtered = filtered.filter(paper => paper.source === sourceFilter);
    }
    
    // Filter by tab
    if (tabValue === 1) {
      // Trending papers (most citations)
      filtered.sort((a, b) => b.citations - a.citations);
    } else if (tabValue === 2) {
      // Featured papers
      filtered = filtered.filter(paper => paper.featured);
    } else if (tabValue === 3) {
      // Bookmarked papers
      filtered = filtered.filter(paper => bookmarkedPapers.includes(paper.id));
    }
    
    return filtered;
  };
  
  // Use effect to handle loading state and filtering
  useEffect(() => {
    setLoading(true);
    
    // Simulate API delay
    const timer = setTimeout(() => {
      const results = getFilteredPapers();
      setFilteredPapers(results);
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [searchQuery, categoryFilter, sourceFilter, dateFilter, tabValue, bookmarkedPapers]);
  
  // Number of papers per page
  const papersPerPage = 6;
  
  // Calculate pagination
  const indexOfLastPaper = currentPage * papersPerPage;
  const indexOfFirstPaper = indexOfLastPaper - papersPerPage;
  const currentPapers = filteredPapers.slice(indexOfFirstPaper, indexOfLastPaper);
  const totalPages = Math.ceil(filteredPapers.length / papersPerPage);
  
  // Toggle bookmark for a paper
  const toggleBookmark = (paperId) => {
    setBookmarkedPapers(prev => {
      if (prev.includes(paperId)) {
        return prev.filter(id => id !== paperId);
      } else {
        return [...prev, paperId];
      }
    });
  };
  
  // Share paper
  const sharePaper = (paper) => {
    if (navigator.share) {
      navigator.share({
        title: paper.title,
        text: `Check out this research paper: ${paper.title} by ${paper.authors}`,
        url: paper.link
      }).catch(err => {
        console.error('Error sharing paper:', err);
      });
    } else {
      // Fallback - copy URL to clipboard
      navigator.clipboard.writeText(paper.link)
        .then(() => {
          alert('Link copied to clipboard!');
        })
        .catch(err => {
          console.error('Failed to copy link:', err);
        });
    }
  };
  
  // Get badge class based on source
  const getSourceBadgeClass = (source) => {
    switch(source) {
      case 'IEEE': return 'badge-ieee';
      case 'Springer': return 'badge-springer';
      case 'ACM': return 'badge-acm';
      case 'arXiv': return 'badge-arxiv';
      case 'Elsevier': return 'badge-elsevier';
      default: return '';
    }
  };

  // Get publisher logo by source
  const getPublisherLogo = (source) => {
    switch(source) {
      case 'IEEE': 
        return '/ieee.png';
      case 'Springer': 
        return '/SPRINGER.png';
      case 'ACM': 
        return '/ACM.png';
      case 'arXiv': 
        return '/OTHER.png';
      case 'Elsevier': 
        return '/OTHER.png';
      default: 
        return '/OTHER.png';
    }
  };
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Email validation function
  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  // Handle newsletter subscription
  const handleSubscribe = () => {
    // Reset error state
    setEmailError('');
    
    // Validate email
    if (!email) {
      setEmailError('Email is required');
      return;
    }
    
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    
    // Show loading state
    setSubscribing(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setSubscribing(false);
      setSubscribed(true);
      setEmail('');
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubscribed(false);
      }, 5000);
    }, 1500);
  };

  // Add a function to get category-specific images
  const getCategoryImage = (category) => {
    switch(category) {
      case 'Verification':
        return process.env.PUBLIC_URL + '/verification.jpg';
      case 'FPGA Design':
        return process.env.PUBLIC_URL + '/fpga.jpg';
      case 'Computer Architecture':
        return process.env.PUBLIC_URL + '/architecture.jpg';
      case 'Machine Learning Hardware':
        return process.env.PUBLIC_URL + '/ml-hardware.jpg';
      case 'Hardware Security':
        return process.env.PUBLIC_URL + '/security.jpg';
      case 'Low Power Design':
        return process.env.PUBLIC_URL + '/low-power.jpg';
      default:
        return process.env.PUBLIC_URL + '/default-paper.jpg';
    }
  };

  return (
    <Box className="research-page">
      {/* Hero Section */}
      <Box className="research-hero">
        <Container maxWidth="lg">
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={7}>
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
                  <ScienceOutlined sx={{ fontSize: 120, color: 'white' }} />
                </Box>
                
                <Box sx={{ 
                  position: 'absolute', 
                  bottom: -30, 
                  left: { xs: -15, md: 50 }, 
                  opacity: 0.15,
                  transform: 'rotate(-10deg)',
                  display: { xs: 'none', md: 'block' }
                }}>
                  <Article sx={{ fontSize: 100, color: 'white' }} />
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
                  <School fontSize="small" /> ACADEMIC RESEARCH
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
                  Research Papers
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
                  Explore cutting-edge academic research in VLSI design, verification, FPGA development and computer architecture from top institutions around the world.
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box
                component="img"
                src={process.env.PUBLIC_URL + '/images/research-hero.png'}
                alt="Research papers"
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
            </Grid>
          </Grid>
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
      <Container maxWidth="lg" sx={{ py: 6 }} id="research-section" className="research-section">
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
            <Tab label="All Papers" />
            <Tab label="Trending" />
            <Tab label="Featured" />
            <Tab 
              label={
                <Badge 
                  badgeContent={bookmarkedPapers.length || 0} 
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
        </Box>

        {/* Search and Filters */}
        <Paper 
          elevation={2} 
          className="research-filters"
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
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  placeholder="Search by title, author, or keywords..."
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
              
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  select
                  fullWidth
                  label="Source"
                  value={sourceFilter}
                  onChange={(e) => setSourceFilter(e.target.value)}
                >
                  {sources.map((source) => (
                    <MenuItem key={source} value={source}>
                      {source}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  select
                  fullWidth
                  label="Publication Date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                >
                  {dateFilters.map((filter) => (
                    <MenuItem key={filter} value={filter}>
                      {filter}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Box>
        </Paper>

        {/* Improved Category Filter - Horizontal Scrollable List */}
        <Paper
          elevation={3}
          sx={{
            p: 2,
            mb: 4,
            borderRadius: 3,
            backgroundColor: 'white',
            boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
            overflowX: 'auto',
            '&::-webkit-scrollbar': {
              height: '6px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(0,0,0,0.1)',
              borderRadius: '6px',
            }
          }}
          className="category-filter-container"
        >
          <Box
            sx={{
              display: 'flex',
              gap: 1.5,
              py: 0.5,
              minWidth: 'max-content'
            }}
          >
            {categoriesWithIcons.map((category) => (
              <Chip
                key={category.name}
                label={category.name}
                icon={category.icon}
                onClick={() => setCategoryFilter(category.name)}
                color={categoryFilter === category.name ? 'primary' : 'default'}
                variant={categoryFilter === category.name ? 'filled' : 'outlined'}
                className={`category-chip ${categoryFilter === category.name ? 'active' : ''}`}
                sx={{
                  fontSize: '0.875rem',
                  py: 2.5,
                  fontWeight: categoryFilter === category.name ? 600 : 400,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  },
                  boxShadow: categoryFilter === category.name ? '0 4px 8px rgba(0,0,0,0.15)' : 'none',
                  borderWidth: '1.5px',
                  borderColor: categoryFilter === category.name ? 'primary.main' : 'rgba(0,0,0,0.1)'
                }}
              />
            ))}
          </Box>
        </Paper>

        {/* Popular Tags */}
        <Box className="tag-cloud" sx={{ mb: 4 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mr: 2, pt: 0.5 }}>
            Popular Topics:
          </Typography>
          {popularTags.map(tag => (
            <Box
              key={tag}
              className="tag-item"
              onClick={() => {
                setSearchQuery(tag);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              {tag}
            </Box>
          ))}
        </Box>

        {/* Papers List */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress size={60} thickness={4} />
          </Box>
        ) : (
          <>
            {currentPapers.length > 0 ? (
              <Grid container spacing={3}>
                {currentPapers.map((paper) => (
                  <Grid item xs={12} sm={6} md={4} key={paper.id}>
                    <Card 
                      className="research-card" 
                      elevation={3} 
                      sx={{ 
                        height: '100%', 
                        display: 'flex', 
                        flexDirection: 'column',
                        borderRadius: 2,
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                        }
                      }}
                    >
                      <Box sx={{ position: 'relative' }}>
                        <CardMedia
                          component="img"
                          height="180"
                          image={getPublisherLogo(paper.source)}
                          alt={paper.title}
                          sx={{ 
                            objectFit: 'contain',
                            backgroundColor: '#f5f5f5',
                            padding: '20px'
                          }}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/OTHER.png';
                          }}
                        />
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            bgcolor: 'rgba(0,0,0,0.05)',
                            backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0.1) 0%, transparent 50%)',
                          }}
                        />
                        <Chip 
                          label={paper.source} 
                          size="small" 
                          className={`source-badge ${getSourceBadgeClass(paper.source)}`}
                          sx={{ 
                            position: 'absolute',
                            top: 12,
                            left: 12,
                            fontWeight: 600,
                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                          }}
                        />
                      </Box>
                      
                      <CardContent sx={{ flexGrow: 1, pt: 3, pb: 0, px: 3 }}>
                        <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600, lineHeight: 1.3 }}>
                          {paper.title}
                        </Typography>
                        
                        <Typography 
                          variant="body2" 
                          color="text.secondary" 
                          gutterBottom
                          sx={{ mb: 2, fontWeight: 500, display: 'flex', alignItems: 'center' }}
                        >
                          {paper.authors}
                        </Typography>
                        
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Timer fontSize="small" /> {formatDate(paper.publishDate)}
                        </Typography>
                        
                        <Typography 
                          variant="body2" 
                          paragraph
                          sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            mb: 1,
                            color: 'text.secondary'
                          }}
                        >
                          {paper.abstract}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                          {paper.tags.map(tag => (
                            <Chip 
                              key={tag} 
                              label={tag} 
                              size="small" 
                              variant="outlined"
                              sx={{ borderRadius: 1, fontSize: '0.75rem' }}
                              onClick={() => setSearchQuery(tag)}
                            />
                          ))}
                        </Box>
                      </CardContent>
                      
                      <CardActions sx={{ p: 2, pt: 0, px: 3 }}>
                        <Button 
                          variant="contained" 
                          color="primary" 
                          size="small" 
                          endIcon={<ChevronRight />}
                          href={paper.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{ 
                            textTransform: 'none',
                            borderRadius: 2,
                            mr: 1,
                            flexGrow: 1,
                            boxShadow: 'none',
                            '&:hover': {
                              boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                            }
                          }}
                        >
                          Read Paper
                        </Button>
                        
                        <IconButton 
                          size="small" 
                          color={bookmarkedPapers.includes(paper.id) ? 'secondary' : 'default'}
                          onClick={() => toggleBookmark(paper.id)}
                          sx={{ 
                            color: bookmarkedPapers.includes(paper.id) ? 'secondary.main' : 'text.secondary',
                          }}
                        >
                          {bookmarkedPapers.includes(paper.id) ? (
                            <Bookmark className="bookmark-active" />
                          ) : (
                            <BookmarkBorder />
                          )}
                        </IconButton>
                        
                        <IconButton 
                          size="small" 
                          onClick={() => sharePaper(paper)}
                          sx={{ color: 'text.secondary' }}
                        >
                          <Share />
                        </IconButton>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', ml: 0.5 }}>
                          <School fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} />
                          <Typography variant="body2" color="text.secondary">
                            {paper.citations}
                          </Typography>
                        </Box>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  textAlign: 'center',
                  backgroundColor: 'rgba(0, 0, 0, 0.02)',
                  borderRadius: 3,
                  boxShadow: 'none'
                }}
              >
                <Typography variant="h6" color="text.secondary">
                  No research papers match your search criteria.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Try adjusting your filters or search query.
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={() => {
                    setSearchQuery('');
                    setCategoryFilter('All');
                    setSourceFilter('All');
                    setDateFilter('All');
                  }}
                >
                  Clear Filters
                </Button>
              </Paper>
            )}
          </>
        )}
        
        {/* Pagination */}
        {filteredPapers.length > papersPerPage && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }} className="research-pagination">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              size="large"
              shape="rounded"
              showFirstButton
              showLastButton
            />
          </Box>
        )}
        
        {/* Trending Papers Section */}
        <Box className="trending-papers" sx={{ mt: 8, py: 5, px: 4, borderRadius: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
            Trending in Verification
          </Typography>
          
          <Typography variant="body1" paragraph sx={{ opacity: 0.8, maxWidth: '800px', mb: 4 }}>
            The most cited verification papers from the past year, showcasing groundbreaking methodologies and technologies.
          </Typography>
          
          <Grid container spacing={3}>
            {papers
              .filter(paper => paper.category === 'Verification')
              .sort((a, b) => b.citations - a.citations)
              .slice(0, 3)
              .map((paper) => (
                <Grid item xs={12} md={4} key={`trending-${paper.id}`}>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <ElectricBolt 
                      sx={{ 
                        fontSize: '2rem', 
                        color: 'primary.main', 
                        mt: 0.5,
                        opacity: 0.8
                      }} 
                    />
                    <Box>
                      <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                        {paper.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {paper.authors}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                        <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                          <School fontSize="small" sx={{ mr: 0.5 }} /> {paper.citations} citations
                        </Typography>
                        <Chip 
                          label={paper.source} 
                          size="small" 
                          className={`source-badge ${getSourceBadgeClass(paper.source)}`}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              ))
            }
          </Grid>
        </Box>
        
        {/* Newsletter Section with Improved Functionality */}
        <Box className="newsletter-section" sx={{ mt: 8, pb: 6 }}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 4,
              background: 'linear-gradient(135deg, #7b1fa2 0%, #6a1b9a 100%)',
              color: 'white',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <Box sx={{ position: 'absolute', top: -50, right: -50, opacity: 0.1 }}>
              <Article sx={{ fontSize: 200 }} />
            </Box>
            
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={7}>
                <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
                  Stay Updated with Research
                </Typography>
                
                <Typography variant="body1" paragraph sx={{ opacity: 0.9, mb: 3 }}>
                  Subscribe to our newsletter to receive weekly updates on the latest research papers in your areas of interest.
                </Typography>
              </Grid>
              
              <Grid item xs={12} md={5}>
                {subscribed ? (
                  <Box
                    className="success-message scale-in"
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: 'rgba(255, 255, 255, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2
                    }}
                  >
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        bgcolor: 'success.main',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <CheckCircle />
                    </Box>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      Thank you! Your subscription is confirmed.
                    </Typography>
                  </Box>
                ) : (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }} className="fade-in">
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <TextField
                        fullWidth
                        placeholder="Your email address"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={!!emailError}
                        helperText={emailError}
                        FormHelperTextProps={{
                          sx: { color: 'rgba(255,255,255,0.7)' }
                        }}
                        disabled={subscribing}
                        InputProps={{
                          sx: { 
                            bgcolor: 'rgba(255, 255, 255, 0.9)',
                            borderRadius: 2
                          }
                        }}
                      />
                      <Button
                        variant="contained"
                        onClick={handleSubscribe}
                        disabled={subscribing}
                        sx={{
                          bgcolor: 'white',
                          color: 'primary.main',
                          '&:hover': {
                            bgcolor: 'rgba(255, 255, 255, 0.9)',
                          },
                          borderRadius: 2,
                          whiteSpace: 'nowrap',
                          minWidth: subscribing ? '120px' : 'auto'
                        }}
                      >
                        {subscribing ? (
                          <CircularProgress size={24} color="primary" />
                        ) : (
                          'Subscribe'
                        )}
                      </Button>
                    </Box>
                    <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
                      We'll never share your email with anyone else.
                    </Typography>
                  </Box>
                )}
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Container>
      
      {/* Add CSS keyframes for animations */}
      <style jsx="true">{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </Box>
  );
};

export default Research;