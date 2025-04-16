  import React, { useContext, useState, useEffect } from 'react';
  import AuthContext from '../context/AuthContext';
  import { Link, useNavigate } from 'react-router-dom';
import URLSITE from '../constant';
import axios from "axios"
function UserProfile() {
    const [activeTab, setActiveTab] = useState('about');
    const context = useContext(AuthContext);
    const user = context?.user?.wholeData;
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [levelFilter, setLevelFilter] = useState('all');
    const [page, setPage] = useState(1);
    const [modules,setModule] = useState([])
    const navigate = useNavigate()
    
    useEffect(() => {
        if(!context?.user) return;
      
        const handleFetchUser = async () => {
          try {
            const response = await axios.post(`${URLSITE}/api/general/user-by-email`, { email:context.user.wholeData.email });
            console.log(response.data);
            if(response.status==200){
              setModule(response.data.paidModule)
            }
            
          } catch (err) {
            console.error('Error fetching user:', err);
            
            
          }
        };

          handleFetchUser()
    }, [context.user])
    
    
  
    const filteredModules = modules.filter(module => {
      const matchesSearch = module.moduleTitle.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          module.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (module.chapters && module.chapters.some(chapter => 
                            chapter.moduleTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            chapter.description.toLowerCase().includes(searchQuery.toLowerCase())
                          ));
      const matchesCategory = categoryFilter === 'all' || module.level === categoryFilter;
      const matchesLevel = levelFilter === 'all' || module.level === levelFilter;
      
      return matchesSearch && matchesCategory && matchesLevel;
    });
    const categories = [...new Set(modules.map(module => module.level))];
    const levels = [...new Set(modules.map(module => module.level))];

    const modulesPerPage = 4;
    const pagesCount = Math.ceil(filteredModules.length / modulesPerPage);
    const displayedModules = filteredModules.slice(
      (page - 1) * modulesPerPage,
      page * modulesPerPage
    );

    useEffect(() => {
      if (!context.user) return;
    }, [context.user]);

    return (
      <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          {/* Header with user info and tabs */}
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-6 text-white">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative">
                <div className="h-24 w-24 rounded-full bg-white p-1 flex items-center justify-center overflow-hidden">
                  <img
                    src={user?.profilePicture || "https://via.placeholder.com/96"}
                    alt="User"
                    className="h-full w-full object-cover rounded-full"
                  />
                </div>
                <button className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-white flex items-center justify-center border border-gray-200 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-2xl font-bold">{user?.name || "User Name"}</h1>
                <p className="text-indigo-100">{user?.email || "user@example.com"}</p>
                
              </div>
              
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('about')}
                className={`px-6 py-4 text-sm font-medium border-b-2 ${
                  activeTab === 'about'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                About
              </button>
              <button
                onClick={() => setActiveTab('modules')}
                className={`px-6 py-4 text-sm font-medium border-b-2 ${
                  activeTab === 'modules'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Modules
              </button>
              
            </nav>
          </div>

          {/* Content Area */}
          <div className="p-6">
            {/* About Tab */}
            {activeTab === 'about' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Personal Information</h3>
                  <div className="mt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        id="email"
                        className="mt-1 bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border"
                        defaultValue={user?.email || ''}
                        disabled
                      />
                    </div>
                    <div className="sm:col-span-3">
                      <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                      <input
                        type="text"
                        id="username"
                        className="mt-1 bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border"
                        defaultValue={user?.name || ''}
                        disabled
                      />
                    </div>
                    
                  </div>
                </div>
              </div>
            )}

            {/* Modules Tab */}
            {activeTab === 'modules' && (
              <div>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Learning Modules</h3>
                  <p className="text-gray-600">Browse and access your learning modules collection.</p>
                </div>
                
                {/* Search and Filters */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-6">
                  <div className="col-span-1 sm:col-span-3">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-2 border"
                        placeholder="Search modules by moduleTitle, description, or content"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-span-1">
                    <select
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                      <option value="all">All Categories</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-1">
                    <select
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      value={levelFilter}
                      onChange={(e) => setLevelFilter(e.target.value)}
                    >
                      <option value="all">All Levels</option>
                      {levels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                  
                </div>

                {/* Results info */}
                <div className="flex justify-between items-center mb-4 text-sm text-gray-500">
                  <span>Showing {displayedModules.length} of {filteredModules.length} modules</span>
                </div>

                {/* Modules Grid */}
                {displayedModules.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {displayedModules.map(module => (
                      <div key={module.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-white">
                        <div className="h-40 bg-gradient-to-r from-indigo-500 to-purple-600 relative">
                          {module.moduleImageUri && (
                            <img src={module.moduleImageUri} alt={module.moduleTitle} className="w-full h-full object-cover" />
                          )}
                        </div>
                        <div className="p-4">
                          <h4 className="font-medium text-lg text-gray-900 mb-1">{module.moduleTitle}</h4>
                          <p className="text-sm text-gray-500 mb-3">{module.moduleDesc}</p>
                          
                          
                          
                          <div className="mt-4 flex justify-between">
                            <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium" onClick={()=>navigate(`/modules/${module.moduleId}`)}>
                              View Details
                            </button>
                          <Link to="/modules">
                            <button className="text-gray-600 hover:text-gray-800 text-sm">
                              Continue Learning
                            </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No modules found</h3>
                    <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filters to find what you're looking for.</p>
                  </div>
                )}

                {/* Pagination */}
                {pagesCount > 1 && (
                  <div className="flex justify-center mt-6">
                    <nav className="relative z-0 inline-flex shadow-sm -space-x-px" aria-label="Pagination">
                      <button
                        onClick={() => setPage(page > 1 ? page - 1 : 1)}
                        disabled={page === 1}
                        className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                          page === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        <span className="sr-only">Previous</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                      
                      {Array.from({ length: pagesCount }, (_, i) => i + 1).map(pageNum => (
                        <button
                          key={pageNum}
                          onClick={() => setPage(pageNum)}
                          className={`relative inline-flex items-center px-4 py-2 border ${
                            page === pageNum
                              ? 'bg-indigo-50 border-indigo-500 text-indigo-600 z-10'
                              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                          } text-sm font-medium`}
                        >
                          {pageNum}
                        </button>
                      ))}
                      
                      <button
                        onClick={() => setPage(page < pagesCount ? page + 1 : pagesCount)}
                        disabled={page === pagesCount}
                        className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                          page === pagesCount ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        <span className="sr-only">Next</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </nav>
                  </div>
                )}
              </div>
            )}


            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Account Settings</h3>
                  <div className="mt-4 space-y-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Email Notifications</h4>
                      <div className="mt-2 space-y-2">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="comments"
                              name="comments"
                              type="checkbox"
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                              defaultChecked
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="comments" className="font-medium text-gray-700">Module updates</label>
                            <p className="text-gray-500">Get notified when your modules are updated or new features are added.</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="newsletter"
                              name="newsletter"
                              type="checkbox"
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="newsletter" className="font-medium text-gray-700">Newsletter</label>
                            <p className="text-gray-500">Receive our weekly newsletter with the latest updates.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Password</h4>
                      <button className="mt-2 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Change Password
                      </button>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 text-red-600">Danger Zone</h4>
                      <button className="mt-2 inline-flex items-center px-3 py-2 border border-red-300 shadow-sm text-sm leading-4 font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer with mobile logout button */}
          <div className="p-4 border-t border-gray-200 sm:hidden">
            <button className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 py-2 px-4 rounded-lg text-gray-700 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  export default UserProfile;