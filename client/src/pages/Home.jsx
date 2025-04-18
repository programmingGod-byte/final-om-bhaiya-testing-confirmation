import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowForward, 
  Code, 
  School, 
  Forum, 
  MenuBook, 
  Work, 
  Timeline, 
  Assessment, 
  Engineering, 
  Devices, 
  Speed, 
  Memory 
} from '@mui/icons-material';
import { Box, Typography, Button, Grid, Paper, Card, CardContent, CardMedia, CardActionArea, Chip, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import AnimatedFeatureIcon from "../components/AnimatedFeatureIcon.jsx"
// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren"
    }
  }
}; 

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } }
};

const slideUp = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
};

const Home = () => {
  // Your existing data arrays (featuredModules, careerPaths, industryTrends, codeExample) remain the same
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
    <motion.div 
  className="container page-container"
  initial="hidden"
  animate="visible"
>
  {/* Hero Section */}
  <Box 
    component={motion.div}
    sx={{ 
      textAlign: 'center', 
      py: 8,
      background: 'linear-gradient(to right,#8e44ad,#6a0dad)',
      color: 'white',
      borderRadius: 2,
      mb: 6,
      position: 'relative',
      overflow: 'hidden'
    }}
  >
    {/* Floating Circuit Particles Background */}
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', opacity: 0.3 }}>
      {Array(30).fill(0).map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            borderRadius: '50%',
            backgroundColor: 'rgb(216, 180, 254)',
            width: `${Math.random() * 5 + 2}px`,
            height: `${Math.random() * 5 + 2}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [(Math.random() - 0.5) * 50],
            y: [(Math.random() - 0.5) * 50],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'linear',
          }}
        />
      ))}
    </div>

    {/* Animated Glow Effect */}
    <motion.div
      style={{ 
        position: 'absolute',
        inset: 0,
        opacity: 0.2,
        pointerEvents: 'none'
      }}
      animate={{
        background: [
          'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.8) 0%, rgba(142,68,173,0) 70%)',
          'radial-gradient(circle at 80% 30%, rgba(255,255,255,0.8) 0%, rgba(142,68,173,0) 70%)',
          'radial-gradient(circle at 50% 80%, rgba(255,255,255,0.8) 0%, rgba(142,68,173,0) 70%)',
          'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.8) 0%, rgba(142,68,173,0) 70%)',
        ],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "linear",
      }}
    />

    {/* Content Container */}
    <motion.div 
      style={{ position: 'relative', zIndex: 10 }}
      variants={{
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1,
          transition: { 
            staggerChildren: 0.2,
            when: "beforeChildren"
          }
        }
      }}
    >
      {/* Logo and Title */}
      <Box 
        component={motion.div}
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          mb: 2 
        }}
        variants={{
          hidden: { y: -50, opacity: 0 },
          visible: { 
            y: 0, 
            opacity: 1,
            transition: { 
              type: "spring",
              stiffness: 100,
              damping: 10
            }
          }
        }}
      >
        <Box 
          component={motion.img}
          src="/images/BACKGROUNDLESS_LOGO.png" 
          alt="VeriGeek Logo" 
          sx={{ 
            height: 60, 
            mr: 2,
            
          }}
          initial={{ scale: 0.8, rotate: -15 }}
          animate={{ 
            scale: 1, 
            rotate: 0,
            transition: { 
              type: "spring",
              stiffness: 300,
              delay: 0.2
            }
          }}
          whileHover={{
            rotate: [0, 5, -5, 0],
            transition: { duration: 0.5 }
          }}
        />
        <Typography 
          component={motion.h1}
          variant="h2" 
          gutterBottom 
          fontWeight="bold" 
          sx={{ mb: 0 }}
          initial={{ x: 30, opacity: 0 }}
          animate={{ 
            x: 0, 
            opacity: 1,
            transition: { 
              type: "spring",
              stiffness: 100,
              delay: 0.3
            }
          }}
        >
          VeriGeek
        </Typography>
      </Box>

      {/* Tagline */}
      <Typography 
        component={motion.p}
        variant="h5" 
        sx={{ fontStyle: 'italic', mb: 3 }}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
              delay: 0.5,
              type: "spring",
              stiffness: 50
            }
          }
        }}
      >
        Empower Your Logic, Code Your Circuit!
      </Typography>

      {/* Description */}
      <Typography 
        component={motion.p}
        variant="h5" 
        gutterBottom 
        sx={{ maxWidth: '800px', mx: 'auto', mb: 4 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          transition: { 
            delay: 0.7,
            type: "spring",
            stiffness: 50
          }
        }}
      >
        Master digital design with comprehensive Verilog modules, hands-on exercises, and industry-relevant skills
      </Typography>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ 
          opacity: 1, 
          y: 0, 
          scale: 1,
          transition: { 
            delay: 0.9,
            type: "spring",
            stiffness: 200
          }
        }}
        whileHover={{ 
          scale: 1.05,
          transition: { duration: 0.3 }
        }}
        whileTap={{ scale: 0.95 }}
      >
        <Button 
          component={Link} 
          to="/modules" 
          variant="contained" 
          size="large"
          endIcon={
            <motion.span
              initial={{ x: 0 }}
              animate={{ x: [0, 5, 0] }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3
              }}
            >
              <ArrowForward />
            </motion.span>
          }
          sx={{ 
            backgroundColor: 'white', 
            color: '#6a0dad',
            '&:hover': {
              backgroundColor: '#f0f0f0',
            },
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <motion.span
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.7), transparent)'
            }}
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.8 }}
          />
          Start Learning
        </Button>
      </motion.div>
    </motion.div>

    {/* Animated Circuit Line */}
    <motion.div 
      style={{ 
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '2px',
        background: 'linear-gradient(to right, rgb(216, 180, 254), rgb(192, 132, 252))'
      }}
      initial={{ scaleX: 0, originX: 0 }}
      animate={{ 
        scaleX: 1,
        transition: { 
          duration: 1.5,
          delay: 0.5,
          ease: [0.22, 1, 0.36, 1]
        }
      }}
    /> 
  </Box>

        
        {/* Animated circuit line at bottom */}
        {/* <motion.div 
          className="absolute bottom-0 left-0 w-full h-1 bg-purple-300"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.5, delay: 1 }}
        />
      </motion.div> */}

      {/* Features Section */}
      <motion.div variants={containerVariants}>
  <motion.h2 
    variants={itemVariants}
    className="text-3xl mb-8 text-purple-800 text-center font-bold"
  >
    What We Offer
    <motion.span 
      className="block h-1 w-24 bg-purple-600 mx-auto mt-2 rounded-full"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    />
  </motion.h2>
  
  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
    {[
      { 
        icon: <School className="text-6xl" style={{ color: '#6a0dad' }} />, 
        title: 'Industry-Relevant Modules', 
        desc: 'Comprehensive curriculum covering beginner to expert topics.' 
      },
      { 
        icon: <Code className="text-6xl" style={{ color: '#6a0dad' }} />, 
        title: 'Interactive Code Editor', 
        desc: 'Simulate and debug Verilog code with our browser-based editor.' 
      },
      { 
        icon: <Forum className="text-6xl" style={{ color: '#6a0dad' }} />, 
        title: 'Expert Community', 
        desc: 'Connect with industry professionals and discuss VLSI topics.' 
      },
      { 
        icon: <Work className="text-6xl" style={{ color: '#6a0dad' }} />, 
        title: 'Career Resources', 
        desc: 'Gain insights into VLSI career paths and industry trends.' 
      }
    ].map((feature, index) => (
      <motion.div 
        key={index}
        variants={itemVariants}
        whileHover={{ 
          y: -8, 
          boxShadow: '0 15px 30px -10px rgba(106, 13, 173, 0.3)',
          transition: { duration: 0.3 }
        }}
        className="p-6 h-full flex flex-col items-center text-center shadow-md rounded-md bg-white"
      >
        <AnimatedFeatureIcon 
          icon={feature.icon} 
          color="#6a0dad" 
        />
        
        <motion.h3 
          className="text-xl mb-2 font-semibold mt-4"
          whileHover={{ color: '#6a0dad' }}
          transition={{ duration: 0.2 }}
        >
          {feature.title}
        </motion.h3>
        
        <motion.p
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          {feature.desc}
        </motion.p>
      </motion.div>
    ))}
  </div>
</motion.div>

      {/* Featured Modules */}
      <motion.div variants={containerVariants}>
        <motion.h2 
          variants={itemVariants}
          className="text-3xl mb-8 text-purple-800 text-center font-bold"
        >
          Featured Modules
          <motion.span 
            className="block h-1 w-24 bg-purple-600 mx-auto mt-2 rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
        </motion.h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-12">
          {featuredModules.map((module, index) => (
            <motion.div 
              key={module.id}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="h-full"
            >
              <div className="h-full shadow-lg rounded-md overflow-hidden bg-white transition-all duration-300 hover:shadow-xl">
                <Link to={`/modules/${module.id}`} className="block">
                  <motion.img
                    className="w-full h-48 object-cover"
                    src={module.image}
                    alt={module.title}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="p-5">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-lg font-semibold">
                        {module.title}
                      </h3>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        module.level === 'Beginner' ? 'bg-blue-50 text-blue-800' : 
                        module.level === 'Intermediate' ? 'bg-amber-50 text-amber-800' : 'bg-red-50 text-red-800'
                      }`}>
                        {module.level}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      {module.description}
                    </p>
                    <motion.div 
                      whileHover={{ x: 5 }}
                      className="text-purple-600 hover:text-purple-800 text-sm font-medium flex items-center"
                    >
                      Learn More
                      <ArrowForward size={16} className="ml-1" />
                    </motion.div>
                  </div>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-6"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link 
            to="/modules" 
            className="inline-flex items-center px-6 py-3 border border-purple-600 text-purple-600 rounded-md hover:bg-purple-50 transition-colors duration-300 font-medium"
          >
            Explore All Modules
            <ArrowForward className="ml-2" />
          </Link>
        </motion.div>
      </motion.div>

      {/* VLSI Career Paths */}
      <motion.div 
        variants={containerVariants}
        className="mt-16"
      >
        <motion.h2 
          variants={itemVariants}
          className="text-3xl mb-8 text-purple-800 text-center font-bold"
        >
          VLSI Career Paths
          <motion.span 
            className="block h-1 w-24 bg-purple-600 mx-auto mt-2 rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
        </motion.h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
  {careerPaths.map((career, index) => (
    <motion.div 
      key={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            delay: index * 0.1,
            type: "spring",
            stiffness: 100,
            damping: 10
          }
        }
      }}
      whileHover={{ 
        y: -10,
        scale: 1.05,
        transition: { 
          type: "spring", 
          stiffness: 400,
          damping: 10
        }
      }}
      className="p-6 h-full flex flex-col shadow-md rounded-md bg-white hover:shadow-lg"
      style={{
        transformOrigin: "center bottom",
        zIndex: 1
      }}
    >
      <div className="flex items-center mb-3">
        <motion.div 
          className="bg-purple-100 rounded-full p-2 mr-3 text-purple-800"
          variants={{
            hidden: { scale: 0.8, rotate: -10 },
            visible: { 
              scale: 1, 
              rotate: 0,
              transition: { type: "spring", stiffness: 200 }
            }
          }}
          whileHover={{ 
            rotate: 15,
            scale: 1.1,
            transition: { type: "spring", bounce: 0.5 }
          }}
        >
          {career.icon}
        </motion.div>
        <motion.h3 
          className="text-lg font-semibold"
          variants={{
            hidden: { opacity: 0, x: 10 },
            visible: { 
              opacity: 1, 
              x: 0,
              transition: { delay: 0.1 }
            }
          }}
        >
          {career.title}
        </motion.h3>
      </div>
      
      <motion.p 
        className="text-sm mb-4"
        variants={{
          hidden: { opacity: 0, y: 5 },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: { delay: 0.2 }
          }
        }}
      >
        {career.description}
      </motion.p>
      
      <motion.div 
        className="mb-4"
        variants={{
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: { delay: 0.3 }
          }
        }}
      >
        <p className="text-xs font-semibold mb-2">Key Skills:</p>
        <div className="flex flex-wrap gap-2">
          {career.skills.map((skill, i) => (
            <motion.span 
              key={i} 
              className="text-xs px-2 py-1 rounded-full bg-purple-50 border border-purple-100"
              variants={{
                hidden: { scale: 0 },
                visible: { 
                  scale: 1,
                  transition: { 
                    delay: 0.3 + (i * 0.05),
                    type: "spring",
                    stiffness: 300
                  }
                }
              }}
              whileHover={{ 
                scale: 1.1,
                backgroundColor: "rgba(233, 213, 255, 1)",
                transition: { type: "spring", stiffness: 500 }
              }}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </motion.div>
      
      <motion.div 
        className="mt-auto"
        variants={{
          hidden: { opacity: 0, y: 10 },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: { delay: 0.4 }
          }
        }}
      >
        <motion.hr 
          className="my-3 border-t border-gray-200"
          variants={{
            hidden: { scaleX: 0 },
            visible: { 
              scaleX: 1,
              transition: { delay: 0.4 }
            }
          }}
        />
        <div className="grid grid-cols-2 gap-2">
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -10 },
              visible: { 
                opacity: 1, 
                x: 0,
                transition: { delay: 0.5 }
              }
            }}
          >
            <p className="text-xs text-gray-500">Salary Range:</p>
            <p className="text-sm font-medium">{career.salary}</p>
          </motion.div>
          <motion.div
            variants={{
              hidden: { opacity: 0, x: 10 },
              visible: { 
                opacity: 1, 
                x: 0,
                transition: { delay: 0.6 }
              }
            }}
          >
            <p className="text-xs text-gray-500">Market Demand:</p>
            <p className="text-sm font-medium">{career.demand}</p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  ))}
