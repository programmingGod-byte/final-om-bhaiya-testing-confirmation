import { useState, useRef, useEffect, useContext } from "react";
import {
  PlusCircle,
  FolderOpen,
  Clock,
  Star,
  MoreVertical,
  X,
  Code,
  BarChart,
  Layout,
  Database,
  Globe,
  Shield,
} from "lucide-react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import URL from "../constant";
import fetchProfile from "../context/authAccessContext";
const icons = [
  <BarChart key="bar-chart" className="h-5 w-5" />,
  <Layout key="layout" className="h-5 w-5" />,
  <Code key="code" className="h-5 w-5" />,
  <Globe key="globe" className="h-5 w-5" />,
  <Database key="database" className="h-5 w-5" />,
  <Shield key="shield" className="h-5 w-5" />,
];

const colors = [
  {
    gradient: "from-blue-500 to-cyan-400",
    bg: "bg-gradient-to-r from-blue-500/10 to-cyan-400/10",
    border: "border-blue-500/20",
  },
  {
    gradient: "from-amber-500 to-orange-400",
    bg: "bg-gradient-to-r from-amber-500/10 to-orange-400/10",
    border: "border-amber-500/20",
  },
  {
    gradient: "from-emerald-500 to-green-400",
    bg: "bg-gradient-to-r from-emerald-500/10 to-green-400/10",
    border: "border-emerald-500/20",
  },
  {
    gradient: "from-violet-500 to-purple-400",
    bg: "bg-gradient-to-r from-violet-500/10 to-purple-400/10",
    border: "border-violet-500/20",
  },
  {
    gradient: "from-rose-500 to-pink-400",
    bg: "bg-gradient-to-r from-rose-500/10 to-pink-400/10",
    border: "border-rose-500/20",
  },
  {
    gradient: "from-indigo-500 to-blue-400",
    bg: "bg-gradient-to-r from-indigo-500/10 to-blue-400/10",
    border: "border-indigo-500/20",
  },
];

export default function WorkSpace() {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  if (context.user == null) {
    navigate("/login");
  }

  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");  // State for search term
  

  useEffect(() => {
    const fetchProjects = async () => {
      if (!context.user || !context.user.email) return;
      try {
        const res = await axios.get(`${URL}/api/workspace/workspace-list`, {
          params: { email: context.user.email },
        });
        let finalProjectList = [];
        Array.from(res.data.projects).forEach((element, index) => {
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

  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const dropdownRef = useRef(null);

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

      if (res.status == 200) {
        setProjects([project, ...projects]);
      }
    } catch {
      alert("Some error occurred");
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
    <div className="min-h-screen bg-white text-gray-900">
      <main className="relative container mx-auto p-6 md:p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">My Projects</h2>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search projects by title..."
            className="px-4 py-2 rounded-md border border-gray-300"
          />
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl font-semibold flex items-center gap-2 text-white hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg transform hover:scale-105"
          >
            <PlusCircle className="h-5 w-5" />
            New Project
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className={`group rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border ${project.borderColor}`}
            >
              <div className="relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-15`}></div>
                <div className="h-48 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center opacity-10">
                    <div className="text-[120px] transform -rotate-12">{project.icon}</div>
                  </div>

                  <div className={`z-10 px-6 py-3 rounded-lg bg-gradient-to-r ${project.color} shadow-lg`}>
                    <h3 className="text-xl font-bold text-white">{project.title}</h3>
                  </div>

                  <button
                    onClick={() => toggleStar(project.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors duration-200"
                  >
                    <Star
                      className={`h-5 w-5 ${
                        project.starred ? "fill-yellow-400 text-yellow-400" : "text-white"
                      } transition-colors duration-200`}
                    />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <p className="text-sm text-gray-600 mb-4">{project.description}</p>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <button
                    onClick={() => navigate(`/workspaceEditor/${project.id}`)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium hover:from-blue-700 hover:to-indigo-700 transition-colors duration-300"
                  >
                    <FolderOpen className="h-4 w-4" />
                    Open
                  </button>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100">
                    <Clock className="h-4 w-4" />
                    {project.lastEdited}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md border border-gray-300 shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-gray-300">
              <h3 className="text-xl font-semibold text-gray-900">Create New Project</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-5">
                <div>
                  <label className="block text-sm text-gray-700" htmlFor="title">
                    Project Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={newProject.title}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-100 text-gray-900 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-600"
                    placeholder="Enter title"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700" htmlFor="description">
                    Project Description
                  </label>
                  <textarea
                    name="description"
                    value={newProject.description}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-100 text-gray-900 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-600"
                    rows="4"
                    placeholder="Enter description"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl font-semibold hover:bg-gradient-to-r hover:from-blue-700 hover:to-indigo-700"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
