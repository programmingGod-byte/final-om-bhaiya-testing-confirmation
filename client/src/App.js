import React, { useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './styles/index.css';
import './styles/ck-editorstyles.css'
// Import pages
import Home from './pages/Home';
import Modules from './pages/Modules';
import ModuleDetail from './pages/ModuleDetail';
import ChapterView from './pages/ChapterView';
import CodeEditor from './pages/CodeEditor';
import Forum from './pages/Forum';
import Login from './pages/Login';
import Register from './pages/Register';
import Resources from './pages/Resources';
import Careers from './pages/Careers';
import Blog from './pages/Blog';
import SingleBlog from './pages/SingleBlog';
import CommunityForum from './components/CommunityForum';
import Research from './pages/Research';
import Contact from './pages/Contact';
import ResearchPaperWriter from "./pages/ResearchPaperWriter"
// Import components
import Header from './components/Header';
import Footer from './components/Footer';
import FileUploader from './components/FileUpload';
// index.js
import { darkTheme, lightTheme } from './styles/theme';
import WorkSpaceCodeEditor from './pages/WorkSpaceCodeEditor';
import WorkSpace from './pages/workSpace';
import CKEditorWithJson from './pages/Ckeditor';
import ModuleChapterEditor from './pages/Ckeditor2';
import BlogWriter from './pages/BlogWriter';
import UserProfile from './pages/ProfilePage';
import PricingPage from './pages/PricingPage';
import AuthContext from './context/AuthContext';
import BuyModule from './components/BuyModule';
import About from "./pages/About"
import Privacy from "./pages/Privacy"
import Terms from "./pages/Terms"
// Switch manually for now
const currentTheme = darkTheme;




// Create a theme with our purple color
const theme = createTheme({
  palette: {
    primary: {
      main: '#6a0dad',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

function App() {
  const context = useContext(AuthContext)
  useEffect(() => {
    // Set document title
    document.title = 'VeriGeek - Empower Your Logic, Code Your Circuit!';
  }, []);

  const routes = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path:"/ckeditor",
      element:<CKEditorWithJson/>
    },
    {
      path:"/ckeditor2",
      element:<ModuleChapterEditor/>
    },
    {
      path: "/modules",
      element: <Modules />,
    },
    {
      path:"/workspace",
      element:<WorkSpace/>
    },
    {
      path:"/workspaceEditor/:projectId",
      element:<WorkSpaceCodeEditor/>
    },
    {
      path: "/modules/:id",
      element: <ModuleDetail />,
    },
    {
      path: "/buy-module/:id",
      element: <BuyModule />,
    },
    {
      path: "/modules/:moduleId/chapters/:chapterId",
      element: <ChapterView />,
    },
    {
      path: "/editor",
      element: <CodeEditor />,
    },
    {
      path: "/modules/:moduleId/exercises/:exerciseId",
      element: <CodeEditor />,
    },
    {
      path: "/forum",
      element: <CommunityForum />,
    },
    {
      path: "/resources",
      element: <Resources />,
    },
    {
      path: "/careers",
      element: <Careers />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/blog",
      element: <Blog />,
    },
    {
      path: "/blog/:id",
      element: <SingleBlog />,
    },
    {
      path: "/research",
      element: <Research />,
    },
    {
      path: "/contact",
      element: <Contact />,
    },
    {
      path:"/allResearchTopics",
      element:<ResearchPaperWriter/>
    },
    {
      path:"/advanceBlogWriter",
      element:<BlogWriter/>
    },
    {
      path:"/qfileuploaderchecker",
      element:<FileUploader/>
    },
    {
      path:"/profile",
      element:<UserProfile/>
    },
    {
      path:"/pricing",
      element:<PricingPage/>
    },
    {
      path:"/about",
      element:<About/>
    },
    {
      path:"/privacy",
      element:<Privacy/>
    },
    {
      path:"/terms",
      element:<Terms/>
    },
    {
      path: "*",
      element: <Home />,
    },
  ];

  return (
    <ThemeProvider theme={context.colorMode == "light" ? lightTheme :darkTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Routes>
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App; 