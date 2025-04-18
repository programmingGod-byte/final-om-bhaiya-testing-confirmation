

import { useState } from 'react';
import { Search, ChevronDown, ChevronUp, Plus, Code, Hash, MessageSquare, ThumbsUp, ThumbsDown, ChevronLeft, ChevronRight, Tag, Container } from 'lucide-react';

import { 
  Box, Typography, Grid, Card, CardContent, CardMedia, CardActionArea, 
  Chip, TextField, InputAdornment, FormControl, InputLabel, Select, MenuItem,
  Pagination, Divider, CircularProgress,
  Fade,
  Zoom
} from '@mui/material';



import {
  ElectricBolt as ElectricBoltIcon,
  Memory as MemoryIcon,
  
} from '@mui/icons-material';

export default function ForumPage() {
  // Available tag categories
  const tagCategories = {
    frontend: ["react", "vue", "angular", "javascript", "html", "css", "tailwind", "bootstrap"],
    backend: ["node", "express", "django", "flask", "php", "java", "python", "ruby"],
    database: ["sql", "mongodb", "firebase", "postgresql", "mysql", "redis", "graphql"],
    devops: ["docker", "kubernetes", "aws", "azure", "ci-cd", "git", "github"],
    mobile: ["react-native", "flutter", "swift", "kotlin", "android", "ios"],
    tools: ["vscode", "webpack", "babel", "eslint", "jest", "cypress"]
  };

  // Sample data for questions
  const [questions, setQuestions] = useState([
    {
      id: 1,
      title: "How to implement useContext in React?",
      description: "I'm trying to use the Context API for state management but I'm having trouble setting it up correctly.",
      tags: ["react", "hooks", "context"],
      code: `import { createContext, useContext, useState } from 'react';

const MyContext = createContext();

export function MyProvider({ children }) {
  const [value, setValue] = useState('default value');
  
  return (
    <MyContext.Provider value={{ value, setValue }}>
      {children}
    </MyContext.Provider>
  );
}

export function useMyContext() {
  return useContext(MyContext);
}`,
      author: "Sarah J.",
      date: "April 16, 2025",
      votes: 12,
      replies: [
        {
          id: 1,
          author: "Mike T.",
          content: "Make sure you're importing useContext correctly. Your code looks fine but remember to wrap your components with the provider.",
          date: "April 16, 2025",
          votes: 8
        },
        {
          id: 2,
          author: "Lisa R.",
          content: "Have you checked if the context is being provided at the right level in your component tree?",
          date: "April 17, 2025",
          votes: 5
        }
      ]
    },
    {
      id: 2,
      title: "Best way to handle form validation in React?",
      description: "Looking for efficient ways to validate forms without writing too much boilerplate code.",
      tags: ["react", "forms", "validation"],
      code: `const [errors, setErrors] = useState({});

const validateForm = () => {
  const newErrors = {};
  
  if (!email) {
    newErrors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    newErrors.email = 'Email is invalid';
  }
  
  if (!password) {
    newErrors.password = 'Password is required';
  } else if (password.length < 8) {
    newErrors.password = 'Password must be at least 8 characters';
  }
  
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};`,
      author: "Alex D.",
      date: "April 14, 2025",
      votes: 8,
      replies: [
        {
          id: 3,
          author: "Taylor K.",
          content: "I recommend using Formik or React Hook Form. They handle most of the validation logic for you.",
          date: "April 15, 2025",
          votes: 15
        }
      ]
    },
    {
      id: 3,
      title: "Redux vs Context API performance",
      description: "When should I use Redux instead of the Context API for state management in React?",
      tags: ["react", "redux", "state-management"],
      code: "",
      author: "Jordan M.",
      date: "April 13, 2025",
      votes: 22,
      replies: [
        {
          id: 4,
          author: "Robin S.",
          content: "Context API is great for simple state that doesn't change often. Redux shines with complex state logic and frequent updates.",
          date: "April 14, 2025",
          votes: 10
        },
        {
          id: 5,
          author: "Casey P.",
          content: "Also consider Redux Toolkit which simplifies Redux setup and reduces boilerplate significantly.",
          date: "April 15, 2025",
          votes: 12
        }
      ]
    }
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [newQuestion, setNewQuestion] = useState({
    title: "",
    description: "",
    tags: [],
    code: ""
  });
  const [newTag, setNewTag] = useState("");
  const [newReply, setNewReply] = useState("");
  const [selectedTagCategory, setSelectedTagCategory] = useState("frontend");
  const [showTagSelector, setShowTagSelector] = useState(false);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentQuestions = questions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(questions.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleQuestionClick = (id) => {
    if (expandedQuestion === id) {
      setExpandedQuestion(null);
    } else {
      setExpandedQuestion(id);
    }
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    if (newTag.trim() && !newQuestion.tags.includes(newTag.trim())) {
      setNewQuestion({
        ...newQuestion,
        tags: [...newQuestion.tags, newTag.trim()]
      });
      setNewTag("");
    }
  };

  const handleSelectTag = (tag) => {
    if (!newQuestion.tags.includes(tag)) {
      setNewQuestion({
        ...newQuestion,
        tags: [...newQuestion.tags, tag]
      });
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setNewQuestion({
      ...newQuestion,
      tags: newQuestion.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleNewQuestionSubmit = (e) => {
    e.preventDefault();
    const newQuestionData = {
      id: questions.length + 1,
      ...newQuestion,
      author: "Current User",
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      votes: 0,
      replies: []
    };
    setQuestions([newQuestionData, ...questions]);
    setNewQuestion({
      title: "",
      description: "",
      tags: [],
      code: ""
    });
    setShowNewPostForm(false);
  };

  const handleAddReply = (questionId) => {
    if (!newReply.trim()) return;
    
    const updatedQuestions = questions.map(q => {
      if (q.id === questionId) {
        return {
          ...q,
          replies: [
            ...q.replies,
            {
              id: Math.max(0, ...q.replies.map(r => r.id)) + 1,
              author: "Current User",
              content: newReply,
              date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
              votes: 0
            }
          ]
        };
      }
      return q;
    });
    
    setQuestions(updatedQuestions);
    setNewReply("");
  };

  const handleVote = (questionId, replyId = null, isUpvote) => {
    const updatedQuestions = questions.map(q => {
      if (replyId === null && q.id === questionId) {
        return {
          ...q,
          votes: isUpvote ? q.votes + 1 : q.votes - 1
        };
      } else if (replyId !== null && q.id === questionId) {
        return {
          ...q,
          replies: q.replies.map(r => {
            if (r.id === replyId) {
              return {
                ...r,
                votes: isUpvote ? r.votes + 1 : r.votes - 1
              };
            }
            return r;
          })
        };
      }
      return q;
    });
    
    setQuestions(updatedQuestions);
  };

  return (
    <>


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
                            VeriGeek Learning Modules
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
                       Browse our comprehensive collection of Verilog modules designed to take you from beginner to expert. Each module contains theory, examples, and hands-on exercises.
                          </Typography>
                          
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
    
                
    

    <div className="bg-purple-50 min-h-screen p-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-t-4 border-purple-600">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-purple-800">Dev Forum</h1>
            <button 
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md flex items-center gap-1"
              onClick={() => setShowNewPostForm(!showNewPostForm)}
            >
              <Plus size={16} />
              <span>New Question</span>
            </button>
          </div>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Search questions..."
              className="w-full border border-gray-300 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
        </div>

        {/* New Question Form */}
        {showNewPostForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-purple-800">Ask a Question</h2>
            <form onSubmit={handleNewQuestionSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={newQuestion.title}
                  onChange={(e) => setNewQuestion({...newQuestion, title: e.target.value})}
                  placeholder="What's your question about?"
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newQuestion.description}
                  onChange={(e) => setNewQuestion({...newQuestion, description: e.target.value})}
                  placeholder="Provide more details about your question..."
                  rows="4"
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Code Snippet (optional)</label>
                <div className="relative">
                  <Code size={18} className="absolute left-3 top-3 text-gray-400" />
                  <textarea
                    value={newQuestion.code}
                    onChange={(e) => setNewQuestion({...newQuestion, code: e.target.value})}
                    placeholder="Paste your code here..."
                    rows="6"
                    className="w-full border border-gray-300 rounded-md p-2 pl-10 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                
                {/* Tag selection interface */}
                <div className="mb-3">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setShowTagSelector(!showTagSelector)}
                      className="bg-purple-100 hover:bg-purple-200 text-purple-800 px-3 py-2 rounded-md flex items-center gap-1"
                    >
                      <Tag size={16} />
                      <span>Select from Categories</span>
                    </button>
                    <span className="text-sm text-gray-500">or add custom tags below</span>
                  </div>
                  
                  {showTagSelector && (
                    <div className="mt-3 p-4 border border-gray-200 rounded-md bg-gray-50">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {Object.keys(tagCategories).map((category) => (
                          <button
                            key={category}
                            type="button"
                            onClick={() => setSelectedTagCategory(category)}
                            className={`px-3 py-1 rounded-md text-sm ${
                              selectedTagCategory === category
                                ? 'bg-purple-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                          >
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                          </button>
                        ))}
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {tagCategories[selectedTagCategory].map((tag) => (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => handleSelectTag(tag)}
                            className={`px-2 py-1 rounded-md text-sm border ${
                              newQuestion.tags.includes(tag)
                                ? 'bg-purple-100 text-purple-800 border-purple-400'
                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                            }`}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Manual tag input */}
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add custom tag"
                    className="flex-grow border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button
                    onClick={handleAddTag}
                    className="bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-md"
                    type="button"
                  >
                    Add
                  </button>
                </div>
                
                {/* Selected tags */}
                <div className="flex flex-wrap gap-2">
                  {newQuestion.tags.map((tag, index) => (
                    <div key={index} className="bg-purple-100 text-purple-800 px-2 py-1 rounded-md flex items-center gap-1">
                      <Hash size={12} />
                      <span>{tag}</span>
                      <button 
                        type="button" 
                        onClick={() => handleRemoveTag(tag)}
                        className="text-purple-500 hover:text-purple-700 ml-1"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowNewPostForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md"
                >
                  Post Question
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Questions List */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4 text-purple-800">Recent Questions</h2>
          
          {currentQuestions.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
              No questions found. Be the first to ask!
            </div>
          ) : (
            currentQuestions.map((question) => (
              <div 
                key={question.id} 
                className="bg-white rounded-lg shadow-md mb-4 overflow-hidden border-l-4 border-purple-400"
              >
                {/* Question Header */}
                <div 
                  className="p-4 cursor-pointer hover:bg-gray-50"
                  onClick={() => handleQuestionClick(question.id)}
                >
                  <div className="flex justify-between">
                    <h3 className="text-lg font-medium text-purple-800">{question.title}</h3>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-gray-500">
                        <MessageSquare size={16} />
                        <span>{question.replies.length}</span>
                      </div>
                      {expandedQuestion === question.id ? (
                        <ChevronUp size={20} className="text-gray-400" />
                      ) : (
                        <ChevronDown size={20} className="text-gray-400" />
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-2 text-gray-600">
                    {question.description.length > 150 
                      ? `${question.description.substring(0, 150)}...` 
                      : question.description}
                  </div>
                  
                  <div className="mt-3 flex items-center gap-3">
                    <div className="flex flex-wrap gap-2">
                      {question.tags.map((tag, index) => (
                        <div key={index} className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-md flex items-center">
                          <Hash size={10} className="mr-1" />
                          {tag}
                        </div>
                      ))}
                    </div>
                    <div className="ml-auto text-sm text-gray-500">
                      Asked by {question.author} on {question.date}
                    </div>
                  </div>
                </div>

                {/* Expanded Question Content */}
                {expandedQuestion === question.id && (
                  <div className="border-t border-gray-200">
                    {/* Vote buttons */}
                    <div className="p-4 bg-gray-50 flex items-center">
                      <div className="flex items-center gap-1">
                        <button 
                          onClick={() => handleVote(question.id, null, true)}
                          className="text-gray-500 hover:text-purple-600"
                        >
                          <ThumbsUp size={16} />
                        </button>
                        <span className="text-sm font-medium">{question.votes}</span>
                        <button 
                          onClick={() => handleVote(question.id, null, false)}
                          className="text-gray-500 hover:text-red-600"
                        >
                          <ThumbsDown size={16} />
                        </button>
                      </div>
                    </div>
                    
                    {/* Code snippet if available */}
                    {question.code && (
                      <div className="p-4 bg-gray-900 text-white overflow-x-auto">
                        <pre className="font-mono text-sm whitespace-pre-wrap">
                          {question.code}
                        </pre>
                      </div>
                    )}
                    
                    {/* Replies */}
                    <div className="p-4">
                      <h4 className="text-md font-medium mb-4 text-purple-700">
                        {question.replies.length} Replies
                      </h4>
                      
                      {question.replies.length === 0 ? (
                        <div className="text-gray-500 italic mb-4">No replies yet. Be the first to respond!</div>
                      ) : (
                        <div className="space-y-4 mb-4">
                          {question.replies.map((reply) => (
                            <div key={reply.id} className="border-l-2 border-purple-200 pl-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <span className="font-medium">{reply.author}</span>
                                  <span className="text-sm text-gray-500 ml-2">{reply.date}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <button 
                                    onClick={() => handleVote(question.id, reply.id, true)}
                                    className="text-gray-400 hover:text-purple-600"
                                  >
                                    <ThumbsUp size={14} />
                                  </button>
                                  <span className="text-xs font-medium">{reply.votes}</span>
                                  <button 
                                    onClick={() => handleVote(question.id, reply.id, false)}
                                    className="text-gray-400 hover:text-red-600"
                                  >
                                    <ThumbsDown size={14} />
                                  </button>
                                </div>
                              </div>
                              <div className="mt-1 text-gray-700">
                                {reply.content}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {/* Add reply form */}
                      <div>
                        <textarea
                          value={newReply}
                          onChange={(e) => setNewReply(e.target.value)}
                          placeholder="Write your answer..."
                          rows="3"
                          className="w-full border border-gray-300 rounded-md p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <button
                          onClick={() => handleAddReply(question.id)}
                          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md"
                          disabled={!newReply.trim()}
                        >
                          Post Reply
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {questions.length > itemsPerPage && (
          <div className="flex justify-center">
            <div className="flex items-center space-x-1">
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-md ${
                  currentPage === 1 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-purple-600 hover:bg-purple-100'
                }`}
              >
                <ChevronLeft size={18} />
              </button>
              
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === index + 1
                      ? 'bg-purple-600 text-white'
                      : 'text-purple-600 hover:bg-purple-100'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              
              <button
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-md ${
                  currentPage === totalPages
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-purple-600 hover:bg-purple-100'
                }`}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
}