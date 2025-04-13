import React from 'react';
import {
  Card, CardContent, CardMedia, CardActions, Typography,
  Button, Chip, Box, IconButton
} from '@mui/material';
import {
  Bookmark, BookmarkBorder, Share, School,
  Timer, ChevronRight
} from '@mui/icons-material';

// Helper function to get source badge class
const getSourceBadgeClass = (source) => {
  switch(source) {
    case 'IEEE': return 'badge-ieee';
    case 'Springer': return 'badge-springer';
    case 'ACM': return 'badge-acm';
    case 'arXiv': return 'badge-arxiv';
    case 'Elsevier': return 'badge-elsevier';
    default: return '';
  }
};

// Format date helper
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const ResearchCard = ({ 
  paper, 
  isBookmarked, 
  onBookmarkToggle, 
  onShare,
  onTagClick 
}) => {
  return (
    <Card className="research-card" elevation={2} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="160"
        image={paper.image}
        alt={paper.title}
        sx={{ objectFit: 'cover' }}
      />
      
      <CardContent sx={{ flexGrow: 1, pt: 3, pb: 1 }}>
        {/* Source Badge */}
        <Chip 
          label={paper.source} 
          size="small" 
          className={`source-badge ${getSourceBadgeClass(paper.source)}`}
          sx={{ mb: 2 }}
        />
        
        <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600, lineHeight: 1.3 }}>
          {paper.title}
        </Typography>
        
        <Typography 
          variant="body2" 
          color="text.secondary" 
          gutterBottom
          sx={{ mb: 2, fontWeight: 500 }}
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
            mb: 1
          }}
        >
          {paper.abstract}
        </Typography>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1.5 }}>
          {paper.tags.map(tag => (
            <Chip 
              key={tag} 
              label={tag} 
              size="small" 
              variant="outlined"
              sx={{ borderRadius: 1, fontSize: '0.75rem' }}
              onClick={() => onTagClick(tag)}
            />
          ))}
        </Box>
      </CardContent>
      
      <CardActions sx={{ p: 2, pt: 0 }}>
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
            flexGrow: 1
          }}
        >
          Read Paper
        </Button>
        
        <IconButton 
          size="small" 
          color={isBookmarked ? 'secondary' : 'default'}
          onClick={() => onBookmarkToggle(paper.id)}
          sx={{ 
            color: isBookmarked ? 'secondary.main' : 'text.secondary',
          }}
        >
          {isBookmarked ? (
            <Bookmark className="bookmark-active" />
          ) : (
            <BookmarkBorder />
          )}
        </IconButton>
        
        <IconButton 
          size="small" 
          onClick={() => onShare(paper)}
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
  );
};

export default ResearchCard; 