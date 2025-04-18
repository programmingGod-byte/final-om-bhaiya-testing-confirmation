import { useState, useEffect, useContext } from 'react';
import { Search, ChevronDown, ChevronUp, Plus, Code, Hash, MessageSquare, ThumbsUp, ThumbsDown, ChevronLeft, ChevronRight, Tag, Container } from 'lucide-react';
import URLSITE from "../../src/constant"
import { 
  Box, Typography, Grid, Card, CardContent, CardMedia, CardActionArea, 
  Chip, TextField, InputAdornment, FormControl, InputLabel, Select, MenuItem,
  Pagination, Divider, CircularProgress,
  Fade,
  Zoom
} from '@mui/material';
import AuthContext from "../context/AuthContext"
import {
  ElectricBolt as ElectricBoltIcon,
  Memory as MemoryIcon,
} from '@mui/icons-material';

export default function ForumPage() {
  // State for questions data and pagination
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const context = useContext(AuthContext)
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(5);
  
  // UI state
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

  // Available tag categories
  const tagCategories = {
    frontend: ["react", "vue", "angular", "javascript", "html", "css", "tailwind", "bootstrap"],
    backend: ["node", "express", "django", "flask", "php", "java", "python", "ruby"],
    database: ["sql", "mongodb", "firebase", "postgresql", "mysql", "redis", "graphql"],
    devops: ["docker", "kubernetes", "aws", "azure", "ci-cd", "git", "github"],
    mobile: ["react-native", "flutter", "swift", "kotlin", "android", "ios"],
    tools: ["vscode", "webpack", "babel", "eslint", "jest", "cypress"]
  };

  // Fetch questions from server
  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        // Replace with your actual API endpoint
        const response = await fetch(`${URLSITE}/api/general/all-question`);
        if (!response.ok) throw new Error('Failed to fetch questions');
        const data = await response.json();
        
        // For now using sample data
        const sampleData = [
          {
            _id: 1,
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
                _id: 1,
                author: "Mike T.",
                content: "Make sure you're importing useContext correctly. Your code looks fine but remember to wrap your components with the provider.",
                date: "April 16, 2025",
                votes: 8
              },
              {
                _id: 2,
                author: "Lisa R.",
                content: "Have you checked if the context is being provided at the right level in your component tree?",
                date: "April 17, 2025",
                votes: 5
              }
            ]
          }
        ];
        
        // Simulate pagination
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedData = data.slice(startIndex, endIndex);
        
        setQuestions(paginatedData);
        setTotalPages(Math.ceil(sampleData.length / itemsPerPage));
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchQuestions();
  }, [currentPage, itemsPerPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // This will trigger the useEffect to fetch data for the new page
  };

  const handleQuestionClick = (_id) => {
    if (expandedQuestion === _id) {
      setExpandedQuestion(null);
    } else {
      setExpandedQuestion(_id);
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

  const handleNewQuestionSubmit = async (e) => {
    e.preventDefault();
    
    // Show loading state
    setLoading(true);
    
    try {
      // In a real app, you would send this to your API
      const response = await fetch(`${URLSITE}/api/general/upload-question`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newQuestion,
          author: context?.user?.name,
          email:context?.user?.email
        
        })
      });

      if (!response.ok) throw new Error('Failed to post question');
      // const newQuestionData = await response.json();
      
      // For now, simulate adding a new question
      const newQuestionData = {
        _id: Math.floor(Math.random() * 10000),
        ...newQuestion,
        author: "Current User",
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        votes: 0,
        replies: []
      };
      
      // Add it to the first page
      if (currentPage === 1) {
        setQuestions(prevQuestions => [newQuestionData, ...prevQuestions.slice(0, itemsPerPage - 1)]);
      } else {
        // If not on the first page, navigate to the first page to see the new question
        setCurrentPage(1);
      }
      
      // Reset the form
      setNewQuestion({
        title: "",
        description: "",
        tags: [],
        code: ""
      });
      setShowNewPostForm(false);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddReply = async (questionId) => {
    if (!newReply.trim()) return;
    
    setLoading(true);
    
    try {
      // In a real app, you would send this to your API
      const response = await fetch(`${URLSITE}/api/general/post-reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: newReply,
          questionID:questionId,
          author:context?.user?.name
        })
      });
      if (!response.ok) throw new Error('Failed to post reply');
      const newReplyData = await response.json();
      console.log(newReplyData)
      // For now, simulate adding a new reply
      const updatedQuestions = questions.map(q => {
        if (q._id === questionId) {
          return {
            ...q,
            replies: [
              ...q.replies,
              newReplyData.replies[newReplyData.replies.length-1]
            ]
          };
        }
        return q;
      });
      
      setQuestions(updatedQuestions);
      setNewReply("");
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (questionId, replyId = null, isUpvote) => {
    try {
      // In a real app, you would send this to your API
      // const endpoint = replyId === null 
      //   ? `/api/questions/${questionId}/vote` 
      //   : `/api/questions/${questionId}/replies/${replyId}/vote`;
      // const response = await fetch(endpoint, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ isUpvote })
      // });
      // if (!response.ok) throw new Error('Failed to vote');
      
      // For now, simulate voting
      const updatedQuestions = questions.map(q => {
        if (replyId === null && q._id === questionId) {
          return {
            ...q,
            votes: isUpvote ? q.votes + 1 : q.votes - 1
          };
        } else if (replyId !== null && q._id === questionId) {
          return {
            ...q,
            replies: q.replies.map(r => {
              if (r._id === replyId) {
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
      
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      {/* Header Section */}
      
      {/* Main Forum Content */}
      <div className="bg-purple-50 min-h-screen p-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-t-4 border-purple-600">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-purple-800">VeriLog Forum</h1>
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
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <CircularProgress size={16} color="inherit" />
                        Posting...
                      </span>
                    ) : (
                      'Post Question'
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Questions List */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4 text-purple-800">Recent Questions</h2>
            
            {loading && currentPage === 1 ? (
              <div className="bg-white rounded-lg shadow-md p-6 flex justify-center">
              <CircularProgress />
            </div>
          ) : error ? (
            <div className="bg-white rounded-lg shadow-md p-6 text-red-500">
              {error}
            </div>
          ) : questions.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
              No questions found. Be the first to ask!
            </div>
          ) : (
            <div>
              {questions.map((question) => (
                <div key={question._id} className="bg-white rounded-lg shadow-md mb-4 overflow-hidden">
                  {/* Question header */}
                  <div 
                    className="p-4 cursor-pointer hover:bg-purple-50"
                    onClick={() => handleQuestionClick(question._id)}
                  >
                    <div className="flex">
                      {/* Votes */}
                      <div className="flex flex-col items-center mr-4">
                        <button 
                          className="text-gray-400 hover:text-purple-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleVote(question._id, null, true);
                          }}
                        >
                          <ThumbsUp size={18} />
                        </button>
                        <span className="my-1 font-medium">{question.votes}</span>
                        <button 
                          className="text-gray-400 hover:text-purple-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleVote(question._id, null, false);
                          }}
                        >
                          <ThumbsDown size={18} />
                        </button>
                      </div>
                      
                      {/* Question content */}
                      <div className="flex-grow">
                        <h3 className="text-lg font-semibold text-purple-900">{question.title}</h3>
                        <p className="text-gray-600 mt-1">{question.description}</p>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mt-2">
                          {question.tags.map((tag, index) => (
                            <div key={index} className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded-md text-sm flex items-center gap-1">
                              <Hash size={12} />
                              <span>{tag}</span>
                            </div>
                          ))}
                        </div>
                        
                        {/* Metadata */}
                        <div className="flex items-center mt-3 text-sm text-gray-500">
                          <span>Asked by {question.author}</span>
                          <span className="mx-2">•</span>
                          <span>{question.date}</span>
                          <span className="mx-2">•</span>
                          <div className="flex items-center gap-1">
                            <MessageSquare size={14} />
                            <span>{question.replies.length} replies</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Expand/collapse */}
                      <div>
                        {expandedQuestion === question._id ? (
                          <ChevronUp size={20} className="text-gray-400" />
                        ) : (
                          <ChevronDown size={20} className="text-gray-400" />
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Expanded question details */}
                  {expandedQuestion === question._id && (
                    <div className="border-t border-gray-100">
                      {/* Code snippet if available */}
                      {question.code && (
                        <div className="px-4 py-3 bg-gray-50 border-y border-gray-100">
                          <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
                            <Code size={16} />
                            <span>Code Snippet</span>
                          </div>
                          <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto">
                            <code>{question.code}</code>
                          </pre>
                        </div>
                      )}
                      
                      {/* Replies */}
                      <div className="px-4 py-3">
                        <h4 className="font-medium text-gray-700 mb-3">Replies</h4>
                        
                        {question.replies.length === 0 ? (
                          <p className="text-gray-500 text-sm">No replies yet. Be the first to respond!</p>
                        ) : (
                          <div>
                            {question.replies.map((reply) => (
                              <div key={reply._id} className="border-b border-gray-100 last:border-b-0 py-3">
                                <div className="flex">
                                  {/* Votes */}
                                  <div className="flex flex-col items-center mr-4">
                                    <button 
                                      className="text-gray-400 hover:text-purple-600"
                                      onClick={() => handleVote(question._id, reply._id, true)}
                                    >
                                      <ThumbsUp size={16} />
                                    </button>
                                    <span className="my-1 text-sm font-medium">{reply.votes}</span>
                                    <button 
                                      className="text-gray-400 hover:text-purple-600"
                                      onClick={() => handleVote(question._id, reply._id, false)}
                                    >
                                      <ThumbsDown size={16} />
                                    </button>
                                  </div>
                                  
                                  {/* Reply content */}
                                  <div className="flex-grow">
                                    <p className="text-gray-700">{reply.content}</p>
                                    
                                    {/* Metadata */}
                                    <div className="flex items-center mt-2 text-xs text-gray-500">
                                      <span>Replied by {reply.author}</span>
                                      <span className="mx-2">•</span>
                                      <span>{reply.date}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {/* Add reply form */}
                        <div className="mt-4">
                          <h5 className="text-sm font-medium text-gray-700 mb-2">Add Your Reply</h5>
                          <div className="flex gap-2">
                            <textarea
                              value={newReply}
                              onChange={(e) => setNewReply(e.target.value)}
                              placeholder="Type your reply here..."
                              className="flex-grow border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                              rows="3"
                            />
                            <button
                              onClick={() => handleAddReply(question._id)}
                              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 h-fit rounded-md self-end"
                              disabled={!newReply.trim()}
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {!loading && questions.length > 0 && (
          <div className="flex justify-center my-6">
            <div className="flex items-center gap-1">
              <button
                onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2 rounded-md ${
                  currentPage === 1 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-purple-600 hover:bg-purple-100'
                }`}
              >
                <ChevronLeft size={20} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-8 h-8 rounded-md flex items-center justify-center ${
                    currentPage === page
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-700 hover:bg-purple-100'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-md ${
                  currentPage === totalPages 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-purple-600 hover:bg-purple-100'
                }`}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  </>
);
}