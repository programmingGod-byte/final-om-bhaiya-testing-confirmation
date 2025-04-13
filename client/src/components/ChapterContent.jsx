import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Box, Typography, Paper, Accordion, AccordionSummary, AccordionDetails,
  Divider, Button, Grid, Card, CardContent, CardMedia, CardActionArea, 
  Chip, Radio, RadioGroup, FormControlLabel, FormControl, Alert, Snackbar
} from '@mui/material';
import { 
  ExpandMore, PlayArrow, Code, Quiz, Check, VideoLibrary,
  Assignment, BookmarkBorder, Bookmark, ArrowForward, Close
} from '@mui/icons-material';
import { markQuizCompleted } from '../utils/progressTracker';

const ChapterContent = ({ chapter, moduleId, onQuizCompletion, onNextChapter }) => {
  const [searchParams] = useSearchParams();
  const [expandedSection, setExpandedSection] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [bookmarked, setBookmarked] = useState([]);
  const [progress, setProgress] = useState(0);
  const [sectionProgress, setSectionProgress] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [activeTab, setActiveTab] = useState('content');
  const [quizScore, setQuizScore] = useState(0);
  const [quizPassed, setQuizPassed] = useState(false);

  // Check if the chapter has quiz questions in either chapter.quiz.questions or chapter.questions
  const hasQuiz = Boolean(
    (chapter.quiz && chapter.quiz.questions && chapter.quiz.questions.length > 0) ||
    (chapter.questions && chapter.questions.length > 0)
  );

  // Get the questions from the correct location
  const getQuizQuestions = () => {
    if (chapter.quiz && chapter.quiz.questions) {
      return chapter.quiz.questions;
    } else if (chapter.questions) {
      return chapter.questions;
    }
    return [];
  };

  const quizQuestions = getQuizQuestions();
  const quizTitle = chapter.quiz?.title || `${chapter.title} Quiz`;
  const quizDescription = chapter.quiz?.description || 'Test your knowledge of this chapter\'s content.';

  useEffect(() => {
    // Load bookmarks from localStorage
    const savedBookmarks = localStorage.getItem(`bookmarks-${moduleId}-${chapter.id}`);
    if (savedBookmarks) {
      setBookmarked(JSON.parse(savedBookmarks));
    }
    
    // Load progress from localStorage
    const savedProgress = localStorage.getItem(`progress-${moduleId}-${chapter.id}`);
    if (savedProgress) {
      setSectionProgress(JSON.parse(savedProgress));
      
      // Calculate overall progress
      const progressObj = JSON.parse(savedProgress);
      const completedSections = Object.values(progressObj).filter(val => val).length;
      const totalSections = chapter.sections && Array.isArray(chapter.sections) ? chapter.sections.length : 0;
      if (totalSections > 0) {
        setProgress(Math.round((completedSections / totalSections) * 100));
      }
    }
  }, [moduleId, chapter.id, chapter.sections]);

  // Set active tab based on URL parameters
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && (tabParam === 'content' || tabParam === 'quiz')) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const handleSectionChange = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
    
    // Mark section as read when expanded
    if (expandedSection !== sectionId && !sectionProgress[sectionId]) {
      const updatedProgress = { ...sectionProgress, [sectionId]: true };
      setSectionProgress(updatedProgress);
      
      // Save progress to localStorage
      localStorage.setItem(`progress-${moduleId}-${chapter.id}`, JSON.stringify(updatedProgress));
      
      // Update overall progress
      const completedSections = Object.values(updatedProgress).filter(val => val).length;
      const totalSections = chapter.sections && Array.isArray(chapter.sections) ? chapter.sections.length : 0;
      if (totalSections > 0) {
        setProgress(Math.round((completedSections / totalSections) * 100));
      }
    }
  };

  const handleAnswerChange = (questionId, value) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleQuizSubmit = () => {
    // Calculate the score
    let correctCount = 0;
    let totalQuestions = 0;
    
    if (quizQuestions.length > 0) {
      totalQuestions = quizQuestions.length;
      
      quizQuestions.forEach((question, index) => {
        const questionId = question.id || index;
        if (quizAnswers[questionId] === question.correctAnswer) {
          correctCount++;
        }
      });
    }
    
    const score = totalQuestions > 0 ? (correctCount / totalQuestions) * 100 : 0;
    const passed = score >= 70; // Pass threshold is 70%
    
    setQuizScore(score);
    setQuizPassed(passed);
    setQuizSubmitted(true);
    
    // Save the quiz result to localStorage
    if (passed) {
      markQuizCompleted(moduleId, chapter.id, score);
    }
    
    // Notify the parent component
    if (onQuizCompletion) {
      onQuizCompletion(passed, score);
    }
  };

  const resetQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
    setQuizPassed(false);
  };

  const toggleBookmark = (sectionId) => {
    let updatedBookmarks;
    if (bookmarked.includes(sectionId)) {
      updatedBookmarks = bookmarked.filter(id => id !== sectionId);
      setSnackbarMessage('Bookmark removed');
    } else {
      updatedBookmarks = [...bookmarked, sectionId];
      setSnackbarMessage('Bookmark added - you can access this later from your profile');
    }
    
    setBookmarked(updatedBookmarks);
    localStorage.setItem(`bookmarks-${moduleId}-${chapter.id}`, JSON.stringify(updatedBookmarks));
    setSnackbarOpen(true);
  };

  const handleNextChapter = () => {
    if (onNextChapter) {
      onNextChapter();
    }
  };

  if (!chapter) {
    return <Box sx={{ p: 3 }}><Typography>Chapter not found</Typography></Box>;
  }

  // Check if sections exist and provide a fallback message if not
  const hasNoSections = !chapter.sections || !Array.isArray(chapter.sections) || chapter.sections.length === 0;

  return (
    <Box>
      <Box sx={{ p: 3, bgcolor: 'primary.main', color: 'white' }}>
        <Typography variant="h4" gutterBottom>{chapter.title}</Typography>
        <Typography variant="subtitle1">{chapter.description}</Typography>
      </Box>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Box sx={{ display: 'flex' }}>
          <Button 
            onClick={() => setActiveTab('content')}
            sx={{ 
              py: 2, 
              px: 3, 
              borderBottom: activeTab === 'content' ? '2px solid' : 'none',
              borderColor: 'primary.main',
              color: activeTab === 'content' ? 'primary.main' : 'text.primary',
              borderRadius: 0,
              fontWeight: activeTab === 'content' ? 'bold' : 'normal'
            }}
          >
            Content
          </Button>
          {hasQuiz && (
            <Button 
              onClick={() => setActiveTab('quiz')}
              sx={{ 
                py: 2, 
                px: 3, 
                borderBottom: activeTab === 'quiz' ? '2px solid' : 'none',
                borderColor: 'primary.main',
                color: activeTab === 'quiz' ? 'primary.main' : 'text.primary',
                borderRadius: 0,
                fontWeight: activeTab === 'quiz' ? 'bold' : 'normal'
              }}
            >
              Quiz
            </Button>
          )}
        </Box>
      </Box>
      
      <Box sx={{ p: 3 }}>
        {activeTab === 'content' ? (
          <>
            {hasNoSections ? (
              <Paper elevation={0} variant="outlined" sx={{ p: 3, borderRadius: 2, textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>Content Coming Soon</Typography>
                <Typography variant="body1">
                  The content for this chapter is currently being developed. 
                  Please check back later for updates.
                </Typography>
              </Paper>
            ) : (
              chapter.sections.map((section) => (
                <Accordion 
                  key={section.id}
                  expanded={expandedSection === section.id}
                  onChange={() => handleSectionChange(section.id)}
                  sx={{ 
                    mb: 2, 
                    overflow: 'hidden',
                    bgcolor: sectionProgress[section.id] ? 'rgba(76, 175, 80, 0.04)' : 'transparent',
                    position: 'relative'
                  }}
                >
                  <AccordionSummary expandIcon={<ExpandMore />} sx={{ bgcolor: 'action.hover' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                      <Typography sx={{ fontWeight: expandedSection === section.id ? 'bold' : 'normal' }}>
                        {section.id} - {section.title}
                        {sectionProgress[section.id] && (
                          <Chip
                            label="Completed"
                            size="small"
                            color="success"
                            sx={{ ml: 2, height: 20, fontSize: '0.6rem' }}
                          />
                        )}
                      </Typography>
                      <Button 
                        size="small" 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmark(section.id);
                        }}
                        startIcon={bookmarked.includes(section.id) ? <Bookmark color="primary" /> : <BookmarkBorder />}
                        sx={{ ml: 2 }}
                      >
                        {bookmarked.includes(section.id) ? 'Bookmarked' : 'Bookmark'}
                      </Button>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box sx={{ p: 1 }} dangerouslySetInnerHTML={{ __html: section.content }} />
                  </AccordionDetails>
                </Accordion>
              ))
            )}
            
            {bookmarked.length > 0 && !hasNoSections && (
              <Box sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Your Bookmarked Sections
                </Typography>
                <Paper elevation={0} variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                  <Grid container spacing={2}>
                    {bookmarked.map(bookmarkId => {
                      const section = chapter.sections.find(s => s.id === bookmarkId);
                      if (!section) return null;
                      
                      return (
                        <Grid item xs={12} sm={6} md={4} key={bookmarkId}>
                          <Paper 
                            variant="outlined" 
                            sx={{ 
                              p: 2, 
                              cursor: 'pointer',
                              '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.03)' }
                            }}
                            onClick={() => {
                              setExpandedSection(bookmarkId);
                              setTimeout(() => {
                                document.getElementById(`section-${bookmarkId}`)?.scrollIntoView({ behavior: 'smooth' });
                              }, 100);
                            }}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Bookmark color="primary" sx={{ mr: 1, fontSize: '1rem' }} />
                              <Typography variant="body2" fontWeight="medium">
                                {section.title}
                              </Typography>
                            </Box>
                          </Paper>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Paper>
              </Box>
            )}
            
            {chapter.examples && chapter.examples.length > 0 && (
              <>
                <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2 }}>
                  Code Examples
                </Typography>
                
                <Grid container spacing={3}>
                  {chapter.examples.map((example) => (
                    <Grid item xs={12} md={6} key={example.id}>
                      <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                        <Box sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', p: 2, display: 'flex', alignItems: 'center' }}>
                          <Code sx={{ mr: 1 }} />
                          <Typography variant="h6">{example.title}</Typography>
                        </Box>
                        <Box sx={{ p: 2 }}>
                          <Typography variant="body2" paragraph>{example.description}</Typography>
                          <Paper variant="outlined" sx={{ 
                            p: 2, 
                            bgcolor: '#272822', 
                            color: '#f8f8f2', 
                            fontFamily: 'monospace',
                            whiteSpace: 'pre-wrap',
                            overflowX: 'auto',
                            fontSize: '0.875rem'
                          }}>
                            {example.code}
                          </Paper>
                          <Typography variant="subtitle2" sx={{ mt: 2, fontWeight: 'bold' }}>Explanation:</Typography>
                          <Typography variant="body2">{example.explanation}</Typography>
                        </Box>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </>
            )}
            
            {chapter.videos && chapter.videos.length > 0 && (
              <>
                <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2 }}>
                  Video Resources
                </Typography>
                
                <Grid container spacing={3}>
                  {chapter.videos.map((video) => (
                    <Grid item xs={12} sm={6} md={4} key={video.id}>
                      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <CardActionArea component="a" href={video.url} target="_blank" rel="noopener noreferrer">
                          <Box sx={{ position: 'relative' }}>
                            <CardMedia
                              component="img"
                              height="140"
                              image={video.thumbnail}
                              alt={video.title}
                            />
                            <Box sx={{ 
                              position: 'absolute', 
                              top: 0, 
                              left: 0, 
                              width: '100%', 
                              height: '100%', 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'center',
                              background: 'rgba(0,0,0,0.3)',
                              transition: 'background 0.3s',
                              '&:hover': { background: 'rgba(0,0,0,0.5)' }
                            }}>
                              <PlayArrow sx={{ fontSize: 60, color: 'white' }} />
                            </Box>
                          </Box>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </>
            )}
          </>
        ) : (
          <>
            <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
              Chapter Quiz
            </Typography>
            
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Quiz sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">{quizTitle}</Typography>
              </Box>
              
              <Typography variant="body2" paragraph>
                {quizDescription}
              </Typography>
              
              {quizSubmitted && quizScore && (
                <Alert 
                  severity={quizPassed ? "success" : "warning"} 
                  sx={{ mb: 3 }}
                >
                  <Typography variant="subtitle2">
                    {quizPassed 
                      ? "Congratulations! You passed the quiz." 
                      : "You need to review this chapter again."}
                  </Typography>
                  <Typography variant="body2">
                    Your score: {quizScore.toFixed(1)}%
                  </Typography>
                </Alert>
              )}
              
              {quizQuestions.map((question, index) => {
                const questionId = question.id || index;
                return (
                  <Box key={questionId} sx={{ mb: 3, pb: 3, borderBottom: index < quizQuestions.length - 1 ? '1px solid #e0e0e0' : 'none' }}>
                    <Typography variant="subtitle1" gutterBottom>
                      {index + 1}. {question.question}
                    </Typography>
                    
                    <FormControl component="fieldset" sx={{ ml: 2 }}>
                      <RadioGroup
                        value={quizAnswers[questionId] || ''}
                        onChange={(e) => handleAnswerChange(questionId, Number(e.target.value))}
                      >
                        {question.options.map((option, optIndex) => {
                          // Handle both array of strings and array of objects
                          const optionId = typeof option === 'object' ? option.id : optIndex;
                          const optionText = typeof option === 'object' ? option.text : option;
                          
                          return (
                            <FormControlLabel
                              key={optionId}
                              value={optionId}
                              control={<Radio />}
                              label={optionText}
                              disabled={quizSubmitted}
                              sx={{
                                ...(quizSubmitted && optionId === question.correctAnswer && {
                                  color: 'success.main',
                                  fontWeight: 'bold'
                                }),
                                ...(quizSubmitted && quizAnswers[questionId] === optionId && quizAnswers[questionId] !== question.correctAnswer && {
                                  color: 'error.main'
                                })
                              }}
                            />
                          );
                        })}
                      </RadioGroup>
                    </FormControl>
                    
                    {quizSubmitted && (
                      <Box sx={{ mt: 1, ml: 2 }}>
                        {quizAnswers[questionId] === question.correctAnswer ? (
                          <Typography variant="body2" sx={{ color: 'success.main', display: 'flex', alignItems: 'center' }}>
                            <Check fontSize="small" sx={{ mr: 0.5 }} />
                            Correct!
                          </Typography>
                        ) : (
                          <Typography variant="body2" sx={{ color: 'error.main' }}>
                            Incorrect. The correct answer is: {
                              typeof question.options[question.correctAnswer] === 'object' 
                                ? question.options[question.correctAnswer]?.text 
                                : question.options[question.correctAnswer]
                            }
                          </Typography>
                        )}
                        
                        <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic' }}>
                          {question.explanation}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                );
              })}
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                {quizSubmitted ? (
                  <Button 
                    variant="outlined" 
                    onClick={resetQuiz} 
                    startIcon={<Assignment />}
                  >
                    Retake Quiz
                  </Button>
                ) : (
                  <Button 
                    variant="contained" 
                    onClick={handleQuizSubmit} 
                    startIcon={<Check />}
                    disabled={Object.keys(quizAnswers).length !== quizQuestions.length}
                  >
                    Submit Answers
                  </Button>
                )}
                
                <Button 
                  variant="outlined" 
                  onClick={handleNextChapter} 
                  endIcon={<ArrowForward />}
                >
                  Next Chapter
                </Button>
              </Box>
            </Paper>
          </>
        )}
      </Box>
      
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default ChapterContent; 