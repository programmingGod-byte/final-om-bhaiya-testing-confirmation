import { Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SimplePurchaseModule() {
    const navigate = useNavigate()
  return (
    <div className="min-h-screen w-full bg-purple-50 flex flex-col" style={{zIndex:'100'}}>
      {/* Header */}
      <header className="bg-purple-900 py-4 px-6 shadow-md">
        <div className="text-xl font-bold text-white">Premium Content</div>
      </header>
      
      {/* Blurred background content */}
      <div className="flex-1 overflow-y-auto blur-sm">
        <div className="p-6">
          <div className="h-64 bg-purple-200 rounded-lg mb-6"></div>
          <div className="h-96 bg-purple-100 rounded-lg mb-6"></div>
          <div className="h-64 bg-purple-200 rounded-lg mb-6"></div>
        </div>
      </div>
      
      {/* Simple purchase overlay */}
      <div className="fixed inset-0 flex items-center justify-center bg-purple-900/40 backdrop-blur-sm">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
          <div className="flex justify-center mb-4">
            <div className="bg-purple-100 rounded-full p-3">
              <Lock className="h-8 w-8 text-purple-600" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-center text-purple-900 mb-2">
             Access Required
          </h2>
          
          <p className="text-center text-purple-700 mb-6">
            Purchase any module to unlock the workspace
          </p>
          
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-purple-900">per Module</span>
              <span className="font-bold text-purple-900">Rs 99</span>
            </div>
            <p className="text-sm text-purple-600">One-time purchase, lifetime access</p>
          </div>
          
          <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition" onClick={()=>{navigate("/modules")}}>
            Purchase Now
          </button>
        </div>
      </div>
    </div>
  );
}