// src/hooks/useAuthRedirect.js
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import URLSITE from '../constant'

export default function useAuthRedirect() {
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('VeriGeektoken');
      console.log(token)
      try {
        const res = await axios.get(`${URLSITE}/api/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(res.data)
        console.log("AUTH CONTEXT DATA")
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
  }, [navigate])
}
