import React, { useState, useEffect, useContext, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { Play, FilePlus, Settings, Moon, Sun, CornerUpRight, Save, Download, ChevronRight, ChevronLeft, Copy, Trash2, RefreshCw, Terminal, Waveform, HelpCircle } from 'lucide-react';
import AuthContext from '../context/AuthContext';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import URLSITE from "../constant";


import { Activity } from 'lucide-react';
// or
import { BarChart } from 'lucide-react';

function WorkSpaceCodeEditor() {
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('Output will be shown here...');
    const [currentFile, setCurrentFile] = useState('');
    const [isDarkTheme, setIsDarkTheme] = useState(true);
    const [language, setLanguage] = useState('verilog');
    const context = useContext(AuthContext);
    const { projectId } = useParams();
    const [files, setFiles] = useState([]);
    const [activeTab, setActiveTab] = useState("console");
    const [codeFile, setCodeFile] = useState('');
    const [testbenchFile, setTestbenchFile] = useState('');
    const [waveFormBlobUrl, setWaveformBlobURL] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newFileName, setNewFileName] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [splitPosition, setSplitPosition] = useState(50); // Default 50% split
    // const [isResizing, setIsResizing] = useState(false);
    const [isFileExplorerCollapsed, setIsFileExplorerCollapsed] = useState(false);
    
    const languages = ['verilog'];
    const resizeRef = useRef(null);

    useEffect(() => {
        if (!context.user || !projectId) return;

        const fetchFiles = async () => {
            try {
                const res = await axios.get(`${URLSITE}/api/workspace/files-list`, {
                    params: { id: projectId }
                });
                const allFiles = res.data.projects.files.map(file => ({
                    fileName: file.fileName,
                    type: "file",
                    content: file.content
                }));
                setFiles(allFiles);
                
                // Set first file as current if nothing is selected
                if (allFiles.length > 0 && !currentFile) {
                    setCurrentFile(allFiles[0].fileName);
                    setCode(allFiles[0].content);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchFiles();
    }, [context.user, projectId]);


    const saveAllFiles = () => {
        axios.post(`${URLSITE}/api/workspace/save-all-files`, {
            id: projectId,
            files
        }).catch(console.error);
    };

    const createNewFile = async () => {
        // First save all files
        saveAllFiles();
        setIsDialogOpen(true);
    };

    const handleCreateFile = async () => {
        if (!newFileName || newFileName.trim() === '') {
            return;
        }
        
        if (files.some(file => file.fileName === newFileName)) {
            alert("File already exists. Choose a different name.");
            return;
        }
        
        try {
            const res = await axios.get(`${URLSITE}/api/workspace/create-file`, {
                params: { id: projectId, fileName: newFileName }
            });
            const updatedFiles = res.data.updatedProject.files.map(file => ({
                fileName: file.fileName,
                type: "file",
                content: file.content
            }));
            setFiles(updatedFiles);
            setCurrentFile(newFileName);
            setCode('');
            setIsDialogOpen(false);
            setNewFileName('');
        } catch (error) {
            console.error(error);
        }
    };

    const handleEditorChange = (value) => {
        if (value) {
            setCode(value);
            const updatedFiles = files.map(file =>
                file.fileName === currentFile ? { ...file, content: value } : file
            );
            setFiles(updatedFiles);
        }
    };

    const runCode = async () => {
        if (!codeFile || !testbenchFile) {
            setOutput("Error: Please select both a code file and a testbench file before running.");
            return;
        }
        
        setIsProcessing(true);
        setOutput("Running simulation...");
        
        const codeContent = files.find(f => f.fileName === codeFile)?.content || '';
        const testbenchContent = files.find(f => f.fileName === testbenchFile)?.content || '';

        try {
            const res = await axios.post(`${URLSITE}/api/modules/compile-verilog`, {
                verilogCode: codeContent,
                testbenchCode: testbenchContent
            });
            
            if (res.data.waveform) {
                setWaveformBlobURL(res.data.waveform);
            }
            
            setOutput(res.data.output || 'Simulation complete. No output.');
            
            // Auto-switch to visual output if waveform is available
            if (res.data.waveform) {
                setActiveTab("visual");
            }
            
        } catch (err) {
            if(err?.response?.data?.details){
                setOutput(err?.response?.data?.details);
            } else {
                setOutput(err.message);
            }
        } finally {
            setIsProcessing(false);
        }
    };

    const renderFile = (file) => {
        const isSelected = file.fileName === currentFile;
        return (
            <div
                key={file.fileName}
                onClick={() => {
                    setCode(file.content);
                    setCurrentFile(file.fileName);
                    saveAllFiles();
                }}
                className={`flex items-center py-2 px-3 cursor-pointer rounded-md my-1 ${
                    isSelected ? 'bg-indigo-700 text-white font-medium' : 'hover:bg-gray-700 text-gray-300'
                }`}
            >
                <div className={`w-2 h-2 rounded-full mr-2 ${isSelected ? 'bg-white' : 'bg-gray-500'}`} />
                <span className="text-sm truncate flex-1">{file.fileName}</span>
                {isSelected && (
                    <div className="flex gap-1">
                        <Copy size={14} className="text-gray-400 hover:text-white cursor-pointer" 
                            onClick={(e) => {
                                e.stopPropagation();
                                navigator.clipboard.writeText(code);
                            }} 
                        />
                    </div>
                )}
            </div>
        );
    };

    const handleEditorWillMount = (monaco) => {
        monaco.languages.register({ id: 'verilog' });
        monaco.languages.setMonarchTokensProvider('verilog', {
            keywords: [
                'module', 'endmodule', 'input', 'output', 'wire', 'reg', 'always', 'begin',
                'end', 'if', 'else', 'case', 'endcase', 'default', 'posedge', 'negedge',
                'assign', 'parameter', 'localparam', 'integer', 'initial'
            ],
            operators: [
                '=', '==', '!=', '&&', '||', '&', '|', '^', '~', '+', '-', '*', '/',
                '<<', '>>', '<<<', '>>>', '<', '>', '<=', '>=', '?', ':'
            ],
            symbols: /[=><!~?:&|+\-*\/\^%]+/,
            tokenizer: {
                root: [
                    [/[a-zA-Z_]\w*/, {
                        cases: {
                            '@keywords': 'keyword',
                            '@default': 'identifier'
                        }
                    }],
                    [/\/\/.*/, 'comment'],
                    [/\/\*/, 'comment', '@comment'],
                    [/"([^"\\]|\\.)*$/, 'string.invalid'],
                    [/"/, 'string', '@string'],
                    [/\d*\d+[bB][01_]+/, 'number.binary'],
                    [/\d*\d+[hH][0-9a-fA-F_]+/, 'number.hex'],
                    [/\d[\d_]*/, 'number'],
                    [/@symbols/, {
                        cases: {
                            '@operators': 'operator',
                            '@default': ''
                        }
                    }],
                ],
                comment: [
                    [/[^\/*]+/, 'comment'],
                    [/\*\//, 'comment', '@pop'],
                    [/[\/*]/, 'comment']
                ],
                string: [
                    [/[^\\"]+/, 'string'],
                    [/"/, 'string', '@pop']
                ]
            }
        });
    };

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col">
            {/* Top Bar */}
            <div className="h-14 bg-gray-800 flex items-center justify-between px-4 border-b border-gray-700 shadow-md">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-indigo-400 font-medium">
                        <Settings size={18} />
                        <span>Verilog Workspace</span>
                    </div>
                
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="bg-gray-700 text-white rounded-md px-2 py-1 text-sm border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        {languages.map(lang => (
                            <option key={lang} value={lang}>{lang}</option>
                        ))}
                    </select>
                    
                    <button
                        onClick={saveAllFiles}
                        className="p-1.5 rounded-md hover:bg-gray-700 text-gray-300 hover:text-white flex items-center gap-1"
                        title="Save All Files"
                    >
                        <Save size={18} />
                    </button>
                    
                    <button
                        onClick={() => setIsDarkTheme(!isDarkTheme)}
                        className="p-1.5 rounded-md hover:bg-gray-700"
                        title={isDarkTheme ? "Switch to Light Theme" : "Switch to Dark Theme"}
                    >
                        {isDarkTheme ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-gray-400" />}
                    </button>
                </div>
                
                <button
                    onClick={runCode}
                    disabled={isProcessing}
                    className={`flex items-center gap-2 ${isProcessing ? 'bg-gray-600' : 'bg-indigo-600 hover:bg-indigo-700'} text-white px-4 py-2 rounded-md transition-colors shadow-lg`}
                >
                    {isProcessing ? <RefreshCw size={16} className="animate-spin" /> : <Play size={16} />}
                    {isProcessing ? "Running..." : "Run Code"}
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex">
                {/* File Explorer - Collapsible */}
                <div className={`${isFileExplorerCollapsed ? 'w-10' : 'w-56'} bg-gray-800 border-r border-gray-700 text-white overflow-y-auto transition-all duration-300 flex flex-col`}>
                    <div className="p-3 flex items-center justify-between border-b border-gray-700">
                        {!isFileExplorerCollapsed && <span className="font-semibold">Files</span>}
                        <div className="flex items-center">
                            {!isFileExplorerCollapsed && (
                                <FilePlus 
                                    size={18} 
                                    className="text-indigo-400 cursor-pointer hover:text-indigo-300 mr-3" 
                                    onClick={createNewFile}
                                    title="Create New File" 
                                />
                            )}
                            <button
                                onClick={() => setIsFileExplorerCollapsed(!isFileExplorerCollapsed)}
                                className="text-gray-400 hover:text-white"
                            >
                                {isFileExplorerCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                            </button>
                        </div>
                    </div>
                    
                    {!isFileExplorerCollapsed && (
                        <div className="py-2 px-2 flex-1 overflow-y-auto">
                            {files.length === 0 ? (
                                <div className="text-gray-500 text-sm p-3 text-center">
                                    No files yet. Create one to get started.
                                </div>
                            ) : (
                                files.map(file => renderFile(file))
                            )}
                        </div>
                    )}
                </div>

                {/* Resizable Editor and Output */}
                <div className="flex-1 flex relative">
                    {/* Code Editor */}
                    <div className="h-full" style={{ width: `${splitPosition}%` }}>
                        <Editor
                            height="calc(100vh - 56px)"
                            defaultLanguage="verilog"
                            language={language}
                            theme={isDarkTheme ? "vs-dark" : "light"}
                            value={code}
                            onChange={handleEditorChange}
                            beforeMount={handleEditorWillMount}
                            options={{
                                minimap: { enabled: true },
                                fontSize: 14,
                                lineNumbers: 'on',
                                automaticLayout: true,
                                scrollBeyondLastLine: false,
                                padding: { top: 10 }
                            }}
                        />
                    </div>

                    {/* Resize Handle */}
                    

                    {/* Output Panel */}
                    <div className="h-full bg-gray-800 text-white flex flex-col" style={{ width: `${100 - splitPosition}%` }}>
                        {/* Tabs */}
                        <div className="h-10 flex border-b border-gray-700 bg-gray-900">
                            <button
                                onClick={() => setActiveTab("console")}
                                className={`px-4 h-full flex items-center text-sm gap-1.5 ${activeTab === "console" ? 'bg-gray-800 border-t-2 border-indigo-500 font-medium' : 'hover:bg-gray-800 text-gray-400'}`}
                            >
                                <Terminal size={14} />
                                Console Output
                            </button>
                            <button
                                onClick={() => setActiveTab("visual")}
                                className={`px-4 h-full flex items-center text-sm gap-1.5 ${activeTab === "visual" ? 'bg-gray-800 border-t-2 border-indigo-500 font-medium' : 'hover:bg-gray-800 text-gray-400'}`}
                            >
                                <Activity size={14} />
                                Waveform View
                            </button>
                        </div>

                        {/* File selectors */}
                        <div className="flex items-center gap-4 px-4 py-3 bg-gray-800 border-b border-gray-700">
                            <div className="flex items-center gap-2 flex-1">
                                <span className="text-xs text-gray-400">Source:</span>
                                <select
                                    value={codeFile}
                                    onChange={e => setCodeFile(e.target.value)}
                                    className="bg-gray-700 text-white rounded-md px-2 py-1.5 text-sm flex-1 border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                >
                                    <option value="">Select Code File</option>
                                    {files.map(f => (
                                        <option key={f.fileName} value={f.fileName}>{f.fileName}</option>
                                    ))}
                                </select>
                            </div>
                            
                            <div className="flex items-center gap-2 flex-1">
                                <span className="text-xs text-gray-400">Testbench:</span>
                                <select
                                    value={testbenchFile}
                                    onChange={e => setTestbenchFile(e.target.value)}
                                    className="bg-gray-700 text-white rounded-md px-2 py-1.5 text-sm flex-1 border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                >
                                    <option value="">Select Testbench File</option>
                                    {files.map(f => (
                                        <option key={f.fileName} value={f.fileName}>{f.fileName}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Output display */}
                        <div className="flex-1 p-3 overflow-auto bg-gray-900">
                            {activeTab === "console" ? (
                                <pre className="font-mono bg-gray-950 text-white p-3 rounded-md whitespace-pre-wrap h-full overflow-auto border border-gray-800">
                                    {output}
                                </pre>
                            ) : (
                                <div className="h-full bg-gray-950 rounded-md border border-gray-800 overflow-hidden">
                                    {waveFormBlobUrl ? (
                                        <iframe
                                            title="Visual Output"
                                            src={`https://app.surfer-project.org/?load_url=${waveFormBlobUrl}`}
                                            className="w-full h-full border-none"
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                            <Activity size={48} className="mb-3 text-gray-600" />
                                            <p className="mb-1">No waveform data available</p>
                                            <p className="text-sm text-gray-500">Run your code with a testbench to generate a waveform</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* New File Dialog */}
            {isDialogOpen && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-md border border-gray-700">
                        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                            <h3 className="text-lg font-medium text-white">Create New File</h3>
                            <button
                                onClick={() => {
                                    setIsDialogOpen(false);
                                    setNewFileName('');
                                }}
                                className="text-gray-400 hover:text-white"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="p-5">
                            <div className="mb-4">
                                <label htmlFor="fileName" className="block text-sm font-medium text-gray-300 mb-2">
                                    File Name
                                </label>
                                <input
                                    type="text"
                                    id="fileName"
                                    className="w-full p-2.5 bg-gray-700 text-white rounded-md border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    placeholder="Enter file name (e.g. counter.v)"
                                    value={newFileName}
                                    onChange={(e) => setNewFileName(e.target.value)}
                                    autoFocus
                                />
                                <p className="mt-1 text-xs text-gray-400">Use .v extension for Verilog files</p>
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button
                                    onClick={() => {
                                        setIsDialogOpen(false);
                                        setNewFileName('');
                                    }}
                                    className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleCreateFile}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                                >
                                    Create
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default WorkSpaceCodeEditor;