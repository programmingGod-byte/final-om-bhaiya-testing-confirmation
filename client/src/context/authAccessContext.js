
const fetchProfile = async (navigate,axios) => {
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
}


export default  fetchProfile;