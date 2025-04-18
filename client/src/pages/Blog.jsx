import React, { useState, useEffect, useCallback } from 'react';
import axios from "axios";
import { 
  Box, Typography, Container, Grid, TextField, MenuItem, 
  FormControl, InputLabel, Select, Card, CardContent, CardMedia, 
  Chip, Button, CircularProgress, InputAdornment, Divider,
  IconButton, Snackbar, Alert, Tooltip, Paper, ToggleButton,
  ToggleButtonGroup, Fade, Zoom, Stack, Pagination
} from '@mui/material';
import { 
  Search, ArrowForward, Refresh, Bookmark, BookmarkBorder,
  Share, FiberNew, FilterAlt, ElectricBolt, Memory, Code, Explore, RssFeed
} from '@mui/icons-material';
import '../styles/Blog.css';
import URLSITE from '../constant';

const Blog = () => {
  // State
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 9;
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info'
  });

  // Categories based on the blog-fetcher.js file
  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'vlsi', label: 'VLSI' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'diy-electronics', label: 'DIY Electronics' },
    { value: 'electrical-engineering', label: 'Electrical Engineering' },
    { value: 'electronics-design', label: 'Electronics Design' },
    { value: 'fpga', label: 'FPGA' }
  ];
  
  // Helper function to filter blogs by search term and category
  const filterBlogs = useCallback((blogsToFilter, term, selectedCategory) => {
    let filtered = [...blogsToFilter];
    
    // Filter by category if not 'all'
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(blog => 
        blog.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    
    // Filter by search term if provided
    if (term) {
      const searchTermLower = term.toLowerCase();
      filtered = filtered.filter(blog => 
        blog.title.toLowerCase().includes(searchTermLower) || 
        blog.description.toLowerCase().includes(searchTermLower) ||
        blog.source.toLowerCase().includes(searchTermLower) ||
        (blog.category && blog.category.toLowerCase().includes(searchTermLower))
      );
    }
    
    return filtered;
  }, []);
  
  // Fetch blogs function
  const fetchBlogs = useCallback(async() => {
    if (refreshing) return; // Prevent multiple simultaneous requests
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`${URLSITE}/api/general/blogs`);
      console.log('Response:', response.data);
      
      // Set blogs from the API response
      setBlogs(response.data);
      
      // Apply filters to the fetched blogs
      const filtered = filterBlogs(response.data, searchTerm, category);
      setFilteredBlogs(filtered);
      
      setLastUpdated(new Date());
      setLoading(false);
      
      // Reset to page 1 when filter changes
      setCurrentPage(1);
    } catch (err) {
      console.error('Error fetching blogs:', err);
      setError('Failed to load blog posts. Please try again later.');
      setLoading(false);
    }
  }, [category, searchTerm, filterBlogs, refreshing]);
  
  // Initial fetch only when component mounts
  useEffect(() => {
    fetchBlogs();
  }, []);
  
  // Apply filters when search term or category changes without re-fetching
  useEffect(() => {
    if (blogs.length > 0) {
      const filtered = filterBlogs(blogs, searchTerm, category);
      setFilteredBlogs(filtered);
      setCurrentPage(1); // Reset to first page when filters change
    }
  }, [blogs, searchTerm, category, filterBlogs]);
  
  // Handle manual refresh
  const handleRefresh = () => {
    if (refreshing || loading) return;
    
    setRefreshing(true);
    
    // Fetch new data
    fetchBlogs()
      .then(() => {
        setRefreshing(false);
        setSnackbar({
          open: true,
          message: 'Blog feed updated successfully',
          severity: 'success'
        });
      })
      .catch(() => {
        setRefreshing(false);
      });
  };
  
  // Handle category change
  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory);
  };
  
  // Handle search
  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
  };
  
  // Share blog post
  const shareBlogPost = (blog) => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.description,
        url: blog.link
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
      navigator.clipboard.writeText(blog.link).then(
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
  
  // Toggle bookmark functionality
  const toggleBookmark = (blogId) => {
    // Add your bookmark implementation here
    setSnackbar({
      open: true,
      message: 'Bookmark feature coming soon!',
      severity: 'info'
    });
  };
  
  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffMs = now - date;
      const diffMins = Math.round(diffMs / 60000);
      const diffHours = Math.round(diffMs / 3600000);
      
      if (diffMins < 60) {
        return diffMins <= 1 ? 'Just now' : `${diffMins} mins ago`;
      } else if (diffHours < 24) {
        return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
      } else {
        return date.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        });
      }
    } catch (error) {
      console.error('Date formatting error:', error);
      return 'Unknown date';
    }
  };
  
  // Format last updated time
  const formatLastUpdated = () => {
    return lastUpdated.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Truncate text to specified length
  const truncateText = (text, maxLength) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };
  
  // Close snackbar
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar({ ...snackbar, open: false });
  };
  
  // Handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    // Scroll to top of blog content
    const blogContent = document.querySelector('.blog-content');
    if (blogContent) {
      blogContent.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Get current blogs for pagination
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  
  return (
    <Box className="blog-page">
      {/* Blog Header Section - Enhanced */}
      <Box className="blog-header">
        <Container maxWidth="lg">
          <Box sx={{ position: 'relative', zIndex: 2, py: 4 }}>
            {/* Decorative elements */}
            <Box sx={{ 
              position: 'absolute', 
              top: -15, 
              right: { xs: -15, md: 20 }, 
              opacity: 0.15, 
              transform: 'rotate(15deg)',
              display: { xs: 'none', md: 'block' }
            }}>
              <Memory sx={{ fontSize: 120, color: 'white' }} />
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

            {/* Main heading with animation */}
            <Fade in={true} timeout={1000}>
              <Box sx={{ mb: 3 }}>
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
                  <ElectricBolt fontSize="small" /> LATEST TECH INSIGHTS
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
                  Engineering <br />
                  Knowledge Hub
                </Typography>
              </Box>
            </Fade>

            {/* Subheading with animation */}
            <Fade in={true} timeout={1500} style={{ transitionDelay: '300ms' }}>
              <Box>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    maxWidth: '700px',
                    fontWeight: 400,
                    fontSize: { xs: '1rem', md: '1.25rem' },
                    lineHeight: 1.5,
                    color: 'rgba(255,255,255,0.85)'
                  }}
                >
                  Explore curated insights from the world of VLSI design, FPGAs, and electronic systems. 
                  Stay at the forefront of technological innovation with our expert-driven content.
                </Typography>

                {/* Quick stats */}
                <Stack 
                  direction="row" 
                  spacing={3} 
                  sx={{ 
                    mt: 4, 
                    display: { xs: 'none', sm: 'flex' },
                    color: 'rgba(255,255,255,0.8)'
                  }}
                  divider={<Divider orientation="vertical" flexItem sx={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />}
                >
                  <Box>
                    <Typography variant="h5" fontWeight="bold" sx={{ color: '#e1bee7' }}>
                      {blogs.length}+
                    </Typography>
                    <Typography variant="body2">Articles</Typography>
                  </Box>
                  <Box>
                    <Typography variant="h5" fontWeight="bold" sx={{ color: '#e1bee7' }}>
                      {categories.length - 1}
                    </Typography>
                    <Typography variant="body2">Categories</Typography>
                  </Box>
                  <Box>
                    <Typography variant="h5" fontWeight="bold" sx={{ color: '#e1bee7' }}>
                      Weekly
                    </Typography>
                    <Typography variant="body2">Updates</Typography>
                  </Box>
                </Stack>
              </Box>
            </Fade>
          </Box>

          {/* Updated Blog Controls */}
          <Zoom in={true} style={{ transitionDelay: '600ms' }}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 3, 
                mt: 5, 
                borderRadius: 3,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
                transform: 'translateY(20px)'
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search for articles, topics, or keywords..."
                    value={searchTerm}
                    onChange={handleSearch}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search color="primary" />
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
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: { xs: 'stretch', sm: 'center' },
                    justifyContent: 'space-between',
                    gap: 2
                  }}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      gap: 1
                    }}>
                      <FilterAlt color="primary" fontSize="small" />
                      <Typography variant="subtitle2" fontWeight="bold">
                        Filter by category:
                      </Typography>
                    </Box>
                    <ToggleButtonGroup
                      value={category}
                      exclusive
                      onChange={(e, newCategory) => {
                        if (newCategory !== null) {
                          handleCategoryChange({ target: { value: newCategory } });
                        }
                      }}
                      aria-label="category filter"
                      sx={{ 
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        '& .MuiToggleButtonGroup-grouped': {
                          m: 0.5,
                          borderRadius: '16px !important',
                          border: '1px solid #e0e0e0 !important',
                          '&.Mui-selected': {
                            backgroundColor: '#9c27b0',
                            color: 'white',
                            '&:hover': {
                              backgroundColor: '#7b1fa2',
                            }
                          }
                        }
                      }}
                    >
                      {categories.map((option) => (
                        <ToggleButton 
                          key={option.value} 
                          value={option.value}
                          sx={{ 
                            px: 2, 
                            py: 0.5, 
                            textTransform: 'none',
                            fontSize: '0.875rem',
                            transition: 'all 0.2s ease',
                            backgroundColor: 'white'
                          }}
                        >
                          {option.label}
                        </ToggleButton>
                      ))}
                    </ToggleButtonGroup>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Zoom>
        </Container>
      </Box>

      {/* Blog Content Section */}
      <Box className="blog-content" sx={{ py: 6, bgcolor: '#f5f5f5' }}>
        <Container maxWidth="lg">
          {/* Last updated info and refresh button */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Last updated: {formatLastUpdated()} • {filteredBlogs.length} articles
            </Typography>
            <Tooltip title="Refresh content">
              <IconButton 
                onClick={handleRefresh} 
                disabled={loading || refreshing}
                color="primary"
              >
                <Refresh />
              </IconButton>
            </Tooltip>
          </Box>
          
          {/* Loading Indicator */}
          {loading ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 8 }}>
              <CircularProgress color="primary" size={60} thickness={4} />
              <Typography variant="body1" sx={{ mt: 2 }}>
                Fetching the latest articles...
              </Typography>
            </Box>
          ) : error ? (
            <Box className="error-message" sx={{ p: 3, bgcolor: '#fee', borderRadius: 2 }}>
              <Typography color="error">{error}</Typography>
              <Button 
                variant="outlined" 
                color="primary" 
                sx={{ mt: 2 }}
                onClick={handleRefresh}
              >
                Try Again
              </Button>
            </Box>
          ) : filteredBlogs.length === 0 ? (
            <Box className="no-results" sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6">No blogs found matching your criteria</Typography>
              <Button 
                variant="outlined" 
                color="primary" 
                sx={{ mt: 2 }}
                onClick={() => {
                  setSearchTerm('');
                  setCategory('all');
                }}
              >
                Clear Filters
              </Button>
            </Box>
          ) : (
            <>
              <Grid container spacing={3} className="blog-grid">
                {currentBlogs.map((blog) => (
                  <Grid item xs={12} sm={6} md={4} key={blog.id}>
                    <Card className="blog-card" elevation={2} sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                      {blog.isNew && (
                        <Chip 
                          icon={<FiberNew />}
                          label="New" 
                          color="secondary"
                          size="small"
                          sx={{ 
                            position: 'absolute',
                            top: 10,
                            right: 10,
                            zIndex: 2,
                            fontWeight: 'bold'
                          }}
                        />
                      )}

                      {blog.image && (
                        <CardMedia
                          component="img"
              
                          style={{
                            height:"233px",
                            width:"374px"
                          }}
                          image={blog.image}
                          alt={blog.title}
                          onError={(e) => {
                            // If image fails to load, replace with default
                            e.target.onerror = null; // Prevent infinite loop
                            e.target.src = '/logo192.png'; // Fallback to React logo which should always be present
                          }}
                          sx={{
                            objectFit: 'cover',
                            background: 'linear-gradient(to right, #f5f5f5, #e0e0e0)'
                          }}
                        />
                      )}
                      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                        <Chip 
                          label={blog.category || 'Uncategorized'} 
                          size="small" 
                          sx={{ 
                            alignSelf: 'flex-start', 
                            mb: 1.5,
                            bgcolor: '#e1bee7',
                            color: '#6a1b9a',
                            fontWeight: 500
                          }} 
                        />
                        <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 500 }}>
                          <a 
                            href={blog.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{ color: 'inherit', textDecoration: 'none' }}
                          >
                            {blog.title}
                          </a>
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                          <Typography variant="caption" color="text.secondary">
                          {truncateText(blog.description, 120)}
                            
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {formatDate(blog.pubDate)}
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary" paragraph sx={{ mb: 2 }}>
                        {blog.source}
                        </Typography>
                        <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Button 
                            variant="text" 
                            color="primary" 
                            href={blog.link} 
                            target="_blank"
                            rel="noopener noreferrer"
                            endIcon={<ArrowForward />}
                            size="small"
                          >
                            Read More
                          </Button>
                          <Box>
                            <IconButton 
                              size="small" 
                              onClick={() => toggleBookmark(blog.id)}
                              color="primary"
                            >
                              <BookmarkBorder />
                            </IconButton>
                            <IconButton 
                              size="small"
                              onClick={() => shareBlogPost(blog)}
                              color="primary"
                            >
                              <Share />
                            </IconButton>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                  <Pagination 
                    count={totalPages} 
                    page={currentPage} 
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
      </Box>

      {/* Newsletter Section */}
      <Box className="newsletter" sx={{ bgcolor: '#9c27b0', color: 'white', py: 6 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Never Miss an Update
          </Typography>
          <Typography variant="body1" paragraph sx={{ mb: 4, maxWidth: '600px', mx: 'auto' }}>
            Subscribe to our newsletter for weekly curated content on VLSI, digital design, and more.
          </Typography>
          <Box 
            component="form" 
            sx={{ 
              display: 'flex', 
              maxWidth: '500px', 
              mx: 'auto',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 2, sm: 0 }
            }}
            onSubmit={(e) => {
              e.preventDefault();
              // Handle newsletter subscription
              setSnackbar({
                open: true,
                message: 'Newsletter subscription successful!',
                severity: 'success'
              });
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Your email address"
              type="email"
              required
              InputProps={{
                sx: { 
                  bgcolor: 'white', 
                  borderRadius: { xs: 1, sm: '4px 0 0 4px' },
                  '& fieldset': {
                    borderColor: 'white',
                    borderRight: { sm: 'none' }
                  }
                }
              }}
            />
            <Button 
              type="submit" 
              variant="contained" 
              sx={{ 
                bgcolor: '#6a1b9a', 
                borderRadius: { xs: 1, sm: '0 4px 4px 0' },
                '&:hover': { bgcolor: '#4a148c' },
                px: 3
              }}
            >
              Subscribe
            </Button>
          </Box>
        </Container>
      </Box>
      
      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
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

export default Blog;