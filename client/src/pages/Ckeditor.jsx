import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import URLSITE from '../constant';

const generateId = () => Math.random().toString(36).substr(2, 9);

const VerilogModuleEditor = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Module info now includes moduleType ('free' or 'paid')
  const [moduleInfo, setModuleInfo] = useState({
    moduleType: 'free',
    id: '',
    title: '',
    description: '',
    image: '',
    level: '',
    duration: '',
    rating: '',
    studentsCount: '',
    completed: '',
    totalChapters: '',
    progress: '',
    updatedAt: '',
    lessons: '',
    exercises: '',
    students: '',
    overview: ''
  });

  const [learnItems, setLearnItems] = useState(['']);
  const [skills, setSkills] = useState(['']);
  const [prerequisites, setPrerequisites] = useState(['']);
  const [resources, setResources] = useState([{ title: '', type: 'PDF', link: '' }]);
  const [overviewCodeSamples, setOverviewCodeSamples] = useState([{ title: '', code: '' }]);
  const [codeExamples, setCodeExamples] = useState([
    { id: generateId(), title: '', description: '', difficulty: '', type: '', completed: false, code: '', testbench: '' }
  ]);

  const navigator = useNavigate();

  // Generic handler supports text, select, radio, checkbox
  const handleModuleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setModuleInfo({
      ...moduleInfo,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleConvertToJSON = async () => {
    const finalData = {
      ...moduleInfo,
      learnItems,
      skills,
      prerequisites,
      resources,
      overviewCodeSamples,
      codeExamples
    };

    finalData['completed'] = false
    console.log('📦 Final JSON Output:', JSON.stringify(finalData, null, 2));

    try {
      
      const response = await axios.post(
        `${URLSITE}/api/modules/create-module`,
        JSON.stringify(finalData),
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log(response);
      alert('Module uploaded successfully');
      navigator('/ckeditor2');
    } catch (error) {
      console.error(error);
      const message = error?.response?.data?.error?.message || error.message;
      alert(message);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* Access Type Selection */}
      <div className="flex items-center space-x-6 mb-6">
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="moduleType"
            value="free"
            checked={moduleInfo.moduleType === 'free'}
            onChange={handleModuleChange}
          />
          <span>Free</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="moduleType"
            value="paid"
            checked={moduleInfo.moduleType === 'paid'}
            onChange={handleModuleChange}
          />
          <span>Paid</span>
        </label>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-6">
        {['overview', 'code-examples'].map((tab) => (
          <button
            key={tab}
            className={clsx(
              'px-4 py-2 font-medium capitalize',
              activeTab === tab
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600'
            )}
            onClick={() => setActiveTab(tab)}
          >
            {tab.replace('-', ' ')}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <>
          <h1 className="text-3xl font-bold">Edit Verilog Module Overview</h1>

          {/* Module Info Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.keys(moduleInfo).map(
              (key, idx) =>
                key !== 'overview' && (
                  <input
                    required
                    key={idx}
                    name={key}
                    placeholder={key}
                    value={moduleInfo[key]}
                    onChange={handleModuleChange}
                    className="p-2 border rounded-lg"
                  />
                )
            )}
          </div>

          {/* Overview Description */}
          <div>
            <h2 className="font-semibold mt-4">Overview of the Module</h2>
            <textarea
              className="w-full p-2 border rounded"
              rows={4}
              placeholder="Overview of the module"
              name="overview"
              value={moduleInfo.overview}
              onChange={handleModuleChange}
            />
          </div>

          {/* What You'll Learn */}
          <div>
            <h2 className="font-semibold mt-4">What You'll Learn</h2>
            {learnItems.map((item, index) => (
              <input
                required
                key={index}
                className="w-full p-2 my-1 border rounded"
                value={item}
                onChange={(e) => {
                  const newItems = [...learnItems];
                  newItems[index] = e.target.value;
                  setLearnItems(newItems);
                }}
              />
            ))}
            <button
              className="mt-2 text-blue-600"
              onClick={() => setLearnItems([...learnItems, ''])}
            >
              + Add Item
            </button>
          </div>

          {/* Skills You'll Gain */}
          <div>
            <h2 className="font-semibold mt-4">Skills You'll Gain</h2>
            {skills.map((skill, index) => (
              <input
                required
                key={index}
                className="w-full p-2 my-1 border rounded"
                value={skill}
                onChange={(e) => {
                  const newSkills = [...skills];
                  newSkills[index] = e.target.value;
                  setSkills(newSkills);
                }}
              />
            ))}
            <button
              className="mt-2 text-blue-600"
              onClick={() => setSkills([...skills, ''])}
            >
              + Add Skill
            </button>
          </div>

          {/* Prerequisites */}
          <div>
            <h2 className="font-semibold mt-4">Prerequisites</h2>
            {prerequisites.map((item, index) => (
              <input
                required
                key={index}
                className="w-full p-2 my-1 border rounded"
                value={item}
                onChange={(e) => {
                  const newPre = [...prerequisites];
                  newPre[index] = e.target.value;
                  setPrerequisites(newPre);
                }}
              />
            ))}
            <button
              className="mt-2 text-blue-600"
              onClick={() => setPrerequisites([...prerequisites, ''])}
            >
              + Add Prerequisite
            </button>
          </div>

          {/* Overview Code Samples */}
          <div>
            <h2 className="font-semibold mt-4">Overview Code Samples</h2>
            {overviewCodeSamples.map((sample, index) => (
              <div key={index} className="space-y-2 mb-4">
                <input
                  className="w-full p-2 border rounded"
                  placeholder="Title"
                  value={sample.title}
                  onChange={(e) => {
                    const newSamples = [...overviewCodeSamples];
                    newSamples[index].title = e.target.value;
                    setOverviewCodeSamples(newSamples);
                  }}
                />
                <textarea
                  className="w-full p-2 border rounded font-mono"
                  placeholder="Code"
                  rows={4}
                  value={sample.code}
                  onChange={(e) => {
                    const newSamples = [...overviewCodeSamples];
                    newSamples[index].code = e.target.value;
                    setOverviewCodeSamples(newSamples);
                  }}
                />
              </div>
            ))}
            <button
              className="text-blue-600"
              onClick={() => setOverviewCodeSamples([...overviewCodeSamples, { title: '', code: '' }])}
            >
              + Add Code Sample
            </button>
          </div>

          {/* Additional Resources */}
          <div>
            <h2 className="font-semibold mt-4">Additional Resources</h2>
            {resources.map((res, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                <input
                  className="p-2 border rounded"
                  placeholder="Title"
                  value={res.title}
                  onChange={(e) => {
                    const newRes = [...resources];
                    newRes[index].title = e.target.value;
                    setResources(newRes);
                  }}
                />
                <select
                  className="p-2 border rounded"
                  value={res.type}
                  onChange={(e) => {
                    const newRes = [...resources];
                    newRes[index].type = e.target.value;
                    setResources(newRes);
                  }}
                >
                  <option value="PDF">PDF</option>
                  <option value="Video">Video</option>
                  <option value="Image">Image</option>
                </select>
                <input
                  required
                  className="p-2 border rounded"
                  placeholder="Link"
                  value={res.link}
                  onChange={(e) => {
                    const newRes = [...resources];
                    newRes[index].link = e.target.value;
                    setResources(newRes);
                  }}
                />
              </div>
            ))}
            <button
              className="text-blue-600"
              onClick={() => setResources([...resources, { title: '', type: 'PDF', link: '' }])}
            >
              + Add Resource
            </button>
          </div>

          <button
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg"
            onClick={handleConvertToJSON}
          >
            Convert to JSON
          </button>
        </>
      )}

      {/* Code Examples Tab */}
      {activeTab === 'code-examples' && (
        <>
          <h1 className="text-3xl font-bold">Code Examples</h1>
          {codeExamples.map((ex, index) => (
            <div key={index} className="space-y-3 mb-6 border p-4 rounded-lg">
              <input
                required
                className="w-full p-2 border rounded"
                placeholder="ID"
                value={ex.id}
                onChange={(e) => {
                  const updated = [...codeExamples];
                  updated[index].id = e.target.value;
                  setCodeExamples(updated);
                }}
              />
              <input
                required
                className="w-full p-2 border rounded"
                placeholder="Title"
                value={ex.title}
                onChange={(e) => {
                  const updated = [...codeExamples];
                  updated[index].title = e.target.value;
                  setCodeExamples(updated);
                }}
              />
              <textarea
                className="w-full p-2 border rounded"
                placeholder="Description"
                rows={2}
                value={ex.description}
                onChange={(e) => {
                  const updated = [...codeExamples];
                  updated[index].description = e.target.value;
                  setCodeExamples(updated);
                }}
              />
              <input
                required
                className="w-full p-2 border rounded"
                placeholder="Difficulty"
                value={ex.difficulty}
                onChange={(e) => {
                  const updated = [...codeExamples];
                  updated[index].difficulty = e.target.value;
                  setCodeExamples(updated);
                }}
              />
              <input
                required
                className="w-full p-2 border rounded"
                placeholder="Type"
                value={ex.type}
                onChange={(e) => {
                  const updated = [...codeExamples];
                  updated[index].type = e.target.value;
                  setCodeExamples(updated);
                }}
              />
              <label className="flex items-center space-x-2">
                <input
                  required
                  type="checkbox"
                  checked={ex.completed}
                  onChange={(e) => {
                    const updated = [...codeExamples];
                    updated[index].completed = e.target.checked;
                    setCodeExamples(updated);
                  }}
                />
                <span>Completed</span>
              </label>

              {/* Design Code */}
              <h3 className="font-semibold mt-4">Design Code</h3>
              <textarea
                className="w-full p-2 border rounded font-mono"
                placeholder="Design Code"
                rows={6}
                value={ex.code}
                onChange={(e) => {
                  const updated = [...codeExamples];
                  updated[index].code = e.target.value;
                  setCodeExamples(updated);
                }}
              />

              {/* Testbench Code */}
              <h3 className="font-semibold mt-4">Testbench Code</h3>
              <textarea
                className="w-full p-2 border rounded font-mono"
                placeholder="Testbench Code"
                rows={6}
                value={ex.testbench}
                onChange={(e) => {
                  const updated = [...codeExamples];
                  updated[index].testbench = e.target.value;
                  setCodeExamples(updated);
                }}
              />
            </div>
          ))}
          <button
            className="text-blue-600"
            onClick={() =>
              setCodeExamples([
                ...codeExamples,
                { id: generateId(), title: '', description: '', difficulty: '', type: '', completed: false, code: '', testbench: '' }
              ])
            }
          >
            + Add Code Example
          </button>
        </>
      )}
    </div>
  );
};

export default VerilogModuleEditor;
