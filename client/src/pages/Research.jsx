import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import URLSITE from '../constant';
import {
  Box, Typography, Container, Grid, Paper, Tabs, Tab, Card, CardContent,
  CardMedia, CardActions, Button, Chip, TextField, InputAdornment, MenuItem,
  IconButton, Divider, Badge, CircularProgress, Pagination
} from '@mui/material';
import {
  Search, FilterList, Bookmark, BookmarkBorder, Share, School,
  MenuBook, ScienceOutlined, ElectricBolt, Timer, ChevronRight, Article, CheckCircle
} from '@mui/icons-material';
import '../styles/Research.css';
import AuthContext from '../context/AuthContext';

const Research = () => {
  
    
  // === Data State ===
  const [papers, setPapers] = useState([]);
  const [filteredPapers, setFilteredPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // === UI & Filter State ===
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sourceFilter, setSourceFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All');
  const [tabValue, setTabValue] = useState(0);
  const [bookmarkedPapers, setBookmarkedPapers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleFilterMenu, setVisibleFilterMenu] = useState(false);

  // === Newsletter State ===
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [subscribing, setSubscribing] = useState(false);

  // === Static Options ===
  const categoriesWithIcons = [
    { name: 'All', icon: <FilterList /> },
    { name: 'Verification', icon: <ScienceOutlined /> },
    { name: 'FPGA Design', icon: <Article /> },
    { name: 'Computer Architecture', icon: <Article /> },
    { name: 'Machine Learning Hardware', icon: <ElectricBolt /> },
    { name: 'Hardware Security', icon: <Article /> },
    { name: 'Low Power Design', icon: <ElectricBolt /> },
    { name: 'RISC-V', icon: <MenuBook /> }
  ];
  const categories = categoriesWithIcons.map(cat => cat.name);
  const sources = ['All', 'IEEE', 'Springer', 'ACM', 'arXiv', 'Elsevier'];
  const dateFilters = ['All', 'Last Week', 'Last Month', 'Last 3 Months', 'Last Year', 'Last 5 Years'];
  const popularTags = [
    'UVM','RISC-V','FPGA','SystemVerilog','Verification','Low Power',
    'Machine Learning','EDA Tools','RTL Design','Formal Verification',
    'Power Analysis','Hardware Security'
  ];
  const context = useContext(AuthContext)
  context.ScrollToTop()
  
  // === Fetch Papers from API on Mount ===
  useEffect(() => {
    const fetchPapers = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${URLSITE}/api/general/research-papers`);
        console.log(res.data)
        setPapers(res.data);
        setError(null);
      } catch (err) {
        console.error('Failed to load papers:', err);
        setError('Unable to fetch research papers.');
      } finally {
        setLoading(false);
      }
    };
    fetchPapers();
  }, []);
  // === Filtering Logic ===
  const getFilteredPapers = () => {
    let filtered = [...papers];
    const q = searchQuery.toLowerCase();

    if (searchQuery) {
      filtered = filtered.filter(paper =>
        // match title or authors or any tag, but NOT abstract
        paper.title.toLowerCase().includes(q) ||
        paper.authors.toLowerCase().includes(q) ||
        paper.tags.some(tag => tag.toLowerCase().includes(q))
      );
    }
    if (categoryFilter !== 'All') {
      filtered = filtered.filter(paper => paper.category === categoryFilter);
    }
    if (sourceFilter !== 'All') {
      filtered = filtered.filter(paper => paper.source === sourceFilter);
    }
    if (tabValue === 1) {
      filtered.sort((a, b) => b.citations - a.citations);
    } else if (tabValue === 2) {
      filtered = filtered.filter(paper => paper.featured);
    } else if (tabValue === 3) {
      filtered = filtered.filter(paper => bookmarkedPapers.includes(paper.id));
    }
    return filtered;
  };

  // === Apply Filters on Dependency Change ===
  useEffect(() => {
    if (loading) return;
    const timer = setTimeout(() => {
      const results = getFilteredPapers();
      setFilteredPapers(results);
    }, 300);
    return () => clearTimeout(timer);
  }, [
    papers,
    searchQuery,
    categoryFilter,
    sourceFilter,
    dateFilter,
    tabValue,
    bookmarkedPapers,
    loading
  ]);

  // === Pagination Calculation ===
  const papersPerPage = 6;
  const totalPages = Math.ceil(filteredPapers.length / papersPerPage);
  const indexOfLastPaper = currentPage * papersPerPage;
  const indexOfFirstPaper = indexOfLastPaper - papersPerPage;
  const currentPapers = filteredPapers.slice(indexOfFirstPaper, indexOfLastPaper);

  // === Handlers ===
  const handleTabChange = (event, newValue) => setTabValue(newValue);
  const handleCategoryChange = (category) => {
    setCategoryFilter(category);
    setVisibleFilterMenu(false);
  };
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    document.querySelector('.research-section').scrollIntoView({ behavior: 'smooth' });
  };
  const toggleBookmark = (paperId) => {
    setBookmarkedPapers(prev =>
      prev.includes(paperId) ? prev.filter(id => id !== paperId) : [...prev, paperId]
    );
  };
  const sharePaper = (paper) => {
    if (navigator.share) {
      navigator.share({
        title: paper.title,
        text: `Check out this research paper: ${paper.title} by ${paper.authors}`,
        url: paper.link
      }).catch(err => console.error('Error sharing paper:', err));
    } else {
      navigator.clipboard.writeText(paper.link)
        .then(() => alert('Link copied to clipboard!'))
        .catch(err => console.error('Failed to copy link:', err));
    }
  };

  // ...and then your return(…) follows as before.
  // === Badge & Logo Helpers ===
  const getSourceBadgeClass = (source) => {
    switch (source) {
      case 'IEEE': return 'badge-ieee';
      case 'Springer': return 'badge-springer';
      case 'ACM': return 'badge-acm';
      case 'arXiv': return 'badge-arxiv';
      case 'Elsevier': return 'badge-elsevier';
      default: return '';
    }
  };

  const getPublisherLogo = (source) => {
    console.log(source)
    switch (source) {
      case 'IEEE': return 'https://om-bhaiya-testing.s3.ap-south-1.amazonaws.com/3481dc7420d9835ff78be14ad22585129e9b6eb9dbb4137f3dc5060d60e09d98.png';
      case 'Springer': return 'https://om-bhaiya-testing.s3.ap-south-1.amazonaws.com/3faff9277e6ac28ddef0902740c708b6b1b1d97316c1d8e0bffd85591dfc92de.png';
      case 'ACM': return 'https://om-bhaiya-testing.s3.ap-south-1.amazonaws.com/7c2b5c6df3b334cd24361b498e6e70256de27d47436a9f6a698d76712261fc60.png';
      // case 'arXiv': return '/OTHER.png';
      // case 'Elsevier': return '/OTHER.png';
      default: return 'https://om-bhaiya-testing.s3.ap-south-1.amazonaws.com/06e326f661b084e9039068464aabc829dfe4bc4bdf75af788d1288b6da2c00a1.png';
    }
  };

  // === Date Formatter ===
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // === Newsletter Helpers ===
  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubscribe = () => {
    setEmailError('');
    if (!email) {
      setEmailError('Email is required');
      return;
    }
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    setSubscribing(true);
    setTimeout(() => {
      setSubscribing(false);
      setSubscribed(true);
      setEmail('');
      setTimeout(() => {
        setSubscribed(false);
      }, 5000);
    }, 1500);
  };

  return (

    <Box className="research-page">
      {/* Hero Section */}
      <Box className="research-hero">
        <Container maxWidth="lg">
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={7}>
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
                  <ScienceOutlined sx={{ fontSize: 120, color: 'white' }} />
                </Box>
                
                <Box sx={{ 
                  position: 'absolute', 
                  bottom: -30, 
                  left: { xs: -15, md: 50 }, 
                  opacity: 0.15,
                  transform: 'rotate(-10deg)',
                  display: { xs: 'none', md: 'block' }
                }}>
                  <Article sx={{ fontSize: 100, color: 'white' }} />
                </Box>
                
                <Typography 
                  variant="overline" 
                  sx={{ 
                    fontSize: '1rem', 
                    fontWeight: 500,
                    letterSpacing: 2,
                    opacity: 0.9,
                    mb: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <School fontSize="small" /> ACADEMIC RESEARCH
                </Typography>
                
                <Typography 
                  variant="h2" 
                  component="h1" 
                  sx={{ 
                    fontWeight: 800,
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    mb: 2,
                    lineHeight: 1.2,
                    background: 'linear-gradient(90deg, #ffffff 0%, #e1bee7 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Research Papers
                </Typography>
                
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 400,
                    opacity: 0.9,
                    maxWidth: '700px',
                    mb: 4
                  }}
                >
                  Explore cutting-edge academic research in VLSI design, verification, FPGA development and computer architecture from top institutions around the world.
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box
                component="img"
                src={process.env.PUBLIC_URL + '/images/research-hero.png'}
                alt="Research papers"
                sx={{
                  width: '100%',
                  maxWidth: '450px',
                  filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.2))',
                  transform: 'translateY(20px)'
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = 'none';
                }}
              />
            </Grid>
          </Grid>
        </Container>
        
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
      <Container maxWidth="lg" sx={{ py: 6 }} id="research-section" className="research-section">
        {/* Tabs */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap',
          mb: 4 
        }}>
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
                fontSize: '1rem',
                fontWeight: 600,
                minWidth: { xs: 'auto', sm: 120 }
              }
            }}
          >
            <Tab label="All Papers" />
            <Tab label="Trending" />
            <Tab label="Featured" />
            <Tab 
              label={
                <Badge 
                  badgeContent={bookmarkedPapers.length || 0} 
                  color="secondary"
                  sx={{ 
                    '& .MuiBadge-badge': { 
                      fontWeight: 'bold',
                      fontSize: '0.7rem'
                    }
                  }}
                >
                  Bookmarked
                </Badge>
              } 
            />
          </Tabs>
        </Box>

        {/* Search and Filters */}
        <Paper 
          elevation={2} 
          className="research-filters"
          sx={{ 
            p: 3, 
            mb: 4, 
            borderRadius: 3,
            backgroundColor: 'white',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
          }}
        >
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  placeholder="Search by title, author, or keywords..."
                  variant="outlined"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search color="primary" />
                      </InputAdornment>
                    ),
                    sx: { 
                      borderRadius: 2,
                      pr: 1
                    }
                  }}
                />
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  select
                  fullWidth
                  label="Source"
                  value={sourceFilter}
                  onChange={(e) => setSourceFilter(e.target.value)}
                >
                  {sources.map((source) => (
                    <MenuItem key={source} value={source}>
                      {source}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  select
                  fullWidth
                  label="Publication Date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                >
                  {dateFilters.map((filter) => (
                    <MenuItem key={filter} value={filter}>
                      {filter}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Box>
        </Paper>

        {/* Improved Category Filter - Horizontal Scrollable List */}
        <Paper
          elevation={3}
          sx={{
            p: 2,
            mb: 4,
            borderRadius: 3,
            backgroundColor: 'white',
            boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
            overflowX: 'auto',
            '&::-webkit-scrollbar': {
              height: '6px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(0,0,0,0.1)',
              borderRadius: '6px',
            }
          }}
          className="category-filter-container"
        >
          <Box
            sx={{
              display: 'flex',
              gap: 1.5,
              py: 0.5,
              minWidth: 'max-content'
            }}
          >
            {categoriesWithIcons.map((category) => (
              <Chip
                key={category.name}
                label={category.name}
                icon={category.icon}
                onClick={() => setCategoryFilter(category.name)}
                color={categoryFilter === category.name ? 'primary' : 'default'}
                variant={categoryFilter === category.name ? 'filled' : 'outlined'}
                className={`category-chip ${categoryFilter === category.name ? 'active' : ''}`}
                sx={{
                  fontSize: '0.875rem',
                  py: 2.5,
                  fontWeight: categoryFilter === category.name ? 600 : 400,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  },
                  boxShadow: categoryFilter === category.name ? '0 4px 8px rgba(0,0,0,0.15)' : 'none',
                  borderWidth: '1.5px',
                  borderColor: categoryFilter === category.name ? 'primary.main' : 'rgba(0,0,0,0.1)'
                }}
              />
            ))}
          </Box>
        </Paper>

        {/* Popular Tags */}
        <Box className="tag-cloud" sx={{ mb: 4 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mr: 2, pt: 0.5 }}>
            Popular Topics:
          </Typography>
          {popularTags.map(tag => (
            <Box
              key={tag}
              className="tag-item"
              onClick={() => {
                setSearchQuery(tag);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              {tag}
            </Box>
          ))}
        </Box>

        {/* Papers List */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress size={60} thickness={4} />
          </Box>
        ) : (
          <>
            {currentPapers.length > 0 ? (
              <Grid container spacing={3}>
                {currentPapers.map((paper) => (
                  <Grid item xs={12} sm={6} md={4} key={paper.id}>
                    <Card 
                      className="research-card" 
                      elevation={3} 
                      sx={{ 
                        height: '100%', 
                        display: 'flex', 
                        flexDirection: 'column',
                        borderRadius: 2,
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                        }
                      }}
                    >
                      
                      <Box sx={{ position: 'relative' }}>
                        <CardMedia
                          component="img"
                          
                          height="180"
                          image={getPublisherLogo(paper.source)}
                          alt={paper.title}
                          sx={{ 
                            objectFit: 'contain',
                            backgroundColor: '#f5f5f5',
                            padding: '20px'
                          }}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/OTHER.png';
                          }}
                        />
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            bgcolor: 'rgba(0,0,0,0.05)',
                            backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0.1) 0%, transparent 50%)',
                          }}
                        />
                        <Chip 
                          label={paper.source} 
                          size="small" 
                          className={`source-badge ${getSourceBadgeClass(paper.source)}`}
                          sx={{ 
                            position: 'absolute',
                            top: 12,
                            left: 12,
                            fontWeight: 600,
                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                          }}
                        />
                      </Box>
                      
                      <CardContent sx={{ flexGrow: 1, pt: 3, pb: 0, px: 3 }}>
                        <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600, lineHeight: 1.3 }}>
                          {paper.title}
                        </Typography>
                        
                        <Typography 
                          variant="body2" 
                          color="text.secondary" 
                          gutterBottom
                          sx={{ mb: 2, fontWeight: 500, display: 'flex', alignItems: 'center' }}
                        >
                          {paper.authors}
                        </Typography>
                        
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Timer fontSize="small" /> {formatDate(paper.publishDate)}
                        </Typography>
                        
                        <Typography 
                          variant="body2" 
                          paragraph
                          sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            mb: 1,
                            color: 'text.secondary'
                          }}
                        >
                          {/* {paper.abstract} */}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                          {paper.tags.map(tag => (
                            <Chip 
                              key={tag} 
                              label={tag} 
                              size="small" 
                              variant="outlined"
                              sx={{ borderRadius: 1, fontSize: '0.75rem' }}
                              onClick={() => setSearchQuery(tag)}
                            />
                          ))}
                        </Box>
                      </CardContent>
                      
                      <CardActions sx={{ p: 2, pt: 0, px: 3 }}>
                        <Button 
                          variant="contained" 
                          color="primary" 
                          size="small" 
                          endIcon={<ChevronRight />}
                          href={paper.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{ 
                            textTransform: 'none',
                            borderRadius: 2,
                            mr: 1,
                            flexGrow: 1,
                            boxShadow: 'none',
                            '&:hover': {
                              boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                            }
                          }}
                        >
                          Read Paper
                        </Button>
                        
                        <IconButton 
                          size="small" 
                          color={bookmarkedPapers.includes(paper.id) ? 'secondary' : 'default'}
                          onClick={() => toggleBookmark(paper.id)}
                          sx={{ 
                            color: bookmarkedPapers.includes(paper.id) ? 'secondary.main' : 'text.secondary',
                          }}
                        >
                          {bookmarkedPapers.includes(paper.id) ? (
                            <Bookmark className="bookmark-active" />
                          ) : (
                            <BookmarkBorder />
                          )}
                        </IconButton>
                        
                        <IconButton 
                          size="small" 
                          onClick={() => sharePaper(paper)}
                          sx={{ color: 'text.secondary' }}
                        >
                          <Share />
                        </IconButton>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', ml: 0.5 }}>
                          <School fontSize="small" sx={{ mr: 0.5, opacity: 0.7 }} />
                          <Typography variant="body2" color="text.secondary">
                            {paper.citations}
                          </Typography>
                        </Box>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  textAlign: 'center',
                  backgroundColor: 'rgba(0, 0, 0, 0.02)',
                  borderRadius: 3,
                  boxShadow: 'none'
                }}
              >
                <Typography variant="h6" color="text.secondary">
                  No research papers match your search criteria.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Try adjusting your filters or search query.
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={() => {
                    setSearchQuery('');
                    setCategoryFilter('All');
                    setSourceFilter('All');
                    setDateFilter('All');
                  }}
                >
                  Clear Filters
                </Button>
              </Paper>
            )}
          </>
        )}
        
        {/* Pagination */}
        {filteredPapers.length > papersPerPage && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }} className="research-pagination">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              size="large"
              shape="rounded"
              showFirstButton
              showLastButton
            />
          </Box>
        )}
        
        {/* Trending Papers Section */}
        <Box className="trending-papers" sx={{ mt: 8, py: 5, px: 4, borderRadius: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
            Trending in Verification
          </Typography>
          
          <Typography variant="body1" paragraph sx={{ opacity: 0.8, maxWidth: '800px', mb: 4 }}>
            The most cited verification papers from the past year, showcasing groundbreaking methodologies and technologies.
          </Typography>
          
          <Grid container spacing={3}>
            {papers
              .filter(paper => paper.category === 'Verification')
              .sort((a, b) => b.citations - a.citations)
              .slice(0, 3)
              .map((paper) => (
                <Grid item xs={12} md={4} key={`trending-${paper.id}`}>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <ElectricBolt 
                      sx={{ 
                        fontSize: '2rem', 
                        color: 'primary.main', 
                        mt: 0.5,
                        opacity: 0.8
                      }} 
                    />
                    <Box>
                      <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                        {paper.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {paper.authors}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                        <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                          <School fontSize="small" sx={{ mr: 0.5 }} /> {paper.citations} citations
                        </Typography>
                        <Chip 
                          label={paper.source} 
                          size="small" 
                          className={`source-badge ${getSourceBadgeClass(paper.source)}`}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              ))
            }
          </Grid>
        </Box>
        
        {/* Newsletter Section with Improved Functionality */}
        <Box className="newsletter-section" sx={{ mt: 8, pb: 6 }}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 4,
              background: 'linear-gradient(135deg, #7b1fa2 0%, #6a1b9a 100%)',
              color: 'white',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <Box sx={{ position: 'absolute', top: -50, right: -50, opacity: 0.1 }}>
              <Article sx={{ fontSize: 200 }} />
            </Box>
            
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={7}>
                <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
                  Stay Updated with Research
                </Typography>
                
                <Typography variant="body1" paragraph sx={{ opacity: 0.9, mb: 3 }}>
                  Subscribe to our newsletter to receive weekly updates on the latest research papers in your areas of interest.
                </Typography>
              </Grid>
              
              <Grid item xs={12} md={5}>
                {subscribed ? (
                  <Box
                    className="success-message scale-in"
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: 'rgba(255, 255, 255, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2
                    }}
                  >
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        bgcolor: 'success.main',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <CheckCircle />
                    </Box>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      Thank you! Your subscription is confirmed.
                    </Typography>
                  </Box>
                ) : (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }} className="fade-in">
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <TextField
                        fullWidth
                        placeholder="Your email address"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={!!emailError}
                        helperText={emailError}
                        FormHelperTextProps={{
                          sx: { color: 'rgba(255,255,255,0.7)' }
                        }}
                        disabled={subscribing}
                        InputProps={{
                          sx: { 
                            bgcolor: 'rgba(255, 255, 255, 0.9)',
                            borderRadius: 2
                          }
                        }}
                      />
                      <Button
                        variant="contained"
                        onClick={handleSubscribe}
                        disabled={subscribing}
                        sx={{
                          bgcolor: 'white',
                          color: 'primary.main',
                          '&:hover': {
                            bgcolor: 'rgba(255, 255, 255, 0.9)',
                          },
                          borderRadius: 2,
                          whiteSpace: 'nowrap',
                          minWidth: subscribing ? '120px' : 'auto'
                        }}
                      >
                        {subscribing ? (
                          <CircularProgress size={24} color="primary" />
                        ) : (
                          'Subscribe'
                        )}
                      </Button>
                    </Box>
                    <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
                      We'll never share your email with anyone else.
                    </Typography>
                  </Box>
                )}
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Container>
      
      {/* Add CSS keyframes for animations */}
      <style jsx="true">{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </Box>
  );
};

export default Research;