import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box, Container, Grid, Typography, IconButton, Divider, Button,
  List, ListItem, ListItemText, TextField, InputAdornment
} from '@mui/material';
import {
  Facebook, Twitter, LinkedIn, YouTube, Send, Email, Phone, LocationOn
} from '@mui/icons-material';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#303030',
        color: 'white',
        py: 6,
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Logo and company info */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
              <Box 
                component="img" 
                src="/images/BACKGROUNDLESS_LOGO.png" 
                alt="VeriGeek Logo" 
                sx={{ 
                  height: 32, 
                  mr: 1 
                }}
              />
              VERIGEEK
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, fontStyle: 'italic', color: '#f0f0f0' }}>
              Empower Your Logic, Code Your Circuit!
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              The comprehensive learning platform for mastering Verilog and digital design.
            </Typography>
            <Box sx={{ mb: 2 }}>
              <IconButton color="inherit" aria-label="Facebook" component="a" href="#" target="_blank">
                <Facebook />
              </IconButton>
              <IconButton color="inherit" aria-label="Twitter" component="a" href="#" target="_blank">
                <Twitter />
              </IconButton>
              <IconButton color="inherit" aria-label="LinkedIn" component="a" href="#" target="_blank">
                <LinkedIn />
              </IconButton>
              <IconButton color="inherit" aria-label="YouTube" component="a" href="#" target="_blank">
                <YouTube />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <List dense disablePadding>
              <ListItem disableGutters>
                <ListItemText>
                  <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
                    Home
                  </Link>
                </ListItemText>
              </ListItem>
              <ListItem disableGutters>
                <ListItemText>
                  <Link to="/modules" style={{ color: 'white', textDecoration: 'none' }}>
                    Browse Modules
                  </Link>
                </ListItemText>
              </ListItem>
              <ListItem disableGutters>
                <ListItemText>
                  <Link to="/forum" style={{ color: 'white', textDecoration: 'none' }}>
                    Community Forum
                  </Link>
                </ListItemText>
              </ListItem>
              <ListItem disableGutters>
                <ListItemText>
                  <Link to="/resources" style={{ color: 'white', textDecoration: 'none' }}>
                    Resources
                  </Link>
                </ListItemText>
              </ListItem>
              <ListItem disableGutters>
                <ListItemText>
                  <Link to="/research" style={{ color: 'white', textDecoration: 'none' }}>
                    Research
                  </Link>
                </ListItemText>
              </ListItem>
              <ListItem disableGutters>
                <ListItemText>
                  <Link to="/careers" style={{ color: 'white', textDecoration: 'none' }}>
                    Careers
                  </Link>
                </ListItemText>
              </ListItem>
              <ListItem disableGutters>
                <ListItemText>
                  <Link to="/editor" style={{ color: 'white', textDecoration: 'none' }}>
                    Code Editor
                  </Link>
                </ListItemText>
              </ListItem>
              <ListItem disableGutters>
                <ListItemText>
                  <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>
                    Get Started
                  </Link>
                </ListItemText>
              </ListItem>
            </List>
          </Grid>

          {/* Learn More */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Learn More
            </Typography>
            <List dense disablePadding>
              <ListItem disableGutters>
                <ListItemText>
                  <Link to="/about" style={{ color: 'white', textDecoration: 'none' }}>
                    About Us
                  </Link>
                </ListItemText>
              </ListItem>
              <ListItem disableGutters>
                <ListItemText>
                  <Link to="/privacy" style={{ color: 'white', textDecoration: 'none' }}>
                    Privacy Policy
                  </Link>
                </ListItemText>
              </ListItem>
              <ListItem disableGutters>
                <ListItemText>
                  <Link to="/terms" style={{ color: 'white', textDecoration: 'none' }}>
                    Terms of Service
                  </Link>
                </ListItemText>
              </ListItem>
              <ListItem disableGutters>
                <ListItemText>
                  <Link to="/contact" style={{ color: 'white', textDecoration: 'none' }}>
                    Contact Us
                  </Link>
                </ListItemText>
              </ListItem>
              <ListItem disableGutters>
                <ListItemText>
                  <Link to="/faq" style={{ color: 'white', textDecoration: 'none' }}>
                    FAQ
                  </Link>
                </ListItemText>
              </ListItem>
            </List>
          </Grid>

          {/* Newsletter */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Newsletter
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Subscribe to get updates on new courses and features.
            </Typography>
            <TextField
              fullWidth
              placeholder="Your email address"
              variant="outlined"
              size="small"
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: 1,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#6a0dad',
                  },
                },
                '& .MuiInputBase-input': {
                  color: 'white',
                },
                mb: 2
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="subscribe"
                      edge="end"
                      sx={{ color: '#6a0dad' }}
                    >
                      <Send />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Contact Info */}
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Email fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="body2">
                  omdaga6@gmail.com
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Phone fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="body2">
                  +91 8859141410
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LocationOn fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="body2">
                  IIT MANDI , HP
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)', my: 4 }} />
        
        {/* Bottom footer */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { sm: 'center' } }}>
          <Typography variant="body2" sx={{ mb: { xs: 2, sm: 0 } }}>
            © {currentYear} VeriGeek. All rights reserved.
          </Typography>
          <Box>
            <Button color="inherit" size="small" component={Link} to="/privacy">
              Privacy
            </Button>
            <Button color="inherit" size="small" component={Link} to="/terms">
              Terms
            </Button>
            <Button color="inherit" size="small" component={Link} to="/cookies">
              Cookies
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 