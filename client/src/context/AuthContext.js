import React, { createContext, useState, useEffect } from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import URLSITE from '../constant';
export const AuthContext = createContext();
// ScrollToTop.tsx
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
};


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [colorMode,setColorMode] = useState("light")
  const [currentModule,setCurrentModule] = useState([])
  const [currentChapterIndex,setCurrentChapterIndex] = useState(0)
  const navigate = useNavigate()
  useEffect(() => {
    // Check if user is stored in localStorage
    
     const isVerifyRoute = location.pathname.startsWith('/verify') || location.pathname.startsWith('/forgot-password');

    // Skip auth check for verify or public routes
    if (isVerifyRoute) return;

    const fetchProfile = async () => {
      const token = localStorage.getItem('VeriGeektoken');
      // const location = useLocation();
      console.log(token)
      try {
        const res = await axios.get(`${URLSITE}/api/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(res.data)
        console.log("AUTH CONTEXT DATA")
        if(res.status==200){
          setUser(res.data)
          setIsAuthenticated(true)
        }else{
          navigate('/login')
        }

      } catch {
       console.log("not happens")
       navigate('/login')
      }
    };

    fetchProfile();
    
    
    
  }, [navigate]);

  

  return (
    <AuthContext.Provider value={{ 
      user, 
      setUser,
      setIsAuthenticated,
      isAuthenticated, 
      loading, 
      error,
      colorMode,
      setColorMode,
      currentChapterIndex,
      setCurrentChapterIndex,
      currentModule,
      setCurrentModule,
      ScrollToTop
    }}>
      
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 