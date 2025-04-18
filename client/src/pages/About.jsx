import React, { useContext, useEffect } from 'react';
import {
  Container, Typography, Box, Grid, Paper, Avatar,
  Divider, Button, Chip, Stack, Fade, Grow, Zoom,
  useScrollTrigger, Slide
} from '@mui/material';
import {
  People, School, Work, Code, 
  EmojiEvents, Engineering, ArrowRightAlt,
  Rocket, Favorite, Public, Brush
} from '@mui/icons-material';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import AuthContext from '../context/AuthContext';

// Animated component wrapper
const AnimatedBox = ({ children, delay = 0 }) => {
  const context = useContext(AuthContext)
  context.ScrollToTop()
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 20 }
      }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
};

// Floating animation for avatars
const FloatingAvatar = ({ src, alt }) => {
  return (
    <motion.div
      animate={{
        y: [0, -15, 0]
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <Avatar 
        src={src} 
        alt={alt}
        sx={{ 
          width: 120, 
          height: 120,
          border: '4px solid #fff',
          boxShadow: '0 10px 30px rgba(106, 13, 173, 0.2)'
        }}
      />
    </motion.div>
  );
};

const About = () => {
  const teamMembers = [
    {
      name: 'Om Maheshwari',
      role: 'Founder & Lead Developer',
      bio: 'Full-stack developer with expertise in React, Node.js, and cloud technologies. Passionate about creating elegant solutions to complex problems.',
      avatar: '/path/to/avatar1.jpg',
      skills: ['React', 'Node.js', 'AWS']
    },
    
  ];

  const features = [
    { 
      icon: <Code fontSize="large" />, 
      title: 'Innovative Technology', 
      description: 'We leverage cutting-edge technologies to build robust solutions that stand the test of time.',
      color: 'linear-gradient(135deg, #6a0dad 0%, #9c27b0 100%)'
    },
    { 
      icon: <School fontSize="large" />, 
      title: 'Educational Focus', 
      description: 'Committed to knowledge sharing and continuous learning through workshops and open-source.',
      color: 'linear-gradient(135deg, #2196F3 0%, #21CBF3 100%)'
    },
    { 
      icon: <Work fontSize="large" />, 
      title: 'Professional Excellence', 
      description: 'Delivering high-quality work with meticulous attention to detail and craftsmanship.',
      color: 'linear-gradient(135deg, #FF9800 0%, #FFC107 100%)'
    },
    { 
      icon: <People fontSize="large" />, 
      title: 'Community Driven', 
      description: 'Building products that solve real problems for real people, with inclusivity at our core.',
      color: 'linear-gradient(135deg, #4CAF50 0%, #8BC34A 100%)'
    }
  ];

  const milestones = [
    { 
      year: '2025', 
      event: 'Founded the company', 
      icon: <Rocket />,
      detail: 'Started with just 3 people in a small office with big dreams'
    },
    // { 
    //   year: '2021', 
    //   event: 'Launched first product', 
    //   icon: <Engineering />,
    //   detail: 'Our MVP gained 1,000 users in the first month'
    // },
    // { 
    //   year: '2022', 
    //   event: 'Reached 10,000 users', 
    //   icon: <Public />,
    //   detail: 'Expanded to 3 new countries with localized versions'
    // },
    // { 
    //   year: '2023', 
    //   event: 'Expanded team', 
    //   icon: <People />,
    //   detail: 'Grew to 15 talented professionals across 4 departments'
    // }
  ];

  const stats = [
    { value: '15+', label: 'Team Members', icon: <People /> },
    { value: '50+', label: 'Projects Completed', icon: <Work /> },
    { value: '10K+', label: 'Active Users', icon: <Favorite /> },
    { value: '5', label: 'Countries Served', icon: <Public /> }
  ];

  return (
    <Box className="bg-gray-50 overflow-hidden">
      {/* Animated background elements */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2 }}
      >
        <Box className="absolute top-20 left-10 w-40 h-40 rounded-full bg-purple-200 blur-3xl" />
        <Box className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-indigo-200 blur-3xl" />
      </motion.div>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Hero Section */}
        <Box className="text-center py-20 relative">
          <AnimatedBox>
            <Typography 
              variant="h2" 
              component="h1" 
              className="font-extrabold mb-6"
              sx={{
                background: 'linear-gradient(45deg, #6a0dad 30%, #9c27b0 90%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '2.5rem', md: '3.5rem' }
              }}
            >
              Crafting Digital Excellence
            </Typography>
          </AnimatedBox>
          
          <AnimatedBox delay={0.2}>
            <Typography 
              variant="h5" 
              className="text-gray-600 max-w-2xl mx-auto mb-8"
              sx={{ fontWeight: 400 }}
            >
              
            </Typography>
          </AnimatedBox>
          
          <AnimatedBox delay={0.4}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="contained" 
                color="primary" 
                size="large"
                endIcon={<ArrowRightAlt />}
                sx={{
                  py: 1.5,
                  px: 5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  boxShadow: '0 4px 20px rgba(106, 13, 173, 0.3)'
                }}
                href="/"
              >
                Explore Our Work
              </Button>
            </motion.div>
          </AnimatedBox>
        </Box>

        {/* Stats Section */}
        <Box className="mb-24">
          <Grid container spacing={4} justifyContent="center">
            {stats.map((stat, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <AnimatedBox delay={index * 0.1}>
                  <Paper 
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      textAlign: 'center',
                      background: 'rgba(255, 255, 255, 0.7)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)'
                    }}
                  >
                    <Box 
                      sx={{
                        display: 'inline-flex',
                        p: 2,
                        mb: 2,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, rgba(106, 13, 173, 0.1) 0%, rgba(156, 39, 176, 0.1) 100%)'
                      }}
                    >
                      {stat.icon}
                    </Box>
                    <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                      {stat.label}
                    </Typography>
                  </Paper>
                </AnimatedBox>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Our Story */}
        <Box className="mb-24">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <AnimatedBox>
                <Typography 
                  variant="h3" 
                  sx={{ 
                    fontWeight: 700,
                    mb: 4,
                    position: 'relative',
                    display: 'inline-block',
                    '&:after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -8,
                      left: 0,
                      width: '60%',
                      height: 4,
                      background: 'linear-gradient(90deg, #6a0dad, #9c27b0)',
                      borderRadius: 2
                    }
                  }}
                >
                  Our Story
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3, fontSize: '1.1rem' }}>
                  Founded in 2025, we started as a small team of developers with a vision to create technology that empowers people. 
                  What began as a passion project has grown into a thriving business serving clients worldwide.
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, fontSize: '1.1rem' }}>
                  Our journey hasn't been easy, but every challenge has made us stronger and more determined to deliver exceptional 
                  value to our customers. We believe in the power of technology to transform businesses and improve lives.
                </Typography>
                <motion.div whileHover={{ x: 5 }}>
                  
                </motion.div>
              </AnimatedBox>
            </Grid>
            <Grid item xs={12} md={6}>
              <AnimatedBox delay={0.3}>
                <motion.div whileHover={{ scale: 1.02 }}>
                  <Paper 
                    elevation={6}
                    sx={{
                      p: 2,
                      borderRadius: 3,
                      overflow: 'hidden',
                      position: 'relative',
                      minHeight: 400,
                      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
                    }}
                  >
                    <Box 
                      sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: '100%',
                        height: '100%',
                        backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(106, 13, 173, 0.1) 0%, transparent 30%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          color: 'text.secondary',
                          textAlign: 'center',
                          maxWidth: '70%'
                        }}
                      >
                        [Interactive company timeline visualization]
                      </Typography>
                    </Box>
                  </Paper>
                </motion.div>
              </AnimatedBox>
            </Grid>
          </Grid>
        </Box>

        {/* Our Values */}
        <Box className="mb-24">
          <AnimatedBox>
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 700,
                mb: 8,
                textAlign: 'center',
                position: 'relative',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -12,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '100px',
                  height: 4,
                  background: 'linear-gradient(90deg, #6a0dad, #9c27b0)',
                  borderRadius: 2
                }
              }}
            >
              Our Core Values
            </Typography>
          </AnimatedBox>
          
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <AnimatedBox delay={index * 0.1}>
                  <motion.div whileHover={{ y: -10 }}>
                    <Paper 
                      elevation={4}
                      sx={{
                        p: 4,
                        borderRadius: 3,
                        height: '100%',
                        textAlign: 'center',
                        background: feature.color,
                        color: 'white',
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-10px)'
                        }
                      }}
                    >
                      <Box 
                        sx={{
                          display: 'inline-flex',
                          p: 2,
                          mb: 3,
                          borderRadius: '50%',
                          background: 'rgba(255, 255, 255, 0.2)'
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Typography 
                        variant="h5" 
                        sx={{ 
                          fontWeight: 600,
                          mb: 2,
                          minHeight: 72,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography variant="body1" sx={{ opacity: 0.9 }}>
                        {feature.description}
                      </Typography>
                    </Paper>
                  </motion.div>
                </AnimatedBox>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Our Team */}
        <Box className="mb-24">
          <AnimatedBox>
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 700,
                mb: 8,
                textAlign: 'center',
                position: 'relative',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -12,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '100px',
                  height: 4,
                  background: 'linear-gradient(90deg, #6a0dad, #9c27b0)',
                  borderRadius: 2
                }
              }}
            >
              Meet Our Team
            </Typography>
          </AnimatedBox>
          
          <Grid container spacing={4} justifyContent="center">
            {teamMembers.map((member, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <AnimatedBox delay={index * 0.2}>
                  <motion.div whileHover={{ scale: 1.03 }}>
                    <Paper 
                      elevation={6}
                      sx={{
                        p: 4,
                        borderRadius: 3,
                        height: '100%',
                        textAlign: 'center',
                        background: 'white',
                        position: 'relative',
                        overflow: 'hidden',
                        '&:before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: 8,
                          background: 'linear-gradient(90deg, #6a0dad, #9c27b0)'
                        }
                      }}
                    >
                      <Box sx={{ mb: 3 }}>
                        <FloatingAvatar src={member.avatar} alt={member.name} />
                      </Box>
                      <Typography 
                        variant="h5" 
                        sx={{ 
                          fontWeight: 700,
                          mb: 1
                        }}
                      >
                        {member.name}
                      </Typography>
                      <Chip 
                        label={member.role} 
                        color="primary" 
                        sx={{ 
                          mb: 2,
                          fontWeight: 500,
                          background: 'linear-gradient(90deg, rgba(106, 13, 173, 0.1), rgba(156, 39, 176, 0.1))',
                          color: 'primary.main'
                        }}
                      />
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          color: 'text.secondary',
                          mb: 3,
                          minHeight: 80
                        }}
                      >
                        {member.bio}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 1 }}>
                        {member.skills.map((skill, i) => (
                          <Chip
                            key={i}
                            label={skill}
                            size="small"
                            variant="outlined"
                            sx={{ 
                              borderColor: 'primary.main',
                              color: 'primary.main'
                            }}
                          />
                        ))}
                      </Box>
                    </Paper>
                  </motion.div>
                </AnimatedBox>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Milestones */}
        <Box className="mb-24">
          <AnimatedBox>
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 700,
                mb: 8,
                textAlign: 'center',
                position: 'relative',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -12,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '100px',
                  height: 4,
                  background: 'linear-gradient(90deg, #6a0dad, #9c27b0)',
                  borderRadius: 2
                }
              }}
            >
              Our Journey
            </Typography>
          </AnimatedBox>
          
          <AnimatedBox delay={0.2}>
            <Paper 
              elevation={4}
              sx={{
                p: { xs: 3, md: 6 },
                borderRadius: 4,
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(245, 245, 245, 0.9) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)'
              }}
            >
              <Box className="relative">
                {/* Animated timeline line */}
                <motion.div
                  className="absolute left-1/2 h-full w-1 bg-gradient-to-b from-purple-500 to-purple-300 transform -translate-x-1/2"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />
                
                <Stack spacing={8}>
                  {milestones.map((milestone, index) => (
                    <Box 
                      key={index} 
                      className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center`}
                    >
                      <Box className="w-1/2 p-4" sx={{ position: 'relative', zIndex: 1 }}>
                        <AnimatedBox delay={index * 0.3}>
                          <motion.div whileHover={{ scale: 1.02 }}>
                            <Paper 
                              elevation={3}
                              sx={{
                                p: 3,
                                borderRadius: 3,
                                background: 'white',
                                position: 'relative',
                                overflow: 'hidden',
                                '&:before': {
                                  content: '""',
                                  position: 'absolute',
                                  top: 0,
                                  left: 0,
                                  width: 4,
                                  height: '100%',
                                  background: 'linear-gradient(to bottom, #6a0dad, #9c27b0)'
                                }
                              }}
                            >
                              <Box className="flex items-center text-purple-600 mb-2">
                                {milestone.icon}
                                <Typography 
                                  variant="h5" 
                                  className="font-semibold ml-2"
                                  sx={{ color: 'primary.main' }}
                                >
                                  {milestone.year}
                                </Typography>
                              </Box>
                              <Typography 
                                variant="h6" 
                                sx={{ 
                                  fontWeight: 600,
                                  mb: 1
                                }}
                              >
                                {milestone.event}
                              </Typography>
                              <Typography 
                                variant="body2" 
                                sx={{ 
                                  color: 'text.secondary'
                                }}
                              >
                                {milestone.detail}
                              </Typography>
                            </Paper>
                          </motion.div>
                        </AnimatedBox>
                      </Box>
                      <Box className="w-1/2 flex justify-center" sx={{ position: 'relative' }}>
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ 
                            type: 'spring',
                            stiffness: 260,
                            damping: 20,
                            delay: index * 0.3 + 0.5
                          }}
                        >
                          <Box 
                            className="w-6 h-6 rounded-full bg-purple-600 border-4 border-purple-100"
                            sx={{
                              boxShadow: '0 0 0 8px rgba(106, 13, 173, 0.1)'
                            }}
                          />
                        </motion.div>
                      </Box>
                      <Box className="w-1/2" /> {/* Spacer */}
                    </Box>
                  ))}
                </Stack>
              </Box>
            </Paper>
          </AnimatedBox>
        </Box>

        {/* CTA */}
        <Box className="text-center py-16">
          <AnimatedBox>
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 700,
                mb: 3,
                background: 'linear-gradient(45deg, #6a0dad 30%, #9c27b0 90%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Ready to Build Something Amazing?
            </Typography>
          </AnimatedBox>
          
          <AnimatedBox delay={0.2}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'text.secondary',
                mb: 6,
                maxWidth: 600,
                mx: 'auto',
                fontWeight: 400
              }}
            >
              Whether you're looking to join our team or collaborate on a project, we'd love to hear from you.
            </Typography>
          </AnimatedBox>
          
          <AnimatedBox delay={0.4}>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="contained" 
                  color="primary" 
                  size="large"
                  endIcon={<ArrowRightAlt />}
                  sx={{
                    py: 1.5,
                    px: 5,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    boxShadow: '0 4px 20px rgba(106, 13, 173, 0.3)'
                  }}
                  href="/contact"
                >
                  Join Our Team
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="outlined" 
                  color="primary" 
                  size="large"
                  sx={{
                    py: 1.5,
                    px: 5,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    borderWidth: 2,
                    '&:hover': {
                      borderWidth: 2
                    }
                  }}
                  href="/contact"
                >
                  Contact Us
                </Button>
              </motion.div>
            </Box>
          </AnimatedBox>
        </Box>
      </Container>
    </Box>
  );
};

export default About;