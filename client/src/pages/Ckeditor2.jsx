import React, { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import URLSITE from "../constant";
import hljs from 'highlight.js';
import 'highlight.js/styles/googlecode.css';

// Import Verilog highlighting - make sure you have this installed
import 'highlight.js/lib/languages/verilog';

// Register Verilog language with highlight.js
hljs.registerLanguage('verilog', require('highlight.js/lib/languages/verilog'));

const CourseContentTab = () => {
  const [modules, setModules] = useState([]);
  const navigator = useNavigate();
  const [selectedModuleId, setSelectedModuleId] = useState('');
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
      codeExamples: chapterToUpload.codeExamples,
      sections: chapterToUpload.sections
    };
  
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
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-xl rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Add Chapter to Module</h1>

      <div className="mb-6">
        <label className="block text-gray-600 mb-2 font-semibold">Select Module</label>
        <select
          value={selectedModuleId}
          onChange={(e) => setSelectedModuleId(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">-- Select a Module --</option>
          {modules.map((mod) => (
            <option key={mod.id} value={mod.id}>
              {mod.title} – {mod.description.split(' ').slice(0, 20).join(' ')}
              {mod.description.split(' ').length > 50 ? '...' : ''}
            </option>
          ))}
        </select>
      </div>

      {selectedModuleId && (
        <>
          <input
            type="text"
            placeholder="Chapter Title"
            value={chapter.title}
            onChange={(e) => setChapter({ ...chapter, title: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg mb-4"
          />

          <textarea
            placeholder="Chapter Description"
            value={chapter.description}
            onChange={(e) => setChapter({ ...chapter, description: e.target.value })}
            rows={3}
            className="w-full p-3 border border-gray-300 rounded-lg mb-4"
          />

          <input
            type="text"
            placeholder="Estimated Time (e.g., 1 hour)"
            value={chapter.estimatedTime}
            onChange={(e) => setChapter({ ...chapter, estimatedTime: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg mb-6"
          />

          {chapter.sections.map((section, sIndex) => (
            <div key={section.id} className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-6">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-semibold text-gray-700">Section {sIndex + 1}</h2>
                {chapter.sections.length > 1 && (
                  <button
                    onClick={() => deleteSection(sIndex)}
                    className="text-red-500 hover:underline text-sm"
                  >
                    Delete
                  </button>
                )}
              </div>

              <input
                type="text"
                placeholder="Section Title"
                value={section.title}
                onChange={(e) => handleSectionChange(sIndex, 'title', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
              />

              {/* Main CKEditor for the section */}
              <div className="mb-4">
                <h3 className="text-md font-medium text-gray-600 mb-2">Main Content</h3>
                <CKEditor
                  editor={ClassicEditor}
                  data={section.content || ''}
                  onChange={(event, editor) => handleEditorChange(sIndex, event, editor)}
                  config={editorConfig}
                />
              </div>

              {/* Additional content and code blocks */}
              {section.contentBlocks && section.contentBlocks.map((block, blockIndex) => (
                <div key={block.id} className="mt-4 mb-4 bg-white p-4 border border-gray-200 rounded">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-md font-medium text-gray-600">
                      {block.type === 'content' ? 'Additional Content' : 'Code Block'}
                    </h4>
                    <button
                      onClick={() => deleteContentBlock(sIndex, blockIndex)}
                      className="text-red-500 hover:underline text-sm"
                    >
                      Delete
                    </button>
                  </div>

                  {block.type === 'content' ? (
                    <CKEditor
                      editor={ClassicEditor}
                      data={block.content || ''}
                      onChange={(event, editor) => handleContentBlockEditorChange(sIndex, blockIndex, event, editor)}
                      config={editorConfig}
                    />
                  ) : (
                    <>
                      <div className="mb-2">
                        <select
                          value={block.language || 'javascript'}
                          onChange={(e) => handleLanguageChange(sIndex, blockIndex, e.target.value)}
                          className="border border-gray-300 rounded p-1"
                        >
                          <option value="javascript">JavaScript</option>
                          <option value="python">Python</option>
                          <option value="verilog">Verilog</option>
                          <option value="html">HTML</option>
                          <option value="css">CSS</option>
                          <option value="plaintext">Plain Text</option>
                        </select>
                      </div>
                      <textarea
                        value={block.code || ''}
                        onChange={(e) => handleCodeBlockChange(sIndex, blockIndex, e.target.value)}
                        className="w-full p-2 font-mono text-sm border border-gray-300 rounded-lg bg-gray-50"
                        rows={6}
                        placeholder="Enter code here..."
                      />
                    </>
                  )}
                </div>
              ))}

              {/* Add content and code buttons */}
              <div className="flex gap-2 mt-3 mb-3">
                <button
                  onClick={() => addMoreContent(sIndex)}
                  className="bg-green-50 text-green-600 font-medium px-3 py-1 rounded-md border border-green-200 hover:bg-green-100"
                >
                  + Add More Content
                </button>
                <button
                  onClick={() => addCodeBlock(sIndex)}
                  className="bg-purple-50 text-purple-600 font-medium px-3 py-1 rounded-md border border-purple-200 hover:bg-purple-100"
                >
                  + Add Code
                </button>
              </div>

              {/* Preview Section */}
              {(section.content || (section.contentBlocks && section.contentBlocks.length > 0)) && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-600 mb-2">Preview:</h3>
                
                
                  <div
                    className="prose prose-sm max-w-none bg-white p-4 border border-gray-200 rounded  text-[1.2rem]"
                    dangerouslySetInnerHTML={{ __html: generatePreviewHtml(section) }}
                  />
                </div>
              )}
            </div>
          ))}

          <div className="flex items-center mb-8">
            <button
              onClick={addSection}
              className="bg-blue-50 text-blue-600 font-medium px-4 py-2 rounded-lg border border-blue-200 hover:bg-blue-100"
            >
              + Add Section
            </button>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Code Examples (For Chapter)</h3>
            {chapter.codeExamples.map((example, index) => (
              <div key={example.id} className="mb-6 p-4 border rounded-lg bg-white shadow">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-md font-semibold">Example {index + 1}</h4>
                  <button
                    onClick={() => deleteCodeExample(index)}
                    className="text-sm text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Title"
                  value={example.title}
                  onChange={(e) => handleCodeExampleChange(index, 'title', e.target.value)}
                  className="w-full p-2 mb-2 border rounded"
                />
                <textarea
                  placeholder="Description"
                  value={example.description}
                  onChange={(e) => handleCodeExampleChange(index, 'description', e.target.value)}
                  rows={2}
                  className="w-full p-2 mb-2 border rounded"
                />
                <textarea
                  placeholder="Code"
                  value={example.code}
                  onChange={(e) => handleCodeExampleChange(index, 'code', e.target.value)}
                  rows={4}
                  className="w-full p-2 font-mono text-sm mb-2 border rounded bg-gray-100"
                />
                <textarea
                  placeholder="Explanation"
                  value={example.explanation}
                  onChange={(e) => handleCodeExampleChange(index, 'explanation', e.target.value)}
                  rows={2}
                  className="w-full p-2 mb-2 border rounded"
                />
              </div>
            ))}
            <button
              onClick={addCodeExample}
              className="text-sm text-blue-600 border border-blue-200 px-3 py-1 rounded hover:bg-blue-50"
            >
              + Add Code Example
            </button>
          </div>

          <div className="flex justify-end mt-8">
            <button
              onClick={handleUpload}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700"
            >
              Upload Chapter as JSON
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CourseContentTab;