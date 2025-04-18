import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { 
  Box, Typography, Button, Breadcrumbs, Paper, CircularProgress,
  Divider, IconButton, Drawer, List, ListItem, ListItemText,
  Snackbar, Alert, Chip, TextField, InputAdornment
} from '@mui/material';
import { 
  ArrowBack, MenuBook, Menu, NavigateBefore, NavigateNext,
  BookmarkBorder, Bookmark, CheckCircle, Save, Edit, Cancel,
  Title as TitleIcon, Code as CodeIcon
} from '@mui/icons-material';

// Import the module data and the ChapterContent component
import { getModuleById } from '../data/modules';
import ChapterContent from '../components/ChapterContent';
import { getChapterProgress, updateChapterProgress } from '../utils/progressTracker';
import URLSITE from '../constant';
import hljs from 'highlight.js';
import 'highlight.js/styles/googlecode.css';

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
  
  // New state for handling editable sections
  const [isEditing, setIsEditing] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const sectionRefs = useRef({});
  const sectionTitleRefs = useRef({});
  const codeExampleRefs = useRef({});
  
  // State for edited content
  const [editedSections, setEditedSections] = useState([]);
  const [editedCodeExamples, setEditedCodeExamples] = useState([]);
  const [editedChapterTitle, setEditedChapterTitle] = useState("");
  const [editedChapterDescription, setEditedChapterDescription] = useState("");

  // Clear refs when toggling edit mode or when chapter changes
  useEffect(() => {
    sectionRefs.current = {};
    sectionTitleRefs.current = {};
    codeExampleRefs.current = {};
  }, [isEditing, chapterId]);

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
  }, [context?.user, moduleId, module, navigate]);

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
  }, [loading, isEditing, chapterContent]);

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
          
          setChapterContent(data);
          setEditedChapterTitle(data.title || "");
          setEditedChapterDescription(data.description || "");
          
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

  // Handle enabling editing mode
  const handleEnableEditing = () => {
    if (!chapterContent) return;
    
    setIsEditing(true);
    
    // Initialize with current values
    setEditedChapterTitle(chapterContent.title || "");
    setEditedChapterDescription(chapterContent.description || "");
    
    if (chapterContent.sections) {
      setEditedSections([...chapterContent.sections]);
    } else {
      setEditedSections([]);
    }
    
    if (chapterContent.codeExamples) {
      setEditedCodeExamples([...chapterContent.codeExamples]);
    } else {
      setEditedCodeExamples([]);
    }
  };

  // Handle section title change
  const handleSectionTitleChange = (sectionId, newTitle) => {
    const updatedSections = editedSections.map(section => {
      if (section.id === sectionId) {
        return { ...section, title: newTitle };
      }
      return section;
    });
    
    setEditedSections(updatedSections);
  };

  // Handle code example changes
  const handleCodeExampleChange = (exampleId, field, value) => {
    const updatedCodeExamples = editedCodeExamples.map(example => {
      if (example.id === exampleId) {
        return { ...example, [field]: value };
      }
      return example;
    });
    
    setEditedCodeExamples(updatedCodeExamples);
  };

  // Handle cancelling editing mode
  const handleCancelEditing = () => {
    setIsEditing(false);
    setEditedSections([]);
    setEditedCodeExamples([]);
    setEditedChapterTitle("");
    setEditedChapterDescription("");
    
    // Reset all section contents to their original state
    if (chapterContent?.sections) {
      chapterContent.sections.forEach(section => {
        if (sectionRefs.current[section.id]) {
          const sectionElement = sectionRefs.current[section.id];
          sectionElement.innerHTML = section.content || "";
        }
      });
    }
  };

  // Handle saving changes
  const handleSaveChanges = async () => {
    if (!chapterContent) return;
    
    setSaveLoading(true);
    
    try {
      // Collect updated content from all sections
      const updatedSections = chapterContent.sections ? chapterContent.sections.map(section => {
        const sectionElement = sectionRefs.current[section.id];
        const updatedContent = sectionElement ? sectionElement.innerHTML : (section.content || "");
        
        // Find the edited title for this section
        const sectionIndex = editedSections.findIndex(s => s.id === section.id);
        const updatedTitle = sectionIndex >= 0 ? editedSections[sectionIndex].title : section.title;
        
        return {
          ...section,
          title: updatedTitle,
          content: updatedContent
        };
      }) : [];
      
      // Collect updated code examples
      const updatedCodeExamples = chapterContent.codeExamples && editedCodeExamples.length > 0 
        ? editedCodeExamples.map(example => {
            const codeElement = codeExampleRefs.current[`${example.id}-code`];
            const updatedCode = codeElement ? codeElement.textContent : example.code;
            
            return {
              ...example,
              code: updatedCode || ""
            };
          })
        : chapterContent.codeExamples || [];
      
      // Create updated chapter content
      const updatedChapterContent = {
        ...chapterContent,
        title: editedChapterTitle,
        description: editedChapterDescription,
        sections: updatedSections,
        codeExamples: updatedCodeExamples
      };
      
      // Send the updated content to the server
      const response = await axios.post(
        `${URLSITE}/api/general/update-chapter`,
        updatedChapterContent,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (response.status === 200) {
        // Update local state with the new content
        setChapterContent(updatedChapterContent);
        setIsEditing(false);
        showSnackbar('Chapter content updated successfully!', 'success');
      } else {
        throw new Error('Failed to update chapter content');
      }
    } catch (error) {
      console.error('Error saving chapter content:', error);
      showSnackbar('Failed to save changes. Please try again.', 'error');
    } finally {
      setSaveLoading(false);
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
  const prevChapter = !isFirstChapter && currentIndex !== -1 ? module.chapters[currentIndex - 1] : null;
  const nextChapter = !isLastChapter && currentIndex !== -1 ? module.chapters[currentIndex + 1] : null;

  // Check if user has admin rights
  const isAdmin = context?.user?.email === 'verigeektech@gmail.com';

  return (
    <>
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
                {context?.currentModule?.title || module.title}
              </Link>
              <Typography color="text.primary">
                Chapter {chapterId}
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
              Chapter {chapterId} of {module.chapters?.length || 0}
              {isChapterCompleted && !isEditing && (
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
            {/* Admin editing buttons */}
            {isAdmin && !isEditing && (
              <Button
                variant="outlined"
                size="small"
                startIcon={<Edit />}
                onClick={handleEnableEditing}
              >
                Edit Content
              </Button>
            )}
            
            {isEditing && (
              <>
                <Button
                  variant="outlined"
                  size="small"
                  color="error"
                  startIcon={<Cancel />}
                  onClick={handleCancelEditing}
                >
                  Cancel Editing
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  startIcon={<Save />}
                  onClick={handleSaveChanges}
                  disabled={saveLoading}
                >
                  {saveLoading ? 'Saving...' : 'Save Changes'}
                </Button>
              </>
            )}
            
            {!isEditing && (
              <>
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
              </>
            )}
          </Box>
        </Box>

        {/* Main content */}
        <Paper elevation={0} sx={{ borderRadius: 2, overflow: 'hidden', mb: 4 }}>
          {/* Chapter title */}
          <Box sx={{ p: 4, pb: 2 }}>
            {isEditing ? (
              <>
                <TextField
                  fullWidth
                  label="Chapter Title"
                  variant="outlined"
                  value={editedChapterTitle}
                  onChange={(e) => setEditedChapterTitle(e.target.value)}
                  sx={{ mb: 2 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <TitleIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  fullWidth
                  label="Chapter Description"
                  variant="outlined"
                  value={editedChapterDescription}
                  onChange={(e) => setEditedChapterDescription(e.target.value)}
                  multiline
                  rows={2}
                  sx={{ mb: 2 }}
                />
              </>
            ) : (
              <>
                <Typography variant="h4" gutterBottom>
                  {chapterContent?.title || chapter.title || ""}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  {chapterContent?.description || ""}
                </Typography>
              </>
            )}
            
            {chapterContent?.estimatedTime && (
              <Typography variant="body2" color="text.secondary">
                Estimated time: {chapterContent.estimatedTime}
              </Typography>
            )}
          </Box>
          
          {/* Display each section content */}
          {chapterContent?.sections?.map((section) => (
            <Box key={section.id} sx={{ p: 4 }}>
              {isEditing ? (
                <TextField
                  fullWidth
                  label="Section Title"
                  variant="outlined"
                  defaultValue={section.title || ""}
                  onChange={(e) => handleSectionTitleChange(section.id, e.target.value)}
                  inputRef={el => sectionTitleRefs.current[section.id] = el}
                  sx={{ mb: 2 }}
                />
              ) : (
                <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
                  {section.title || "Untitled Section"}
                </Typography>
              )}
              
              <div
                contentEditable={isEditing}
                className={`prose prose-sm max-w-none bg-white p-4 border ${isEditing ? 'border-blue-500' : 'border-gray-200'} rounded text-[1.2rem]`}
                dangerouslySetInnerHTML={{ __html: section.content || "" }}
                ref={el => sectionRefs.current[section.id] = el}
                suppressContentEditableWarning={true}
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
                  {isEditing ? (
                    <>
                      <TextField
                        fullWidth
                        label="Example Title"
                        variant="outlined"
                        defaultValue={example.title || ""}
                        onChange={(e) => handleCodeExampleChange(example.id, 'title', e.target.value)}
                        sx={{ mb: 2 }}
                      />
                      <TextField
                        fullWidth
                        label="Example Description"
                        variant="outlined"
                        defaultValue={example.description || ""}
                        onChange={(e) => handleCodeExampleChange(example.id, 'description', e.target.value)}
                        multiline
                        rows={2}
                        sx={{ mb: 2 }}
                      />
                    </>
                  ) : (
                    <>
                      <Typography variant="h6" gutterBottom>
                        {example.title || "Untitled Example"}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {example.description || ""}
                      </Typography>
                    </>
                  )}
                  
                  <pre className={`bg-gray-100 p-4 rounded overflow-auto ${isEditing ? 'border-2 border-blue-500' : ''}`}>
                    <code
                      className={example.language || ""}
                      contentEditable={isEditing}
                      suppressContentEditableWarning={true}
                      ref={el => codeExampleRefs.current[`${example.id}-code`] = el}
                    >{example.code || ""}</code>
                  </pre>
                  
                  {example.explanation && (
                    isEditing ? (
                      <TextField
                        fullWidth
                        label="Example Explanation"
                        variant="outlined"
                        defaultValue={example.explanation}
                        onChange={(e) => handleCodeExampleChange(example.id, 'explanation', e.target.value)}
                        multiline
                        rows={3}
                        sx={{ mt: 2 }}
                      />
                    ) : (
                      <Typography variant="body2" sx={{ mt: 2 }}>
                        {example.explanation}
                      </Typography>
                    )
                  )}
                </Box>
              ))}
            </Box>
          )}
          
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
        
        {/* Floating Save Button when editing */}
        {isEditing && (
          <Box
            sx={{
              position: 'fixed',
              bottom: 30,
              right: 30,
              zIndex: 1000,
              display: 'flex',
              gap: 2
            }}
          >
            <Button
              variant="contained"
              color="primary"
              startIcon={<Save />}
              onClick={handleSaveChanges}
              disabled={saveLoading}
              sx={{ boxShadow: 3 }}
            >
              {saveLoading ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button
              variant="contained"
              color="error"
              startIcon={<Cancel />}
              onClick={handleCancelEditing}
              sx={{ boxShadow: 3 }}
            >
              Cancel
            </Button>
          </Box>
        )}
        
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
            Previous
          </Button>
          
          <Button 
            variant="contained"
            onClick={navigateToNextChapter}
            endIcon={<NavigateNext />}
            sx={{ visibility: isLastChapter ? 'hidden' : 'visible' }}
          >
            Next Topic
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
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ChapterView;