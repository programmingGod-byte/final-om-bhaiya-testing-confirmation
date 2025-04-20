import { useState, useRef, useEffect, useContext } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Fade,
  Zoom,
} from '@mui/material';
import ResponsiveDialog from "../utility/Dialog"
import {
  ElectricBolt as ElectricBoltIcon,
  Code,
} from '@mui/icons-material';
import axios from 'axios';
import '../styles/Forum.css';

import {
  PlusCircle,
  FolderOpen,
  Clock,
  Star,
  X,
  Search,
  BarChart,
  Layout,
  Database,
  Globe,
  Shield,
  
} from "lucide-react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Cpu } from 'lucide-react';
import URL from "../constant";
import SimplePurchaseModule from "../components/LockComponent"
const icons = [
  <BarChart key="bar-chart" className="h-5 w-5" />,
  <Layout key="layout" className="h-5 w-5" />,
  <Code key="code" className="h-5 w-5" />,
  <Globe key="globe" className="h-5 w-5" />,
  <Database key="database" className="h-5 w-5" />,
  <Shield key="shield" className="h-5 w-5" />,
  <Cpu key="memory-chip" className="h-5 w-5" />,
];

// Theme-aligned color palette with purple/indigo focus
const colors = [
  {
    gradient: "from-[#661a98] to-purple-700",
    bg: "bg-gradient-to-r from-[#661a98]/10 to-purple-700/10",
    border: "border-[#661a98]/20",
  },
  {
    gradient: "from-[#661a98] to-violet-600",
    bg: "bg-gradient-to-r from-[#661a98]/10 to-violet-600/10",
    border: "border-[#661a98]/20",
  },
  {
    gradient: "from-purple-800 to-[#661a98]",
    bg: "bg-gradient-to-r from-purple-800/10 to-[#661a98]/10",
    border: "border-purple-800/20",
  },
  {
    gradient: "from-[#661a98] to-violet-700",
    bg: "bg-gradient-to-r from-[#661a98]/10 to-violet-700/10",
    border: "border-violet-700/20",
  },
  {
    gradient: "from-[#661a98] to-[#7e2bbd]",
    bg: "bg-gradient-to-r from-[#661a98]/10 to-[#7e2bbd]/10",
    border: "border-[#7e2bbd]/20",
  },
  {
    gradient: "from-[#4c1273] to-[#661a98]",
    bg: "bg-gradient-to-r from-[#4c1273]/10 to-[#661a98]/10",
    border: "border-[#4c1273]/20",
  },
];

