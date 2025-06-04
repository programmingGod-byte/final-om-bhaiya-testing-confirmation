import React, {useRef, useState, useCallback} from 'react';
// Add this import at the top with other imports
import 'highlight.js/styles/github-dark.css'; // or any other theme
import {EditorContent, useEditor} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import ImageExtension from '@tiptap/extension-image';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import TextAlign from '@tiptap/extension-text-align';
import UnderlineExtension from '@tiptap/extension-underline';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import {createLowlight} from 'lowlight';
import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';
import css from 'highlight.js/lib/languages/css';
import html from 'highlight.js/lib/languages/xml';
import json from 'highlight.js/lib/languages/json';
import bash from 'highlight.js/lib/languages/bash';
import sql from 'highlight.js/lib/languages/sql';
import java from 'highlight.js/lib/languages/java';
import cpp from 'highlight.js/lib/languages/cpp';
import php from 'highlight.js/lib/languages/php';

import {
    Bold,
    Italic,
    Underline,
    Strikethrough,
    Code,
    Image,
    AlignLeft,
    AlignCenter,
    AlignRight,
    List,
    ListOrdered,
    Quote,
    Minus,
    Undo,
    Redo,
    Save,
    Download,
    Type,
    Upload,
    Copy,
    FileText,
    Maximize2,
    Minimize2,
    RotateCcw,
    Move
} from 'lucide-react';

// Create lowlight instance with extensive language support
const lowlight = createLowlight();
lowlight.register('javascript', javascript);
lowlight.register('python', python);
lowlight.register('css', css);
lowlight.register('html', html);
lowlight.register('json', json);
lowlight.register('bash', bash);
lowlight.register('sql', sql);
lowlight.register('java', java);
lowlight.register('cpp', cpp);
lowlight.register('php', php);

// Add this import at the top
import {useEffect} from 'react';


// Custom Image Extension with resize and alignment
const CustomImageExtension = ImageExtension.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            width: {
                default: null,
                parseHTML: element => element.getAttribute('width'),
                renderHTML: attributes => {
                    if (!attributes.width) return {}
                    return {width: attributes.width}
                },
            },
            height: {
                default: null,
                parseHTML: element => element.getAttribute('height'),
                renderHTML: attributes => {
                    if (!attributes.height) return {}
                    return {height: attributes.height}
                },
            },
            align: {
                default: 'left',
                parseHTML: element => element.style.float || 'left',
                renderHTML: attributes => {
                    const alignMap = {
                        'left': 'left',
                        'center': 'none',
                        'right': 'right'
                    };
                    return {
                        style: `float: ${alignMap[attributes.align] || 'left'}; margin: ${attributes.align === 'center' ? '0 auto' : '10px'}; display: ${attributes.align === 'center' ? 'block' : 'inline-block'};`
                    }
                },
            },
        }
    },
});