</div>
      </motion.div>

      {/* Industry Trends */}
      <motion.div 
        variants={containerVariants}
        className="relative py-12 px-6 mb-12 rounded-lg"
        style={{ background: 'linear-gradient(to right, rgba(142, 68, 173, 0.05), rgba(106, 13, 173, 0.1))' }}
      >
        <motion.h2 
          variants={itemVariants}
          className="text-3xl mb-8 text-purple-800 text-center font-bold"
        >
          Current VLSI Industry Trends
          <motion.span 
            className="block h-1 w-24 bg-purple-600 mx-auto mt-2 rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
        </motion.h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
  {industryTrends.map((trend, index) => (
    <motion.div 
      key={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-50px", amount:0.2 }}
      
      variants={{
        hidden: { 
          opacity: 0, 
          y: 20,
          rotateX: -5,
          scale: 0.98
        },
        visible: {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          transition: {
            delay: index * 0.15,
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1]
          }
        }
      }}
      whileHover={{ 
        scale: 1.02,
        y: -3,
        boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.2)",
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 15
        }
      }}
      className="p-6 shadow-md rounded-md bg-white border-l-4 border-purple-800 transition-all duration-100"
      style={{
        transformOrigin: "center bottom",
        transformStyle: "preserve-3d"
      }}
    >
      <motion.h3 
        className="text-lg font-semibold mb-3"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.15 + 0.1 }}
      >
        {trend.title}
      </motion.h3>
      
      <motion.p 
        className="text-sm mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.15 + 0.2 }}
      >
        {trend.description}
      </motion.p>
      
      <motion.div 
        className="grid grid-cols-2 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.15 + 0.3 }}
      >
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.15 + 0.35 }}
        >
          <p className="text-xs text-gray-500">Industry Impact:</p>
          <motion.p 
            className="text-sm font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.15 + 0.4 }}
          >
            {trend.impact}
          </motion.p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.15 + 0.35 }}
        >
          <p className="text-xs text-gray-500">Timeframe:</p>
          <motion.p 
            className="text-sm font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.15 + 0.4 }}
          >
            {trend.timeframe}
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Subtle glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-md pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ 
          opacity: 0.1,
          background: "radial-gradient(circle at center, rgba(139, 92, 246, 0.4) 0%, transparent 70%)"
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  ))}
</div>
        
        {/* Animated circuit background */}
        <motion.div 
          className="absolute inset-0 w-full h-full pointer-events-none opacity-10"
          animate={{ 
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(106, 13, 173, 0.1) 1px, transparent 1px),
              linear-gradient(rgba(106, 13, 173, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}
        />
      </motion.div>

      {/* Try it out section */}
      <motion.div 
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
      >
        <motion.div variants={itemVariants}>
          <motion.h2 
            className="text-3xl mb-6 text-purple-800 font-bold"
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Try It Yourself
          </motion.h2>
          <motion.h3 
            className="text-xl mb-4"
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            4-bit ALU Implementation
          </motion.h3>
          <motion.p 
            className="mb-4"
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            This example demonstrates a 4-bit ALU implementation in Verilog that supports addition, subtraction, AND, and OR operations.
          </motion.p>
          <motion.p 
            className="text-sm text-gray-600 mb-6"
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            The ALU is a fundamental building block in processor design. This implementation provides the core arithmetic and logic operations used in CPU execution units.
          </motion.p>
          <motion.div 
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Link 
              to="/workspace" 
              className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-300"
            >
              Open in Editor
              <Code className="ml-2" />
            </Link>
            <Link 
              to="/modules/7" 
              className="inline-flex items-center px-6 py-3 border border-purple-600 text-purple-600 rounded-md hover:bg-purple-50 transition-colors duration-300"
            >
              Learn More About ALUs
            </Link>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="relative"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="p-6  text-purple-900 font-mono text-sm overflow-auto max-h-96 rounded-md shadow-lg">
            <pre>{codeExample}</pre>
          </div>
          <motion.div 
            className="absolute top-0 right-0 mt-2 mr-2 bg-purple-600 text-white text-xs px-2 py-1 rounded"
            animate={{ 
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            Verilog
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Call to Action */}
      <motion.div 
        className="text-center py-12 px-6 mb-12 bg-gradient-to-r from-purple-900 to-purple-600 rounded-lg relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Floating particles animation */}
        <motion.div 
          className="absolute inset-0 opacity-20"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundImage: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.3) 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}
        />
        
        <div className="relative z-10">
          <motion.h2 
            className="text-3xl md:text-4xl mb-6 text-white font-bold"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Ready to advance your VLSI career?
          </motion.h2>
          <motion.p 
            className="mb-8 max-w-4xl mx-auto text-white opacity-90"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Join thousands of professionals mastering Verilog and advanced VLSI design concepts with VeriGeek. 
            Our platform provides the industry-relevant skills you need to excel in hardware design roles.
          </motion.p>
          <motion.div 
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            
            <Link 
              to="/modules" 
              className="inline-flex items-center px-8 py-4 border border-white text-white rounded-md hover:bg-purple-800 transition-all duration-300 font-medium"
            >
              Browse Modules
              <MenuBook className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Home;