export default function WorkSpace() {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  if (context.user == null) {
    navigate("/login");
  }
  context.ScrollToTop();

  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog,setOpenDialog] = useState(false)
  const [errorText,setErrorText] = useState('')
  const [isUserPaid,setIsUserPaid] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
  });
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(()=>{
    if(!context.user) return;
    if(context.user.wholeData.paidModule.length >0){
      console.log("USER IS PAID")
      console.log(context.user.wholeData.paidModule)
      setIsUserPaid(true)
    }
  },[context?.user])


  useEffect(() => {
    const fetchProjects = async () => {
      if (!context.user || !context.user.email) return;
      try {
        const res = await axios.get(`${URL}/api/workspace/workspace-list`, {
          params: { email: context.user.email },
        });
        let finalProjectList = [];
        Array.from(res.data.projects).forEach((element) => {
          const randomColor = colors[Math.floor(Math.random() * colors.length)];
          const randomIcon = icons[Math.floor(Math.random() * icons.length)];

          finalProjectList.push({
            id: element._id,
            title: element.title,
            description: element.description,
            thumbnail: `/placeholder.svg?height=150&width=250&text=${element.title.replace(/\s+/g, "+")}`,
            icon: randomIcon,
            color: randomColor.gradient,
            bgColor: randomColor.bg,
            borderColor: randomColor.border,
            lastEdited: "Just now",
            starred: false,
          });
        });
        setProjects(finalProjectList);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      }
    };

    fetchProjects();
  }, [context.user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject({
      ...newProject,
      [name]: value,
    });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomIcon = icons[Math.floor(Math.random() * icons.length)];

    try {
      const res = await axios.post(`${URL}/api/workspace/create-workspace`, {
        email: context.user.email,
        title: newProject.title,
        description: newProject.description,
      });

      if(res.data.success==true){
        const project = {
          id: res.data.project._id,
          title: newProject.title,
          description: newProject.description,
          thumbnail: `/placeholder.svg?height=150&width=250&text=${newProject.title.replace(/\s+/g, "+")}`,
          icon: randomIcon,
          color: randomColor.gradient,
          bgColor: randomColor.bg,
          borderColor: randomColor.border,
          lastEdited: "Just now",
          starred: false,
        };
  
        if (res.status === 200) {
          setProjects([project, ...projects]);
        }
      }else{
        console.log(res)
        setOpenDialog(true)
        setErrorText(res.data.message)
      }
    } catch (error) {
      // setOpenDialog(true)
      // setErrorText(error.data.message)
    }

    setNewProject({ title: "", description: "" });
    setIsModalOpen(false);
  };

  const toggleStar = (id) => {
    setProjects(
      projects.map((project) =>
        project.id === id ? { ...project, starred: !project.starred } : project
      )
    );
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
    {
      isUserPaid?(
        <>
        
        <ResponsiveDialog open={openDialog} errorText={errorText} setOpen={setOpenDialog}/>
      <Box className="forum-header bg-gradient-to-br from-indigo-900 to-purple-900">
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Container maxWidth="lg">
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={7}>
                <Fade in={true} timeout={1000}>
                  <Box sx={{ position: 'relative', zIndex: 2 }}>
                    {/* Decorative elements */}
                    <Box sx={{ 
                      position: 'absolute', 
                      top: -15, 
                      right: { xs: -15, md: 20 }, 
                      opacity: 0.15, 
                      transform: 'rotate(15deg)',
                      display: { xs: 'none', md: 'block' }
                    }}>
                      <Cpu className="w-32 h-32 text-white" />
                    </Box>
                    
                    <Box sx={{ 
                      position: 'absolute', 
                      bottom: -30, 
                      left: { xs: -15, md: 50 }, 
                      opacity: 0.15,
                      transform: 'rotate(-10deg)',
                      display: { xs: 'none', md: 'block' }
                    }}>
                      <Code sx={{ fontSize: 100, color: 'white' }} />
                    </Box>
                    
                    <Typography 
                      variant="overline" 
                      sx={{ 
                        color: 'rgba(255,255,255,0.9)', 
                        letterSpacing: 3, 
                        fontWeight: 500,
                        fontSize: '0.95rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        mb: 1
                      }}
                    >
                      <ElectricBoltIcon fontSize="small" /> VERILOG COMMUNITY
                    </Typography>
                    <Typography 
                      variant="h2" 
                      component="h1" 
                      sx={{ 
                        fontWeight: 800, 
                        letterSpacing: -0.5,
                        fontSize: { xs: '2.5rem', md: '3.5rem' },
                        lineHeight: 1.1,
                        background: 'linear-gradient(90deg, #ffffff 0%, #e1bee7 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        mb: 3
                      }}
                    >
                      Verilog WorkSpace
                    </Typography>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        maxWidth: '700px',
                        fontWeight: 400,
                        fontSize: { xs: '1rem', md: '1.25rem' },
                        lineHeight: 1.5,
                        color: 'rgba(255,255,255,0.85)',
                        mb: 3
                      }}
                    >
                     Create dedicated workspaces to build projects, experiment, and apply concepts hands-on. This boosts practical knowledge, problem-solving skills, and real-world experience in coding, design, AI, hardware, and more.
                    </Typography>
                  </Box>
                </Fade>
              </Grid>
              
              <Grid item xs={12} md={5}>
                <Zoom in={true} style={{ transitionDelay: '300ms' }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <img
                      src="/forum-illustration.svg"
                      alt="Verilog Forum"
                      style={{ maxWidth: '100%', height: 'auto' }}
                      onError={(e) => { e.target.style.display = 'none' }}
                    />
                  </Box>
                </Zoom>
              </Grid>
            </Grid>
            
            <Fade in={true} timeout={1000} style={{ transitionDelay: '500ms' }}>
              <Box sx={{ 
                display: 'flex',
                flexWrap: 'wrap',
                gap: { xs: 4, md: 8 },
                mt: 4,
                justifyContent: { xs: 'center', md: 'flex-start' },
                color: 'rgba(255,255,255,0.9)'
              }}>
              </Box>
            </Fade>
          </Container>
        </Box>
        
        {/* Wave shape divider */}
        <Box className="wave-shape">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none"
          >
            <path 
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              fill="#ffffff"
            ></path>
          </svg>
        </Box>
      </Box>

      <div className="min-h-screen bg-white text-gray-900">
        <main className="relative container mx-auto p-6 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <h2 className="text-2xl font-semibold text-gray-900">My Projects</h2>
            
            <div className="flex w-full md:w-auto gap-3">
              <div className="relative flex-grow md:flex-grow-0">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search projects..."
                  className="pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 w-full md:w-64 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              
             {
              isUserPaid? <button
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl font-medium flex items-center gap-2 text-white hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg shadow-indigo-200"
            >
              <PlusCircle className="h-5 w-5" />
              New Project
            </button>:null
             }
             
            </div>
          </div>

          {filteredProjects.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 bg-gray-50 rounded-xl border border-gray-200">
              <div className="text-6xl mb-4 text-gray-300">📁</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No projects found</h3>
              <p className="text-gray-500 text-center max-w-md mb-6">
                {searchTerm 
                  ? "No projects match your search. Try different keywords or clear the search."
                  : "You haven't created any projects yet. Get started by creating your first project!"}
              </p>
              {searchTerm ? (
                <button
                  onClick={() => setSearchTerm("")}
                  className="px-4 py-2 bg-gray-200 rounded-lg text-gray-700 hover:bg-gray-300 transition-colors"
                >
                  Clear Search
                </button>
              ) : (
                isUserPaid?<button
                  onClick={() => setIsModalOpen(true)}
                  className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl font-medium flex items-center gap-2 text-white hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg"
                >
                  <PlusCircle className="h-5 w-5" />
                  Create Your First Project
                </button>:null
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className={`group rounded-xl overflow-hidden transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl border ${project.borderColor} h-full flex flex-col`}
                >
                  <div className="relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-15`}></div>
                    <div className="h-40 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center opacity-10">
                        <div className="text-[100px] transform -rotate-12">{project.icon}</div>
                      </div>

                      <div className={`z-10 px-6 py-3 rounded-lg bg-gradient-to-r ${project.color} shadow-lg`}>
                        <h3 className="text-lg font-bold text-white truncate max-w-[200px]">{project.title}</h3>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleStar(project.id);
                        }}
                        className="absolute top-3 right-3 p-2 rounded-full bg-black/20 hover:bg-black/40 transition-colors duration-200"
                      >
                        <Star
                          className={`h-5 w-5 ${
                            project.starred ? "fill-yellow-400 text-yellow-400" : "text-white"
                          } transition-colors duration-200`}
                        />
                      </button>
                    </div>
                  </div>

                  <div className="p-5 flex-grow flex flex-col">
                    <p className="text-sm text-gray-600 mb-4 flex-grow line-clamp-3">{project.description}</p>
                    <div className="flex justify-between items-center gap-2 mt-auto">
                      <button
                        onClick={() => navigate(`/workspaceEditor/${project.id}`)}
                        className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 flex-grow"
                      >
                        <FolderOpen className="h-4 w-4" />
                        Open
                      </button>
                      <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gray-100 text-xs text-gray-500 whitespace-nowrap">
                        <Clock className="h-3.5 w-3.5" />
                        {project.lastEdited}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

        {/* Create Project Modal with enhanced design */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-md border border-gray-200 shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-white">Create New Project</h3>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors duration-200 text-white"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="p-6">
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="title">
                      Project Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={newProject.title}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-gray-50 text-gray-900 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                      placeholder="Enter project title"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="description">
                      Project Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={newProject.description}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-gray-50 text-gray-900 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                      rows="4"
                      placeholder="Describe your project"
                    />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 p-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-100 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 p-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-medium hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg shadow-indigo-200"
                    >
                      Create Project
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
 
        
        </>
      ):(
        <SimplePurchaseModule/>
      )
    }
       
    </>
  );
}