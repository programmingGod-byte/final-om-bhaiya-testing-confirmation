import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Box, Typography, TextField, Button, Paper, Grid, 
  Divider, Checkbox, FormControlLabel, Snackbar, Alert,
  InputAdornment, IconButton, Tabs, Tab
} from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock, Person } from '@mui/icons-material';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import {AuthContext} from "../context/AuthContext"

import URLSITE from "../constant"

const Login = () => {
  const navigate = useNavigate();
  const  {user,setUser} = useContext(AuthContext);
  const [dialogOpen,setDialogOpen] = useState(false)
  const [errorText,setErrorText]  = useState("")
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'info'
  });
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});

  function GoogleLoginButton() {
    const handleSuccess = async (credentialResponse) => {
      const { credential } = credentialResponse;
      console.log("$$$$$$$$$$$$$$$credentials ")
      console.log(credential)
      // Send to backend
      const res = await axios.post(`${URLSITE}/api/auth/google`, {
        token: credential
    });
      console.log(res)

      if(res.status==200){
        let jwtToken = res.data.token
        console.log(jwtToken)
        localStorage.setItem('VeriGeektoken', res.data.token);
        setUser({
          name:res.data.name,
          email:res.data.email
        })
        navigate('/')
      }else{
        setErrorText("cannot able to login please try again")
        setDialogOpen(true)
      }
    };

    return (
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => console.log('Login Failed')}
      />
    );
  }

  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'rememberMe' ? checked : value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setErrors({});
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      rememberMe: false
    });
  };

  const validateLoginForm = () => {
    const newErrors = {};
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateRegisterForm = () => {
    const newErrors = {};
    
    // First name validation
    if (!formData.firstName) {
      newErrors.firstName = 'First name is required';
    }
    
    // Last name validation
    if (!formData.lastName) {
      newErrors.lastName = 'Last name is required';
    }
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    
    if (validateLoginForm()) {
      try {
        // Replace with actual API call
        const response = await axios.post(`${URLSITE}/api/auth/login`, {
          email: formData.email,
          password: formData.password
        });
        
        if (response.status === 200) {
          setNotification({
            open: true,
            message: 'Login successful! Redirecting...',
            severity: 'success'
          });
          localStorage.setItem('VeriGeektoken', response.data.token);
        setUser({
          name:response.data.name,
          email:response.data.email
        })
        
          setTimeout(() => {
            navigate('/');
          }, 1500);
        }
      } catch (error) {
        console.log(error)
        setNotification({
          open: true,
          message: error.response.data.message,
          severity: 'error'
        });
      }
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    
    if (validateRegisterForm()) {
      try {
        console.log(formData)
        // Replace with actual API call
        
        const response = await axios.post(`${URLSITE}/api/auth/email-signup`, {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password
        });
        
        if (response.status === 200) {
        
          setFormData({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    rememberMe: false
  })
          setNotification({
            open: true,
            message: 'Verification email sent check your inbox',
            severity: 'success'
          });



          setTabValue(0); // Switch to login tab
        }
      } catch (error) {
        console.log(error)
        setNotification({
          open: true,
          message: error.response.data,
          severity: 'error'
        });
      }
    }
  };

  const handleCloseNotification = () => {
    setNotification({
      ...notification,
      open: false
    });
  };

  return (
    <Box className="container page-container">
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
            {/* Logo and Title */}
            <Box sx={{ mb: 3, textAlign: 'center' }}>
              <Typography component="h1" variant="h5" gutterBottom>
                Welcome to VeriGeek
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                Empower Your Logic, Code Your Circuit!
              </Typography>
            </Box>
            
            {/* Google Login Button */}
            <Box sx={{ mb: 3, textAlign: 'center' }}>
              <GoogleLoginButton/>
            </Box>
            
            <Divider sx={{ mb: 3 }}>
              <Typography variant="body2" color="text.secondary">
                OR
              </Typography>
            </Divider>
            
            {/* Tabs */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
              <Tabs value={tabValue} onChange={handleTabChange} centered>
                <Tab label="Sign In" />
                <Tab label="Sign Up" />
              </Tabs>
            </Box>
            
            {/* Login Form */}
            {tabValue === 0 && (
              <form onSubmit={handleLoginSubmit} noValidate>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Email Address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
                  }}
                />
                
                <TextField
                  fullWidth
                  margin="normal"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  error={!!errors.password}
                  helperText={errors.password}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                  <FormControlLabel
                    control={
                      <Checkbox 
                        name="rememberMe" 
                        checked={formData.rememberMe}
                        onChange={handleInputChange}
                        color="primary"
                      />
                    }
                    label="Remember me"
                  />
                  
                  <Link to="/forgot-password" style={{ color: '#6a0dad', textDecoration: 'none' }}>
                    Forgot password?
                  </Link>
                </Box>
                
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
              </form>
            )}
            
            {/* Register Form */}
            {tabValue === 1 && (
              <form onSubmit={handleRegisterSubmit} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      margin="normal"
                      label="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      error={!!errors.firstName}
                      helperText={errors.firstName}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Person />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      error={!!errors.lastName}
                      helperText={errors.lastName}
                    />
                  </Grid>
                </Grid>
                
                <TextField
                  fullWidth
                  margin="normal"
                  label="Email Address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
                  }}
                />
                
                <TextField
                  fullWidth
                  margin="normal"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  error={!!errors.password}
                  helperText={errors.password}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                
                <TextField
                  fullWidth
                  margin="normal"
                  label="Confirm Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          edge="end"
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
              </form>
            )}
          </Paper>
        </Grid>
      </Grid>
      
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
      <DialogTitle>{"error"}</DialogTitle>
      <DialogContent>{errorText}</DialogContent>
      <DialogActions>
        <Button onClick={() => setDialogOpen(false)}>Close</Button>
      </DialogActions>
    </Dialog>

    </Box>
  );
};

export default Login;