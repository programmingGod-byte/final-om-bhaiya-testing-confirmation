import React, { useContext } from 'react';
import {
  Container, Typography, Box, Paper, Divider, Button,
  Accordion, AccordionSummary, AccordionDetails
} from '@mui/material';
import {
  ExpandMore, Description, Gavel, PrivacyTip,
  Security, ContactSupport, ArrowBack
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Terms = () => {
  const context = useContext(AuthContext)
    context.ScrollToTop()
    
  const navigate = useNavigate();

  const sections = [
    {
      title: "Introduction",
      icon: <Description />,
      content: "Welcome to our platform. These Terms and Conditions govern your use of our website and services. By accessing or using our services, you agree to be bound by these terms."
    },
    {
      title: "User Responsibilities",
      icon: <Gavel />,
      content: "You agree to use our services lawfully and not to engage in any activity that interferes with or disrupts the services. You are responsible for maintaining the confidentiality of your account information."
    },
    {
      title: "Privacy Policy",
      icon: <PrivacyTip />,
      content: "Our Privacy Policy explains how we collect, use, and protect your personal information. By using our services, you consent to our collection and use of your data as described in the Privacy Policy."
    },
    {
      title: "Intellectual Property",
      icon: <Security />,
      content: "All content on this platform, including text, graphics, logos, and software, is our property or the property of our licensors and is protected by intellectual property laws."
    },
    {
      title: "Limitation of Liability",
      icon: <ContactSupport />,
      content: "We shall not be liable for any indirect, incidental, special, or consequential damages resulting from your use of or inability to use our services."
    }
  ];

  const MotionPaper = motion(Paper);
  const MotionButton = motion(Button);

  return (
    <Box className="bg-gray-50 min-h-screen py-12">
      {/* Animated background elements */}
      <Box className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <Box className="absolute top-20 left-10 w-40 h-40 rounded-full bg-purple-100 blur-3xl opacity-30" />
        <Box className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-indigo-100 blur-3xl opacity-30" />
      </Box>

      <Container maxWidth="lg" className="relative z-10">
        {/* Back Button */}
        <MotionButton
          onClick={() => navigate(-1)}
          startIcon={<ArrowBack />}
          variant="outlined"
          className="mb-6"
          whileHover={{ x: -5 }}
          sx={{
            textTransform: 'none',
            borderRadius: 2,
            borderWidth: 2,
            px: 3,
            '&:hover': {
              borderWidth: 2
            }
          }}
        >
          Back
        </MotionButton>

        {/* Header */}
        <MotionPaper
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          elevation={3}
          className="p-6 mb-8 rounded-2xl"
          sx={{
            background: 'linear-gradient(135deg, #6a0dad 0%, #9c27b0 100%)',
            color: 'white'
          }}
        >
          <Typography
            variant="h2"
            className="font-extrabold mb-2"
            sx={{
              fontSize: { xs: '2rem', md: '2.5rem' },
              display: 'flex',
              alignItems: 'center',
              gap: 2
            }}
          >
            <Description fontSize="large" />
            Terms and Conditions
          </Typography>
          <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
            Last Updated: {new Date().toLocaleDateString()}
          </Typography>
        </MotionPaper>

        {/* Effective Date Notice */}
        <MotionPaper
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          elevation={2}
          className="p-4 mb-8 rounded-xl"
          sx={{ borderLeft: '4px solid #6a0dad' }}
        >
          <Typography variant="body1">
            <strong>Note:</strong> These terms are effective as of the date above. We may update these terms periodically, 
            and we will notify you of any significant changes.
          </Typography>
        </MotionPaper>

        {/* Main Content */}
        <Box className="mb-8">
          {sections.map((section, index) => (
            <MotionPaper
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
              elevation={2}
              className="mb-4 rounded-xl overflow-hidden"
            >
              <Accordion
                sx={{
                  '&:before': { display: 'none' },
                  boxShadow: 'none'
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  sx={{
                    backgroundColor: 'rgba(106, 13, 173, 0.05)',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                    minHeight: '64px !important'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {section.icon}
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {section.title}
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body1" paragraph>
                    {section.content}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </MotionPaper>
          ))}
        </Box>

        {/* Additional Legal Sections */}
        <MotionPaper
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          elevation={3}
          className="p-6 rounded-2xl"
        >
          <Typography variant="h5" className="font-bold mb-4" sx={{ color: 'primary.main' }}>
            Additional Legal Information
          </Typography>
          <Divider className="mb-4" />
          
          <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Box>
              <Typography variant="h6" className="font-semibold mb-2">
                Governing Law
              </Typography>
              <Typography variant="body1">
                These terms shall be governed by and construed in accordance with the laws of the State of California, 
                without regard to its conflict of law provisions.
              </Typography>
            </Box>
            
            <Box>
              <Typography variant="h6" className="font-semibold mb-2">
                Dispute Resolution
              </Typography>
              <Typography variant="body1">
                Any disputes arising under these terms will be resolved through binding arbitration in San Francisco, CA, 
                in accordance with the rules of the American Arbitration Association.
              </Typography>
            </Box>
            
            <Box>
              <Typography variant="h6" className="font-semibold mb-2">
                Contact Information
              </Typography>
              <Typography variant="body1">
                For questions about these terms, please contact our legal team at legal@yourcompany.com.
              </Typography>
            </Box>
            
            <Box>
              <Typography variant="h6" className="font-semibold mb-2">
                Changes to Terms
              </Typography>
              <Typography variant="body1">
                We reserve the right to modify these terms at any time. Your continued use of our services constitutes 
                acceptance of the modified terms.
              </Typography>
            </Box>
          </Box>
        </MotionPaper>

        {/* Acceptance Section */}
        <MotionPaper
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          elevation={3}
          className="p-6 mt-8 rounded-2xl text-center"
          sx={{ borderTop: '4px solid #6a0dad' }}
        >
          <Typography variant="h6" className="font-semibold mb-4">
            By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
          </Typography>
          <MotionButton
            variant="contained"
            color="primary"
            size="large"
            className="normal-case font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            sx={{
              px: 6,
              py: 1.5,
              borderRadius: 2,
              boxShadow: '0 4px 20px rgba(106, 13, 173, 0.3)'
            }}
          >
            I Understand
          </MotionButton>
        </MotionPaper>
      </Container>
    </Box>
  );
};

export default Terms;