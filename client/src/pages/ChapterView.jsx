import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import RichTextEditorForEditing from './CustomEditorForEditing';

import axios from "axios";
import { 
  Box, Typography, Button, Breadcrumbs, Paper, CircularProgress,
  Divider, IconButton, Drawer, List, ListItem, ListItemText,
  Snackbar, Alert, Chip
} from '@mui/material';
import { 
  ArrowBack, MenuBook, Menu, NavigateBefore, NavigateNext,
  BookmarkBorder, Bookmark, CheckCircle, Edit, Save
} from '@mui/icons-material';

// Import the module data and the ChapterContent component
import { getModuleById } from '../data/modules';
import ChapterContent from '../components/ChapterContent';
import { getChapterProgress, updateChapterProgress } from '../utils/progressTracker';
import URLSITE from '../constant';
import hljs from 'highlight.js';
// import 'highlight.js/styles/googlecode.css'
// import 'highlight.js/styles/';
import 'highlight.js/styles/atom-one-dark.css';

import SEO from "./SEO"
// Import Verilog highlighting - make sure you have this installed
import 'highlight.js/lib/languages/verilog';
import AuthContext from '../context/AuthContext';

// Register Verilog language with highlight.js if available
try {
  const verilogLang = require('highlight.js/lib/languages/verilog');
  hljs.registerLanguage('verilog', verilogLang);
} catch (error) {
  console.warn('Verilog highlighting not available:', error);
}

