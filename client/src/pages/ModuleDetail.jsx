import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import hljs from 'highlight.js';
import 'highlight.js/styles/googlecode.css';

// Import Verilog highlighting - make sure you have this installed
import 'highlight.js/lib/languages/verilog';

import { 
  Box, Typography, Button, Grid, Card, CardContent, Breadcrumbs, 
  Tabs, Tab, List, ListItem, ListItemIcon, ListItemText, Divider, 
  Chip, Rating, Avatar, LinearProgress, Paper, Accordion, AccordionSummary, AccordionDetails, Snackbar
} from '@mui/material';
import toast, { Toaster } from "react-hot-toast";
import { 
  PlayArrow, Assignment, MenuBook, Check, PlayCircleOutline, 
  BarChart, People, Schedule, AutoStories, ArrowBack, BookmarkAdd, ExpandMore, Code, 
  BookOutlined, CodeOutlined, QuizOutlined, AssignmentIndOutlined, CheckCircleOutline, Assessment
} from '@mui/icons-material';

// Import the module data
import { getModuleById } from '../data/modules';
import { getModuleProgress, initializeProgressData } from '../utils/progressTracker';
import URLSITE from '../constant';
import AuthContext from '../context/AuthContext';



const OverviewText = ({ text }) => {
  const [showFull, setShowFull] = useState(false);

  const words = text.split(' ');
  const isLong = words.length > 40;
  const displayedText = showFull ? text : words.slice(0, 60).join(' ') + (isLong ? '...' : '');

  return (
    <>
      <Typography paragraph sx={{ fontSize: '1.05rem', lineHeight: 1.6 }}>
        {displayedText}
      </Typography>
      {isLong && (
        <Button
          size="small"
          variant="text"
          onClick={() => setShowFull(prev => !prev)}
          sx={{ textTransform: 'none', fontSize: '0.9rem' }}
        >
          {showFull ? 'Show Less' : 'Show More'}
        </Button>
      )}
    </>
  );
};


hljs.registerLanguage('verilog', require('highlight.js/lib/languages/verilog'));