const RichTextEditor = ({editorContent,setEditorContent}) => {
    const fileInputRef = useRef();
    const [fontSize, setFontSize] = useState(16);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [showImageModal, setShowImageModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const editor = useEditor({
  extensions: [
    StarterKit,
    CustomImageExtension.configure({
      HTMLAttributes: {
        class: 'max-w-full h-auto rounded-lg shadow-lg border border-purple-200 cursor-pointer',
      },
    }),
    CodeBlockLowlight.configure({
      lowlight,
      HTMLAttributes: {
        class: 'bg-gray-900 text-gray-100 p-4 rounded-lg text-sm font-mono overflow-x-auto border border-purple-300 shadow-lg hljs',
      },
    }),
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
    UnderlineExtension,
    TextStyle,
    Color,
    Highlight.configure({
      multicolor: true,
    }),
  ],
  content: `<p>Start typing...</p>`,
  editorProps: {
    attributes: {
      class: 'prose prose-purple max-w-none focus:outline-none min-h-full p-6 text-gray-800',
      style: `min-height: calc(100vh - 200px); font-size: ${fontSize}px;`,
    },
    handleClickOn: (view, pos, node, nodePos, event) => {
      if (node.type.name === 'image') {
        const { src, width, height, align } = node.attrs;
        setSelectedImage({ src, width, height, align, pos: nodePos });
        setShowImageModal(true);
        return true;
      }
      return false;
    },
  },

  // 🔥 Hook into editor changes here
  onUpdate: ({ editor }) => {
    const html = editor.getHTML();
    setEditorContent(html)
},
});



    // Add this useEffect after your editor definition
    useEffect(() => {
        if (editor) {
            const handleUpdate = () => {
                // Delay to ensure DOM is updated
                setTimeout(() => {
                    const previewEl = document.querySelector('.preview-content');
                    if (previewEl && window.hljs) {
                        const codeBlocks = previewEl.querySelectorAll('pre code:not(.hljs)');
                        codeBlocks.forEach(block => {
                            window.hljs.highlightElement(block);
                        });
                    }
                }, 100);
            };

            editor.on('update', handleUpdate);
            handleUpdate(); // Initial highlight

            return () => {
                editor.off('update', handleUpdate);
            };
        }
    }, [editor]);


    const addImageFromUrl = useCallback(() => {
        const url = window.prompt('Enter image URL');
        if (url && editor) {
            editor.chain().focus().setImage({
                src: url,
                width: '300px',
                height: 'auto',
                align: 'left'
            }).run();
        }
    }, [editor]);

    const addImageFromFile = useCallback((event) => {
        const file = event.target.files[0];
        if (!file || !editor) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            editor.chain().focus().setImage({
                src: reader.result,
                width: '300px',
                height: 'auto',
                align: 'left'
            }).run();
        };
        reader.readAsDataURL(file);
    }, [editor]);

    const updateImageAttributes = useCallback((attributes) => {
        if (!editor || !selectedImage) return;

        editor.chain()
            .focus()
            .updateAttributes('image', attributes)
            .run();

        setSelectedImage(prev => ({...prev, ...attributes}));
    }, [editor, selectedImage]);

    const saveContent = useCallback(() => {
        if (!editor) return;
        const content = editor.getHTML();
        // console.log(content)
        uploadFunction(content);
    }, [editor]);

    const exportAsText = useCallback(() => {
        if (!editor) return;
        const content = editor.getText();
        const blob = new Blob([content], {type: 'text/plain'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'purple-document.txt';
        a.click();
        URL.revokeObjectURL(url);
    }, [editor]);

    const uploadContent = useCallback(() => {
        if (!editor) return;
        setShowUploadModal(true);
    }, [editor]);

    const copyToClipboard = useCallback(async () => {
        if (!editor) return;
        const content = editor.getHTML();
        try {
            await navigator.clipboard.writeText(content);
            alert('HTML content copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy: ', err);
            const textArea = document.createElement('textarea');
            textArea.value = content;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            alert('HTML content copied to clipboard!');
        }
    }, [editor]);

    const changeFontSize = useCallback((size) => {
        setFontSize(size);
        const editorEl = document.querySelector('.ProseMirror');
        if (editorEl) {
            editorEl.style.fontSize = `${size}px`;
        }
    }, []);

    if (!editor) {
        return (
            <div
                className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
                <div className="text-white text-xl">Loading Enhanced Split-Screen Editor...</div>
            </div>
        );
    }

    const ToolbarButton = ({onClick, isActive = false, disabled = false, children, title}) => (
        <button
            onClick={onClick}
            disabled={disabled}
            title={title}
            className={`
        p-1.5 rounded-md transition-all duration-200 text-sm
        ${isActive ? 'bg-purple-600 text-white shadow-md scale-105' : 'text-purple-600 hover:bg-purple-100 hover:text-purple-700'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 hover:shadow-sm'}
      `}
        >
            {children}
        </button>
    );

    return (
        <div className="h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 flex flex-col relative z-10">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 text-white p-3 shadow-lg">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold">Enhanced Split-Screen Rich Text Editor</h1>
                        <p className="text-purple-100 text-sm">Editor on the left, live preview on the right with syntax
                            highlighting</p>
                    </div>
                    <button
                        onClick={() => setIsFullScreen(!isFullScreen)}
                        className="p-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors"
                        title={isFullScreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                    >
                        {isFullScreen ? <Minimize2 size={20}/> : <Maximize2 size={20}/>}
                    </button>
                </div>
            </div>

            {/* Toolbar */}
            <div
                className="sticky top-0 z-40 border-b border-purple-200 bg-gradient-to-r from-purple-50 to-indigo-50 p-3 shadow-sm backdrop-blur-sm bg-opacity-95">
                <div className="flex flex-wrap gap-1 items-center">
                    {/* Text Formatting */}
                    <div
                        className="flex items-center gap-0.5 mr-3 p-1.5 bg-white rounded-md shadow-sm border border-purple-200">
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleBold().run()}
                            isActive={editor.isActive('bold')}
                            title="Bold"
                        >
                            <Bold size={14}/>
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleItalic().run()}
                            isActive={editor.isActive('italic')}
                            title="Italic"
                        >
                            <Italic size={14}/>
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleUnderline().run()}
                            isActive={editor.isActive('underline')}
                            title="Underline"
                        >
                            <Underline size={14}/>
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleStrike().run()}
                            isActive={editor.isActive('strike')}
                            title="Strikethrough"
                        >
                            <Strikethrough size={14}/>
                        </ToolbarButton>
                    </div>

                    {/* Alignment */}
                    <div
                        className="flex items-center gap-0.5 mr-3 p-1.5 bg-white rounded-md shadow-sm border border-purple-200">
                        <ToolbarButton
                            onClick={() => editor.chain().focus().setTextAlign('left').run()}
                            isActive={editor.isActive({textAlign: 'left'})}
                            title="Align Left"
                        >
                            <AlignLeft size={14}/>
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().setTextAlign('center').run()}
                            isActive={editor.isActive({textAlign: 'center'})}
                            title="Align Center"
                        >
                            <AlignCenter size={14}/>
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().setTextAlign('right').run()}
                            isActive={editor.isActive({textAlign: 'right'})}
                            title="Align Right"
                        >
                            <AlignRight size={14}/>
                        </ToolbarButton>
                    </div>

                    {/* Lists */}
                    <div
                        className="flex items-center gap-0.5 mr-3 p-1.5 bg-white rounded-md shadow-sm border border-purple-200">
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleBulletList().run()}
                            isActive={editor.isActive('bulletList')}
                            title="Bullet List"
                        >
                            <List size={14}/>
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleOrderedList().run()}
                            isActive={editor.isActive('orderedList')}
                            title="Numbered List"
                        >
                            <ListOrdered size={14}/>
                        </ToolbarButton>
                    </div>

                    {/* Other Elements */}
                    <div
                        className="flex items-center gap-0.5 mr-3 p-1.5 bg-white rounded-md shadow-sm border border-purple-200">
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleBlockquote().run()}
                            isActive={editor.isActive('blockquote')}
                            title="Quote"
                        >
                            <Quote size={14}/>
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                            isActive={editor.isActive('codeBlock')}
                            title="Code Block"
                        >
                            <Code size={14}/>
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().setHorizontalRule().run()}
                            title="Horizontal Rule"
                        >
                            <Minus size={14}/>
                        </ToolbarButton>
                    </div>

                    {/* Colors */}
                    <div
                        className="flex items-center gap-1.5 mr-3 p-1.5 bg-white rounded-md shadow-sm border border-purple-200">
                        <input
                            type="color"
                            onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
                            className="w-6 h-6 rounded cursor-pointer border border-purple-300 hover:border-purple-500"
                            title="Text Color"
                            defaultValue="#8b5cf6"
                        />
                        <input
                            type="color"
                            onChange={(e) => editor.chain().focus().toggleHighlight({color: e.target.value}).run()}
                            className="w-6 h-6 rounded cursor-pointer border border-purple-300 hover:border-purple-500"
                            title="Highlight Color"
                            defaultValue="#e879f9"
                        />
                    </div>

                    {/* Undo/Redo */}
                    <div
                        className="flex items-center gap-0.5 mr-3 p-1.5 bg-white rounded-md shadow-sm border border-purple-200">
                        <ToolbarButton
                            onClick={() => editor.chain().focus().undo().run()}
                            disabled={!editor.can().undo()}
                            title="Undo"
                        >
                            <Undo size={14}/>
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().redo().run()}
                            disabled={!editor.can().redo()}
                            title="Redo"
                        >
                            <Redo size={14}/>
                        </ToolbarButton>
                    </div>
                </div>

                {/* Second Row */}
                <div className="flex flex-wrap gap-1 items-center mt-2 pt-2 border-t border-purple-200">
                    {/* Font Size */}
                    <div
                        className="flex items-center gap-1.5 mr-3 p-1.5 bg-white rounded-md shadow-sm border border-purple-200">
                        <Type size={14} className="text-purple-600"/>
                        <select
                            value={fontSize}
                            onChange={(e) => changeFontSize(Number(e.target.value))}
                            className="px-2 py-1 border border-purple-300 rounded text-xs focus:border-purple-500 focus:ring-1 focus:ring-purple-200"
                        >
                            <option value={12}>12px</option>
                            <option value={14}>14px</option>
                            <option value={16}>16px</option>
                            <option value={18}>18px</option>
                            <option value={20}>20px</option>
                            <option value={24}>24px</option>
                            <option value={32}>32px</option>
                        </select>
                    </div>

                    {/* Headings */}
                    <div
                        className="flex items-center gap-0.5 mr-3 p-1.5 bg-white rounded-md shadow-sm border border-purple-200">
                        {[1, 2, 3].map((level) => (
                            <ToolbarButton
                                key={level}
                                onClick={() => editor.chain().focus().toggleHeading({level}).run()}
                                isActive={editor.isActive('heading', {level})}
                                title={`Heading ${level}`}
                            >
                                <span className="font-bold text-xs">H{level}</span>
                            </ToolbarButton>
                        ))}
                    </div>

                    {/* Image */}
                    <div
                        className="flex items-center gap-0.5 mr-3 p-1.5 bg-white rounded-md shadow-sm border border-purple-200">
                        <ToolbarButton onClick={addImageFromUrl} title="Add Image from URL">
                            <Image size={14}/>
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => fileInputRef.current?.click()}
                            title="Upload Image"
                        >
                            <div className="flex items-center gap-0.5">
                                <Image size={14}/>
                                <span className="text-xs">+</span>
                            </div>
                        </ToolbarButton>
                    </div>

                    {/* Actions */}
                    <div
                        className="flex items-center gap-0.5 ml-auto p-1.5 bg-white rounded-md shadow-sm border border-purple-200">
                        <ToolbarButton onClick={uploadContent} title="View HTML Source">
                            <Upload size={14}/>
                        </ToolbarButton>
                        <ToolbarButton onClick={copyToClipboard} title="Copy HTML to Clipboard">
                            <Copy size={14}/>
                        </ToolbarButton>
                        <ToolbarButton onClick={saveContent} title="Save as HTML">
                            <Save size={14}/>
                        </ToolbarButton>
                        <ToolbarButton onClick={exportAsText} title="Export as Text">
                            <Download size={14}/>
                        </ToolbarButton>
                    </div>
                </div>
            </div>

            {/* Split Screen Content */}
            <div className="flex-1 flex">
                {/* Editor Side (Left) */}
                <div
                    className={`${isFullScreen ? 'w-full' : 'w-1/2'} bg-white border-r-2 border-purple-200 flex flex-col`}>
                    <div className="bg-purple-100 px-3 py-2 border-b border-purple-200">
                        <h3 className="text-xs font-semibold text-purple-700 flex items-center gap-1">
                            <FileText size={12}/>
                            Editor
                        </h3>
                    </div>
                    <div className="flex-1 overflow-auto">
                        <EditorContent
                            editor={editor}
                            className="h-full"
                        />
                    </div>
                </div>

                {/* Preview Side (Right) */}
                {!isFullScreen && (
                    <div className="w-1/2 bg-gradient-to-br from-purple-50 to-white flex flex-col">
                        <div className="bg-purple-100 px-3 py-2 border-b border-purple-200">
                            <h3 className="text-xs font-semibold text-purple-700 flex items-center gap-1">
                                <FileText size={12}/>
                                Live Preview
                            </h3>
                        </div>
                        <div className="flex-1 p-4 overflow-auto">
                            <div
                                className="prose prose-purple max-w-none bg-white p-4 rounded-lg shadow-lg border border-purple-200 min-h-full preview-content"
                                dangerouslySetInnerHTML={{__html: editor.getHTML()}}
                                key={editor.getHTML()} // Force re-render when content changes
                                style={{fontSize: `${fontSize}px`}}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Status Bar */}
            <div
                className="bg-gradient-to-r from-purple-100 to-indigo-100 px-4 py-2 text-xs text-purple-700 border-t border-purple-200 shadow-sm">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                            <FileText size={12}/>
                            <span>Words: {editor.getText().split(' ').filter(word => word.length > 0).length}</span>
                        </div>
                        <div>Characters: {editor.getText().length}</div>
                    </div>
                    <div className="text-xs text-purple-600">
                        Enhanced Split-Screen Editor • {isFullScreen ? 'Editor Only' : 'Editor + Preview'} • Click
                        images to edit
                    </div>
                </div>
            </div>

            {/* Image Edit Modal */}
            {showImageModal && selectedImage && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full mx-4 border-4 border-purple-200">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-purple-700 flex items-center gap-2">
                                <Move size={20}/>
                                Edit Image
                            </h3>
                            <button
                                onClick={() => setShowImageModal(false)}
                                className="text-purple-500 hover:text-purple-700 text-2xl font-bold"
                            >
                                ×
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-purple-700 mb-2">Width</label>
                                <input
                                    type="text"
                                    value={selectedImage.width || '300px'}
                                    onChange={(e) => updateImageAttributes({width: e.target.value})}
                                    className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-200"
                                    placeholder="300px, 50%, auto"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-purple-700 mb-2">Height</label>
                                <input
                                    type="text"
                                    value={selectedImage.height || 'auto'}
                                    onChange={(e) => updateImageAttributes({height: e.target.value})}
                                    className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-200"
                                    placeholder="200px, 50%, auto"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-purple-700 mb-2">Alignment</label>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => updateImageAttributes({align: 'left'})}
                                        className={`flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                                            selectedImage.align === 'left'
                                                ? 'bg-purple-600 text-white'
                                                : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                                        }`}
                                    >
                                        <AlignLeft size={16}/>
                                        Left
                                    </button>
                                    <button
                                        onClick={() => updateImageAttributes({align: 'center'})}
                                        className={`flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                                            selectedImage.align === 'center'
                                                ? 'bg-purple-600 text-white'
                                                : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                                        }`}
                                    >
                                        <AlignCenter size={16}/>
                                        Center
                                    </button>
                                    <button
                                        onClick={() => updateImageAttributes({align: 'right'})}
                                        className={`flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                                            selectedImage.align === 'right'
                                                ? 'bg-purple-600 text-white'
                                                : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                                        }`}
                                    >
                                        <AlignRight size={16}/>
                                        Right
                                    </button>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={() => updateImageAttributes({width: '100px', height: 'auto'})}
                                    className="flex items-center gap-2 px-3 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm"
                                >
                                    Small
                                </button>
                                <button
                                    onClick={() => updateImageAttributes({width: '300px', height: 'auto'})}
                                    className="flex items-center gap-2 px-3 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm"
                                >
                                    Medium
                                </button>
                                <button
                                    onClick={() => updateImageAttributes({width: '500px', height: 'auto'})}
                                    className="flex items-center gap-2 px-3 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm"
                                >
                                    Large
                                </button>
                                <button
                                    onClick={() => setShowImageModal(false)}
                                    className="ml-auto px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                                >
                                    Done
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Upload Modal */}
            {showUploadModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div
                        className="bg-white rounded-xl shadow-2xl p-6 max-w-4xl w-full mx-4 max-h-96 border-4 border-purple-200">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-purple-700">HTML Source Code</h3>
                            <button
                                onClick={() => setShowUploadModal(false)}
                                className="text-purple-500 hover:text-purple-700 text-2xl font-bold"
                            >
                                ×
                            </button>
                        </div>
                        <div className="bg-gray-100 rounded-lg p-4 max-h-64 overflow-auto border border-purple-200">
              <pre className="text-sm text-gray-800 whitespace-pre-wrap font-mono">
                {editor.getHTML()}
              </pre>
                        </div>
                        <div className="flex gap-3 mt-4">
                            <button
                                onClick={copyToClipboard}
                                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                            >
                                <Copy size={16}/>
                                Copy HTML
                            </button>
                            <button
                                onClick={() => setShowUploadModal(false)}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Hidden File Input */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={addImageFromFile}
                className="hidden"
            />

            {/* Custom Styles for Preview */}
            <style jsx>{`
                /* Highlight.js base styles */
                .hljs {
                    display: block;
                    overflow-x: auto;
                    padding: 0.5em;
                    background: #1f2937;
                    color: #f9fafb;
                }

                .hljs-comment,
                .hljs-quote {
                    color: #9ca3af;
                    font-style: italic;
                }

                .hljs-keyword,
                .hljs-selector-tag,
                .hljs-subst {
                    color: #f472b6;
                    font-weight: bold;
                }

                .hljs-number,
                .hljs-literal,
                .hljs-variable,
                .hljs-template-variable,
                .hljs-tag .hljs-attr {
                    color: #60a5fa;
                }

                .hljs-string,
                .hljs-doctag {
                    color: #34d399;
                }

                .hljs-title,
                .hljs-section,
                .hljs-selector-id {
                    color: #fbbf24;
                    font-weight: bold;
                }

                .hljs-subst {
                    font-weight: normal;
                }

                .hljs-type,
                .hljs-class .hljs-title {
                    color: #a78bfa;
                    font-weight: bold;
                }

                .hljs-tag,
                .hljs-name,
                .hljs-attribute {
                    color: #f87171;
                    font-weight: normal;
                }

                .hljs-regexp,
                .hljs-link {
                    color: #10b981;
                }

                .hljs-symbol,
                .hljs-bullet {
                    color: #8b5cf6;
                }

                .hljs-built_in,
                .hljs-builtin-name {
                    color: #06b6d4;
                }

                .hljs-meta {
                    color: #9333ea;
                }

                .hljs-deletion {
                    background: #fca5a5;
                }

                .hljs-addition {
                    background: #86efac;
                }

                .hljs-emphasis {
                    font-style: italic;
                }

                .hljs-strong {
                    font-weight: bold;
                }

                .preview-content {
                    font-family: inherit;
                    line-height: 1.6;
                }

                .preview-content h1, .preview-content h2, .preview-content h3 {
                    margin-top: 1.5em;
                    margin-bottom: 0.5em;
                    font-weight: bold;
                }

                .preview-content h1 {
                    font-size: 2em;
                    border-bottom: 2px solid #8b5cf6;
                    padding-bottom: 0.3em;
                }

                .preview-content h2 {
                    font-size: 1.5em;
                    color: #7c3aed;
                }

                .preview-content h3 {
                    font-size: 1.25em;
                    color: #8b5cf6;
                }

                .preview-content p {
                    margin-bottom: 1em;
                }

                .preview-content ul, .preview-content ol {
                    margin-left: 1.5em;
                    margin-bottom: 1em;
                }

                .preview-content li {
                    margin-bottom: 0.25em;
                }

                .preview-content blockquote {
                    border-left: 4px solid #8b5cf6;
                    margin: 1.5em 0;
                    padding-left: 1em;
                    font-style: italic;
                    background: #f3f4f6;
                    padding: 1em;
                    border-radius: 0 8px 8px 0;
                }

                .preview-content pre {
                    background: #1f2937 !important;
                    color: #f9fafb !important;
                    padding: 1em;
                    border-radius: 8px;
                    overflow-x: auto;
                    margin: 1em 0;
                    border: 1px solid #8b5cf6;
                }

                .preview-content code {
                    background: #f3f4f6;
                    padding: 0.2em 0.4em;
                    border-radius: 4px;
                    font-size: 0.9em;
                    font-family: 'Monaco', 'Consolas', monospace;
                }

                .preview-content pre code {
                    background: transparent;
                    padding: 0;
                    color: inherit;
                }

                .preview-content img {
                    max-width: 100%;
                    height: auto;
                    border-radius: 8px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    border: 1px solid #e5e7eb;
                    cursor: pointer;
                    transition: transform 0.2s;
                }

                .preview-content img:hover {
                    transform: scale(1.02);
                }

                .preview-content hr {
                    border: none;
                    height: 2px;
                    background: linear-gradient(to right, #8b5cf6, #ec4899);
                    margin: 2em 0;
                    border-radius: 1px;
                }

                .preview-content strong {
                    color: #7c3aed;
                    font-weight: 600;
                }

                .preview-content em {
                    color: #8b5cf6;
                }

                .preview-content u {
                    text-decoration-color: #8b5cf6;
                }

                /* Syntax highlighting styles for preview */
                .preview-content .hljs {
                    background: #1f2937 !important;
                }

                .preview-content .hljs-keyword {
                    color: #f472b6;
                }

                .preview-content .hljs-string {
                    color: #34d399;
                }

                .preview-content .hljs-number {
                    color: #60a5fa;
                }

                .preview-content .hljs-comment {
                    color: #9ca3af;
                    font-style: italic;
                }

                .preview-content .hljs-function {
                    color: #fbbf24;
                }

                .preview-content .hljs-variable {
                    color: #a78bfa;
                }
            `}</style>
        </div>
    );
};

export default RichTextEditor;