const ChapterView = () => {
  const { moduleId, chapterId } = useParams();
  const navigate = useNavigate();
  const [module, setModule] = useState(null);
  const dangerousDivRef = useRef()
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
  const context = useContext(AuthContext);
  const [customEditContent, setCustomEditContent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingContent, setEditingContent] = useState('');
  const [editorContent,setEditorContent] = useState("")
  const [finalEditorContent,setFinalEditorContent] = useState("")
  // Check if user is authorized to edit
  const isAuthorizedToEdit = () => {
    return context?.user?.email === 'verigeektech@gmail.com' || 
           context?.user?.wholeData?.email === 'verigeektech@gmail.com';
  };

  const handleStartEditing = () => {
    console.log(dangerousDivRef.current.innerHTML)
    
    if (!isAuthorizedToEdit()) return;
    
    // Set editing content based on current chapter content
    if (chapterContent?.isNewEditorUsed && chapterContent?.editorContent) {
      setEditingContent(dangerousDivRef.current.innerHTML)
    } else {
      // If using old format, convert sections to HTML
      let combinedContent = '';
      chapterContent?.sections?.forEach((section) => {
        combinedContent += `<h3>${section.title || "Untitled Section"}</h3>`;
        combinedContent += section.content || "";
      });
      setEditingContent(combinedContent);
    }
    
    setIsEditing(true);
  };

  const handleSaveEdits = async () => {
    if (!isAuthorizedToEdit()) return;
    
    try {
      // Prepare the updated content
      const updatedContent = {
        ...chapterContent,
        editorContent: finalEditorContent,
        isNewEditorUsed: true
      };
      console.log("update content")
      console.log(updatedContent)
      // Send update request to server
      const response = await axios.put(`${URLSITE}/api/general/updatechapter/${chapterId}`, {
        editorContent: finalEditorContent,
        isNewEditorUsed: true
      });

      if (response.status === 200) {
        // Update local state
        setChapterContent(updatedContent);
        setIsEditing(false);
        showSnackbar('Chapter content updated successfully!', 'success');
      } else {
        throw new Error('Failed to update chapter content');
      }
    } catch (error) {
      console.error('Error saving chapter content:', error);
      showSnackbar('Failed to save changes. Please try again.', 'error');
    }
  };

  const handleCancelEditing = () => {
    setIsEditing(false);
    setEditingContent('');
  };

  const navigateToNextChapter = () => {
    if (!context?.currentModule?.chapters) return;
    
    let nextIndex = context.currentChapterIndex + 1;
    if (context.currentModule.chapters.length > nextIndex) {
      context.setCurrentChapterIndex?.(nextIndex);
      navigate(`/modules/${moduleId}/chapters/${context.currentModule.chapters[nextIndex].chapterId}`);
    }
  };

  const navigateToPrevChapter = () => {
    if (!context?.currentModule?.chapters) return;
    
    let prevIndex = context.currentChapterIndex - 1;
    if (prevIndex >= 0) {
      context.setCurrentChapterIndex?.(prevIndex);
      navigate(`/modules/${moduleId}/chapters/${context.currentModule.chapters[prevIndex].chapterId}`);
    }
  };

  // Check user access to paid modules
  useEffect(() => {
    if (!moduleId || !module || !module.moduleType) return;
    if (!context?.user) {
      setIsAuthenticated(false);
      return;
    }
    
    setIsAuthenticated(true);
    
    const checkModuleAccess = async () => {
      if (!moduleId || !module) return;
      
      try {
        const response = await axios.post(`${URLSITE}/api/general/user-by-email`, { 
          email: context.user.wholeData?.email 
        });
        
        if (response.status === 200) {
          // If module is not free and user doesn't have access, redirect
          if (module.moduleType !== "free" && 
              !response.data.paidModule?.some(mod => mod.moduleId === moduleId)) {
            navigate(`/modules/${moduleId}`);
          }
        }
      } catch (err) {
        console.error('Error checking module access:', err);
        // Don't redirect on error, just log it
      }
    };

    checkModuleAccess();
  }, [context?.user]);

  // Apply syntax highlighting
  useEffect(() => {
    const applyHighlighting = () => {
      setTimeout(() => {
        document.querySelectorAll('pre code').forEach((block) => {
          hljs.highlightBlock(block);
        });
      }, 0);
    };
    
    if (!loading) {
      applyHighlighting();
    }
  }, [loading, chapterContent]);

  // Fetch module and chapter data
  useEffect(() => {
    const fetchModuleAndChapter = async () => {
      try {
        setLoading(true);
        
        // Get module data
        let moduleData = getModuleById(moduleId);
        if (!moduleData) {
          throw new Error(`Module with ID ${moduleId} not found`);
        }
        
        setModule(moduleData);
        
        // Fetch chapter content from server using chapterId
        try {
          const response = await axios.get(`${URLSITE}/api/general/chapter/${chapterId}`);
          const data = response.data;
          console.log(data)
          setChapterContent(data);
          setCustomEditContent(data.editorContent)
          // Set chapter basic info
          setChapter({
            id: data.id,
            title: data.title,
            moduleId: data.moduleId
          });
        } catch (err) {
          console.error('Error fetching chapter content:', err);
          setError(err.message);
          
          // Fallback to module data if API fetch fails
          if (moduleData?.chapters) {
            const chapterIdNum = parseInt(chapterId, 10);
            const fallbackChapter = moduleData.chapters.find(c => c.id === chapterIdNum);
            
            if (fallbackChapter) {
              setChapter(fallbackChapter);
              // Create minimal chapter content structure
              setChapterContent({
                id: fallbackChapter.id,
                title: fallbackChapter.title,
                description: fallbackChapter.description || "",
                sections: fallbackChapter.sections || [],
                codeExamples: fallbackChapter.codeExamples || []
              });
            } else {
              throw new Error(`Chapter with ID ${chapterId} not found`);
            }
          }
        }
        
        // Get progress data if authenticated
        if (isAuthenticated) {
          try {
            const progressResponse = await axios.get(`${URLSITE}/api/user/progress/${moduleId}`);
            if (progressResponse.status === 200) {
              setProgress(progressResponse.data);
            }
          } catch (progressErr) {
            console.error('Error fetching progress:', progressErr);
            // Continue without progress data
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
          const chapterIdNum = parseInt(chapterId, 10);
          const isCompleted = getChapterProgress(moduleId, chapterIdNum);
          setIsChapterCompleted(isCompleted);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchModuleAndChapter();
  }, [moduleId, chapterId, isAuthenticated]);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Handle chapter completion
  const markChapterCompleted = () => {
    if (!module || !chapter) return;
    
    const chapterIdNum = parseInt(chapterId, 10);
    updateChapterProgress(moduleId, chapterIdNum, true);
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
  if (error || !module || !chapter) {
    return (
      <Box className="container page-container" sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h5">
          {error || "Content not found"}
        </Typography>
        <Button component={Link} to="/modules" sx={{ mt: 2 }}>
          Back to Modules
        </Button>
      </Box>
    );
  }

  // Calculate chapter navigation info
  const currentIndex = module.chapters ? 
    module.chapters.findIndex(ch => ch.id === parseInt(chapterId, 10)) : -1;
  const isFirstChapter = currentIndex === 0;
  const isLastChapter = currentIndex === (module.chapters?.length - 1) || currentIndex === -1;

  return (
    <>
      {chapter && chapterContent?.description && (
        <SEO 
          title={chapter?.title} 
          description={chapterContent?.description || ""} 
          url={"verigeek.xyz"}
        />
      )}
      
      {/* Drawer for chapter navigation */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
      >
        <Box sx={{ width: 300, p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {context?.currentModule?.title || module.title}
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <List>
            {module.chapters?.map(ch => {
              const isCurrentChapter = ch.id === parseInt(chapterId, 10);
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
        
        {/* Rich Text Editor for Editing */}
        {isEditing && (
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Editing Chapter Content</Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="contained"
                  startIcon={<Save />}
                  onClick={handleSaveEdits}
                  color="primary"
                >
                  Save Edits
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleCancelEditing}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
            <RichTextEditorForEditing 
            editorContent={finalEditorContent}
            setEditorContent={setFinalEditorContent}
            customEditContent={customEditContent}
            />
          </Box>
        )}
        
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
                {context?.currentModule?.title}
              </Link>
              <Typography color="text.primary">
                Chapter {chapter?.title}
              </Typography>
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
              Chapter {chapter?.title}
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
            {/* Start Editing Button - Only visible to authorized user */}
            {isAuthorizedToEdit() && !isEditing && (
              <Button
                variant="outlined"
                size="small"
                startIcon={<Edit />}
                onClick={handleStartEditing}
                color="primary"
              >
                Start Editing
              </Button>
            )}
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

        {/* Main content - Only show when not editing */}
        {!isEditing && (
          <Paper elevation={0} sx={{ borderRadius: 2, overflow: 'hidden', mb: 4 }}>
            {/* Chapter title */}
            <Box sx={{ p: 4, pb: 2 }}>
              <Typography variant="h4" gutterBottom>
                {chapterContent?.title || chapter.title || ""}
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
            {
              chapterContent !== null && chapterContent.isNewEditorUsed === true ? (
                <div
                ref={dangerousDivRef}
                  className="prose prose-purple max-w-none bg-white p-4 rounded-lg shadow-lg border border-purple-200 min-h-full preview-content"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(chapterContent.editorContent || "", {
                      FORBID_ATTR: ['style'], // strips all inline styles
                    }),
                  }}
                />
              ) : (
                <>
                  {chapterContent?.sections?.map((section) => (
                    <Box key={section.id} sx={{ p: 4 }}>
                      <Typography className='className="prose prose-purple max-w-none bg-white p-4 rounded-lg shadow-lg border border-purple-200 min-h-full preview-content"
                 ' variant="h5" gutterBottom sx={{ mt: 2 }}>
                        {section.title || "Untitled Section"}
                      </Typography>
                      <div
                        className="prose prose-purple max-w-none bg-white p-4 rounded-lg shadow-lg border border-purple-200 min-h-full preview-content"
                   dangerouslySetInnerHTML={{ __html: section.content || "" }}
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
                            {example.title || "Untitled Example"}
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            {example.description || ""}
                          </Typography>
                          <pre className="bg-gray-100 p-4 rounded overflow-auto">
                            <code className={example.language || ""}>
                              {example.code || ""}
                            </code>
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
                </>
              )
            }
            {/* If no content is available, use the ChapterContent component as fallback */}
            {(!chapterContent || (!chapterContent.sections?.length && !chapterContent.codeExamples?.length)) && (
              <ChapterContent 
                chapter={chapter} 
                moduleId={moduleId} 
                onQuizCompletion={handleQuizCompletion}
                onNextChapter={navigateToNextChapter}
              />
            )}
          </Paper>
        )}

        {/* Navigation buttons - Only show when not editing */}
        {!isEditing && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
            <Button 
              variant="outlined"
              startIcon={<NavigateBefore />}
              onClick={navigateToPrevChapter}
            >
              Previous Chapter
            </Button>
            <Button 
              variant="contained"
              endIcon={<NavigateNext />}
              onClick={navigateToNextChapter}
            >
              Next Chapter
            </Button>
          </Box>
        )}

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
        >
          <Alert 
            onClose={() => setSnackbarOpen(false)} 
            severity={snackbarSeverity}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default ChapterView;