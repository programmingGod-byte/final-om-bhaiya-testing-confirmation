import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Box, Typography, Grid, Card, CardContent, CardMedia, CardActionArea, 
  Chip, TextField, InputAdornment, FormControl, InputLabel, Select, MenuItem,
  Pagination, Divider, CircularProgress
} from '@mui/material';
import { Search, FilterList } from '@mui/icons-material';
import URLSITE from '../constant';

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
import {
  Paper,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Rating,
  CardActions,
  Alert,
  Tabs,
  Tab,
  TextareaAutosize,
  Snackbar,
  Collapse,
  Badge,
  Container,
  Fade,
  Zoom,
} from '@mui/material';

const Modules = () => {
  // State for data, filters, and pagination
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [levels, setLevels] = useState([]);
  const navigator = useNavigate()
  
  // Function to truncate text to specific word count
  const truncateText = (text, wordCount) => {
    if (!text) return '';
    const words = text.split(' ');
    if (words.length <= wordCount) return text;
    return words.slice(0, wordCount).join(' ') + '...';
  };
  
  // Fetch modules data from API
  useEffect(() => {
    const fetchModules = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${URLSITE}/api/general/all-modules`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data)
        setModules(data);
        
        // Extract unique categories and levels for filters
        setCategories([...new Set(data.map(module => module.category))]);
        setLevels([...new Set(data.map(module => module.level))]);
        
        setError(null);
      } catch (err) {
        setError(`Failed to fetch modules: ${err.message}`);
        console.error('Error fetching modules:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchModules();
  }, []);

  // Filter modules based on search and filters
  const filteredModules = modules.filter(module => {
    const matchesSearch = module.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         module.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (module.chapters && module.chapters.some(chapter => 
                           chapter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           chapter.description.toLowerCase().includes(searchQuery.toLowerCase())
                         ));
    const matchesCategory = categoryFilter === 'all' || module.category === categoryFilter;
    const matchesLevel = levelFilter === 'all' || module.level === levelFilter;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  // Pagination logic
  const modulesPerPage = 6;
  const pagesCount = Math.ceil(filteredModules.length / modulesPerPage);
  const displayedModules = filteredModules.slice(
    (page - 1) * modulesPerPage,
    page * modulesPerPage
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>Loading modules...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', my: 8, color: 'error.main' }}>
        <Typography variant="h6">
          {error}
        </Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Please try refreshing the page or contact support if the problem persists.
        </Typography>
      </Box>
    );
  }

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
            

    <Box className="container page-container">

      {/* Search and Filters */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Search Modules"
            placeholder="Search by title, description, or topics"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="category-filter-label">Category</InputLabel>
            <Select
              labelId="category-filter-label"
              id="category-filter"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              label="Category"
              startAdornment={
                <InputAdornment position="start">
                  <FilterList />
                </InputAdornment>
              }
            >
              <MenuItem value="all">All Categories</MenuItem>
              {categories.map(category => (
                <MenuItem key={category} value={category}>{category}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="level-filter-label">Level</InputLabel>
            <Select
              labelId="level-filter-label"
              id="level-filter"
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              label="Level"
              startAdornment={
                <InputAdornment position="start">
                  <FilterList />
                </InputAdornment>
              }
            >
              <MenuItem value="all">All Levels</MenuItem>
              {levels.map(level => (
                <MenuItem key={level} value={level}>{level}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Results info */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="body2" color="text.secondary">
          Showing {displayedModules.length} of {filteredModules.length} modules
        </Typography>
      </Box>

      {/* Modules Grid */}
      {displayedModules.length > 0 ? (
        <Grid container spacing={4} sx={{ mb: 4 }}>
          {displayedModules.map(module => (
            <Grid item xs={12} sm={6} md={4} key={module.id || module._id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s, box-shadow 0.3s', '&:hover': { transform: 'translateY(-8px)', boxShadow: 6 } }}>
                <CardActionArea component={Link} to={`/modules/${module._id}`}>
                  <CardMedia
                    component="img"
                    height="160"
                    image={module.image || '/placeholder-module.jpg'}
                    alt={module.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    {/* Module Type Badge (FREE/PAID) */}
                    <Box sx={{ position: 'absolute', top: 10, right: 10 }}>
                      <Chip 
                        label={module.moduleType === "free" ? "FREE" : "PAID"} 
                        size="small" 
                        sx={{ 
                          backgroundColor: module.moduleType === "free" ? '#4caf50' : '#f44336',
                          color: 'white',
                          fontWeight: 700,
                          fontSize: '0.75rem',
                          px: 1
                        }} 
                      />
                    </Box>
                    
                    <Typography variant="h6" component="h3" gutterBottom>
                      {module.title}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                      <Chip 
                        label={module.level} 
                        size="small" 
                        sx={{ 
                          backgroundColor: module.level === 'Beginner' ? '#e3f2fd' : 
                                          module.level === 'Intermediate' ? '#fff8e1' : '#fbe9e7',
                          color: module.level === 'Beginner' ? '#0277bd' : 
                                module.level === 'Intermediate' ? '#ff8f00' : '#e64a19',
                          fontWeight: 500,
                          borderRadius: '4px'
                        }} 
                      />
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {truncateText(module.description, 18)}
                    </Typography>
                    
                    <Box sx={{ mt: 1, mb: 2 }}>
                      {module.skills && module.skills.slice(0, 3).map((topic, index) => (
                        <Chip
                          key={index}
                          label={topic}
                          size="small"
                          sx={{ mr: 0.5, mb: 0.5, backgroundColor: 'rgba(106, 13, 173, 0.08)', fontSize: '0.7rem' }}
                        />
                      ))}
                      {module.skills && module.skills.length > 3 && (
                        <Chip
                          label={`+${module.skills.length - 3} more`}
                          size="small"
                          sx={{ mb: 0.5, backgroundColor: 'rgba(106, 13, 173, 0.04)', fontSize: '0.7rem' }}
                        />
                      )}
                    </Box>
                    
                    <Divider sx={{ my: 1 }} />
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        ⭐ {module.rating || '4.8'} ({module.students || '0'})
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {module.chapters ? module.chapters.length : 0} chapters • {module.exercises ? module.exercises.length : 0} exercises
                      </Typography>
                    </Box>
                  </CardContent>
                </CardActionArea>

                {module.moduleType !== "free" ? (
                  <Button
                    variant="outlined"
                    onClick={() => navigator(`/buy-module/${module._id}`)}
                    style={{
                      maxWidth: "100%"
                    }}
                    sx={{
                      color: 'purple',
                      borderColor: 'purple',
                      m: 2,
                      '&:hover': {
                        backgroundColor: 'rgba(128, 0, 128, 0.1)',
                        borderColor: 'purple',
                      },
                    }}
                  >
                    Buy Module
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    onClick={() => navigator(`/modules/${module._id}`)}
                    sx={{
                      color: 'purple',
                      borderColor: 'purple',
                      m: 2,
                      '&:hover': {
                        backgroundColor: 'rgba(128, 0, 128, 0.1)',
                        borderColor: 'purple',
                      },
                    }}
                  >
                    Read Module
                  </Button>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ textAlign: 'center', my: 8 }}>
          <Typography variant="h6">
            No modules found matching your criteria
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search or filters
          </Typography>
        </Box>
      )}

      {/* Pagination */}
      {pagesCount > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination 
            count={pagesCount} 
            page={page} 
            onChange={(event, value) => setPage(value)}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
          />
        </Box>
      )}
    </Box>
    </>
  );
};

export default Modules;