import React, { useState, useEffect, useContext } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import URLSITE from "../constant";
import hljs from 'highlight.js';
import 'highlight.js/styles/googlecode.css';
import RichTextEditor from "./CustomEditor";
// Import Verilog highlighting - make sure you have this installed
import 'highlight.js/lib/languages/verilog';
import AuthContext from '../context/AuthContext';

// Register Verilog language with highlight.js
hljs.registerLanguage('verilog', require('highlight.js/lib/languages/verilog'));

const CourseContentTab = () => {
  const navigate = useNavigate()
  const context = useContext(AuthContext);

  useEffect(()=>{
    if(!context.user) return;
    if(context.user.email!="verigeektech@gmail.com"){
      navigate('/')
    }
  },[context.user])

  const [modules, setModules] = useState([]);
  const navigator = useNavigate();
  const [selectedModuleId, setSelectedModuleId] = useState('');
  const [editorContent,setEditorContent] = useState('')
  const [chapter, setChapter] = useState({
    id: uuidv4(),
    title: '',
    description: '',
    estimatedTime: '',
    completed: false,
    sections: [
      {
        id: uuidv4(),
        title: '',
        content: '',
        contentBlocks: [] // Will store additional CKEditor content blocks and code blocks
      },
    ],
    codeExamples: [
      {
        id: uuidv4(),
        title: '',
        description: '',
        code: '',
        explanation: '',
      },
    ],
  });

  useEffect(() => {
    axios
        .post(`${URLSITE}/api/modules/get-modules`)
        .then((res) => {
          if (res.data.success) {
            setModules(res.data.modules);
          }
        })
        .catch((err) => {
          console.error('Failed to fetch modules:', err);
        });
  }, []);

  // For syntax highlighting in preview
  useEffect(() => {
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block);
    });
  });

  const handleSectionChange = (index, field, value) => {
    const updatedSections = [...chapter.sections];
    updatedSections[index][field] = value;
    setChapter({ ...chapter, sections: updatedSections });
  };

  const handleEditorChange = (index, event, editor) => {
    const data = editor.getData();
    handleSectionChange(index, 'content', data);
  };

  const addSection = () => {
    setChapter({
      ...chapter,
      sections: [
        ...chapter.sections,
        {
          id: uuidv4(),
          title: '',
          content: '',
          contentBlocks: []
        },
      ],
    });
  };

  const deleteSection = (index) => {
    const updatedSections = chapter.sections.filter((_, i) => i !== index);
    setChapter({ ...chapter, sections: updatedSections });
  };

  // Add more content (CKEditor) block to a section
  const addMoreContent = (sectionIndex) => {
    const updatedSections = [...chapter.sections];
    if (!updatedSections[sectionIndex].contentBlocks) {
      updatedSections[sectionIndex].contentBlocks = [];
    }

    updatedSections[sectionIndex].contentBlocks.push({
      id: uuidv4(),
      type: 'content',
      content: ''
    });

    setChapter({ ...chapter, sections: updatedSections });
  };

  // Add code block to a section
  const addCodeBlock = (sectionIndex) => {
    const updatedSections = [...chapter.sections];
    if (!updatedSections[sectionIndex].contentBlocks) {
      updatedSections[sectionIndex].contentBlocks = [];
    }

    updatedSections[sectionIndex].contentBlocks.push({
      id: uuidv4(),
      type: 'code',
      language: 'javascript', // Default language
      code: ''
    });

    setChapter({ ...chapter, sections: updatedSections });
  };

  // Handle changes in CKEditor content blocks
  const handleContentBlockEditorChange = (sectionIndex, blockIndex, event, editor) => {
    const data = editor.getData();
    const updatedSections = [...chapter.sections];
    updatedSections[sectionIndex].contentBlocks[blockIndex].content = data;
    setChapter({ ...chapter, sections: updatedSections });
  };

  // Handle changes in code blocks
  const handleCodeBlockChange = (sectionIndex, blockIndex, value) => {
    const updatedSections = [...chapter.sections];
    updatedSections[sectionIndex].contentBlocks[blockIndex].code = value;
    setChapter({ ...chapter, sections: updatedSections });
  };

  // Delete a content block (either CKEditor or code)
  const deleteContentBlock = (sectionIndex, blockIndex) => {
    const updatedSections = [...chapter.sections];
    updatedSections[sectionIndex].contentBlocks.splice(blockIndex, 1);
    setChapter({ ...chapter, sections: updatedSections });
  };

  // Handle changing the language of a code block
  const handleLanguageChange = (sectionIndex, blockIndex, language) => {
    const updatedSections = [...chapter.sections];
    updatedSections[sectionIndex].contentBlocks[blockIndex].language = language;
    setChapter({ ...chapter, sections: updatedSections });
  };

  const handleCodeExampleChange = (codeIndex, field, value) => {
    const updatedExamples = [...chapter.codeExamples];
    updatedExamples[codeIndex][field] = value;
    setChapter({ ...chapter, codeExamples: updatedExamples });
  };

  const addCodeExample = () => {
    const updatedExamples = [
      ...chapter.codeExamples,
      {
        id: uuidv4(),
        title: '',
        description: '',
        code: '',
        explanation: '',
      },
    ];
    setChapter({ ...chapter, codeExamples: updatedExamples });
  };

  const deleteCodeExample = (codeIndex) => {
    const updatedExamples = chapter.codeExamples.filter((_, i) => i !== codeIndex);
    setChapter({ ...chapter, codeExamples: updatedExamples });
  };

  const handleUpload = async () => {
    if (!selectedModuleId) return alert('Please select a module first!');

    // Create a deep copy of the chapter to avoid modifying the state directly
    const chapterToUpload = JSON.parse(JSON.stringify(chapter));

    // Process each section to combine main content with additional content blocks
    chapterToUpload.sections = chapterToUpload.sections.map(section => {
      let combinedContent = section.content || '';

      // Process content blocks and code blocks
      if (section.contentBlocks && section.contentBlocks.length > 0) {
        section.contentBlocks.forEach(block => {
          if (block.type === 'content') {
            // Append content blocks to the main content
            combinedContent += block.content || '';
          } else if (block.type === 'code') {
            // Format code blocks as HTML and append to content
            combinedContent += `
              <pre><code class="language-${block.language}">
  ${block.code}
              </code></pre>
            `;
          }
        });
      }

      // Return a simplified section object that matches the MongoDB schema
      return {
        id: section.id,
        title: section.title,
        content: combinedContent
      };
    });

    const payload = {
      moduleId: selectedModuleId,
      id: chapterToUpload.id,
      title: chapterToUpload.title,
      description: chapterToUpload.description,
      estimatedTime: chapterToUpload.estimatedTime,
      completed: chapterToUpload.completed,
      editorContent:editorContent,
      isNewEditorUsed:true
    };
    console.log(payload)

    try {
      console.log('Sending payload:', payload);
      const response = await axios.post(`${URLSITE}/api/modules/upload-chapter`, payload, {
        headers: { 'Content-Type': 'application/json' },
      });
      alert("Chapter uploaded successfully");
      navigator('/ckeditor');
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.error?.message) {
        alert(error.response.data.error.message);
      } else {
        alert(error);
      }
    }
  };

  // Custom CKEditor plugin for better code block handling
  const editorConfig = {
    toolbar: [
      'heading', '|',
      'fontFamily', 'fontSize', '|',
      'bold', 'italic', 'underline', 'strikethrough', '|',
      'link', 'bulletedList', 'numberedList', '|',
      'blockQuote', 'insertTable', 'codeBlock', '|',
      'undo', 'redo'
    ],
    codeBlock: {
      languages: [
        { language: 'plaintext', label: 'Plain text' },
        { language: 'javascript', label: 'JavaScript' },
        { language: 'python', label: 'Python' },
        { language: 'verilog', label: 'Verilog' }, // Add Verilog as an option
        { language: 'html', label: 'HTML' },
        { language: 'css', label: 'CSS' },
      ],
    },
    image: {
      insert: { integrations: ['insertImageViaUrl'] },
      toolbar: ['imageTextAlternative', 'imageStyle:full', 'imageStyle:side'],
    },
    removePlugins: ['ImageUpload', 'EasyImage'],
  };

  // Generate combined preview HTML with syntax highlighting for code
  const generatePreviewHtml = (section) => {
    let previewHtml = section.content || '';

    if (section.contentBlocks && section.contentBlocks.length > 0) {
      section.contentBlocks.forEach(block => {
        if (block.type === 'content') {
          previewHtml += block.content || '';
        } else if (block.type === 'code') {
          previewHtml += `
            <pre><code class="language-${block.language}">
${block.code}
            </code></pre>
          `;
        }
      });
    }

    return previewHtml;
  };


  return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-6">
        <div className="max-w-full mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Course Content Manager</h1>
            <p className="text-gray-600 text-lg">Create and manage your course chapters with ease</p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-4 rounded-full"></div>
          </div>

          {/* Module Selection */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
              <h2 className="text-xl font-semibold text-gray-800">Select Module</h2>
            </div>
            <select
                value={selectedModuleId}
                onChange={(e) => setSelectedModuleId(e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
            >
              <option value="">-- Choose a Module --</option>
              {modules.map((mod) => (
                  <option key={mod.id} value={mod.id}>
                    {mod.title} – {mod.description.split(' ').slice(0, 20).join(' ')}
                    {mod.description.split(' ').length > 20 ? '...' : ''}
                  </option>
              ))}
            </select>
          </div>

          {selectedModuleId && (
              <div className="grid grid-cols-5 gap-6">
                {/* Left Column - Form Fields - 20% */}
                <div className="col-span-1 space-y-6">
                  {/* Chapter Details Card */}
                  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <div className="flex items-center mb-6">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                      <h2 className="text-xl font-semibold text-gray-800">Chapter Details</h2>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Chapter Title
                        </label>
                        <input
                            type="text"
                            placeholder="Enter chapter title..."
                            value={chapter.title}
                            onChange={(e) => setChapter({ ...chapter, title: e.target.value })}
                            className="w-full p-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Chapter Description
                        </label>
                        <textarea
                            placeholder="Describe what students will learn in this chapter..."
                            value={chapter.description}
                            onChange={(e) => setChapter({ ...chapter, description: e.target.value })}
                            rows={4}
                            className="w-full p-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white resize-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Estimated Time
                        </label>
                        <input
                            type="text"
                            placeholder="e.g., 1 hour 30 minutes"
                            value={chapter.estimatedTime}
                            onChange={(e) => setChapter({ ...chapter, estimatedTime: e.target.value })}
                            className="w-full p-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons Card */}
                  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <div className="flex items-center mb-6">
                      <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                      <h2 className="text-xl font-semibold text-gray-800">Actions</h2>
                    </div>

                    <div className="space-y-4">
                      <button
                          onClick={handleUpload}
                          disabled={!chapter.title || !chapter.description}
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        <div className="flex items-center justify-center">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          Upload Chapter as JSON
                        </div>
                      </button>

                      <div className="text-sm text-gray-500 text-center">
                        Make sure to fill in all required fields before uploading
                      </div>
                    </div>
                  </div>

                  {/* Status Card */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
                    <div className="flex items-center mb-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                      <h3 className="text-lg font-semibold text-gray-800">Chapter Status</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-white p-3 rounded-lg">
                        <span className="text-gray-600">Title:</span>
                        <div className="font-medium text-gray-800 truncate">
                          {chapter.title || 'Not set'}
                        </div>
                      </div>
                      <div className="bg-white p-3 rounded-lg">
                        <span className="text-gray-600">Time:</span>
                        <div className="font-medium text-gray-800">
                          {chapter.estimatedTime || 'Not set'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Rich Text Editor - 80% */}
                <div className="col-span-4">
                  <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden h-[calc(100vh-200px)]">
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-white rounded-full mr-3"></div>
                        <h2 className="text-xl font-semibold text-white">Content Editor</h2>
                      </div>
                      <p className="text-purple-100 text-sm mt-1">Create rich content for your chapter</p>
                    </div>

                    <div className="p-6 h-full overflow-y-auto">
                      <RichTextEditor setEditorContent={setEditorContent} editorContent={editorContent}/>
                    </div>
                  </div>
                </div>
              </div>
          )}

          {!selectedModuleId && (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Select a Module to Get Started</h3>
                <p className="text-gray-500">Choose a module from the dropdown above to begin creating your chapter content.</p>
              </div>
          )}
        </div>
      </div>
  );
};

export default CourseContentTab;