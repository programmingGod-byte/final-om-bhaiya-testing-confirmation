import React, { useContext, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ReactPixel from 'react-facebook-pixel';

import './styles/index.css';
import './styles/ck-editorstyles.css';

import Header from './components/Header';
import Footer from './components/Footer';
import AuthContext from './context/AuthContext';
import { darkTheme, lightTheme } from './styles/theme';

// Lazy load all pages
const Home = lazy(() => import('./pages/Home'));
const Modules = lazy(() => import('./pages/Modules'));
const ModuleDetail = lazy(() => import('./pages/ModuleDetail'));
const ChapterView = lazy(() => import('./pages/ChapterView'));
const OLChapterView = lazy(() => import('./pages/OldChapterView'));
const CodeEditor = lazy(() => import('./pages/CodeEditor'));
const Forum = lazy(() => import('./pages/Forum'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Resources = lazy(() => import('./pages/Resources'));
const Careers = lazy(() => import('./pages/Careers'));
const Blog = lazy(() => import('./pages/Blog'));
const SingleBlog = lazy(() => import('./pages/SingleBlog'));
const CommunityForum = lazy(() => import('./components/CommunityForum'));
const Research = lazy(() => import('./pages/Research'));
const Contact = lazy(() => import('./pages/Contact'));
const ResearchPaperWriter = lazy(() => import('./pages/ResearchPaperWriter'));
const FileUploader = lazy(() => import('./components/FileUpload'));
const WorkSpaceCodeEditor = lazy(() => import('./pages/WorkSpaceCodeEditor'));
const WorkSpace = lazy(() => import('./pages/workSpace'));
const CKEditorWithJson = lazy(() => import('./pages/Ckeditor'));
const ModuleChapterEditor = lazy(() => import('./pages/Ckeditor2'));
const OldModuleChapterEditor = lazy(() => import('./pages/oldCkEditor2'));
const BlogWriter = lazy(() => import('./pages/BlogWriter'));
const UserProfile = lazy(() => import('./pages/ProfilePage'));
const PricingPage = lazy(() => import('./pages/PricingPage'));
const BuyModule = lazy(() => import('./components/BuyModule'));
const About = lazy(() => import('./pages/About'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const VerifyToken = lazy(() => import('./pages/VerifyToken'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const CustomEditor = lazy(() => import('./pages/CustomEditor'));

// Theme setup
const theme = createTheme({
  palette: {
    primary: { main: '#6a0dad' },
    secondary: { main: '#f50057' },
  },
  typography: {
    fontFamily: ['Roboto', 'Arial', 'sans-serif'].join(','),
  },
});

// Loader Fallback
const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-violet-100">
      <div className="relative">
        {/* Main loader container */}
        <div className="relative w-20 h-20">
          {/* Outer ring with subtle animation */}
          <div className="absolute inset-0 rounded-full border-2 border-purple-200"></div>
          
          {/* Animated arc */}
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-purple-600 animate-spin"></div>
          
          {/* Inner subtle glow */}
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-purple-100 to-violet-50 shadow-inner"></div>
          
          {/* Center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-purple-700 rounded-full animate-pulse"></div>
          </div>
        </div>
        
        {/* Clean loading text */}
        <div className="mt-8 text-center">
          <div className="text-purple-700 text-sm font-medium tracking-wide">
            Loading
            <span className="inline-flex ml-1">
              <span className="animate-bounce" style={{ animationDelay: '0s' }}>.</span>
              <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>.</span>
              <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>.</span>
            </span>
          </div>
        </div>
        
        {/* Progress indicator */}
        <div className="mt-4 w-32 mx-auto">
          <div className="h-1 bg-purple-200 rounded-full overflow-hidden">
            <div className="h-full bg-purple-600 rounded-full animate-pulse" style={{ width: '60%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  const context = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    ReactPixel.init('1328234808404265', undefined, { autoConfig: true, debug: false });
    ReactPixel.pageView(); // Initial load
  }, []);

  useEffect(() => {
    ReactPixel.pageView(); // On route change
  }, [location.pathname]);

  useEffect(() => {
    document.title = 'VeriGeek - Empower Your Logic, Code Your Circuit!';
  }, []);

  const routes = [
    { path: "/", element: <Home /> },
    { path: "/ckeditor", element: <CKEditorWithJson /> },
    { path: "/ckeditor2", element: <ModuleChapterEditor /> },
    { path: "/oldckeditor2", element: <OldModuleChapterEditor /> },
    { path: "/modules", element: <Modules /> },
    { path: "/workspace", element: <WorkSpace /> },
    { path: "/workspaceEditor/:projectId", element: <WorkSpaceCodeEditor /> },
    { path: "/modules/:id", element: <ModuleDetail /> },
    { path: "/buy-module/:id", element: <BuyModule /> },
    { path: "/modules/:moduleId/chapters/:chapterId", element: <ChapterView /> },
    { path: "/oldmodules/:moduleId/chapters/:chapterId", element: <OLChapterView /> },
    { path: "/editor", element: <CodeEditor /> },
    { path: "/forgot-password", element: <ForgotPassword /> },
    { path: "/verify/:token", element: <VerifyToken /> },
    { path: "/modules/:moduleId/exercises/:exerciseId", element: <CodeEditor /> },
    { path: "/forum", element: <CommunityForum /> },
    { path: "/resources", element: <Resources /> },
    { path: "/careers", element: <Careers /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/blog", element: <Blog /> },
    { path: "/blog/:id", element: <SingleBlog /> },
    { path: "/research", element: <Research /> },
    { path: "/contact", element: <Contact /> },
    { path: "/allResearchTopics", element: <ResearchPaperWriter /> },
    { path: "/advanceBlogWriter", element: <BlogWriter /> },
    { path: "/qfileuploaderchecker", element: <FileUploader /> },
    { path: "/profile", element: <UserProfile /> },
    { path: "/pricing", element: <PricingPage /> },
    { path: "/about", element: <About /> },
    { path: "/customEditor", element: <CustomEditor /> },
    { path: "/privacy", element: <Privacy /> },
    { path: "/terms", element: <Terms /> },
    { path: "*", element: <Home /> },
  ];

  return (
    <ThemeProvider theme={context.colorMode === "light" ? lightTheme : darkTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Suspense fallback={<Loader />}>
            <Routes>
              {routes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            </Routes>
          </Suspense>
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
