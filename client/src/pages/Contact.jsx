import React, { useState } from 'react';
import {
  Container, Typography, Box, Grid, Paper, TextField, Button,
  FormControl, FormHelperText, InputLabel, MenuItem, Select,
  Snackbar, Alert, Divider
} from '@mui/material';
import {
  Email, Phone, LocationOn, Send
} from '@mui/icons-material';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiry: ''
  });
  
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  
  const inquiryTypes = [
    'General Inquiry',
    'Technical Support',
    'Feedback',
    'Partnership',
    'Career Inquiry',
    'Other'
  ];
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    // Validate subject
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    // Validate message
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    // Validate inquiry type
    if (!formData.inquiry) {
      newErrors.inquiry = 'Please select an inquiry type';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real app, you would send the form data to a server
      console.log('Form submitted:', formData);
      
      // Show success message
      setSnackbar({
        open: true,
        message: 'Your message has been sent! We will get back to you soon.',
        severity: 'success'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        inquiry: ''
      });
    } else {
      // Show error message
      setSnackbar({
        open: true,
        message: 'Please correct the errors in the form.',
        severity: 'error'
      });
    }
  };
  
  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({
      ...prev,
      open: false
    }));
  };

  return (
    <Box sx={{ py: 8, bgcolor: '#f9f9f9' }}>
      <Container maxWidth="lg">
        {/* Hero section */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              fontWeight: 800,
              mb: 2,
              background: 'linear-gradient(45deg, #6a0dad 30%, #9c27b0 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Get in Touch
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Have questions about our platform? Want to collaborate? We're here to help you!
          </Typography>
        </Box>
        
        <Grid container spacing={5}>
          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: { xs: 3, md: 5 },
                borderRadius: 3,
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '150px',
                  height: '150px',
                  background: 'linear-gradient(45deg, transparent 50%, rgba(106, 13, 173, 0.05) 50%)',
                  zIndex: 0
                }}
              />
              
              <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 700, position: 'relative', zIndex: 1 }}>
                Send us a Message
              </Typography>
              <Typography variant="body1" paragraph sx={{ mb: 4, color: 'text.secondary', position: 'relative', zIndex: 1 }}>
                Fill out the form below and we'll get back to you as soon as possible.
              </Typography>
              
              <Box component="form" onSubmit={handleSubmit} sx={{ position: 'relative', zIndex: 1 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      error={!!errors.name}
                      helperText={errors.name}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={!!errors.email}
                      helperText={errors.email}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      error={!!errors.subject}
                      helperText={errors.subject}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth error={!!errors.inquiry} required>
                      <InputLabel>Inquiry Type</InputLabel>
                      <Select
                        name="inquiry"
                        value={formData.inquiry}
                        label="Inquiry Type"
                        onChange={handleChange}
                      >
                        {inquiryTypes.map((type) => (
                          <MenuItem key={type} value={type}>
                            {type}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.inquiry && <FormHelperText>{errors.inquiry}</FormHelperText>}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Your Message"
                      name="message"
                      multiline
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      error={!!errors.message}
                      helperText={errors.message}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      endIcon={<Send />}
                      sx={{ 
                        py: 1.5,
                        px: 4,
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 600
                      }}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
          
          {/* Contact Info */}
          <Grid item xs={12} md={5}>
            <Box>
              <Paper 
                elevation={3} 
                sx={{ 
                  p: { xs: 3, md: 4 },
                  mb: 4,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #6a0dad 0%, #9c27b0 100%)',
                  color: 'white'
                }}
              >
                <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
                  Contact Information
                </Typography>
                <Typography variant="body1" paragraph sx={{ mb: 4, opacity: 0.9 }}>
                  You can reach out to us through any of the following channels:
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box 
                      sx={{ 
                        bgcolor: 'rgba(255, 255, 255, 0.15)',
                        borderRadius: '50%',
                        p: 1.5,
                        mr: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Email />
                    </Box>
                    <Box>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        Email Us
                      </Typography>
                      <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                        omdaga6@gmail.com
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box 
                      sx={{ 
                        bgcolor: 'rgba(255, 255, 255, 0.15)',
                        borderRadius: '50%',
                        p: 1.5,
                        mr: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Phone />
                    </Box>
                    <Box>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        Call Us
                      </Typography>
                      <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                        +91 8859141410
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box 
                      sx={{ 
                        bgcolor: 'rgba(255, 255, 255, 0.15)',
                        borderRadius: '50%',
                        p: 1.5,
                        mr: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <LocationOn />
                    </Box>
                    <Box>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        Visit Us
                      </Typography>
                      <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                        IIT MANDI, HP, India
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Paper>
              
              <Paper 
                elevation={3} 
                sx={{ 
                  p: { xs: 3, md: 4 },
                  borderRadius: 3
                }}
              >
                <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 700 }}>
                  Business Hours
                </Typography>
                
                <Divider sx={{ my: 2 }} />
                
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Monday - Friday:
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      9:00 AM - 6:00 PM
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Saturday:
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      10:00 AM - 4:00 PM
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Sunday:
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      Closed
                    </Typography>
                  </Grid>
                </Grid>
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="body2" color="text.secondary">
                  Note: Response times may vary during weekends and holidays.
                </Typography>
              </Paper>
            </Box>
          </Grid>
        </Grid>
        
        {/* FAQ Section */}
        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
            Frequently Asked Questions
          </Typography>
          <Typography variant="body1" sx={{ mb: 5, maxWidth: 700, mx: 'auto', color: 'text.secondary' }}>
            Can't find the answer you're looking for? Reach out to our customer support team.
          </Typography>
          
          <Box component="a" href="#" sx={{ 
            display: 'inline-block',
            textDecoration: 'none',
            color: 'primary.main',
            fontWeight: 600,
            '&:hover': {
              textDecoration: 'underline'
            }
          }}>
            View All FAQs
          </Box>
        </Box>
      </Container>
      
      {/* Snackbar for form submission messages */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact; 