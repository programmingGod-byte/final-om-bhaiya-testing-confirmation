import { useEffect, useState,useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import URLSITE from '../constant';
import {AuthContext} from "../context/AuthContext"

const VerifyPage = () => {
  const { token } = useParams();
   const  {user,setUser} = useContext(AuthContext);
   
  const navigate = useNavigate();
  const [message, setMessage] = useState('Verifying...');
  const [status, setStatus] = useState('loading'); // loading, success, error

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await axios.post(`${URLSITE}/api/auth/verify-email`, {
          token,
        });

        if (res.status === 200) {
            console.log(res)
          setMessage('✅ Your email has been verified!');
          setStatus('success');
          localStorage.setItem('VeriGeektoken', res.data.token);
        setUser({
          name:res.data.name,
          email:res.data.email
        })
        navigate('/')
        //   setTimeout(() => navigate('/login'), 2000); // Redirect after 2 seconds
        }
      } catch (err) {
        console.error(err);
        setMessage('❌ Invalid or expired token.');
        setStatus('error');
      }
    };

    if (token) {
      verifyEmail();
    } else {
      setMessage('❌ No token provided.');
      setStatus('error');
    }
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-xl p-6 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4">Email Verification</h1>
        <p className={`text-lg ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
        {status === 'success' && <p className="text-sm mt-2 text-gray-500">Redirecting to login...</p>}
      </div>
    </div>
  );
};

export default VerifyPage;
