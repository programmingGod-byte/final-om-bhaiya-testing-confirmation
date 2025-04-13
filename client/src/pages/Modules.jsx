import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Box, Typography, Grid, Card, CardContent, CardMedia, CardActionArea, 
  Chip, TextField, InputAdornment, FormControl, InputLabel, Select, MenuItem,
  Pagination, Divider
} from '@mui/material';
import { Search, FilterList } from '@mui/icons-material';
import moduleData from '../data/modules';

const Modules = () => {
  // State for filters and pagination
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  const [page, setPage] = useState(1);
  
  // Use imported modules data
  const modules = moduleData;

  // Filter modules based on search and filters
  const filteredModules = modules.filter(module => {
    const matchesSearch = module.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         module.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (module.chapters && module.chapters.some(chapter => 
                           chapter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           chapter.description.toLowerCase().includes(searchQuery.toLowerCase())
                         ));
    const matchesCategory = categoryFilter === 'all' || module.level === categoryFilter;
    const matchesLevel = levelFilter === 'all' || module.level === levelFilter;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  // Get unique categories and levels for filter options
  const categories = [...new Set(modules.map(module => module.level))];
  const levels = [...new Set(modules.map(module => module.level))];

  // Pagination logic
  const modulesPerPage = 6;
  const pagesCount = Math.ceil(filteredModules.length / modulesPerPage);
  const displayedModules = filteredModules.slice(
    (page - 1) * modulesPerPage,
    page * modulesPerPage
  );

  return (
    <Box className="container page-container">
      <Typography variant="h3" component="h1" gutterBottom color="primary">
        VeriGeek Learning Modules
      </Typography>
      <Typography variant="subtitle1" paragraph sx={{ mb: 4 }}>
        Browse our comprehensive collection of Verilog modules designed to take you from beginner to expert. Each module contains theory, examples, and hands-on exercises.
      </Typography>

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
            <Grid item xs={12} sm={6} md={4} key={module.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s, box-shadow 0.3s', '&:hover': { transform: 'translateY(-8px)', boxShadow: 6 } }}>
                <CardActionArea component={Link} to={`/modules/${module.id}`}>
                  <CardMedia
                    component="img"
                    height="160"
                    image={module.image}
                    alt={module.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="h3" gutterBottom noWrap>
                      {typeof module.title === 'string' ? module.title : String(module.title)}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                      <Chip 
                        label={typeof module.level === 'string' ? module.level : String(module.level)} 
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
                      {typeof module.description === 'string' ? module.description : String(module.description)}
                    </Typography>
                    <Box sx={{ mt: 1, mb: 2 }}>
                      {module.topics && Array.isArray(module.topics) && module.topics.slice(0, 3).map((topic, index) => (
                        <Chip
                          key={index}
                          label={typeof topic === 'string' ? topic : String(topic)}
                          size="small"
                          sx={{ mr: 0.5, mb: 0.5, backgroundColor: 'rgba(106, 13, 173, 0.08)', fontSize: '0.7rem' }}
                        />
                      ))}
                      {module.topics && Array.isArray(module.topics) && module.topics.length > 3 && (
                        <Chip
                          label={`+${module.topics.length - 3} more`}
                          size="small"
                          sx={{ mb: 0.5, backgroundColor: 'rgba(106, 13, 173, 0.04)', fontSize: '0.7rem' }}
                        />
                      )}
                    </Box>
                    <Divider sx={{ my: 1 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        ⭐ {typeof module.rating === 'string' || typeof module.rating === 'number' ? module.rating : '4.8'} ({typeof module.students === 'string' || typeof module.students === 'number' ? module.students : '8750'})
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {module.chapters && Array.isArray(module.chapters) ? module.chapters.length : 16} chapters • {module.exercises && Array.isArray(module.exercises) ? module.exercises.length : 5} exercises
                      </Typography>
                    </Box>
                  </CardContent>
                </CardActionArea>
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
  );
};

export default Modules; 