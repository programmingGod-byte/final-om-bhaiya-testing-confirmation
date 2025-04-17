import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import { 
  Box, Typography, Button, Breadcrumbs, Paper, CircularProgress,
  Divider, IconButton, Drawer, List, ListItem, ListItemText,
  Snackbar, Alert, Chip
} from '@mui/material';
import { 
  ArrowBack, MenuBook, Menu, NavigateBefore, NavigateNext,
  BookmarkBorder, Bookmark, CheckCircle
} from '@mui/icons-material';

// Import the module data and the ChapterContent component
import { getModuleById } from '../data/modules';
import { riscvProcessor } from '../data/modules/riscvProcessor';
import ChapterContent from '../components/ChapterContent';
import { getChapterProgress, updateChapterProgress } from '../utils/progressTracker';
import URLSITE from '../constant';
import hljs from 'highlight.js';
import 'highlight.js/styles/googlecode.css';

// Import Verilog highlighting - make sure you have this installed
import 'highlight.js/lib/languages/verilog';
import AuthContext from '../context/AuthContext';

// Register Verilog language with highlight.js
hljs.registerLanguage('verilog', require('highlight.js/lib/languages/verilog'));


const ChapterView = () => {
  const { moduleId, chapterId } = useParams();
  const navigate = useNavigate();
  const [module, setModule] = useState(null);
  const [chapter, setChapter] = useState(null);
  const [chapterContent, setChapterContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isChapterBookmarked, setIsChapterBookmarked] = useState(false);
  const [isChapterCompleted, setIsChapterCompleted] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [progress, setProgress] = useState(null);
  const context = useContext(AuthContext)

  
    useEffect(() => {
      if(!context?.user) return;
    
      const handleFetchUser = async () => {
        try {
          const response = await axios.post(`${URLSITE}/api/general/user-by-email`, { email:context.user.wholeData.email });
          
          console.log(response.data);
          if(response.status==200){
            if(!module.moduleType=="free"){
                
            if(!response.data.paidModule.some(module => module.moduleId === moduleId)){
              navigate(`/modules/${moduleId}`)
            }              
            }

          }
          
        } catch (err) {
          console.error('Error fetching user:', err);
          
          
        }
      };
  
        handleFetchUser()
  }, [context.user])
  

  useEffect(() => {
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block);
    });
  });
  // Fetch module and chapter data
  useEffect(() => {
    const fetchModuleAndChapter = async () => {
      try {
        setLoading(true);
        
        // Get module data
        let moduleData;
        if (moduleId === 'riscv-processor') {
          // For RISC-V module, use the imported data directly
          moduleData = riscvProcessor;
        } else {
          // For other modules, use the getModuleById function
          moduleData = getModuleById(moduleId);
        }
        
        setModule(moduleData);
        
        // Fetch chapter content from server using chapterId
        try {
          const response = await fetch(`${URLSITE}/api/general/chapter/${chapterId}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch chapter content: ${response.status}`);
          }
          const data = await response.json();
          setChapterContent(data);
          
          // Set chapter basic info
          setChapter({
            id: data.id,
            title: data.title,
            moduleId: data.moduleId
          });
        } catch (err) {
          console.error('Error fetching chapter content:', err);
          setError(err.message);
          
          // Fallback to old behavior if API fetch fails
          if (moduleId === 'riscv-processor') {
            // For RISC-V, use the full chapter data that's already in the moduleData
            const fallbackChapter = moduleData.chapters.find(c => c.id === parseInt(chapterId));
            setChapter(fallbackChapter);
          } else {
            // For other modules, find the chapter in moduleData.chapters
            const chapterNum = parseInt(chapterId, 10);
            const fallbackChapter = moduleData?.chapters?.find(ch => ch.id === chapterNum) || null;
            setChapter(fallbackChapter);
          }
        }
        
        // Get progress data
        if (isAuthenticated) {
          const progressResponse = await fetch(`/api/user/progress/${moduleId}`);
          if (progressResponse.ok) {
            const progressData = await progressResponse.json();
            setProgress(progressData);
          }
        }
        
        // Check if this chapter is bookmarked
        if (chapterId) {
          const bookmarkedChapters = JSON.parse(localStorage.getItem('bookmarkedChapters') || '[]');
          const isBookmarked = bookmarkedChapters.some(
            bookmark => bookmark.moduleId === moduleId && bookmark.chapterId === chapterId
          );
          setIsChapterBookmarked(isBookmarked);
          
          // Check if chapter is completed
          const isCompleted = getChapterProgress(moduleId, parseInt(chapterId));
          setIsChapterCompleted(isCompleted);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchModuleAndChapter();
  }, [moduleId, chapterId, isAuthenticated]);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Handle navigation to previous chapter
  const navigateToPrevChapter = () => {
    if (!module || !chapter) return;
    
    const currentIndex = module.chapters.findIndex(ch => ch.id === parseInt(chapterId));
    if (currentIndex > 0) {
      const prevChapter = module.chapters[currentIndex - 1];
      navigate(`/modules/${moduleId}/chapters/${prevChapter.id}`);
    }
  };

  // Handle navigation to next chapter
  const navigateToNextChapter = () => {
    if (!module || !chapter) return;
    
    const currentIndex = module.chapters.findIndex(ch => ch.id === parseInt(chapterId));
    if (currentIndex < module.chapters.length - 1) {
      const nextChapter = module.chapters[currentIndex + 1];
      navigate(`/modules/${moduleId}/chapters/${nextChapter.id}`);
    } else {
      // If this is the last chapter, go back to module page
      navigate(`/modules/${moduleId}`);
      showSnackbar('Congratulations! You have completed all chapters in this module!', 'success');
    }
  };

  // Handle chapter completion
  const markChapterCompleted = () => {
    if (!module || !chapter) return;
    
    updateChapterProgress(moduleId, parseInt(chapterId), true);
    setIsChapterCompleted(true);
    showSnackbar('Chapter marked as completed!', 'success');
  };

  // Handle chapter bookmarking
  const toggleChapterBookmark = () => {
    if (!module || !chapter) return;
    
    const bookmarkedChapters = JSON.parse(localStorage.getItem('bookmarkedChapters') || '[]');
    const bookmarkData = {
      moduleId,
      chapterId: chapterId.toString(),
      moduleTitle: module.title,
      chapterTitle: chapter.title,
      timestamp: new Date().toISOString()
    };
    
    if (isChapterBookmarked) {
      // Remove bookmark
      const updatedBookmarks = bookmarkedChapters.filter(
        bookmark => !(bookmark.moduleId === moduleId && bookmark.chapterId === chapterId.toString())
      );
      localStorage.setItem('bookmarkedChapters', JSON.stringify(updatedBookmarks));
      setIsChapterBookmarked(false);
      showSnackbar('Chapter bookmark removed', 'info');
    } else {
      // Add bookmark
      bookmarkedChapters.push(bookmarkData);
      localStorage.setItem('bookmarkedChapters', JSON.stringify(bookmarkedChapters));
      setIsChapterBookmarked(true);
      showSnackbar('Chapter bookmarked successfully! Access it anytime from your profile.', 'success');
    }
  };
  
  // Show snackbar message
  const showSnackbar = (message, severity = 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };
  
  // Handle quiz completion from ChapterContent
  const handleQuizCompletion = (passed) => {
    if (passed) {
      setIsChapterCompleted(true);
      showSnackbar('Congratulations! You passed the quiz and completed this chapter.', 'success');
    } else {
      showSnackbar('You need to score at least 70% to complete this chapter.', 'warning');
    }
  };

  // Render loading state
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // Render error state if module or chapter not found
  if (!module || !chapter) {
    return (
      <Box className="container page-container" sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h5">Content not found</Typography>
        <Button component={Link} to="/modules" sx={{ mt: 2 }}>
          Back to Modules
        </Button>
      </Box>
    );
  }

  // Calculate chapter navigation info
  const currentIndex = module.chapters.findIndex(ch => ch.id === parseInt(chapterId));
  const isFirstChapter = currentIndex === 0;
  const isLastChapter = currentIndex === module.chapters.length - 1;
  const prevChapter = !isFirstChapter ? module.chapters[currentIndex - 1] : null;
  const nextChapter = !isLastChapter ? module.chapters[currentIndex + 1] : null;

  return (
    <>
      {/* Drawer for chapter navigation */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
      >
        <Box sx={{ width: 300, p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>{module.title}</Typography>
          <Divider sx={{ mb: 2 }} />
          <List>
            {module.chapters.map(ch => {
              const isCurrentChapter = ch.id === parseInt(chapterId);
              const isCompleted = getChapterProgress(moduleId, ch.id);
              
              return (
                <ListItem 
                  key={ch.id}
                  button 
                  component={Link}
                  to={`/modules/${moduleId}/chapters/${ch.id}`}
                  selected={isCurrentChapter}
                  sx={{ 
                    borderRadius: 1,
                    mb: 0.5,
                    '&.Mui-selected': {
                      bgcolor: 'primary.light',
                      color: 'primary.contrastText',
                    }
                  }}
                >
                  {isCompleted && (
                    <CheckCircle 
                      sx={{ 
                        mr: 1, 
                        fontSize: '1rem',
                        color: 'success.main'
                      }} 
                    />
                  )}
                  <ListItemText 
                    primary={`${ch.id}. ${ch.title}`} 
                    primaryTypographyProps={{
                      fontWeight: isCurrentChapter ? 'bold' : 'normal',
                      fontSize: '0.9rem'
                    }}
                  />
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>

      <Box className="container page-container">
        {/* Header with navigation */}
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={toggleDrawer} sx={{ mr: 1 }}>
              <Menu />
            </IconButton>
            <Breadcrumbs>
              <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                Home
              </Link>
              <Link to="/modules" style={{ textDecoration: 'none', color: 'inherit' }}>
                Modules
              </Link>
              <Link to={`/modules/${moduleId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                {module.title}
              </Link>
              <Typography color="text.primary">Chapter {chapterContent.title}</Typography>
            </Breadcrumbs>
          </Box>
          <Button 
            component={Link} 
            to={`/modules/${moduleId}`}
            startIcon={<ArrowBack />}
          >
            Back to Module
          </Button>
        </Box>

        {/* Chapter progress indicator */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <MenuBook sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="subtitle1">
              Chapter {chapterContent.title} of {module.chapters.length}
              {isChapterCompleted && (
                <Chip 
                  size="small" 
                  icon={<CheckCircle />} 
                  label="Completed" 
                  color="success" 
                  sx={{ ml: 2 }}
                />
              )}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {!isChapterCompleted && (
              <Button
                variant="outlined"
                size="small"
                startIcon={<CheckCircle />}
                onClick={markChapterCompleted}
              >
                Mark as Completed
              </Button>
            )}
            <Button
              variant="outlined"
              size="small"
              startIcon={isChapterBookmarked ? <Bookmark /> : <BookmarkBorder />}
              onClick={toggleChapterBookmark}
            >
              {isChapterBookmarked ? 'Bookmarked' : 'Bookmark'}
            </Button>
          </Box>
        </Box>

        {/* Main content */}
        <Paper elevation={0} sx={{ borderRadius: 2, overflow: 'hidden', mb: 4 }}>
          {/* Chapter title */}
          <Box sx={{ p: 4, pb: 2 }}>
            <Typography variant="h4" gutterBottom>
              {chapterContent?.title || chapter.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              {chapterContent?.description || ""}
            </Typography>
            {chapterContent?.estimatedTime && (
              <Typography variant="body2" color="text.secondary">
                Estimated time: {chapterContent.estimatedTime}
              </Typography>
            )}
          </Box>
          
          {/* Display each section content */}
          {chapterContent?.sections?.map((section) => (
            <Box key={section.id} sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
                {section.title}
              </Typography>
              <div
                className="prose prose-sm max-w-none bg-white p-4 border border-gray-200 rounded text-[1.2rem]"
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
            </Box>
          ))}
          
          {/* Code examples section */}
          {chapterContent?.codeExamples?.length > 0 && (
            <Box sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
                Code Examples
              </Typography>
              {chapterContent.codeExamples.map((example) => (
                <Box key={example.id} sx={{ mb: 4 }}>
                  <Typography variant="h6" gutterBottom>
                    {example.title}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {example.description}
                  </Typography>
                  <pre className="bg-gray-100 p-4 rounded overflow-auto">
                    <code>{example.code}</code>
                  </pre>
                  {example.explanation && (
                    <Typography variant="body2" sx={{ mt: 2 }}>
                      {example.explanation}
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
          )}
          
          {/* If no content is available, use the ChapterContent component as fallback */}
          {(!chapterContent || (!chapterContent.sections && !chapterContent.codeExamples)) && (
            <ChapterContent 
              chapter={chapter} 
              moduleId={moduleId} 
              onQuizCompletion={handleQuizCompletion}
              onNextChapter={navigateToNextChapter}
            />
          )}
        </Paper>
        
        {/* Chapter navigation */}
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            mt: 4,
            mb: 6,
            mx: { xs: 2, md: 8 }
          }}
        >
          {/* <Button 
            variant="outlined"
            disabled={isFirstChapter}
            onClick={navigateToPrevChapter}
            startIcon={<NavigateBefore />}
            sx={{ visibility: isFirstChapter ? 'hidden' : 'visible' }}
          >
            {prevChapter ? prevChapter.title : 'Previous'}
          </Button>
          
          <Button 
            variant="contained"
            disabled={isLastChapter}
            onClick={navigateToNextChapter}
            endIcon={<NavigateNext />}
            sx={{ visibility: isLastChapter ? 'hidden' : 'visible' }}
          >
            {nextChapter ? nextChapter.title : 'Next'}
          </Button> */}
        </Box>
      </Box>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert 
          onClose={() => setSnackbarOpen(false)} 
          severity={snackbarSeverity} 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ChapterView;