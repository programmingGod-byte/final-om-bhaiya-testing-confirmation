import React, { useState, useEffect, useContext } from 'react';
import { Mail, Lock, Shield, ArrowRight, CheckCircle, RefreshCw, Eye, EyeOff, Key, X, AlertCircle } from 'lucide-react';
import { AuthContext } from "../context/AuthContext"
import URLSITE from '../constant';
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom';

// Notification Component
const Notification = ({ type, message, onClose }) => {
  const bgColor = type === 'error' ? 'bg-red-50 border-red-200' : 'bg-blue-50 border-blue-200';
  const textColor = type === 'error' ? 'text-red-800' : 'text-blue-800';
  const iconColor = type === 'error' ? 'text-red-500' : 'text-blue-500';

  return (
    <div className={`${bgColor} border rounded-lg p-4 mb-4 flex items-start space-x-3`}>
      <AlertCircle className={`${iconColor} w-5 h-5 mt-0.5 flex-shrink-0`} />
      <div className="flex-1">
        <p className={`${textColor} text-sm`}>{message}</p>
      </div>
      <button
        onClick={onClose}
        className={`${textColor} hover:opacity-70 transition-opacity`}
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

function ForgotPassword() {
       const navigate = useNavigate();
 
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [captcha, setCaptcha] = useState('');
  const [captchaQuestion, setCaptchaQuestion] = useState('');
  const [captchaAnswer, setCaptchaAnswer] = useState(0);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [notification, setNotification] = useState(null); // New state for notifications
  const { user, setUser } = useContext(AuthContext);

  // Show notification function
  const showNotification = (type, message) => {
    setNotification({ type, message });
    // Auto-hide after 5 seconds
    setTimeout(() => setNotification(null), 5000);
  };

  // Hide notification function
  const hideNotification = () => {
    setNotification(null);
  };

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password validation function
  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return 'Password must be at least 8 characters long';
    }
    if (!hasUpperCase) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!hasLowerCase) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!hasNumbers) {
      return 'Password must contain at least one number';
    }
    if (!hasSpecialChar) {
      return 'Password must contain at least one special character';
    }
    return '';
  };

  // Generate random CAPTCHA
  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operations = ['+', '-', '×'];
    const operation = operations[Math.floor(Math.random() * operations.length)];

    let answer;
    switch (operation) {
      case '+': answer = num1 + num2; break;
      case '-': answer = num1 - num2; break;
      case '×': answer = num1 * num2; break;
      default: answer = num1 + num2;
    }

    setCaptchaQuestion(`${num1} ${operation} ${num2} = ?`);
    setCaptchaAnswer(answer);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  // Timer for resend code
  useEffect(() => {
    if (step === 2 && timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      setCanResend(true);
    }
  }, [step, timer]);

  const handleEmailSubmit = async (e) => {
    if (e) e.preventDefault();
    setEmailError('');
    hideNotification(); // Clear any existing notifications

    if (!email) {
      setEmailError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`${URLSITE}/api/auth/forgot-password`, {
        email: email,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000
      });

      console.log(response);
      if (response?.data.success) {
        setIsLoading(false);
        setStep(2);
        setTimer(60);
        setCanResend(false);
        showNotification('success', 'Verification code sent to your email successfully!');
      } else {
        setEmailError('This email address is not registered in our system');
        setIsLoading(false);
        return;
      }
    } catch (error) {
      setIsLoading(false);
      showNotification('error', 'Failed to send verification code. Please try again.');
    }
  };

  const handleCodeChange = (index, value) => {
    if (value.length > 1) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleCodeSubmit = async (e) => {
    if (e) e.preventDefault();
    const fullCode = code.join('');
    if (fullCode.length !== 6) return;

    setIsLoading(true);
    hideNotification();

    try {
      const response = await axios.post(`${URLSITE}/api/auth/verify-code`, {
        email: email,
        code: fullCode
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000
      });

      if (response.data.success) {
        setIsLoading(false);
        setStep(3);
        showNotification('success', 'Code verified successfully!');
      } else {
        showNotification('error', response.data.message || 'Invalid verification code. Please try again.');
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      showNotification('error', 'Failed to verify code. Please try again.');
    }
  };

  const handleCaptchaSubmit = async (e) => {
    if (e) e.preventDefault();
    hideNotification();

    if (parseInt(captcha) !== captchaAnswer) {
      showNotification('error', 'Incorrect CAPTCHA answer. Please try again.');
      generateCaptcha();
      setCaptcha('');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    setStep(4);
    showNotification('success', 'Security verification completed!');
  };

  const handlePasswordSubmit = async (e) => {
    if (e) e.preventDefault();
    setPasswordError('');
    hideNotification();

    const passwordValidation = validatePassword(newPassword);
    if (passwordValidation) {
      setPasswordError(passwordValidation);
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`${URLSITE}/api/auth/update-password`, {
        email: email,
        password: newPassword
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000
      });

      if (response.data.success) {
        setIsLoading(false);
        setStep(5);
      } else {
        setIsLoading(false);
        showNotification('error', 'Failed to update password. Please try again.');
      }
    } catch (error) {
      setIsLoading(false);
      showNotification('error', 'An error occurred while updating your password. Please try again.');
    }
  };

  const resendCode = async () => {
    setIsLoading(true);
    hideNotification();
    
    try {
      // Add your actual resend API call here if needed
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsLoading(false);
      setTimer(60);
      setCanResend(false);
      showNotification('success', 'Verification code resent successfully!');
    } catch (error) {
      setIsLoading(false);
      showNotification('error', 'Failed to resend code. Please try again.');
    }
  };

  const resetForm = () => {

    setStep(1);
    setEmail('');
    setCode(['', '', '', '', '', '']);
    setCaptcha('');
    setNewPassword('');
    setConfirmPassword('');
    setEmailError('');
    setPasswordError('');
    hideNotification();
    generateCaptcha();
    navigate("/login")
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">Step {step} of 5</span>
            <span className="text-sm font-medium text-purple-600">{Math.round((step / 5) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* Notification */}
        {notification && (
          <Notification
            type={notification.type}
            message={notification.message}
            onClose={hideNotification}
          />
        )}

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {step === 1 && (
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Forgot Password?</h2>
                <p className="text-gray-600">Enter your email address and we'll send you a verification code</p>
              </div>

              <form onSubmit={handleEmailSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setEmailError('');
                      }}
                      onKeyPress={(e) => e.key === 'Enter' && handleEmailSubmit(e)}
                      className={`w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all ${
                        emailError ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your email"
                    />
                  </div>
                  {emailError && (
                    <div className="mt-2 flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <span className="text-sm text-red-600">{emailError}</span>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <RefreshCw className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <span>Send Code</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {step === 2 && (
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Enter Verification Code</h2>
                <p className="text-gray-600">We've sent a 6-digit code to {email}</p>
              </div>

              <form onSubmit={handleCodeSubmit} className="space-y-6">
                <div className="flex justify-center space-x-3">
                  {code.map((digit, index) => (
                    <input
                      key={index}
                      id={`code-${index}`}
                      type="text"
                      value={digit}
                      onChange={(e) => handleCodeChange(index, e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleCodeSubmit(e)}
                      className="w-12 h-12 text-center text-xl font-bold bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                      maxLength={1}
                    />
                  ))}
                </div>

                <div className="text-center">
                  {canResend ? (
                    <button
                      type="button"
                      onClick={resendCode}
                      className="text-purple-600 hover:text-purple-700 font-medium"
                    >
                      Resend Code
                    </button>
                  ) : (
                    <p className="text-gray-500 text-sm">
                      Resend code in {timer}s
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading || code.join('').length !== 6}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <RefreshCw className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <span>Verify Code</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {step === 3 && (
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Security Verification</h2>
                <p className="text-gray-600">Please solve this simple math problem to continue</p>
              </div>

              <form onSubmit={handleCaptchaSubmit} className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <div className="text-2xl font-bold text-gray-800 mb-4">{captchaQuestion}</div>
                  <button
                    type="button"
                    onClick={() => {
                      generateCaptcha();
                      setCaptcha('');
                    }}
                    className="text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center justify-center space-x-1 mx-auto"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>New Problem</span>
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Answer</label>
                  <input
                    type="number"
                    value={captcha}
                    onChange={(e) => setCaptcha(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleCaptchaSubmit(e)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all text-center text-xl font-semibold"
                    placeholder="Enter answer"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !captcha}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <RefreshCw className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <span>Verify & Continue</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {step === 4 && (
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Key className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Create New Password</h2>
                <p className="text-gray-600">Enter a strong password to secure your account</p>
              </div>

              <form onSubmit={handlePasswordSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => {
                        setNewPassword(e.target.value);
                        setPasswordError('');
                      }}
                      className={`w-full pl-10 pr-12 py-3 bg-gray-50 border rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all ${
                        passwordError ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setPasswordError('');
                      }}
                      onKeyPress={(e) => e.key === 'Enter' && handlePasswordSubmit(e)}
                      className={`w-full pl-10 pr-12 py-3 bg-gray-50 border rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all ${
                        passwordError ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Confirm new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {passwordError && (
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-red-600">{passwordError}</span>
                  </div>
                )}

                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Password must contain:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>At least 8 characters</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>One uppercase letter</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>One lowercase letter</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>One number</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>One special character</span>
                    </li>
                  </ul>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !newPassword || !confirmPassword}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <RefreshCw className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <span>Update Password</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {step === 5 && (
            <div className="p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Password Updated Successfully!</h2>
              <p className="text-gray-600 mb-8">Your password has been reset. You can now log in with your new password.</p>
              <button
                onClick={resetForm}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200"
              >
                Back to Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;