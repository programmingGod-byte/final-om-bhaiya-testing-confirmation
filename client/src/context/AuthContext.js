import React, { createContext, useState, useEffect } from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate()
  useEffect(() => {
    // Check if user is stored in localStorage
    
    
    const fetchProfile = async () => {
      const token = localStorage.getItem('VeriGeektoken');
      console.log(token)
      try {
        const res = await axios.get('http://localhost:5000/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(res.data)
        if(res.status==200){
          setUser(res.data)
        }else{
          navigate('/login')
        }

      } catch {
       console.log("not happens")
       navigate('/login')
      }
    };

    fetchProfile();
    
    
    
  }, []);

  

  return (
    <AuthContext.Provider value={{ 
      user, 
      setUser,
      setIsAuthenticated,
      isAuthenticated, 
      loading, 
      error,
      
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 