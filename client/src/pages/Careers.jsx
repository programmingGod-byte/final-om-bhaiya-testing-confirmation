import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box, Typography, Grid, Paper, Tabs, Tab, Accordion, AccordionSummary,
  AccordionDetails, Divider, Button, Card, CardContent, Chip, List,
  ListItem, ListItemIcon, ListItemText, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow
} from '@mui/material';
import {
  ExpandMore, Work, School, TrendingUp, Engineering, PlayArrow,
  Timeline, Check, ComputerOutlined, MemoryOutlined, AssessmentOutlined,
  DataObjectOutlined, DeveloperBoardOutlined, BiotechOutlined,
  ElectricalServicesOutlined, NetworkCheckOutlined, SettingsEthernetOutlined,
  BuildOutlined, SecurityOutlined, BusinessOutlined
} from '@mui/icons-material';

const Careers = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // VLSI career roles data
  const careerRoles = [
    {
      title: 'RTL Design Engineer',
      description: 'Design digital circuits using hardware description languages (HDLs) like Verilog and VHDL.',
      responsibilities: [
        'Translate specifications into synthesizable RTL code',
        'Create and optimize digital circuits for performance, power, and area',
        'Develop testbenches for functional verification',
        'Debug and fix design issues',
        'Collaborate with verification and physical design teams'
      ],
      skills: [
        'Verilog/VHDL',
        'Digital Design Concepts',
        'Logic Design',
        'Timing Analysis',
        'Low Power Design Techniques'
      ],
      education: 'B.S./M.S. in Electrical/Computer Engineering',
      salary: '$110,000 - $150,000',
      growth: 'Steady',
      companies: ['Intel', 'AMD', 'Nvidia', 'Qualcomm', 'Apple', 'Samsung'],
      icon: <Engineering />
    },
    {
      title: 'Verification Engineer',
      description: 'Ensure RTL designs meet specifications through comprehensive testing and verification approaches.',
      responsibilities: [
        'Develop verification plans and testbenches',
        'Implement coverage-driven verification strategies',
        'Create assertions to verify design properties',
        'Perform functional and formal verification',
        'Debug design issues and collaborate with design teams'
      ],
      skills: [
        'SystemVerilog',
        'UVM (Universal Verification Methodology)',
        'Assertions',
        'Functional Coverage',
        'Simulation Tools (VCS, ModelSim, etc.)'
      ],
      education: 'B.S./M.S. in Electrical/Computer Engineering',
      salary: '$115,000 - $160,000',
      growth: 'High',
      companies: ['Synopsys', 'Cadence', 'Intel', 'AMD', 'Broadcom', 'MediaTek'],
      icon: <AssessmentOutlined />
    },
    {
      title: 'Physical Design Engineer',
      description: 'Transform RTL code into optimized physical layouts for semiconductor manufacturing.',
      responsibilities: [
        'Floorplan design and optimization',
        'Placement and routing of logic cells',
        'Clock tree synthesis',
        'Timing closure and signoff',
        'Design rule checking (DRC) and layout vs. schematic (LVS) verification'
      ],
      skills: [
        'Physical Design Flow',
        'Placement & Routing Tools',
        'Timing Analysis',
        'Power Analysis',
        'DRC/LVS Verification'
      ],
      education: 'B.S./M.S. in Electrical/Computer Engineering',
      salary: '$120,000 - $165,000',
      growth: 'Steady',
      companies: ['TSMC', 'Global Foundries', 'Intel', 'Samsung', 'Qualcomm', 'Apple'],
      icon: <DeveloperBoardOutlined />
    },
    {
      title: 'FPGA Engineer',
      description: 'Design and implement digital systems on field-programmable gate arrays (FPGAs).',
      responsibilities: [
        'Develop RTL code for FPGA implementation',
        'Perform synthesis, place and route',
        'Create timing constraints',
        'Debug and optimize designs for performance',
        'Develop test frameworks and validation'
      ],
      skills: [
        'Verilog/VHDL',
        'FPGA Architecture',
        'Synthesis Tools (Vivado, Quartus)',
        'Timing Constraints',
        'Debugging Tools'
      ],
      education: 'B.S./M.S. in Electrical/Computer Engineering',
      salary: '$100,000 - $140,000',
      growth: 'Moderate',
      companies: ['Xilinx/AMD', 'Intel', 'Microchip', 'Lattice Semiconductor', 'Defense Contractors'],
      icon: <MemoryOutlined />
    },
    {
      title: 'DFT Engineer',
      description: 'Design for Testability (DFT) engineers ensure that manufactured chips can be tested effectively.',
      responsibilities: [
        'Implement scan chain insertion and test logic',
        'Develop ATPG (Automatic Test Pattern Generation) strategies',
        'Implement BIST (Built-In Self-Test) circuits',
        'Optimize test coverage and test time',
        'Create test plans and collaborate with test engineers'
      ],
      skills: [
        'DFT Methodologies',
        'ATPG Tools',
        'Scan Insertion',
        'BIST Design',
        'Boundary Scan/JTAG'
      ],
      education: 'B.S./M.S. in Electrical/Computer Engineering',
      salary: '$110,000 - $150,000',
      growth: 'Moderate',
      companies: ['Intel', 'Qualcomm', 'Broadcom', 'NXP', 'Mentor Graphics/Siemens'],
      icon: <DataObjectOutlined />
    },
    {
      title: 'Analog/Mixed-Signal Design Engineer',
      description: 'Design analog and mixed-signal circuits like PLLs, ADCs, DACs, and high-speed interfaces.',
      responsibilities: [
        'Design analog and mixed-signal circuits',
        'Perform circuit simulation and analysis',
        'Create and review schematics and layouts',
        'Characterize and validate circuits',
        'Debug and optimize for performance'
      ],
      skills: [
        'Analog Circuit Design',
        'Mixed-Signal Design',
        'SPICE Simulation',
        'Layout Tools',
        'Signal Integrity Analysis'
      ],
      education: 'M.S./Ph.D. in Electrical Engineering',
      salary: '$130,000 - $180,000',
      growth: 'Moderate',
      companies: ['Texas Instruments', 'Analog Devices', 'Infineon', 'NXP', 'Skyworks', 'Qualcomm'],
      icon: <ComputerOutlined />
    },
    {
      title: 'SoC Design Engineer',
      description: 'Integrate various IP blocks to create complete system-on-chip solutions for specific applications.',
      responsibilities: [
        'IP integration and connectivity design',
        'Memory subsystem design and optimization',
        'Power domain planning and implementation',
        'Bus architecture and protocol implementation',
        'SoC level verification and validation'
      ],
      skills: [
        'IP Integration',
        'Bus Protocols (AXI, APB, etc.)',
        'Memory Architecture',
        'Power Management',
        'System-level Design'
      ],
      education: 'M.S. in Electrical/Computer Engineering',
      salary: '$125,000 - $175,000',
      growth: 'High',
      companies: ['Apple', 'Qualcomm', 'MediaTek', 'Samsung', 'Google', 'Tesla'],
      icon: <SettingsEthernetOutlined />
    },
    {
      title: 'Semiconductor Process Engineer',
      description: 'Develop and optimize manufacturing processes for semiconductor fabrication.',
      responsibilities: [
        'Process development and optimization',
        'Yield analysis and improvement',
        'Defect reduction strategies',
        'Process integration with design requirements',
        'New technology node implementation'
      ],
      skills: [
        'Semiconductor Physics',
        'Process Integration',
        'Yield Analysis',
        'Statistical Process Control',
        'Equipment Optimization'
      ],
      education: 'M.S./Ph.D. in Electrical Engineering or Materials Science',
      salary: '$120,000 - $160,000',
      growth: 'Moderate',
      companies: ['TSMC', 'Intel', 'Samsung', 'GlobalFoundries', 'Micron', 'Applied Materials'],
      icon: <BiotechOutlined />
    },
    {
      title: 'Hardware Security Engineer',
      description: 'Design and implement security features in hardware to protect against various attacks and vulnerabilities.',
      responsibilities: [
        'Implement secure boot and trusted execution',
        'Design anti-tamper mechanisms',
        'Conduct side-channel attack analysis',
        'Implement cryptographic hardware accelerators',
        'Vulnerability assessment and testing'
      ],
      skills: [
        'Hardware Security Primitives',
        'Cryptography',
        'Side-channel Analysis',
        'Secure Boot Architecture',
        'Security Verification'
      ],
      education: 'M.S./Ph.D. in Electrical/Computer Engineering',
      salary: '$130,000 - $180,000',
      growth: 'High',
      companies: ['Intel', 'ARM', 'Apple', 'Qualcomm', 'Defense Contractors', 'NXP'],
      icon: <SecurityOutlined />
    }
  ];

  // Industry trends data
  const industryTrends = [
    {
      title: 'AI Hardware Acceleration',
      description: 'The rapid growth of artificial intelligence applications is driving demand for specialized hardware accelerators, including GPUs, TPUs, and custom ASIC solutions.',
      impact: 'Companies are hiring VLSI engineers with experience in designing efficient compute architectures for machine learning workloads.',
      timeframe: 'Current and growing over next 5 years'
    },
    {
      title: 'RISC-V Adoption',
      description: 'The open-source RISC-V instruction set architecture is gaining momentum as an alternative to proprietary architectures.',
      impact: 'Creates opportunities for engineers with expertise in processor design and RISC-V implementation.',
      timeframe: 'Growing over next 3-5 years'
    },
    {
      title: 'Chiplet-Based Architecture',
      description: 'Companies are moving from monolithic chips to smaller, specialized chiplets that are integrated together, enabling more complex systems and better yield.',
      impact: 'Increasing demand for engineers skilled in high-speed interfaces, packaging technologies, and system integration.',
      timeframe: 'Current and growing over next 3-4 years'
    },
    {
      title: 'Hardware Security',
      description: 'With growing concerns about hardware vulnerabilities, companies are focusing on security features built directly into hardware designs.',
      impact: 'Rising demand for VLSI engineers with expertise in security protocols, secure boot, trusted execution environments, and side-channel attack prevention.',
      timeframe: 'Current and ongoing'
    },
    {
      title: '3D Integration',
      description: 'Three-dimensional integration of chips allows for higher density and performance with lower power consumption.',
      impact: 'Creates opportunities for engineers with knowledge of 3D design methodologies, through-silicon vias (TSVs), and thermal management.',
      timeframe: 'Growing over next 3-5 years'
    },
    {
      title: 'Automotive Semiconductor Growth',
      description: 'The automotive industry is increasingly adopting advanced driver assistance systems (ADAS) and electric vehicles, requiring specialized semiconductor solutions.',
      impact: 'High demand for engineers with expertise in functional safety, automotive-grade reliability, and low-power design for EV applications.',
      timeframe: 'Current and accelerating over next 5-7 years'
    },
    {
      title: 'Specialized IoT SoCs',
      description: 'The Internet of Things market is driving demand for ultra-low-power, application-specific SoCs with integrated wireless connectivity and security features.',
      impact: 'Growing opportunities for engineers specializing in low-power design, wireless protocols, and edge computing architectures.',
      timeframe: 'Current and steady growth over next 3-5 years'
    },
    {
      title: 'Advanced Packaging Technologies',
      description: "As Moore's Law slows, advanced packaging technologies like FOWLP and 2.5D/3D integration are gaining importance.",
      impact: 'Increasing demand for engineers with expertise in advanced packaging, high-speed signal integrity, and thermal management.',
      timeframe: 'Current and growing over next 3-6 years'
    }
  ];

  // Educational paths data
  const educationPaths = [
    {
      degree: "Bachelor's Degree in Electrical/Computer Engineering",
      description: 'Provides foundational knowledge in digital logic, circuit design, and computer architecture.',
      courses: [
        'Digital Logic Design',
        'Computer Architecture',
        'Electronic Circuits',
        'Signals and Systems',
        'Semiconductor Devices'
      ],
      duration: '4 years',
      career: 'Entry-level positions in RTL design, verification, or FPGA development'
    },
    {
      degree: "Master's Degree in VLSI/Microelectronics",
      description: 'Offers specialized knowledge in advanced digital design, semiconductor physics, and EDA tools.',
      courses: [
        'Advanced VLSI Design',
        'Digital System Testing',
        'Low Power Design',
        'Physical Design Automation',
        'Hardware Security'
      ],
      duration: '1.5-2 years',
      career: 'Mid-level positions in design, verification, or physical design'
    },
    {
      degree: "Ph.D. in Electrical Engineering (VLSI focus)",
      description: 'Involves original research in specialized areas such as novel architectures or emerging technologies.',
      courses: [
        'Advanced Research Seminars',
        'Specialized Topics',
        'Dissertation Research'
      ],
      duration: '4-6 years',
      career: 'Research positions, architecture development, or specialized design roles'
    },
    {
      degree: 'Industry Certifications',
      description: 'Certifications from tool vendors or industry associations that validate expertise in specific areas.',
      courses: [
        'Synopsys Certified Professional',
        'Cadence Certified Expert',
        'Xilinx/AMD Certified Developer',
        'UVM Methodology Certification'
      ],
      duration: 'Varies (weeks to months)',
      career: 'Enhances credentials for specialized roles or tool expertise'
    },
    {
      degree: "Bachelor's Degree in Electrical Engineering",
      description: 'Focuses on power systems, control systems, electromagnetics, and basic electronics.',
      courses: [
        'Circuit Theory',
        'Electromagnetic Fields',
        'Power Systems',
        'Control Systems',
        'Basic Digital Electronics'
      ],
      duration: '4 years',
      career: 'May transition to VLSI with additional coursework or further study'
    },
    {
      degree: "Master's in Embedded Systems",
      description: 'Combines hardware and software aspects of system design, often including FPGA and SoC components.',
      courses: [
        'Embedded Hardware Design',
        'Real-time Operating Systems',
        'FPGA-based System Design',
        'Hardware-Software Co-design',
        'IoT System Architecture'
      ],
      duration: '1.5-2 years',
      career: 'Positions in embedded systems design, FPGA development, and IoT hardware'
    },
    {
      degree: 'Bootcamps and Short Courses',
      description: 'Intensive, focused training programs that rapidly build specific VLSI or EDA tool skills.',
      courses: [
        'Hardware Description Languages',
        'EDA Tool Training',
        'FPGA Programming',
        'Physical Design Flow',
        'Project-Based Learning'
      ],
      duration: '2-6 months',
      career: 'Supplement formal education or assist in career transitions'
    }
  ];

  // ECE Career Fields data
  const eceCareerFields = [
    {
      field: 'Power Electronics',
      description: 'Design and development of systems that convert and control electrical power for various applications.',
      roles: ['Power Electronics Engineer', 'Power System Designer', 'Energy Management Engineer'],
      skills: ['Power Conversion', 'Inverter Design', 'Battery Management', 'Motor Drives'],
      growth: 'High (driven by EV and renewable energy growth)',
      relatedToVLSI: 'IC design for power management circuits and motor control'
    },
    {
      field: 'Signal Processing',
      description: 'Processing, analyzing, and manipulating signals for communications, audio/video, and data analysis.',
      roles: ['DSP Engineer', 'Algorithm Developer', 'Wireless System Engineer'],
      skills: ['Digital Signal Processing', 'Filter Design', 'Communication Systems', 'Algorithm Optimization'],
      growth: 'Moderate to High',
      relatedToVLSI: 'Hardware implementation of DSP algorithms and accelerators'
    },
    {
      field: 'Embedded Systems',
      description: 'Integration of hardware and software to create specialized computing systems.',
      roles: ['Embedded System Engineer', 'Firmware Developer', 'IoT Hardware Engineer'],
      skills: ['Microcontroller Programming', 'RTOS', 'PCB Design', 'Low-level Drivers'],
      growth: 'High',
      relatedToVLSI: 'SoC design, hardware/software interfaces, FPGA prototyping'
    },
    {
      field: 'RF/Wireless Communications',
      description: 'Design of systems and components for wireless data transmission and reception.',
      roles: ['RF Engineer', 'Wireless System Designer', 'Antenna Engineer'],
      skills: ['RF Circuit Design', 'Wireless Protocols', 'Antenna Design', 'Signal Integrity'],
      growth: 'Moderate to High (with 5G/6G expansion)',
      relatedToVLSI: 'RF transceiver chip design, wireless SoCs'
    },
    {
      field: 'Robotics & Control Systems',
      description: 'Design of automated systems, robots, and their control electronics.',
      roles: ['Robotics Engineer', 'Control Systems Engineer', 'Automation Engineer'],
      skills: ['Sensor Integration', 'Motor Control', 'Feedback Systems', 'Path Planning'],
      growth: 'High',
      relatedToVLSI: 'SoC design for robotics, sensor interface circuits'
    },
    {
      field: 'Biomedical Electronics',
      description: 'Development of electronic devices for medical diagnostics, monitoring, and treatment.',
      roles: ['Biomedical Engineer', 'Medical Device Engineer', 'Healthcare IoT Developer'],
      skills: ['Biosignal Processing', 'Low-power Design', 'Medical Standards', 'Sensor Interfaces'],
      growth: 'High',
      relatedToVLSI: 'Ultra-low power ICs, implantable electronics, sensor front-ends'
    }
  ];

  // Regional Job Market data
  const regionalJobMarket = [
    {
      region: 'Silicon Valley, USA',
      majorEmployers: ['Intel', 'AMD', 'Nvidia', 'Apple', 'Qualcomm', 'Broadcom'],
      salaryRange: '$120,000 - $200,000',
      dominantRoles: 'SoC Design, AI Hardware, RTL Design',
      jobGrowth: 'High',
      costOfLiving: 'Very High'
    },
    {
      region: 'Bangalore, India',
      majorEmployers: ['Intel', 'AMD', 'Qualcomm', 'Texas Instruments', 'Analog Devices', 'Nvidia'],
      salaryRange: '₹15,00,000 - ₹50,00,000',
      dominantRoles: 'Verification, Physical Design, RTL Design',
      jobGrowth: 'Very High',
      costOfLiving: 'Moderate'
    },
    {
      region: 'Hsinchu, Taiwan',
      majorEmployers: ['TSMC', 'MediaTek', 'Realtek', 'Novatek', 'Global Unichip'],
      salaryRange: 'NT$ 1,200,000 - 2,400,000',
      dominantRoles: 'Physical Design, Process Engineering, Analog Design',
      jobGrowth: 'High',
      costOfLiving: 'Moderate'
    },
    {
      region: 'Shenzhen, China',
      majorEmployers: ['Huawei HiSilicon', 'ZTE', 'SMIC', 'Spreadtrum', 'Allwinner'],
      salaryRange: '¥250,000 - ¥800,000',
      dominantRoles: 'RTL Design, SoC Integration, Mobile Processors',
      jobGrowth: 'High',
      costOfLiving: 'Moderate'
    },
    {
      region: 'Austin, USA',
      majorEmployers: ['Samsung', 'NXP', 'AMD', 'Apple', 'Infineon'],
      salaryRange: '$100,000 - $170,000',
      dominantRoles: 'Verification, RTL Design, Analog Design',
      jobGrowth: 'High',
      costOfLiving: 'Moderate to High'
    },
    {
      region: 'Munich, Germany',
      majorEmployers: ['Infineon', 'NXP', 'Intel', 'Bosch', 'Siemens'],
      salaryRange: '€60,000 - €120,000',
      dominantRoles: 'Automotive Semiconductors, Power ICs, Security',
      jobGrowth: 'Moderate',
      costOfLiving: 'High'
    }
  ];

  // Industry Certifications data
  const industryCertifications = [
    {
      name: 'Synopsys Certified Design Professional',
      provider: 'Synopsys',
      focus: 'Design Compiler, IC Compiler, PrimeTime',
      value: 'Recognition of proficiency in Synopsys-based design flows',
      duration: '3-6 months preparation',
      cost: '$500-$1000 per exam'
    },
    {
      name: 'Cadence Certified Expert',
      provider: 'Cadence Design Systems',
      focus: 'Genus, Innovus, Tempus, Voltus',
      value: 'Industry recognition for Cadence tool expertise',
      duration: '3-6 months preparation',
      cost: '$600-$1200 per exam'
    },
    {
      name: 'Xilinx/AMD Certified Developer',
      provider: 'Xilinx/AMD',
      focus: 'FPGA design using Vivado or Vitis',
      value: 'Validates skills in FPGA design and implementation',
      duration: '2-4 months preparation',
      cost: '$400-$800'
    },
    {
      name: 'Accellera UVM Certification',
      provider: 'Accellera Systems Initiative',
      focus: 'Universal Verification Methodology practices',
      value: 'Validation of verification expertise using industry standards',
      duration: '2-3 months preparation',
      cost: '$300-$600'
    },
    {
      name: 'Certified RISC-V Professional',
      provider: 'RISC-V International',
      focus: 'RISC-V architecture and implementation',
      value: 'Demonstrates expertise in the growing RISC-V ecosystem',
      duration: '1-3 months preparation',
      cost: '$200-$500'
    }
  ];

  // Render tab content based on the active tab
  const renderTabContent = () => {
    switch (tabValue) {
      case 0: // Career Roles
        return (
          <Box sx={{ pt: 2 }}>
            <Typography variant="h5" gutterBottom sx={{ 
              borderLeft: '4px solid #6a0dad', 
              pl: 2,
              fontWeight: 600,
              mb: 3
            }}>
              VLSI Career Pathways
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, maxWidth: 900 }}>
              The semiconductor industry offers diverse career opportunities with competitive compensation and continuous innovation. 
              Explore the various specialized roles below to find your ideal career path.
            </Typography>
            
            <Grid container spacing={4}>
              {careerRoles.map((role, index) => (
                <Grid item xs={12} key={index}>
                  <Accordion 
                    sx={{ 
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                      borderRadius: '8px !important',
                      overflow: 'hidden',
                      '&::before': {
                        display: 'none'
                      },
                      '&.Mui-expanded': {
                        margin: '8px 0',
                      }
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMore />}
                      aria-controls={`panel${index}-content`}
                      id={`panel${index}-header`}
                      sx={{ 
                        backgroundColor: 'rgba(106, 13, 173, 0.03)',
                        '&.Mui-expanded': {
                          borderBottom: '1px solid rgba(0, 0, 0, 0.08)'
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                        <Box sx={{ 
                          backgroundColor: 'rgba(106, 13, 173, 0.1)', 
                          borderRadius: '50%', 
                          p: 1.2,
                          mr: 2.5,
                          color: '#6a0dad',
                          display: 'flex'
                        }}>
                          {role.icon}
                        </Box>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>{role.title}</Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                            {role.description}
                          </Typography>
                        </Box>
                        <Box sx={{ 
                          display: { xs: 'none', md: 'flex' }, 
                          alignItems: 'center', 
                          gap: 3,
                          mr: 2
                        }}>
                          <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="body2" color="text.secondary">
                              Salary Range
                            </Typography>
                            <Typography variant="body1" fontWeight="medium" color="primary.main">
                              {role.salary}
                            </Typography>
                          </Box>
                          <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="body2" color="text.secondary">
                              Growth
                            </Typography>
                            <Chip 
                              label={role.growth} 
                              size="small" 
                              sx={{ 
                                fontWeight: 'medium',
                                backgroundColor: 
                                  role.growth === 'High' ? 'rgba(46, 125, 50, 0.1)' : 
                                  role.growth === 'Moderate' ? 'rgba(237, 108, 2, 0.1)' : 
                                  'rgba(0, 114, 178, 0.1)',
                                color: 
                                  role.growth === 'High' ? 'rgb(46, 125, 50)' : 
                                  role.growth === 'Moderate' ? 'rgb(237, 108, 2)' : 
                                  'rgb(0, 114, 178)'
                              }} 
                            />
                          </Box>
                        </Box>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 4 }}>
                      <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                          <Typography 
                            variant="subtitle1" 
                            gutterBottom 
                            sx={{ 
                              fontWeight: 600, 
                              display: 'flex',
                              alignItems: 'center',
                              mb: 2
                            }}
                          >
                            <Work sx={{ mr: 1.5, color: '#6a0dad' }} />
                            Key Responsibilities
                          </Typography>
                          <List sx={{ 
                            bgcolor: 'rgba(106, 13, 173, 0.03)',
                            borderRadius: 2,
                            py: 1
                          }}>
                            {role.responsibilities.map((resp, i) => (
                              <ListItem key={i} sx={{ py: 0.5 }}>
                                <ListItemIcon sx={{ minWidth: 36 }}>
                                  <PlayArrow color="primary" fontSize="small" />
                                </ListItemIcon>
                                <ListItemText 
                                  primary={resp} 
                                  primaryTypographyProps={{ 
                                    variant: 'body2',
                                    sx: { fontWeight: 500 }
                                  }} 
                                />
                              </ListItem>
                            ))}
                          </List>
                          <Typography 
                            variant="subtitle1" 
                            gutterBottom 
                            sx={{ 
                              fontWeight: 600, 
                              mt: 4, 
                              mb: 2,
                              display: 'flex',
                              alignItems: 'center'
                            }}
                          >
                            <Engineering sx={{ mr: 1.5, color: '#6a0dad' }} />
                            Required Skills
                          </Typography>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                            {role.skills.map((skill, i) => (
                              <Chip 
                                key={i} 
                                label={skill} 
                                sx={{ 
                                  backgroundColor: 'rgba(106, 13, 173, 0.08)',
                                  fontWeight: 500,
                                  p: 0.5
                                }} 
                              />
                            ))}
                          </Box>
                          <Typography 
                            variant="subtitle1" 
                            gutterBottom 
                            sx={{ 
                              fontWeight: 600,
                              display: 'flex',
                              alignItems: 'center'
                            }}
                          >
                            <School sx={{ mr: 1.5, color: '#6a0dad' }} />
                            Typical Education
                          </Typography>
                          <Typography variant="body2" paragraph sx={{ ml: 4 }}>
                            {role.education}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography 
                            variant="subtitle1" 
                            gutterBottom 
                            sx={{ 
                              fontWeight: 600,
                              display: 'flex',
                              alignItems: 'center',
                              mb: 2
                            }}
                          >
                            <BusinessOutlined sx={{ mr: 1.5, color: '#6a0dad' }} />
                            Top Companies Hiring
                          </Typography>
                          <Box sx={{ 
                            display: 'flex', 
                            flexWrap: 'wrap', 
                            gap: 1, 
                            mb: 4,
                            backgroundColor: 'rgba(0, 0, 0, 0.02)',
                            borderRadius: 2,
                            p: 2
                          }}>
                            {role.companies.map((company, i) => (
                              <Chip 
                                key={i} 
                                label={company} 
                                variant="outlined"
                                sx={{ 
                                  borderColor: 'rgba(106, 13, 173, 0.3)',
                                  '&:hover': {
                                    backgroundColor: 'rgba(106, 13, 173, 0.05)'
                                  }
                                }} 
                              />
                            ))}
                          </Box>
                          <Typography 
                            variant="subtitle1" 
                            gutterBottom 
                            sx={{ 
                              fontWeight: 600,
                              display: 'flex',
                              alignItems: 'center',
                              mb: 2 
                            }}
                          >
                            <Timeline sx={{ mr: 1.5, color: '#6a0dad' }} />
                            Career Path Progression
                          </Typography>
                          <Box sx={{ 
                            p: 2, 
                            border: '1px solid rgba(0, 0, 0, 0.08)', 
                            borderRadius: 2,
                            backgroundColor: 'white' 
                          }}>
                            <Box sx={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              mb: 2,
                              pb: 1.5,
                              borderBottom: '1px dashed rgba(0, 0, 0, 0.1)' 
                            }}>
                              <Box 
                                sx={{ 
                                  width: 20, 
                                  height: 20, 
                                  borderRadius: '50%',
                                  backgroundColor: 'rgba(106, 13, 173, 0.7)',
                                  mr: 2,
                                  fontSize: '0.75rem',
                                  color: 'white',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}
                              >
                                1
                              </Box>
                              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                Junior {role.title} (0-3 years)
                              </Typography>
                            </Box>
                            <Box sx={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              mb: 2,
                              pb: 1.5,
                              borderBottom: '1px dashed rgba(0, 0, 0, 0.1)' 
                            }}>
                              <Box 
                                sx={{ 
                                  width: 20, 
                                  height: 20, 
                                  borderRadius: '50%',
                                  backgroundColor: 'rgba(106, 13, 173, 0.7)',
                                  mr: 2,
                                  fontSize: '0.75rem',
                                  color: 'white',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}
                              >
                                2
                              </Box>
                              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                {role.title} (3-7 years)
                              </Typography>
                            </Box>
                            <Box sx={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              mb: 2,
                              pb: 1.5,
                              borderBottom: '1px dashed rgba(0, 0, 0, 0.1)' 
                            }}>
                              <Box 
                                sx={{ 
                                  width: 20, 
                                  height: 20, 
                                  borderRadius: '50%',
                                  backgroundColor: 'rgba(106, 13, 173, 0.7)',
                                  mr: 2,
                                  fontSize: '0.75rem',
                                  color: 'white',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}
                              >
                                3
                              </Box>
                              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                Senior {role.title} (7+ years)
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Box 
                                sx={{ 
                                  width: 20, 
                                  height: 20, 
                                  borderRadius: '50%',
                                  backgroundColor: 'rgba(106, 13, 173, 0.7)',
                                  mr: 2,
                                  fontSize: '0.75rem',
                                  color: 'white',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}
                              >
                                4
                              </Box>
                              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                Lead/Principal Engineer (10+ years)
                              </Typography>
                            </Box>
                          </Box>
                          <Button 
                            variant="contained" 
                            color="primary" 
                            sx={{ 
                              mt: 4,
                              px: 3,
                              py: 1,
                              borderRadius: 2,
                              boxShadow: '0 4px 8px rgba(106, 13, 173, 0.2)',
                              '&:hover': {
                                boxShadow: '0 6px 12px rgba(106, 13, 173, 0.3)',
                              }
                            }}
                            component="a"
                            href="/modules"
                          >
                            Explore Related Modules
                          </Button>
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              ))}
            </Grid>
          </Box>
        );
      case 1: // Industry Trends
        return (
          <Grid container spacing={4}>
            {industryTrends.map((trend, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Paper elevation={2} sx={{ p: 3, height: '100%', borderLeft: '4px solid #6a0dad' }}>
                  <Typography variant="h6" gutterBottom>
                    {trend.title}
                  </Typography>
                  <Typography variant="body2" paragraph>
                    {trend.description}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle2" gutterBottom color="primary">
                    Career Impact
                  </Typography>
                  <Typography variant="body2" paragraph>
                    {trend.impact}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TrendingUp sx={{ color: 'text.secondary', mr: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                      Timeframe: {trend.timeframe}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
            <Grid item xs={12}>
              <Paper elevation={1} sx={{ p: 3, mt: 2, bgcolor: 'rgba(106, 13, 173, 0.04)' }}>
                <Typography variant="h6" gutterBottom>
                  Stay Ahead of the Curve
                </Typography>
                <Typography variant="body2" paragraph>
                  Keep yourself updated with the latest industry trends and emerging technologies in VLSI and semiconductor design. Continuous learning is key to a successful career.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        );
      case 2: // Educational Paths
        return (
          <Grid container spacing={4}>
            {educationPaths.map((edu, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>{edu.degree}</Typography>
                    <Typography variant="body2" paragraph>{edu.description}</Typography>
                    <Typography variant="subtitle2" gutterBottom>Courses:</Typography>
                    <List dense>
                      {edu.courses.map((course, i) => (
                        <ListItem key={i}>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <School fontSize="small" color="primary" />
                          </ListItemIcon>
                          <ListItemText primary={course} />
                        </ListItem>
                      ))}
                    </List>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="body2"><strong>Duration:</strong> {edu.duration}</Typography>
                    <Typography variant="body2"><strong>Career Outcome:</strong> {edu.career}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        );
      case 3: // ECE Career Fields
        return (
          <Grid container spacing={4}>
            {eceCareerFields.map((field, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Paper elevation={2} sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>{field.field}</Typography>
                  <Typography variant="body2" paragraph>{field.description}</Typography>
                  <Typography variant="subtitle2" gutterBottom>Typical Roles:</Typography>
                  <List dense>
                    {field.roles.map((role, i) => (
                      <ListItem key={i}>
                        <ListItemIcon>
                          <Work fontSize="small" color="primary" />
                        </ListItemIcon>
                        <ListItemText primary={role} />
                      </ListItem>
                    ))}
                  </List>
                  <Typography variant="subtitle2" gutterBottom>Key Skills:</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {field.skills.map((skill, i) => (
                      <Chip key={i} label={skill} variant="outlined" />
                    ))}
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="body2"><strong>Growth:</strong> {field.growth}</Typography>
                  <Typography variant="body2"><strong>Related to VLSI:</strong> {field.relatedToVLSI}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        );
      case 4: // Regional Job Market
        return (
          <Grid container spacing={4}>
            {regionalJobMarket.map((region, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Paper elevation={2} sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom>{region.region}</Typography>
                  <Typography variant="body2" paragraph>
                    <strong>Major Employers:</strong> {region.majorEmployers.join(', ')}
                  </Typography>
                  <Typography variant="body2" paragraph>
                    <strong>Salary Range:</strong> {region.salaryRange}
                  </Typography>
                  <Typography variant="body2" paragraph>
                    <strong>Dominant Roles:</strong> {region.dominantRoles}
                  </Typography>
                  <Typography variant="body2" paragraph>
                    <strong>Job Growth:</strong> {region.jobGrowth}
                  </Typography>
                  <Typography variant="body2" paragraph>
                    <strong>Cost of Living:</strong> {region.costOfLiving}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        );
      case 5: // Industry Certifications
        return (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Certification</TableCell>
                  <TableCell>Provider</TableCell>
                  <TableCell>Focus</TableCell>
                  <TableCell>Value</TableCell>
                  <TableCell>Duration</TableCell>
                  <TableCell>Cost</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {industryCertifications.map((cert, index) => (
                  <TableRow key={index}>
                    <TableCell>{cert.name}</TableCell>
                    <TableCell>{cert.provider}</TableCell>
                    <TableCell>{cert.focus}</TableCell>
                    <TableCell>{cert.value}</TableCell>
                    <TableCell>{cert.duration}</TableCell>
                    <TableCell>{cert.cost}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        );
      default:
        return <div>Invalid Tab</div>;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Tabs value={tabValue} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
        <Tab label="Career Roles" />
        <Tab label="Industry Trends" />
        <Tab label="Educational Paths" />
        <Tab label="ECE Career Fields" />
        <Tab label="Regional Job Market" />
        <Tab label="Certifications" />
      </Tabs>
      <Box sx={{ mt: 3 }}>
        {renderTabContent()}
      </Box>
    </Box>
  );
};

export default Careers;
