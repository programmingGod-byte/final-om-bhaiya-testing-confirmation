import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Box, Typography, Button, Breadcrumbs, Paper, CircularProgress,
  Divider, IconButton, Drawer, List, ListItem, ListItemText, Tabs, Tab,
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

const ChapterView = () => {
  const { moduleId, chapterId } = useParams();
  const navigate = useNavigate();
  const [module, setModule] = useState(null);
  const [chapter, setChapter] = useState(null);
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
        
        // Get chapter data
        let chapterData;
        
        // Find the chapter in the module data
        if (moduleId === 'riscv-processor') {
          // For RISC-V, use the full chapter data that's already in the moduleData
          chapterData = moduleData.chapters.find(c => c.id === parseInt(chapterId));
        } else {
          // For other modules, find the chapter in moduleData.chapters
          const chapterNum = parseInt(chapterId, 10);
          chapterData = moduleData?.chapters?.find(ch => ch.id === chapterNum) || null;
        }
        
        setChapter(chapterData);
        
        // Get progress data
        if (isAuthenticated) {
          const progressResponse = await fetch(`/api/user/progress/${moduleId}`);
          if (progressResponse.ok) {
            const progressData = await progressResponse.json();
            setProgress(progressData);
          }
        }
        
        // Check if this chapter is bookmarked
        if (chapterData) {
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
    
    const currentIndex = module.chapters.findIndex(ch => ch.id === chapter.id);
    if (currentIndex > 0) {
      const prevChapter = module.chapters[currentIndex - 1];
      navigate(`/modules/${moduleId}/chapters/${prevChapter.id}`);
    }
  };

  // Handle navigation to next chapter
  const navigateToNextChapter = () => {
    if (!module || !chapter) return;
    
    const currentIndex = module.chapters.findIndex(ch => ch.id === chapter.id);
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
    
    updateChapterProgress(moduleId, chapter.id, true);
    setIsChapterCompleted(true);
    showSnackbar('Chapter marked as completed!', 'success');
  };

  // Handle chapter bookmarking
  const toggleChapterBookmark = () => {
    if (!module || !chapter) return;
    
    const bookmarkedChapters = JSON.parse(localStorage.getItem('bookmarkedChapters') || '[]');
    const bookmarkData = {
      moduleId,
      chapterId: chapter.id.toString(),
      moduleTitle: module.title,
      chapterTitle: chapter.title,
      timestamp: new Date().toISOString()
    };
    
    if (isChapterBookmarked) {
      // Remove bookmark
      const updatedBookmarks = bookmarkedChapters.filter(
        bookmark => !(bookmark.moduleId === moduleId && bookmark.chapterId === chapter.id.toString())
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
  const currentIndex = module.chapters.findIndex(ch => ch.id === chapter.id);
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
              const isCurrentChapter = ch.id === chapter.id;
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
              <Typography color="text.primary">Chapter {chapter.id}</Typography>
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
              Chapter {chapter.id} of {module.chapters.length}
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
          <ChapterContent 
            chapter={chapter} 
            moduleId={moduleId} 
            onQuizCompletion={handleQuizCompletion}
            onNextChapter={navigateToNextChapter}
          />
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
          <Button 
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
          </Button>
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