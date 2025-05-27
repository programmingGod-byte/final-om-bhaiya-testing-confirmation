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
const BlogWriter = lazy(() => import('./pages/BlogWriter'));
const UserProfile = lazy(() => import('./pages/ProfilePage'));
const PricingPage = lazy(() => import('./pages/PricingPage'));
const BuyModule = lazy(() => import('./components/BuyModule'));
const About = lazy(() => import('./pages/About'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const VerifyToken = lazy(() => import('./pages/VerifyToken'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));

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
const Loader = () => <div style={{ padding: "2rem", textAlign: "center" }}>🔄 Loading...</div>;

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
    { path: "/modules", element: <Modules /> },
    { path: "/workspace", element: <WorkSpace /> },
    { path: "/workspaceEditor/:projectId", element: <WorkSpaceCodeEditor /> },
    { path: "/modules/:id", element: <ModuleDetail /> },
    { path: "/buy-module/:id", element: <BuyModule /> },
    { path: "/modules/:moduleId/chapters/:chapterId", element: <ChapterView /> },
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
