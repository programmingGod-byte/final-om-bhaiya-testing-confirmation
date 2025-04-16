import React, { useContext,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import AuthContext from '../context/AuthContext';
import URLSITE from '../constant';
import toast, { Toaster } from "react-hot-toast";
function BuyModule() {
const {id} = useParams()
const context = useContext(AuthContext)

console.log(id)
console.log(context)

useEffect(() => {
  
    if (!context.user) return;
    if(!id)return;

    
  
}, [])

return (
    <div>BuyModule</div>
  )
}

export default BuyModule