// Tab panel component for the module details
function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`module-tabpanel-${index}`}
      aria-labelledby={`module-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const ModuleDetail = () => {
  const { id } = useParams();
  const [tabValue, setTabValue] = useState(0);
  const [module, setModule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const context = useContext(AuthContext   )
  const navigate = useNavigate()
  const [allUserData,setAllUserData] = useState(null)
  // Fetch module data
  function isModuleFreePaid(moduleID) {

    if (!allUserData || !allUserData.paidModule) return false;
    if(module.moduleType=="free") return true;
    return allUserData.paidModule.some(module => module.moduleId === moduleID);
  }

  
      

    useEffect(() => {
      document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightBlock(block);
      });
    });


  useEffect(() => {
    if(!context?.user) return;
    context.setCurrentChapterIndex(0)
    const handleFetchUser = async () => {
      try {
        const response = await axios.post(`${URLSITE}/api/general/user-by-email`, { email:context.user.wholeData.email });
        
        console.log(response.data);
        if(response.status==200){
          setAllUserData(response.data)
        }
        
      } catch (err) {
        console.error('Error fetching user:', err);
        
        
      }
    };

      handleFetchUser()
}, [context.user])

useEffect(() => {
  const fetchModule = async () => {
    setLoading(true);
    console.log("tryingggggggggggggggggggggggggg")
    try {
      const { data } = await axios.get(`${URLSITE}/api/general/get-module/${id}`);
      console.log(data)
      context.setCurrentModule(data)
      setModule(data);
      // If API fails, fall back to local data
    } catch (err) {
      console.log("API fetch failed, using local data:", err);
      const moduleData = getModuleById(id);
      if (moduleData) {
        // setModule(moduleData);
      }
    } finally {
      setLoading(false);
    }
  };

  fetchModule();
}, [id]);


const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };


  if (loading) {
    return (
      <Box className="container page-container" sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h5" sx={{ mb: 4 }}>Loading module content...</Typography>
        <LinearProgress color="primary" sx={{ mx: 'auto', width: '50%' }} />
      </Box>
    );
  }

  if (!module) {
    return (
      <Box className="container page-container" sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h5">Module not found</Typography>
        <Button component={Link} to="/modules" sx={{ mt: 2 }}>
          Back to Modules
        </Button>
    </Box>
    );
  }



  const doPayment = async()=>{
    
      try {
          const res = await fetch(`${URLSITE}/api/payment/order`, {
              method: "POST",
              headers: {
                  "content-type": "application/json"
              },
              body: JSON.stringify({
                  amount:1
              })
          });

          const data = await res.json();
          console.log(data);
          console.log("handlePayment Verify Called")
          const options = {
            key:"rzp_live_03MrnVzpBcaEI3",
            amount: data.data.amount,
            currency: data.data.currency,
            name: "VeriGeek",
            description: "Payment",
            order_id: data.data.id,
            handler: async (response) => {
                console.log("response", response)
                try {
                    const res = await fetch(`${URLSITE}/api/payment/verify`, {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            email:context.user.email,
                            moduleId:id,
                            amount:1
                        })
                    })
  
                    const verifyData = await res.json();
  
                    if (verifyData.message) {
                        toast.success(verifyData.message)
                        navigate(0)
                    }
                } catch (error) {
                  toast.error(error)
                    console.log(error);
                }
            },
            theme: {
                color: "#5f63b8"
            }
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      } catch (error) {
          console.log(error);
      }
  
  



  }

  // Ensure required arrays exist to prevent "length of undefined" errors
  const syllabus = module.learnItems || [];
  const exercises = module.codeExamples || [];
  const practicalExamples = module.codeExamples || [];
  const codeExamples = module.overviewCodeSamples || [];
  const resources = module.resources || [];
  const relatedModules = [];

  const firstUncompletedChapter = module.chapters.find((chapter) => {
    // Check if this chapter is not completed
    const chapterProgress = getChapterProgress(id, chapter.id);
    return !chapterProgress;
  });

  const continueButtonText = progress > 0 ? 'Continue Learning' : 'Start Module';
  const continueChapterId = firstUncompletedChapter ? firstUncompletedChapter.id : 1;

  return (
    <Box className="container page-container">
      {/* Breadcrumb */}
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          Home
        </Link>
        <Link to="/modules" style={{ textDecoration: 'none', color: 'inherit' }}>
          Modules
        </Link>
        <Typography color="text.primary">{module.title}</Typography>
      </Breadcrumbs>

      <Button 
        component={Link} 
        to="/modules" 
        startIcon={<ArrowBack />} 
        sx={{ mb: 3 }}
      >
        Back to Modules
      </Button>

      {/* Module Header */}
      <Box sx={{ position: 'relative', mb: 5 }}>
        <Box
          sx={{ 
            position: 'relative',
            height: '350px',
            borderRadius: 4,
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
          }}
        >
          <Box
            component="img"
            src={module.image}
            alt={module.title}
            sx={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
            }}
          />
          <Box 
            sx={{ 
              position: 'absolute', 
              top: 0,
              left: 0,
              right: 0,
              bottom: 0, 
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.8))',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              p: { xs: 3, md: 5 }
            }}
          >
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <Chip 
                label={module.level} 
                size="small" 
                sx={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.15)', 
                  color: 'white',
                  fontWeight: 'bold',
                  backdropFilter: 'blur(10px)'
                }} 
              />
              <Chip 
                label={`${module.chapters?.length || 16} chapters`} 
                size="small" 
                sx={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.15)', 
                  color: 'white',
                  fontWeight: 'bold',
                  backdropFilter: 'blur(10px)'
                }} 
              />
            </Box>
            <Typography 
              variant="h2" 
              component="h1" 
              sx={{ 
                fontWeight: 'bold',
                color: 'white',
                textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                mb: 2,
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
              }}
            >
              {module.title}
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.9)',
                textShadow: '0 1px 3px rgba(0,0,0,0.3)',
                maxWidth: '800px',
                fontWeight: 'normal',
                lineHeight: 1.5
              }}
            >
              {module.description}
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mt: 3,
              color: 'white',
              gap: 3
            }}>
              <Box>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>Last Updated</Typography>
                <Typography variant="body1" sx={{ fontWeight: 'medium' }}>{new Date(module.updatedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</Typography>
              </Box>
              <Divider orientation="vertical" flexItem sx={{ bgcolor: 'rgba(255,255,255,0.3)' }} />
              <Box>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>Rating</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body1" sx={{ fontWeight: 'medium', mr: 0.5 }}>{module.rating}</Typography>
                  <Rating value={module.rating} precision={0.1} readOnly size="small" sx={{ color: 'rgba(255, 255, 255, 0.9)' }} />
                  <Typography variant="body2" sx={{ ml: 0.5, opacity: 0.8 }}>({module.studentsCount?.toLocaleString() || 0})</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Module Stats */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={6} sm={3}>
          <Paper sx={{ p: 2, height: '100%', display: 'flex', alignItems: 'center' }}>
            <People sx={{ color: 'primary.main', mr: 1 }} />
            <Box>
              <Typography variant="body2" color="text.secondary">Students</Typography>
              <Typography variant="h6">{module.studentsCount?.toLocaleString() || 0}</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper sx={{ p: 2, height: '100%', display: 'flex', alignItems: 'center' }}>
            <Schedule sx={{ color: 'primary.main', mr: 1 }} />
            <Box>
              <Typography variant="body2" color="text.secondary">Duration</Typography>
              <Typography variant="h6">{module.duration}</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper sx={{ p: 2, height: '100%', display: 'flex', alignItems: 'center' }}>
            <AutoStories sx={{ color: 'primary.main', mr: 1 }} />
            <Box>
              <Typography variant="body2" color="text.secondary">Chapters</Typography>
              <Typography variant="h6">{module.chapters?.length || 16}</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper sx={{ p: 2, height: '100%', display: 'flex', alignItems: 'center' }}>
            <Assignment sx={{ color: 'primary.main', mr: 1 }} />
            <Box>
              <Typography variant="body2" color="text.secondary">Practical Examples</Typography>
              <Typography variant="h6">{practicalExamples?.length || exercises?.length || 5}</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Progress and Start buttons */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Your Progress
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={progress} 
              sx={{ height: 10, borderRadius: 5, mb: 1 }} 
            />
            <Typography variant="body2">
              {progress}% Complete
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', gap: 2, height: '100%' }}>
            
              {
              
              module.moduleType=="free"?
              <Button 
            variant="contained" 
            color="primary" 
            fullWidth 
            startIcon={<PlayArrow />}
            component={Link}
            to={`/modules/${id}/chapters/${module.chapters[0].chapterId}`}
            sx={{ height: '100%' }}
          >
            {"Start Module"}
          </Button>
          :
              !isModuleFreePaid(module._id)?
                <Button 
              variant="contained" 
              color="primary" 
              fullWidth 
              onClick={doPayment}
                        
              startIcon={<PlayArrow />}
              component={Link}
            
              sx={{ height: '100%' }}
            >
              {"Buy Module"}
            </Button>
            :<Button 
            variant="contained" 
            color="primary" 
            fullWidth 
            startIcon={<PlayArrow />}
            component={Link}
            to={`/modules/${id}/chapters/${module.chapters[0].chapterId}`}
            sx={{ height: '100%' }}
          >
            {"Start Module"}
          </Button>
          

              }
            
          </Box>
        </Grid>
      </Grid>

      {/* Tabs and Content */}
      <Box sx={{ mb: 4 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          sx={{ 
            borderBottom: 1, 
            borderColor: 'divider',
            mb: 3,
            '& .MuiTab-root': {
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 500
            }
          }}
        >
          <Tab label="Overview" icon={<MenuBook />} iconPosition="start" />
          <Tab label="Content" icon={<PlayCircleOutline />} iconPosition="start" />
          <Tab label="Practical Examples" icon={<Assignment />} iconPosition="start" />
        </Tabs>

        {/* Overview Tab */}
        {tabValue === 0 && (
          <Box>
            <Typography variant="h5" gutterBottom sx={{ borderLeft: '4px solid #6a0dad', pl: 2 }}>About This Module</Typography>
           <OverviewText text={module?.overview}/>
            
            {/* Learning Outcomes */}
            {syllabus.length > 0 && (
              <>
                <Typography variant="h5" gutterBottom sx={{ mt: 4, borderLeft: '4px solid #6a0dad', pl: 2 }}>What You'll Learn</Typography>
                <Paper elevation={0} variant="outlined" sx={{ p: 3, borderRadius: 2, mb: 4 }}>
                  <Grid container spacing={2}>
                    {module.learnItems.map((week, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                          <Check sx={{ color: 'success.main', mr: 1, mt: 0.3 }} />
                          <Typography variant="body1">{typeof week === 'string' ? week : String(week)}</Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              </>
            )}
            
            {/* Prerequisites */}
            <Typography variant="h5" gutterBottom sx={{ mt: 4, borderLeft: '4px solid #6a0dad', pl: 2 }}>Prerequisites</Typography>
            <Paper elevation={0} variant="outlined" sx={{ p: 3, borderRadius: 2, mb: 4 }}>
              <List sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1 }}>
                {module.prerequisites.map((prereq, index) => (
                  <ListItem key={index} sx={{ px: 1 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <Check sx={{ color: 'primary.main' }} />
                    </ListItemIcon>
                    <ListItemText primary={prereq} />
                  </ListItem>
                ))}
              </List>
            </Paper>

            {/* Skills */}
            <Typography variant="h5" gutterBottom sx={{ mt: 4, borderLeft: '4px solid #6a0dad', pl: 2 }}>Skills You'll Gain</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4 }}>
              {module.skills.map((skill, index) => (
                <Chip 
                  key={index} 
                  label={skill} 
                  sx={{ bgcolor: 'rgba(106, 13, 173, 0.08)', fontWeight: 500 }} 
                />
              ))}
            </Box>
            
            {/* Code Examples */}
            {codeExamples.length > 0 && (
              <>
                <Typography variant="h5" gutterBottom sx={{ mt: 4, borderLeft: '4px solid #6a0dad', pl: 2 }}>Code Examples</Typography>
                <Grid container spacing={3} sx={{ mb: 4 }}>
                  {codeExamples.map((example, index) => (
                    <Grid item xs={12} md={6} key={index}>
                      <Paper elevation={2} sx={{ p: 0, overflow: 'hidden', borderRadius: 2 }}>
                        <Box sx={{ p: 2, bgcolor: '#f5f5f5', borderBottom: '1px solid #e0e0e0' }}>
                          <Typography variant="subtitle1" fontWeight="medium">{typeof example.title === 'string' ? example.title : String(example.title)}</Typography>
                        </Box>
                        <Box sx={{ 
                          p: 2, 
                          bgcolor: '#272822',
                          color: '#f8f8f2',
                          fontFamily: 'monospace',
                          fontSize: '0.875rem',
                          overflow: 'auto',
                          maxHeight: '300px',
                          whiteSpace: 'pre'
                        }}>
                          {typeof example.code === 'string' ? example.code : JSON.stringify(example.code, null, 2)}
                        </Box>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </>
            )}
            
            {/* Additional Resources */}
            {resources.length > 0 && (
              <>
                <Typography variant="h5" gutterBottom sx={{ mt: 4, borderLeft: '4px solid #6a0dad', pl: 2 }}>Additional Resources</Typography>
                <Paper elevation={0} variant="outlined" sx={{ p: 3, borderRadius: 2, mb: 4 }}>
                  <List>
                    {resources.map((resource, index) => (
                      <React.Fragment key={index}>
                        <ListItem sx={{ px: 1 }}>
                          <ListItemIcon>
                            {resource.type === 'PDF' ? 
                              <MenuBook color="primary" /> : 
                              <Assignment color="primary" />
                            }
                          </ListItemIcon>
                          <ListItemText 
                            primary={resource.title} 
                            secondary={resource.type} 
                          /><Button
                          variant="outlined"
                          size="small"
                          component="a"
                          href={resource.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Download
                        </Button>
                        
                        </ListItem>
                        {index < resources.length - 1 && <Divider component="li" />}
                      </React.Fragment>
                    ))}
                  </List>
                </Paper>
              </>
            )}

            {/* Related Modules */}
            {relatedModules.length > 0 && (
              <>
                <Typography variant="h5" gutterBottom sx={{ mt: 4, borderLeft: '4px solid #6a0dad', pl: 2 }}>Related Modules</Typography>
                <Grid container spacing={3}>
                  {relatedModules.map(relModule => (
                    <Grid item xs={12} sm={6} md={4} key={relModule.id}>
                      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-8px)' } }}>
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Typography variant="h6" component="h3" gutterBottom>
                            {typeof relModule.title === 'string' ? relModule.title : String(relModule.title)}
                          </Typography>
                          <Chip 
                            label={typeof relModule.level === 'string' ? relModule.level : String(relModule.level)} 
                            size="small" 
                            sx={{ 
                              mb: 2,
                              backgroundColor: relModule.level === 'Beginner' ? '#e3f2fd' : 
                                            relModule.level === 'Intermediate' ? '#fff8e1' : '#fbe9e7',
                              color: relModule.level === 'Beginner' ? '#0277bd' : 
                                  relModule.level === 'Intermediate' ? '#ff8f00' : '#e64a19'
                            }} 
                          />
                          <Typography variant="body2" paragraph sx={{ mb: 2 }}>
                            {typeof relModule.description === 'string' ? relModule.description : String(relModule.description)}
                          </Typography>
                          {relModule.topics && Array.isArray(relModule.topics) && relModule.topics.length > 0 && (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                              {relModule.topics.slice(0, 3).map((topic, index) => (
                                <Chip
                                  key={index}
                                  label={typeof topic === 'string' ? topic : String(topic)}
                                  size="small"
                                  sx={{ fontSize: '0.7rem', backgroundColor: 'rgba(106, 13, 173, 0.08)' }}
                                />
                              ))}
                            </Box>
                          )}
                          <Button 
                            component={Link} 
                            to={`/modules/${relModule.id}`}
                            variant="outlined"
                            color="primary"
                            size="small"
                            fullWidth
                          >
                            View Module
                          </Button>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </>
            )}
          </Box>
        )}

        {/* Content Tab */}
        {tabValue === 1 && (
          <Box>
            <Typography variant="h5" gutterBottom sx={{ borderLeft: '4px solid #6a0dad', pl: 2 }}>Module Content</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
              <Typography variant="body1">
                This module contains <strong>{module.chapters.length} chapters</strong> with a total duration of <strong>{module.duration}</strong>.
              </Typography>
              <Button 
                variant="contained" 
                color="primary" 
                startIcon={<PlayArrow />}
                component={Link}
                to={`/modules/${id}/chapters/${continueChapterId}`}
                size="small"
              >
                {continueButtonText}
              </Button>
            </Box>
            
            <Paper elevation={0} variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>
              {module.chapters.map((chapter, index) => (
                <Box 
                  key={chapter.id}
                  sx={{ 
                    borderBottom: index < module.chapters.length - 1 ? '1px solid #e0e0e0' : 'none',
                  }}
                >
                  <Box 
                    sx={{ 
                      p: 2,
                      display: 'flex',
                      alignItems: 'flex-start',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.02)'
                      },
                      bgcolor: chapter.completed ? 'rgba(76, 175, 80, 0.05)' : 'transparent'
                    }}
                  >
                    <Box sx={{ mr: 2, mt: 0.5 }}>
                        <Box sx={{ 
                          width: 32, 
                          height: 32, 
                          borderRadius: '50%', 
                          border: '2px solid #e0e0e0',
                          color: 'text.secondary',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 'bold'
                        }}>
                      {
                        index+1
                      }
                        </Box>
                      
                      
                    </Box>
                    
                    <Box sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, flexWrap: 'wrap' }}>
                        <Typography variant="h6" component="h3" sx={{ mr: 2 }}>
                          {typeof chapter.title === 'string' ? chapter.title : String(chapter.title)}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                          <Chip 
                            icon={<MenuBook fontSize="small" />}
                            label="Chapter" 
                            size="small"
                            sx={{ 
                              bgcolor: 'rgba(106, 13, 173, 0.08)',
                              color: '#6a0dad',
                            }} 
                          />
                          <Chip 
                            label={typeof chapter.estimatedTime === 'string' ? module.level : String(module.level)} 
                            size="small"
                            sx={{ bgcolor: 'rgba(0, 0, 0, 0.05)' }} 
                          />
                        </Box>
                      </Box>
                      
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {typeof chapter.description === 'string' ? chapter.description : String(chapter.description)}
                      </Typography>
                      
                      {chapter.sections && (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {chapter.sections.map((section, sectionIndex) => (
                            <Chip 
                              key={sectionIndex}
                              label={typeof section.title === 'string' ? section.title : String(section.title)} 
                              size="small"
                              sx={{ 
                                fontSize: '0.7rem',
                                height: 24,
                                bgcolor: 'rgba(0, 0, 0, 0.04)'
                              }} 
                            />
                          ))}
                        </Box>
                      )}
                    </Box>
                    
                      {
                        !isModuleFreePaid(module._id)?
                        <Button 
                          component={Link} 
                          onClick={doPayment}
                        
                          variant="outlined"
                          color="primary"
                          size="small"
                          sx={{ ml: 2, alignSelf: 'center', flexShrink: 0 }}
                        >
                          {'Buy Module'}
                          </Button>:

                    <Button 
                    component={Link} 
                    to={`/modules/${id}/chapters/${chapter.chapterId}`}
                    variant="outlined"
                    color="primary"
                    size="small"
                    sx={{ ml: 2, alignSelf: 'center', flexShrink: 0 }}
                  >
                    {'Start'}
                    </Button>
                      }
                    
                  </Box>
                </Box>
              ))}
            </Paper>
          </Box>
        )}

        {/* Exercises Tab */}
        {tabValue === 2 && (
          <Box>
            <Typography variant="h5" gutterBottom sx={{ borderLeft: '4px solid #6a0dad', pl: 2 }}>Practical Examples</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="body1">
                Master your skills with these <strong>{practicalExamples.length } practical examples</strong>. Complete them to reinforce your learning.
              </Typography>
              
            </Box>
            
            {
              practicalExamples.length!=0?
              <Paper elevation={0} variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>
              {(practicalExamples.length > 0 ? practicalExamples : exercises).map((example, index) => (
                <Box 
                  key={example.id || index}
                  sx={{ 
                    borderBottom: index < (practicalExamples.length > 0 ? practicalExamples.length : exercises.length) - 1 ? '1px solid #e0e0e0' : 'none',
                    p: 3,
                    transition: 'background-color 0.2s',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.02)'
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, flexWrap: 'wrap' }}>
                        <Typography variant="h6" component="h3" sx={{ mr: 2 }}>
                          {typeof example.title === 'string' ? example.title : String(example.title)}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                          <Chip 
                            label={typeof example.difficulty === 'string' ? example.difficulty : String(example.difficulty)} 
                            size="small"
                            sx={{ 
                              bgcolor: example.difficulty === 'Easy' ? '#e8f5e9' : 
                                    example.difficulty === 'Medium' ? '#fff8e1' : '#ffebee',
                              color: example.difficulty === 'Easy' ? '#2e7d32' : 
                                    example.difficulty === 'Medium' ? '#ff8f00' : '#d32f2f',
                              fontWeight: 'bold'
                            }} 
                          />
                          {example.type && (
                            <Chip 
                              label={typeof example.type === 'string' ? example.type : String(example.type)} 
                              size="small"
                              sx={{ bgcolor: 'rgba(0, 0, 0, 0.05)' }} 
                            />
                          )}
                        </Box>
                      </Box>
                      
                      <Typography variant="body2" paragraph>
                        {typeof example.description === 'string' ? example.description : String(example.description)}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', ml: 2 }}>
                      {example.completed ? (
                        <Box sx={{ 
                          width: 40, 
                          height: 40, 
                          borderRadius: '50%', 
                          bgcolor: 'success.main',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <Check />
                        </Box>
                      ) : null}
                    </Box>
                  </Box>
                  
                  {(example.code || example.testbench) && (
                    <Box sx={{ mt: 2 }}>
                      <Accordion defaultExpanded={false} sx={{ bgcolor: 'rgba(0, 0, 0, 0.02)' }}>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                          <Typography variant="subtitle2">
                            <Code sx={{ mr: 1, fontSize: '1rem', verticalAlign: 'middle' }} />
                            Code Example
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Box 
                            sx={{ 
                              p: 2, 
                              borderRadius: 1,
                              fontFamily: 'monospace',
                              fontSize: '0.875rem',
                              overflow: 'auto',
                              maxHeight: '400px',
                              position: 'relative'
                            }}
                          >
                            <Button 
                              variant="contained" 
                              size="small" 
                              sx={{ 
                                position: 'absolute', 
                                top: 8, 
                                right: 8, 
                                backgroundColor: 'rgba(255,255,255,0.2)',
                                color: 'white',
                                '&:hover': {
                                  backgroundColor: 'rgba(255,255,255,0.3)'
                                }
                              }}
                              onClick={() => {
                                navigator.clipboard.writeText(typeof example.code === 'string' ? example.code : JSON.stringify(example.code, null, 2));
                              }}
                            >
                              Copy Code
                            </Button>
                            <pre style={{ margin: 0 }}>{typeof example.code === 'string' ? example.code : JSON.stringify(example.code, null, 2)}</pre>
                          </Box>
                          {example.testbench && (
                            <>
                              <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
                                Testbench:
                              </Typography>
                              <Box 
                                sx={{ 
                                  bgcolor: '#272822', 
                                  color: '#f8f8f2', 
                                  p: 2, 
                                  borderRadius: 1,
                                  fontFamily: 'monospace',
                                  fontSize: '0.875rem',
                                  overflow: 'auto',
                                  maxHeight: '400px',
                                  position: 'relative'
                                }}
                              >
                                <Button 
                                  variant="contained" 
                                  size="small" 
                                  sx={{ 
                                    position: 'absolute', 
                                    top: 8, 
                                    right: 8, 
                                    backgroundColor: 'rgba(255,255,255,0.2)',
                                    color: 'white',
                                    '&:hover': {
                                      backgroundColor: 'rgba(255,255,255,0.3)'
                                    }
                                  }}
                                  onClick={() => {
                                    navigator.clipboard.writeText(typeof example.testbench === 'string' ? example.testbench : JSON.stringify(example.testbench, null, 2));
                                  }}
                                >
                                  Copy Testbench
                                </Button>
                                <pre style={{ margin: 0,backgroundColor:"black" }}>{typeof example.testbench === 'string' ? example.testbench : JSON.stringify(example.testbench, null, 2)}</pre>
                              </Box>
                            </>
                          )}
                          
                          {example.explanation && (
                            <>
                              <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
                                Explanation:
                              </Typography>
                              <Typography variant="body2" sx={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
                                {example.explanation}
                              </Typography>
                            </>
                          )}
                        </AccordionDetails>
                      </Accordion>
                    </Box>
                  )}
                </Box>
              ))}
            </Paper>:console.log("")
            }
          </Box>
        )}
      </Box>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Box>
  );
};

// Import this to use in the ModuleDetail component
function getChapterProgress(moduleId, chapterId) {
  const progressKey = `chapter-${moduleId}-${chapterId}`;
  return localStorage.getItem(progressKey) === 'true';
}

export default ModuleDetail; 