import React, { useState, useEffect, useContext } from 'react';
import Editor from '@monaco-editor/react';
import { Play, File, Settings, Moon, Sun } from 'lucide-react';
import AuthContext from '../context/AuthContext';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import URLSITE from "../constant";

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
    const [waveFormBlobUrl,setWaveformBlobURL] = useState(null)
    const languages = ['verilog'];

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
        saveAllFiles();
        let fileName = prompt("Enter new file name");
        if (!fileName) return;
        if (files.some(file => file.fileName === fileName)) {
            alert("File already exists. Choose a different name.");
            return;
        }
        try {
            const res = await axios.get(`${URLSITE}/api/workspace/create-file`, {
                params: { id: projectId, fileName }
            });
            const updatedFiles = res.data.updatedProject.files.map(file => ({
                fileName: file.fileName,
                type: "file",
                content: file.content
            }));
            setFiles(updatedFiles);
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
        const codeContent = files.find(f => f.fileName === codeFile)?.content || '';
        const testbenchContent = files.find(f => f.fileName === testbenchFile)?.content || '';

        try {
            const res = await axios.post(`${URLSITE}/api/modules/compile-verilog`, {
                verilogCode: codeContent,
                testbenchCode: testbenchContent
            });
            if (res.data.waveform) {
                console.log("get waveform")
                
                // const blob = new Blob([res.data.waveform], { type: 'text/plain' });
                // const blobURL = URL.createObjectURL(blob);
                console.log(res.data.waveform)
                setWaveformBlobURL(res.data.waveform);
                // console.log(blobURL)
            }
            
            setOutput(res.data.output || 'Simulation complete. No output.');
        } catch (err) {
            console.log(err.response.data.details)
            if(err?.response?.data?.details){
                setOutput(err?.response?.data?.details);
            }else{
                setOutput(err.message)
            }
            
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
                className={`flex items-center py-1 px-2 cursor-pointer ${
                    isSelected ? 'bg-gray-700 text-white font-semibold' : 'hover:bg-gray-700 text-gray-300'
                }`}
            >
                <File size={16} className="mr-2" />
                <span className="text-sm">{file.fileName}</span>
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
            <div className="h-12 bg-gray-800 flex items-center justify-between px-4 border-b border-gray-700">
                <div className="flex items-center gap-4">
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="bg-gray-700 text-white rounded-md px-2 py-1 text-sm border border-gray-600 focus:outline-none"
                    >
                        {languages.map(lang => (
                            <option key={lang} value={lang}>{lang}</option>
                        ))}
                    </select>
                    <button
                        onClick={() => setIsDarkTheme(!isDarkTheme)}
                        className="p-1.5 rounded-md hover:bg-gray-700"
                    >
                        {isDarkTheme ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-gray-400" />}
                    </button>
                </div>
                <button
                    onClick={runCode}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-md"
                >
                    <Play size={16} />
                    Run
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex">
                {/* File Explorer */}
                <div className="w-48 bg-gray-800 border-r border-gray-700 text-white overflow-y-auto">
                    <div className="p-2 flex items-center justify-between border-b border-gray-700">
                        <span className="font-semibold">Explorer</span>
                        <Settings size={16} className="text-gray-400 cursor-pointer hover:text-white" onClick={createNewFile} />
                    </div>
                    <div className="py-2">{files.map(file => renderFile(file))}</div>
                </div>

                {/* Code Editor */}
                <div className="w-1/2 border-r border-gray-700">
                    <Editor
                        height="calc(100vh - 48px)"
                        defaultLanguage="verilog"
                        language={language}
                        theme={isDarkTheme ? "vs-dark" : "light"}
                        value={code}
                        onChange={handleEditorChange}
                        beforeMount={handleEditorWillMount}
                        options={{
                            minimap: { enabled: false },
                            fontSize: 14,
                            lineNumbers: 'on',
                            automaticLayout: true
                        }}
                    />
                </div>

                {/* Output Panel */}
                <div className="w-1/2 bg-gray-800 text-white flex flex-col">
                    {/* Tabs */}
                    <div className="h-12 flex border-b border-gray-700">
                        <button
                            onClick={() => setActiveTab("console")}
                            className={`px-4 py-2 text-sm ${activeTab === "console" ? 'bg-gray-700 font-bold' : 'hover:bg-gray-700'}`}
                        >
                            Console Output
                        </button>
                        <button
                            onClick={() => setActiveTab("visual")}
                            className={`px-4 py-2 text-sm ${activeTab === "visual" ? 'bg-gray-700 font-bold' : 'hover:bg-gray-700'}`}
                        >
                            Visual Output
                        </button>
                    </div>

                    {/* File selectors */}
                    <div className="flex items-center gap-4 px-4 py-2 bg-gray-800 border-b border-gray-700">
                        <select
                            value={codeFile}
                            onChange={e => setCodeFile(e.target.value)}
                            className="bg-gray-700 text-white rounded px-2 py-1 text-sm"
                        >
                            <option value="">Select Code File</option>
                            {files.map(f => (
                                <option key={f.fileName} value={f.fileName}>{f.fileName}</option>
                            ))}
                        </select>
                        <select
                            value={testbenchFile}
                            onChange={e => setTestbenchFile(e.target.value)}
                            className="bg-gray-700 text-white rounded px-2 py-1 text-sm"
                        >
                            <option value="">Select Testbench File</option>
                            {files.map(f => (
                                <option key={f.fileName} value={f.fileName}>{f.fileName}</option>
                            ))}
                        </select>
                    </div>

                    {/* Output display */}
                    <div className="flex-1 p-4  overflow-auto">
                        {activeTab === "console" ? (
                           <pre
                           className="font-mono bg-black text-white p-2 rounded-md whitespace-pre-wrap"
                           style={{
                             
                             height: '50vh', // 50% of the viewport height
                           }}
                         >
                           {output}
                         </pre>
                         

                        ) : (
                            <div className="overflow-auto w-full h-full bg-black text-white rounded-md">
                                <iframe
                                style={{
                                    height:"60vh",
                                    width:"250vh",
                                    overflow:"auto"
                                }}
    title="Visual Output"
    src={waveFormBlobUrl ? `https://app.surfer-project.org/?load_url=${waveFormBlobUrl}` : "https://vc.drom.io/?github=programmingGod-byte/testing/main/wave.vcd"}
    className="w-full h-full border-none"
/>

                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WorkSpaceCodeEditor;
