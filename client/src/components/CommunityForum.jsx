import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Stack,
  Rating,
  Card,
  CardContent,
  CardActions,
  Pagination,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
  TextareaAutosize,
  Snackbar,
  Collapse,
  Badge,
  Container,
  Grid,
  InputAdornment,
  Fade,
  Zoom,
} from '@mui/material';
import {
  Add as AddIcon,
  ThumbUp as ThumbUpIcon,
  Comment as CommentIcon,
  Share as ShareIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  Code as CodeIcon,
  Tag as TagIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Send as SendIcon,
  QuestionAnswer as QuestionAnswerIcon,
  Search as SearchIcon,
  FilterAlt as FilterAltIcon,
  ElectricBolt as ElectricBoltIcon,
  Memory as MemoryIcon,
  Code,
} from '@mui/icons-material';
import axios from 'axios';
import '../styles/Forum.css';

const CommunityForum = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openAnswerDialog, setOpenAnswerDialog] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [answerContent, setAnswerContent] = useState('');
  const [answerCodeSnippet, setAnswerCodeSnippet] = useState('');
  const [showAnswerCodeEditor, setShowAnswerCodeEditor] = useState(false);
  const [expandedQuestionId, setExpandedQuestionId] = useState(null);
  
  const [question, setQuestion] = useState({
    title: '',
    content: '',
    tags: [],
    currentTag: '',
    codeSnippet: '',
  });
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedTag, setSelectedTag] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [showCodeEditor, setShowCodeEditor] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info',
  });
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState(() => {
    const saved = localStorage.getItem('forumBookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  // Cache for faster loading
  const [questionsCache, setQuestionsCache] = useState({});

  useEffect(() => {
    fetchQuestions();
  }, [page, selectedTag, searchQuery, tabValue]);

  useEffect(() => {
    localStorage.setItem('forumBookmarks', JSON.stringify(bookmarkedQuestions));
  }, [bookmarkedQuestions]);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      
      // Check cache first for this specific query combination
      const cacheKey = `${tabValue}-${selectedTag || 'notag'}-${searchQuery || 'nosearch'}-${page}`;
      if (questionsCache[cacheKey]) {
        console.log('Using cached data');
        setQuestions(questionsCache[cacheKey]);
        setLoading(false);
        return;
      }
      
      let questionsData = [];
      let errorMessage = null;

      // Load from localStorage first for immediate display
      const localQuestions = JSON.parse(localStorage.getItem('localQuestions') || '[]');
      if (localQuestions.length > 0) {
        questionsData = localQuestions;
      }
      
      // Try API call with a timeout to prevent long waits
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1000); // 1 second timeout
      
      try {
        const params = {
          page,
          limit: 10,
          ...(selectedTag && { tag: selectedTag }),
          ...(searchQuery && { search: searchQuery }),
          ...(tabValue === 1 && { sort: 'likes' }),
          ...(tabValue === 2 && { unanswered: true })
        };

        const response = await axios.get('/api/forum', { 
          params,
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (response.data && response.data.questions) {
          questionsData = [...response.data.questions, ...questionsData];
          // De-duplicate questions by ID
          questionsData = questionsData.filter((q, index, self) => 
            index === self.findIndex(t => (t._id || t.id) === (q._id || q.id))
          );
        }
      } catch (apiError) {
        clearTimeout(timeoutId);
        console.warn('API error or timeout:', apiError);
        
        if (questionsData.length === 0) {
          errorMessage = 'No questions found. Be the first to ask a question!';
        }
      }

      // Apply all filters in a single pass
      const filteredData = questionsData.filter(q => {
        // Filter by search
        if (searchQuery) {
          const search = searchQuery.toLowerCase();
          const matchesSearch = 
            q.title.toLowerCase().includes(search) || 
            q.content.toLowerCase().includes(search) ||
            q.tags?.some(tag => tag.toLowerCase().includes(search));
          
          if (!matchesSearch) return false;
        }
        
        // Filter by tag
        if (selectedTag && (!q.tags || !q.tags.some(tag => tag.toLowerCase() === selectedTag.toLowerCase()))) {
          return false;
        }
        
        // Filter by tab
        if (tabValue === 2 && q.comments && q.comments.length > 0) {
          return false; // Unanswered tab
        }
        
        if (tabValue === 3 && !bookmarkedQuestions.includes(q._id || q.id)) {
          return false; // Bookmarked tab
        }
        
        return true;
      });
      
      // Sort if needed
      let sortedData = [...filteredData];
      if (tabValue === 1) { // Most Liked
        sortedData.sort((a, b) => (b.likes?.length || 0) - (a.likes?.length || 0));
      } else {
        // Default sort by date
        sortedData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }

      // Cache the results
      setQuestionsCache({...questionsCache, [cacheKey]: sortedData});
      
      setQuestions(sortedData);
      setTotalPages(Math.max(1, Math.ceil(sortedData.length / 10)));
      setError(errorMessage);
    } catch (err) {
      console.error('Error in fetchQuestions:', err);
      setError('Failed to fetch questions. Please try again later.');
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setQuestion({
      title: '',
      content: '',
      tags: [],
      currentTag: '',
      codeSnippet: '',
    });
    setShowCodeEditor(false);
  };

  const handleOpenAnswerDialog = (question) => {
    if (!isLoggedIn) {
      setSnackbar({
        open: true,
        message: 'Please log in to answer questions',
        severity: 'warning'
      });
      return;
    }
    setSelectedQuestion(question);
    setOpenAnswerDialog(true);
  };

  const handleCloseAnswerDialog = () => {
    setOpenAnswerDialog(false);
    setSelectedQuestion(null);
    setAnswerContent('');
    setAnswerCodeSnippet('');
    setShowAnswerCodeEditor(false);
  };

  const handleAddTag = () => {
    if (question.currentTag.trim()) {
      setQuestion({
        ...question,
        tags: [...question.tags, question.currentTag.trim()],
        currentTag: '',
      });
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setQuestion({
      ...question,
      tags: question.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const handleSubmitQuestion = async () => {
    try {
      // Get token from localStorage
      const token = localStorage.getItem('token');

      if (!token) {
        setError('Please log in to post a question');
        return;
      }

      // Create the new question object
      const newQuestion = {
        id: `local-${Date.now()}`, // Create a unique ID for local storage
        title: question.title,
        content: question.content,
        tags: question.tags,
        codeSnippet: question.codeSnippet,
        author: {
          name: JSON.parse(localStorage.getItem('userData'))?.name || 'You',
        },
        createdAt: new Date().toISOString(),
        likes: [],
        comments: [],
      };

      // Try to post to the API first
      try {
        const response = await axios.post('/api/forum', 
          {
            title: question.title,
            content: question.content,
            tags: question.tags,
            codeSnippet: question.codeSnippet,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        
        // If successful, use the response data
        setQuestions([response.data, ...questions]);
      } catch (apiError) {
        console.error('API error when posting question:', apiError);
        
        // Fallback: store locally if API fails
        const localQuestions = JSON.parse(localStorage.getItem('localQuestions') || '[]');
        localQuestions.unshift(newQuestion);
        localStorage.setItem('localQuestions', JSON.stringify(localQuestions));
        
        // Update state with the new question
        setQuestions([newQuestion, ...questions]);
      }
      
      // Close dialog and show success message in either case
      handleCloseDialog();
      setError(null);
      setSnackbar({
        open: true,
        message: 'Question posted successfully!',
        severity: 'success'
      });
    } catch (err) {
      console.error('Error in handleSubmitQuestion:', err);
      if (err.response && err.response.status === 401) {
        setError('You must be logged in to post a question');
      } else {
        setError('Failed to post question. Please try again later.');
      }
    }
  };

  const handleSubmitAnswer = async () => {
    if (!selectedQuestion || !answerContent.trim()) return;
    
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setSnackbar({
          open: true,
          message: 'Please log in to answer questions',
          severity: 'warning'
        });
        return;
      }
      
      // Create the new answer object
      const newAnswer = {
        id: `local-comment-${Date.now()}`,
        content: answerContent,
        codeSnippet: answerCodeSnippet,
        author: {
          name: JSON.parse(localStorage.getItem('userData'))?.name || 'You',
        },
        createdAt: new Date().toISOString()
      };

      // Try to submit to API first
      try {
        const response = await axios.post(
          `/api/forum/${selectedQuestion._id || selectedQuestion.id}/comments`, 
          {
            content: answerContent,
            codeSnippet: answerCodeSnippet
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        // API call was successful
      } catch (apiError) {
        console.error('API error when posting answer:', apiError);
        
        // Fallback: update the question in local storage
        const localQuestions = JSON.parse(localStorage.getItem('localQuestions') || '[]');
        const questionIndex = localQuestions.findIndex(q => q.id === selectedQuestion.id);
        
        if (questionIndex !== -1) {
          if (!localQuestions[questionIndex].comments) {
            localQuestions[questionIndex].comments = [];
          }
          localQuestions[questionIndex].comments.push(newAnswer);
          localStorage.setItem('localQuestions', JSON.stringify(localQuestions));
        }
        
        // Also update the current questions state
        const updatedQuestions = [...questions];
        const stateQuestionIndex = updatedQuestions.findIndex(q => (q._id || q.id) === (selectedQuestion._id || selectedQuestion.id));
        
        if (stateQuestionIndex !== -1) {
          if (!updatedQuestions[stateQuestionIndex].comments) {
            updatedQuestions[stateQuestionIndex].comments = [];
          }
          updatedQuestions[stateQuestionIndex].comments.push(newAnswer);
          setQuestions(updatedQuestions);
        }
      }
      
      handleCloseAnswerDialog();
      fetchQuestions(); // Refresh questions to show the new answer
      
      setSnackbar({
        open: true,
        message: 'Answer posted successfully!',
        severity: 'success'
      });
    } catch (err) {
      console.error('Error in handleSubmitAnswer:', err);
      setSnackbar({
        open: true,
        message: 'Failed to post answer. Please try again.',
        severity: 'error'
      });
    }
  };

  const handleLike = async (questionId) => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setSnackbar({
          open: true,
          message: 'Please log in to like questions',
          severity: 'warning'
        });
        return;
      }

      // Get current user data
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      const userId = userData.id || 'local-user';
      
      // Find the question in our state
      const updatedQuestions = [...questions];
      const questionIndex = updatedQuestions.findIndex(q => (q._id || q.id) === questionId);
      
      if (questionIndex === -1) {
        throw new Error('Question not found');
      }
      
      // Initialize likes array if it doesn't exist
      if (!updatedQuestions[questionIndex].likes) {
        updatedQuestions[questionIndex].likes = [];
      }
      
      // Toggle like status
      const likes = updatedQuestions[questionIndex].likes;
      const userLikedIndex = likes.indexOf(userId);
      
      if (userLikedIndex === -1) {
        // User hasn't liked this question yet, add like
        likes.push(userId);
      } else {
        // User already liked, remove like
        likes.splice(userLikedIndex, 1);
      }
      
      // Update state immediately
      setQuestions(updatedQuestions);
      
      // Try API call
      try {
        await axios.post(`/api/forum/${questionId}/like`, {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        // API call successful
      } catch (apiError) {
        console.warn('API error when liking question:', apiError);
        
        // Update localStorage as fallback
        const localQuestions = JSON.parse(localStorage.getItem('localQuestions') || '[]');
        const localQuestionIndex = localQuestions.findIndex(q => q.id === questionId);
        
        if (localQuestionIndex !== -1) {
          if (!localQuestions[localQuestionIndex].likes) {
            localQuestions[localQuestionIndex].likes = [];
          }
          
          // Match the state update
          localQuestions[localQuestionIndex].likes = likes;
          localStorage.setItem('localQuestions', JSON.stringify(localQuestions));
        }
      }
      
      // Update cache to reflect the new like status
      Object.keys(questionsCache).forEach(key => {
        const cachedQuestions = [...questionsCache[key]];
        const cachedIndex = cachedQuestions.findIndex(q => (q._id || q.id) === questionId);
        
        if (cachedIndex !== -1) {
          cachedQuestions[cachedIndex] = updatedQuestions[questionIndex];
          const updatedCache = {...questionsCache};
          updatedCache[key] = cachedQuestions;
          setQuestionsCache(updatedCache);
        }
      });
      
      setSnackbar({
        open: true,
        message: userLikedIndex === -1 ? 'Question liked!' : 'Like removed',
        severity: 'success'
      });
    } catch (err) {
      console.error('Error liking question:', err);
      setSnackbar({
        open: true,
        message: 'Failed to like question',
        severity: 'error'
      });
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setPage(1); // Reset to first page when changing tabs
  };

  const toggleExpandQuestion = (questionId) => {
    if (expandedQuestionId === questionId) {
      setExpandedQuestionId(null);
    } else {
      setExpandedQuestionId(questionId);
    }
  };

  const renderCodeSnippet = (code) => {
    if (!code) return null;
    return (
      <Paper sx={{ p: 2, bgcolor: '#f5f5f5', mt: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          <CodeIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          Code Snippet
        </Typography>
        <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{code}</pre>
      </Paper>
    );
  };

  // Function to test user login - improved with better feedback
  const handleTestLogin = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simple object to store user data
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        id: 'test-user-id'
      };
      
      // Set a mock token - in a real app, this would come from the server
      const mockToken = 'mock-jwt-token-for-testing';
      
      // Store the token and user data in localStorage
      localStorage.setItem('token', mockToken);
      localStorage.setItem('userData', JSON.stringify(userData));
      
      // Update state to reflect logged in status
      setIsLoggedIn(true);
      
      // Show success message
      setSnackbar({
        open: true,
        message: 'Signed in successfully as Test User',
        severity: 'success'
      });
      
      // Wait a moment to display success before refreshing data
      setTimeout(() => {
        fetchQuestions();
      }, 300);
    } catch (err) {
      console.error('Login error:', err);
      setSnackbar({
        open: true,
        message: 'Sign-in failed. Please try again.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  // Function to logout with improved feedback
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    setIsLoggedIn(false);
    setSnackbar({
      open: true,
      message: 'Signed out successfully',
      severity: 'info'
    });
    // Refresh questions after logout
    fetchQuestions();
  };

  // Close snackbar
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const toggleBookmark = (questionId) => {
    if (bookmarkedQuestions.includes(questionId)) {
      setBookmarkedQuestions(bookmarkedQuestions.filter(id => id !== questionId));
      setSnackbar({
        open: true,
        message: 'Removed from bookmarks',
        severity: 'info'
      });
    } else {
      setBookmarkedQuestions([...bookmarkedQuestions, questionId]);
      setSnackbar({
        open: true,
        message: 'Added to bookmarks',
        severity: 'success'
      });
    }
  };

  const handleShareQuestion = (question) => {
    if (navigator.share) {
      navigator.share({
        title: question.title,
        text: question.content,
        url: window.location.href
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
      navigator.clipboard.writeText(window.location.href).then(
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

  return (
    <Box className="forum-page">
      {/* Forum Header */}
      <Box className="forum-header">
        <Box sx={{ position: 'relative', zIndex: 1 }}>
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
                      <MemoryIcon sx={{ fontSize: 120, color: 'white' }} />
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
                      <ElectricBoltIcon fontSize="small" /> VERILOG COMMUNITY
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
                      Verilog Forum
                    </Typography>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        maxWidth: '700px',
                        fontWeight: 400,
                        fontSize: { xs: '1rem', md: '1.25rem' },
                        lineHeight: 1.5,
                        color: 'rgba(255,255,255,0.85)',
                        mb: 3
                      }}
                    >
                      Connect with Verilog experts, share your knowledge, and find solutions to your hardware design challenges.
                    </Typography>
                    
                    <Stack direction="row" spacing={2}>
                      <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<AddIcon />}
                        onClick={handleOpenDialog}
                        disabled={!isLoggedIn}
                        className="wavy-button"
                      >
                        Ask Question
                      </Button>
                      {!isLoggedIn && (
                        <Button
                          variant="outlined"
                          color="inherit"
                          startIcon={<LoginIcon />}
                          onClick={handleTestLogin}
                          sx={{ borderColor: 'rgba(255,255,255,0.7)', color: 'white' }}
                        >
                          Sign In
                        </Button>
                      )}
                    </Stack>
                  </Box>
                </Fade>
              </Grid>
              
              <Grid item xs={12} md={5}>
                <Zoom in={true} style={{ transitionDelay: '300ms' }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <img
                      src="/forum-illustration.svg"
                      alt="Verilog Forum"
                      style={{ maxWidth: '100%', height: 'auto' }}
                      onError={(e) => { e.target.style.display = 'none' }}
                    />
                  </Box>
                </Zoom>
              </Grid>
            </Grid>
            
            {/* Stats */}
            <Fade in={true} timeout={1000} style={{ transitionDelay: '500ms' }}>
              <Box sx={{ 
                display: 'flex',
                flexWrap: 'wrap',
                gap: { xs: 4, md: 8 },
                mt: 4,
                justifyContent: { xs: 'center', md: 'flex-start' },
                color: 'rgba(255,255,255,0.9)'
              }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                    {questions.length}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    Questions
                  </Typography>
                </Box>
                
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                    {questions.reduce((sum, q) => sum + (q.comments?.length || 0), 0)}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    Answers
                  </Typography>
                </Box>
                
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                    {bookmarkedQuestions.length}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    Bookmarked
                  </Typography>
                </Box>
              </Box>
            </Fade>
          </Container>
        </Box>
        
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
      <Container maxWidth="lg" sx={{ py: 6 }} id="forum-content" className="forum-content">
        {/* Search and Filter Controls */}
        <Paper 
          elevation={3} 
          sx={{ 
            p: 3, 
            borderRadius: 3,
            backgroundColor: 'white',
            mb: 4,
            position: 'relative',
            top: -30
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                placeholder="Search questions, topics, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="primary" />
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
                justifyContent: 'space-between', 
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 2
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <FilterAltIcon color="primary" fontSize="small" sx={{ mr: 1 }} />
                  <Typography variant="subtitle2" fontWeight="bold">
                    Filter by:
                  </Typography>
                </Box>

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
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      minWidth: { xs: 'auto', sm: 100 }
                    }
                  }}
                >
                  <Tab label="Latest Questions" />
                  <Tab label="Most Liked" />
                  <Tab label={
                    <Badge badgeContent={
                      questions.filter(q => !q.comments || q.comments.length === 0).length
                    } color="error">
                      Unanswered
                    </Badge>
                  } />
                  <Tab label="Bookmarked" disabled={bookmarkedQuestions.length === 0} />
                </Tabs>
                
                {isLoggedIn ? (
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleOpenDialog}
                    className="wavy-button"
                  >
                    Ask Question
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<LoginIcon />}
                    onClick={handleTestLogin}
                  >
                    Sign In to Ask
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 8 }}>
            <CircularProgress color="primary" size={60} thickness={4} />
            <Typography variant="body1" sx={{ mt: 2 }}>
              Loading discussions...
            </Typography>
          </Box>
        ) : (
          <>
            <List sx={{ mb: 4 }}>
              {questions.length > 0 ? (
                questions.map((q) => (
                  <React.Fragment key={q._id || q.id}>
                    <Card 
                      className="forum-card" 
                      elevation={2} 
                      sx={{ 
                        mb: 3, 
                        borderRadius: 2,
                        overflow: 'hidden',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)'
                        }
                      }}
                    >
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <ListItemAvatar>
                            <Avatar sx={{ bgcolor: 'primary.main' }}>
                              {q.author?.name?.[0] || 'U'}
                            </Avatar>
                          </ListItemAvatar>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="h6" className="question-title">
                              {q.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Posted by {q.author?.name || 'Unknown'} • {' '}
                              {new Date(q.createdAt || Date.now()).toLocaleDateString()}
                            </Typography>
                          </Box>
                        </Box>

                        <Typography variant="body1" paragraph>
                          {q.content}
                        </Typography>

                        {renderCodeSnippet(q.codeSnippet)}

                        <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}>
                          {q.tags && q.tags.map((tag) => (
                            <Chip
                              key={tag}
                              label={tag}
                              size="small"
                              onClick={() => setSelectedTag(tag)}
                              color={selectedTag === tag ? 'primary' : 'default'}
                              className="category-chip"
                            />
                          ))}
                        </Stack>
                      </CardContent>

                      <CardActions sx={{ justifyContent: 'space-between', bgcolor: 'rgba(0,0,0,0.02)', px: 2 }}>
                        <Box>
                          <IconButton
                            size="small"
                            onClick={() => handleLike(q._id || q.id)}
                            color={q.likes?.includes(JSON.parse(localStorage.getItem('userData') || '{}').id || 'local-user') ? 'primary' : 'default'}
                          >
                            <ThumbUpIcon />
                            <Typography variant="body2" sx={{ ml: 0.5 }}>
                              {q.likes?.length || 0}
                            </Typography>
                          </IconButton>
                          <IconButton 
                            size="small"
                            onClick={() => toggleExpandQuestion(q._id || q.id)}
                          >
                            <CommentIcon />
                            <Typography variant="body2" sx={{ ml: 0.5 }}>
                              {q.comments?.length || 0}
                            </Typography>
                          </IconButton>
                          <Button
                            size="small"
                            startIcon={<QuestionAnswerIcon />}
                            variant="text"
                            color="primary"
                            onClick={() => handleOpenAnswerDialog(q)}
                            sx={{ ml: 1 }}
                            className="answer-button"
                          >
                            Answer
                          </Button>
                        </Box>
                        <Box>
                          <IconButton
                            size="small"
                            onClick={() => toggleBookmark(q._id || q.id)}
                          >
                            {bookmarkedQuestions.includes(q._id || q.id) ? 
                              <BookmarkIcon color="primary" /> : 
                              <BookmarkBorderIcon />
                            }
                          </IconButton>
                          <IconButton 
                            size="small"
                            onClick={() => handleShareQuestion(q)}
                          >
                            <ShareIcon />
                          </IconButton>
                        </Box>
                      </CardActions>
                      
                      <Collapse in={expandedQuestionId === (q._id || q.id)} timeout="auto" unmountOnExit>
                        <CardContent sx={{ bgcolor: 'rgba(0,0,0,0.02)', pt: 0 }}>
                          <Divider sx={{ mb: 2 }} />
                          <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                            <CommentIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
                            Answers ({q.comments?.length || 0})
                          </Typography>
                          
                          {q.comments && q.comments.length > 0 ? (
                            q.comments.map((comment, index) => (
                              <Paper 
                                key={index} 
                                sx={{ 
                                  mb: 2, 
                                  p: 2, 
                                  bgcolor: 'background.paper',
                                  borderRadius: 2
                                }}
                                elevation={1}
                              >
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                  <Avatar sx={{ width: 32, height: 32, mr: 1, bgcolor: 'secondary.main' }}>
                                    {comment.author?.name?.[0] || 'A'}
                                  </Avatar>
                                  <Typography variant="subtitle2">
                                    {comment.author?.name || 'Anonymous'}
                                  </Typography>
                                  <Typography variant="caption" sx={{ ml: 1, color: 'text.secondary' }}>
                                    {comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : 'Unknown date'}
                                  </Typography>
                                </Box>
                                <Typography variant="body2" sx={{ ml: 5 }}>
                                  {comment.content}
                                </Typography>
                                {comment.codeSnippet && (
                                  <Box sx={{ ml: 5, mt: 1 }}>
                                    <Paper sx={{ p: 1.5, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                                      <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontSize: '0.85rem' }}>
                                        {comment.codeSnippet}
                                      </pre>
                                    </Paper>
                                  </Box>
                                )}
                              </Paper>
                            ))
                          ) : (
                            <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
                              No answers yet. Be the first to answer!
                            </Typography>
                          )}
                          
                          <Button
                            variant="contained"
                            startIcon={<QuestionAnswerIcon />}
                            sx={{ mt: 1 }}
                            onClick={() => handleOpenAnswerDialog(q)}
                            disabled={!isLoggedIn}
                            className="wavy-button"
                          >
                            Add an Answer
                          </Button>
                        </CardContent>
                      </Collapse>
                    </Card>
                  </React.Fragment>
                ))
              ) : (
                <Paper 
                  elevation={1} 
                  sx={{ 
                    textAlign: 'center', 
                    py: 6, 
                    px: 3, 
                    borderRadius: 2,
                    bgcolor: 'rgba(0,0,0,0.02)'
                  }}
                >
                  <Typography variant="h5" gutterBottom color="text.secondary">
                    No questions found
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    {selectedTag ? 
                      `No questions with the tag "${selectedTag}" found.` : 
                      'Be the first to ask a question!'}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleOpenDialog}
                    disabled={!isLoggedIn}
                    className="wavy-button"
                  >
                    Ask Question
                  </Button>
                </Paper>
              )}
            </List>

            {totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Pagination
                  count={totalPages}
                  page={page}
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

      {/* Ask Question Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog} 
        maxWidth="md" 
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3 }
        }}
      >
        <DialogTitle 
          sx={{ 
            bgcolor: 'primary.main', 
            color: 'white',
            pt: 2.5,
            pb: 2.5,
            fontSize: '1.3rem',
            fontWeight: 'bold'
          }}
        >
          Ask a Question
        </DialogTitle>
        <DialogContent sx={{ pt: 3, pb: 1 }}>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            value={question.title}
            onChange={(e) => setQuestion({ ...question, title: e.target.value })}
            sx={{ mb: 2 }}
            InputProps={{
              sx: { borderRadius: 2 }
            }}
          />
          <TextField
            margin="dense"
            label="Question"
            fullWidth
            multiline
            rows={4}
            value={question.content}
            onChange={(e) => setQuestion({ ...question, content: e.target.value })}
            sx={{ mb: 2 }}
            InputProps={{
              sx: { borderRadius: 2 }
            }}
          />
          
          <Box sx={{ mt: 2, mb: 3 }}>
            <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <TagIcon sx={{ mr: 1, verticalAlign: 'middle', color: 'primary.main' }} />
              Tags
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap' }}>
              <TextField
                size="small"
                label="Add Tag"
                value={question.currentTag}
                onChange={(e) =>
                  setQuestion({ ...question, currentTag: e.target.value })
                }
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && question.currentTag.trim()) {
                    handleAddTag();
                    e.preventDefault();
                  }
                }}
                InputProps={{
                  sx: { borderRadius: 2 }
                }}
              />
              <Button
                variant="outlined"
                onClick={handleAddTag}
                disabled={!question.currentTag.trim()}
                sx={{ borderRadius: 2 }}
              >
                Add
              </Button>
            </Box>
            <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
              {question.tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  onDelete={() => handleRemoveTag(tag)}
                  className="category-chip"
                />
              ))}
            </Stack>
          </Box>

          <Box sx={{ mt: 2, mb: 2 }}>
            <Button
              startIcon={<CodeIcon />}
              onClick={() => setShowCodeEditor(!showCodeEditor)}
              sx={{ mb: 1, borderRadius: 2 }}
              variant="outlined"
              color="secondary"
            >
              {showCodeEditor ? 'Remove Code Snippet' : 'Add Code Snippet'}
            </Button>
            {showCodeEditor && (
              <Paper sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                  Insert your Verilog code here:
                </Typography>
                <TextareaAutosize
                  minRows={5}
                  placeholder="module example(input clk, input reset, output reg [7:0] count);"
                  value={question.codeSnippet}
                  onChange={(e) =>
                    setQuestion({ ...question, codeSnippet: e.target.value })
                  }
                  style={{ 
                    width: '100%', 
                    padding: '12px', 
                    fontFamily: 'monospace',
                    fontSize: '0.9rem',
                    borderRadius: '8px',
                    border: '1px solid #e0e0e0' 
                  }}
                />
              </Paper>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={handleCloseDialog} variant="outlined" sx={{ borderRadius: 2 }}>Cancel</Button>
          <Button
            onClick={handleSubmitQuestion}
            variant="contained"
            color="primary"
            disabled={!question.title.trim() || !question.content.trim()}
            sx={{ borderRadius: 2 }}
            className="wavy-button"
          >
            Post Question
          </Button>
        </DialogActions>
      </Dialog>

      {/* Answer Dialog */}
      <Dialog 
        open={openAnswerDialog} 
        onClose={handleCloseAnswerDialog} 
        maxWidth="md" 
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3 }
        }}
      >
        <DialogTitle 
          sx={{ 
            bgcolor: 'primary.main', 
            color: 'white',
            pt: 2.5,
            pb: 2.5,
            fontSize: '1.3rem',
            fontWeight: 'bold'
          }}
        >
          Answer Question
        </DialogTitle>
        <DialogContent sx={{ pt: 3, pb: 1 }}>
          {selectedQuestion && (
            <Paper sx={{ p: 2, mb: 3, bgcolor: 'rgba(0,0,0,0.02)', borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                {selectedQuestion.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                You are answering {selectedQuestion.author?.name || 'Unknown'}'s question
              </Typography>
              <Typography variant="body2" paragraph sx={{ 
                color: 'text.secondary',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
              }}>
                {selectedQuestion.content}
              </Typography>
            </Paper>
          )}
          
          <TextField
            autoFocus
            margin="dense"
            label="Your Answer"
            fullWidth
            multiline
            rows={4}
            value={answerContent}
            onChange={(e) => setAnswerContent(e.target.value)}
            sx={{ mb: 2 }}
            InputProps={{
              sx: { borderRadius: 2 }
            }}
          />
          
          <Box sx={{ mt: 2, mb: 2 }}>
            <Button
              startIcon={<CodeIcon />}
              onClick={() => setShowAnswerCodeEditor(!showAnswerCodeEditor)}
              sx={{ mb: 1, borderRadius: 2 }}
              variant="outlined"
              color="secondary"
            >
              {showAnswerCodeEditor ? 'Remove Code Snippet' : 'Add Code Snippet'}
            </Button>
            {showAnswerCodeEditor && (
              <Paper sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                  Insert your Verilog code here:
                </Typography>
                <TextareaAutosize
                  minRows={5}
                  placeholder="module example(input clk, input reset, output reg [7:0] count);"
                  value={answerCodeSnippet}
                  onChange={(e) => setAnswerCodeSnippet(e.target.value)}
                  style={{ 
                    width: '100%', 
                    padding: '12px', 
                    fontFamily: 'monospace',
                    fontSize: '0.9rem', 
                    borderRadius: '8px',
                    border: '1px solid #e0e0e0'
                  }}
                />
              </Paper>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={handleCloseAnswerDialog} variant="outlined" sx={{ borderRadius: 2 }}>Cancel</Button>
          <Button
            onClick={handleSubmitAnswer}
            variant="contained"
            color="primary"
            disabled={!answerContent.trim()}
            startIcon={<SendIcon />}
            sx={{ borderRadius: 2 }}
            className="wavy-button"
          >
            Post Answer
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
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

export default CommunityForum; 