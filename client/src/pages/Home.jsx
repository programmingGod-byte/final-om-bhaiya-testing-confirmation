import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, Grid, Paper, Card, CardContent, CardMedia, CardActionArea, Chip, Divider } from '@mui/material';
import { ArrowForward, Code, School, Forum, MenuBook, Work, Timeline, Assessment, Engineering, Devices, Speed, Memory } from '@mui/icons-material';

const Home = () => {
  // Sample featured modules
  const featuredModules = [
    {
      id: 1,
      title: 'Verilog Fundamentals',
      description: 'Master the basics of Verilog HDL and get started with digital design concepts',
      image: 'https://tse1.mm.bing.net/th?id=OIP.jz0YXGGr51-sLiHhII4g5wHaEM&pid=Api&P=0&h=180',
      level: 'Beginner'
    },
    {
      id: 23,
      title: 'RISC-V Processor Design',
      description: 'Design a complete RISC-V processor from scratch with pipelining and hazard resolution',
      image: 'https://tse1.mm.bing.net/th?id=OIP.T5X7UbWZedVZMHdzB9YPCQHaE8&pid=Api&P=0&h=180',
      level: 'Expert'
    },
    {
      id: 14,
      title: 'UVM Verification',
      description: 'Master Universal Verification Methodology for SystemVerilog testbenches',
      image: 'https://tse1.mm.bing.net/th?id=OIP.xTfbaCirE3pvtPMZwDHJRgHaHa&pid=Api&P=0&h=180',
      level: 'Expert'
    }
  ];

  // Industry career paths
  const careerPaths = [
    {
      title: 'RTL Design Engineer',
      description: 'Design digital circuits using HDLs like Verilog and VHDL',
      skills: ['Verilog/VHDL', 'Digital Design', 'Timing Analysis', 'Low Power Techniques'],
      salary: '$110,000 - $150,000',
      demand: 'High',
      icon: <Engineering />
    },
    {
      title: 'Verification Engineer',
      description: 'Create and execute test plans to verify hardware designs',
      skills: ['SystemVerilog', 'UVM', 'Assertions', 'Code Coverage', 'Functional Verification'],
      salary: '$115,000 - $160,000',
      demand: 'Very High',
      icon: <Assessment />
    },
    {
      title: 'Physical Design Engineer',
      description: 'Transform RTL code into optimized physical layouts',
      skills: ['Floorplanning', 'Placement', 'Routing', 'Timing Closure', 'DRC/LVS'],
      salary: '$120,000 - $165,000',
      demand: 'High',
      icon: <Devices />
    },
    {
      title: 'FPGA Engineer',
      description: 'Implement and optimize designs for FPGA platforms',
      skills: ['Verilog/VHDL', 'FPGA Architecture', 'Synthesis', 'Timing Constraints'],
      salary: '$100,000 - $140,000',
      demand: 'Steady',
      icon: <Memory />
    }
  ];

  // Industry trends
  const industryTrends = [
    {
      title: 'AI Hardware Acceleration',
      description: 'Growing demand for specialized hardware to accelerate machine learning and AI workloads',
      impact: 'High',
      timeframe: 'Now - 5 years'
    },
    {
      title: 'RISC-V Adoption',
      description: 'The open-source RISC-V architecture is gaining momentum as an alternative to proprietary instruction sets',
      impact: 'Medium-High',
      timeframe: 'Now - 3 years'
    },
    {
      title: 'Chiplet-Based Design',
      description: 'Moving from monolithic chips to smaller, specialized chiplets integrated together',
      impact: 'Medium-High',
      timeframe: '1-4 years'
    },
    {
      title: 'Hardware Security',
      description: 'Increasing focus on security features built directly into hardware designs',
      impact: 'High',
      timeframe: 'Now - Ongoing'
    }
  ];

  // Sample code example
  const codeExample = `module alu_4bit(
  input [3:0] a, b,
  input [1:0] op,
  output reg [3:0] result
);
  
  always @(*) begin
    case(op)
      2'b00: result = a + b;    // Addition
      2'b01: result = a - b;    // Subtraction
      2'b10: result = a & b;    // Bitwise AND
      2'b11: result = a | b;    // Bitwise OR
    endcase
  end
endmodule`;

  return (
    <Box className="container page-container">
      {/* Hero Section */}
      <Box 
        sx={{ 
          textAlign: 'center', 
          py: 8,
          background: 'linear-gradient(to right, #8e44ad, #6a0dad)',
          color: 'white',
          borderRadius: 2,
          mb: 6
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
          <Box 
            component="img" 
            src="/images/BACKGROUNDLESS_LOGO.png" 
            alt="VeriGeek Logo" 
            sx={{ 
              height: 60, 
              mr: 2 
            }}
          />
          <Typography variant="h2" component="h1" gutterBottom fontWeight="bold" sx={{ mb: 0 }}>
            VeriGeek
          </Typography>
        </Box>
        <Typography variant="h5" sx={{ fontStyle: 'italic', mb: 3 }}>
          Empower Your Logic, Code Your Circuit!
        </Typography>
        <Typography variant="h5" gutterBottom sx={{ maxWidth: '800px', mx: 'auto', mb: 4 }}>
          Master digital design with comprehensive Verilog modules, hands-on exercises, and industry-relevant skills
        </Typography>
        <Button 
          component={Link} 
          to="/modules" 
          variant="contained" 
          size="large"
          endIcon={<ArrowForward />}
          sx={{ 
            backgroundColor: 'white', 
            color: '#6a0dad',
            '&:hover': {
              backgroundColor: '#f0f0f0',
            }
          }}
        >
          Start Learning
        </Button>
      </Box>

      {/* Features Section */}
      <Typography variant="h4" component="h2" gutterBottom color="primary" sx={{ mb: 4 }}>
        What We Offer
      </Typography>
      <Grid container spacing={4} sx={{ mb: 6 }}>
        <Grid item xs={12} md={3}>
          <Paper elevation={3} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <School sx={{ fontSize: 60, color: '#6a0dad', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Industry-Relevant Modules
            </Typography>
            <Typography>
              Comprehensive curriculum covering beginner to expert topics, aligned with current industry needs and practices.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper elevation={3} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <Code sx={{ fontSize: 60, color: '#6a0dad', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Interactive Code Editor
            </Typography>
            <Typography>
              Simulate and debug Verilog code with our browser-based editor featuring real-time syntax checking and waveform visualization.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper elevation={3} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <Forum sx={{ fontSize: 60, color: '#6a0dad', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Expert Community
            </Typography>
            <Typography>
              Connect with industry professionals, ask questions, and participate in discussions on advanced VLSI topics.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper elevation={3} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <Work sx={{ fontSize: 60, color: '#6a0dad', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Career Resources
            </Typography>
            <Typography>
              Gain insights into VLSI career paths, industry trends, and the specific skills needed to excel in hardware design roles.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Featured Modules */}
      <Typography variant="h4" component="h2" gutterBottom color="primary" sx={{ mb: 4 }}>
        Featured Modules
      </Typography>
      <Grid container spacing={4} sx={{ mb: 6 }}>
        {featuredModules.map(module => (
          <Grid item xs={12} sm={6} md={4} key={module.id}>
            <Card sx={{ height: '100%', transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-8px)' } }}>
              <CardActionArea component={Link} to={`/modules/${module.id}`}>
                <CardMedia
                  component="img"
                  height="160"
                  image={module.image}
                  alt={module.title}
                />
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="h6" component="h3" noWrap>
                      {module.title}
                    </Typography>
                    <Chip 
                      label={module.level} 
                      size="small" 
                      sx={{ 
                        backgroundColor: module.level === 'Beginner' ? '#e3f2fd' : 
                                        module.level === 'Intermediate' ? '#fff8e1' : '#fbe9e7',
                        color: module.level === 'Beginner' ? '#0277bd' : 
                              module.level === 'Intermediate' ? '#ff8f00' : '#e64a19',
                        fontWeight: 500
                      }} 
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {module.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
        <Grid item xs={12} textAlign="center">
          <Button 
            component={Link} 
            to="/modules" 
            variant="outlined" 
            color="primary" 
            endIcon={<ArrowForward />}
          >
            Explore All Modules
          </Button>
        </Grid>
      </Grid>

      {/* VLSI Career Paths */}
      <Typography variant="h4" component="h2" gutterBottom color="primary" sx={{ mb: 4 }}>
        VLSI Career Paths
      </Typography>
      <Grid container spacing={4} sx={{ mb: 6 }}>
        {careerPaths.map((career, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper elevation={3} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box sx={{ 
                  backgroundColor: 'rgba(106, 13, 173, 0.1)', 
                  borderRadius: '50%', 
                  p: 1,
                  mr: 2,
                  color: '#6a0dad'
                }}>
                  {career.icon}
                </Box>
                <Typography variant="h6" component="h3">
                  {career.title}
                </Typography>
              </Box>
              <Typography variant="body2" paragraph>
                {career.description}
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>Key Skills:</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {career.skills.map((skill, i) => (
                    <Chip key={i} label={skill} size="small" sx={{ backgroundColor: 'rgba(106, 13, 173, 0.08)', fontSize: '0.7rem' }} />
                  ))}
                </Box>
              </Box>
              <Box sx={{ mt: 'auto' }}>
                <Divider sx={{ my: 1 }} />
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">Salary Range:</Typography>
                    <Typography variant="body2" fontWeight="medium">{career.salary}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">Market Demand:</Typography>
                    <Typography variant="body2" fontWeight="medium">{career.demand}</Typography>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Industry Trends */}
      <Typography variant="h4" component="h2" gutterBottom color="primary" sx={{ mb: 4 }}>
        Current VLSI Industry Trends
      </Typography>
      <Grid container spacing={4} sx={{ mb: 6 }}>
        {industryTrends.map((trend, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Paper elevation={2} sx={{ p: 3, borderLeft: '4px solid #6a0dad' }}>
              <Typography variant="h6" gutterBottom>
                {trend.title}
              </Typography>
              <Typography variant="body2" paragraph>
                {trend.description}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">Industry Impact:</Typography>
                  <Typography variant="body2" fontWeight="medium">{trend.impact}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">Timeframe:</Typography>
                  <Typography variant="body2" fontWeight="medium">{trend.timeframe}</Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Try it out section */}
      <Typography variant="h4" component="h2" gutterBottom color="primary" sx={{ mb: 4 }}>
        Try It Yourself
      </Typography>
      <Grid container spacing={4} sx={{ mb: 6 }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            4-bit ALU Implementation
          </Typography>
          <Typography paragraph>
            This example demonstrates a 4-bit ALU implementation in Verilog that supports addition, subtraction, AND, and OR operations.
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            The ALU is a fundamental building block in processor design. This implementation provides the core arithmetic and logic operations used in CPU execution units.
          </Typography>
          <Button 
            component={Link} 
            to="/editor" 
            variant="contained" 
            color="primary"
            endIcon={<Code />}
            sx={{ mr: 2 }}
          >
            Open in Editor
          </Button>
          <Button 
            component={Link} 
            to="/modules/7" 
            variant="outlined"
            color="primary"
          >
            Learn More About ALUs
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 2, 
              backgroundColor: '#f8f8f8',
              fontFamily: 'monospace',
              overflow: 'auto',
              maxHeight: '300px'
            }}
          >
            <pre>{codeExample}</pre>
          </Paper>
        </Grid>
      </Grid>

      {/* Call to Action */}
      <Box sx={{ textAlign: 'center', py: 6, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          Ready to advance your VLSI career?
        </Typography>
        <Typography paragraph sx={{ maxWidth: '800px', mx: 'auto', mb: 3 }}>
          Join thousands of professionals mastering Verilog and advanced VLSI design concepts with VeriGeek. 
          Our platform provides the industry-relevant skills you need to excel in hardware design roles.
        </Typography>
        <Box>
          <Button 
            component={Link} 
            to="/register" 
            variant="contained" 
            color="primary"
            size="large"
            sx={{ mr: 2 }}
          >
            Sign Up Free
          </Button>
          <Button 
            component={Link} 
            to="/modules" 
            variant="outlined"
            color="primary"
            size="large"
            endIcon={<MenuBook />}
          >
            Browse Modules
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Home; 