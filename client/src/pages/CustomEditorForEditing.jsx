import React, { useRef, useState, useCallback } from 'react';
// Add this import at the top with other imports
import 'highlight.js/styles/github-dark.css'; // or any other theme
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import ImageExtension from '@tiptap/extension-image';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import TextAlign from '@tiptap/extension-text-align';
import UnderlineExtension from '@tiptap/extension-underline';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableHeader from '@tiptap/extension-table-header';
import TableCell from '@tiptap/extension-table-cell';
import { createLowlight } from 'lowlight';
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
    Move,
    Table as TableIcon,
    Plus,
    Trash2,
    Grid3x3,
    MoreVertical,
    MoreHorizontal
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
import { useEffect } from 'react';

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
                    return { width: attributes.width }
                },
            },
            height: {
                default: null,
                parseHTML: element => element.getAttribute('height'),
                renderHTML: attributes => {
                    if (!attributes.height) return {}
                    return { height: attributes.height }
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

// Custom Table Extension with enhanced features
const CustomTable = Table.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            alignment: {
                default: 'left',
                parseHTML: element => element.style.marginLeft === 'auto' && element.style.marginRight === 'auto' ? 'center' :
                    element.style.marginLeft === 'auto' ? 'right' : 'left',
                renderHTML: attributes => {
                    const alignment = attributes.alignment || 'left';
                    const styles = {
                        left: 'margin-left: 0; margin-right: auto;',
                        center: 'margin-left: auto; margin-right: auto;',
                        right: 'margin-left: auto; margin-right: 0;'
                    };
                    return {
                        style: `${styles[alignment]} border-collapse: collapse; width: 100%; border: 2px solid #8b5cf6;`
                    };
                },
            },
        }
    },
    // Remove the renderHTML method completely
});

const RichTextEditorForEditing = ({ editorContent,setEditorContent,customEditContent = null, setCustomEditContent = null }) => {
    const fileInputRef = useRef();
    const [fontSize, setFontSize] = useState(16);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [showImageModal, setShowImageModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [showTableModal, setShowTableModal] = useState(false);
    const [tableSettings, setTableSettings] = useState({
        rows: 3,
        cols: 3,
        withHeaderRow: true,
        alignment: 'left'
    });
    // In your parent component or at the top of RichTextEditor
    

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
            CustomTable.configure({
                resizable: true,
                HTMLAttributes: {
                    class: 'table-custom border-collapse border-2 border-purple-500 w-full',
                },
            }),
            TableRow.configure({
                HTMLAttributes: {
                    class: 'table-row',
                },
            }),
            TableHeader.configure({
                HTMLAttributes: {
                    class: 'table-header bg-purple-100 border border-purple-400 p-2 font-bold text-purple-800',
                },
            }),
            TableCell.configure({
                HTMLAttributes: {
                    class: 'table-cell border border-purple-300 p-2',
                },
            }),
        ],
        content: customEditContent == null ? `<p>Start typing...</p>` : customEditContent,
        editorProps: {
            attributes: {
                class: 'prose prose-purple max-w-none focus:outline-none min-h-full p-6 text-gray-800',
                style: `min-height: calc(100vh - 200px); font-size: ${fontSize}px;`,
            },
            handleClickOn: (view, pos, node, nodePos, event) => {
                if (node.type.name === 'image') {
                    const { src, width, height, align } = node.attrs;
                    setSelectedImage({
                        src,
                        width: width || '300px',
                        height: height || 'auto',
                        align: align || 'left',
                        pos: nodePos
                    });
                    setShowImageModal(true);
                    return true;
                }
                return false;
            },
        },

        // Hook into editor changes here
        onUpdate: ({ editor }) => {
            console.log("chages occured")
            const html = editor.getHTML();
            console.log(html)
            setEditorContent(html);
        },
        onCreate: ({ editor }) => {
            // Set initial content
            const html = editor.getHTML();
            setEditorContent(html);
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

        // Find the image node and update it
        const { state } = editor;
        const { doc } = state;

        doc.descendants((node, pos) => {
            if (node.type.name === 'image' && node.attrs.src === selectedImage.src) {
                editor.chain()
                    .focus()
                    .setNodeSelection(pos)
                    .updateAttributes('image', attributes)
                    .run();
                return false; // Stop searching
            }
        });

        setSelectedImage(prev => ({ ...prev, ...attributes }));
    }, [editor, selectedImage]);


    // Table Functions
    const insertTable = useCallback(() => {
        if (!editor) return;

        const { rows, cols, withHeaderRow, alignment } = tableSettings;

        editor.chain().focus().insertTable({
            rows,
            cols,
            withHeaderRow
        }).run();

        // Update table attributes after insertion
        setTimeout(() => {
            editor.chain().focus().updateAttributes('table', { alignment }).run();
        }, 100);

        setShowTableModal(false);
    }, [editor, tableSettings]);

    const addTableRow = useCallback(() => {
        if (!editor) return;
        editor.chain().focus().addRowAfter().run();
    }, [editor]);

    const deleteTableRow = useCallback(() => {
        if (!editor) return;
        editor.chain().focus().deleteRow().run();
    }, [editor]);

    const addTableColumn = useCallback(() => {
        if (!editor) return;
        editor.chain().focus().addColumnAfter().run();
    }, [editor]);

    const deleteTableColumn = useCallback(() => {
        if (!editor) return;
        editor.chain().focus().deleteColumn().run();
    }, [editor]);

    const deleteTable = useCallback(() => {
        if (!editor) return;
        editor.chain().focus().deleteTable().run();
    }, [editor]);

    const toggleHeaderRow = useCallback(() => {
        if (!editor) return;
        editor.chain().focus().toggleHeaderRow().run();
    }, [editor]);

    const mergeTableCells = useCallback(() => {
        if (!editor) return;
        editor.chain().focus().mergeCells().run();
    }, [editor]);

    const splitTableCell = useCallback(() => {
        if (!editor) return;
        editor.chain().focus().splitCell().run();
    }, [editor]);

    const saveContent = useCallback(() => {
        if (!editor) return;
        const content = editor.getHTML();
        // uploadFunction(content);
        console.log('Saving content:', content);
    }, [editor]);

    const exportAsText = useCallback(() => {
        if (!editor) return;
        const content = editor.getText();
        const blob = new Blob([content], { type: 'text/plain' });
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

    const ToolbarButton = ({ onClick, isActive = false, disabled = false, children, title }) => (
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
                        <h1 className="text-2xl font-bold">Enhanced Split-Screen Rich Text Editor with Tables</h1>
                        <p className="text-purple-100 text-sm">Editor on the left, live preview on the right with syntax highlighting and table support</p>
                    </div>
                    <button
                        onClick={() => setIsFullScreen(!isFullScreen)}
                        className="p-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors"
                        title={isFullScreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                    >
                        {isFullScreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
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
                            <Bold size={14} />
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleItalic().run()}
                            isActive={editor.isActive('italic')}
                            title="Italic"
                        >
                            <Italic size={14} />
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleUnderline().run()}
                            isActive={editor.isActive('underline')}
                            title="Underline"
                        >
                            <Underline size={14} />
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleStrike().run()}
                            isActive={editor.isActive('strike')}
                            title="Strikethrough"
                        >
                            <Strikethrough size={14} />
                        </ToolbarButton>
                    </div>

                    {/* Alignment */}
                    <div
                        className="flex items-center gap-0.5 mr-3 p-1.5 bg-white rounded-md shadow-sm border border-purple-200">
                        <ToolbarButton
                            onClick={() => editor.chain().focus().setTextAlign('left').run()}
                            isActive={editor.isActive({ textAlign: 'left' })}
                            title="Align Left"
                        >
                            <AlignLeft size={14} />
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().setTextAlign('center').run()}
                            isActive={editor.isActive({ textAlign: 'center' })}
                            title="Align Center"
                        >
                            <AlignCenter size={14} />
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().setTextAlign('right').run()}
                            isActive={editor.isActive({ textAlign: 'right' })}
                            title="Align Right"
                        >
                            <AlignRight size={14} />
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
                            <List size={14} />
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleOrderedList().run()}
                            isActive={editor.isActive('orderedList')}
                            title="Numbered List"
                        >
                            <ListOrdered size={14} />
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
                            <Quote size={14} />
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                            isActive={editor.isActive('codeBlock')}
                            title="Code Block"
                        >
                            <Code size={14} />
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().setHorizontalRule().run()}
                            title="Horizontal Rule"
                        >
                            <Minus size={14} />
                        </ToolbarButton>
                    </div>

                    {/* Table Controls */}
                    <div
                        className="flex items-center gap-0.5 mr-3 p-1.5 bg-white rounded-md shadow-sm border border-purple-200">
                        <ToolbarButton
                            onClick={() => setShowTableModal(true)}
                            title="Insert Table"
                        >
                            <TableIcon size={14} />
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={addTableRow}
                            disabled={!editor.can().addRowAfter()}
                            title="Add Row"
                        >
                            <div className="flex items-center">
                                <Plus size={10} />
                                <MoreHorizontal size={10} />
                            </div>
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={addTableColumn}
                            disabled={!editor.can().addColumnAfter()}
                            title="Add Column"
                        >
                            <div className="flex items-center">
                                <Plus size={10} />
                                <MoreVertical size={10} />
                            </div>
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={deleteTable}
                            disabled={!editor.can().deleteTable()}
                            title="Delete Table"
                        >
                            <Trash2 size={14} />
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
                            onChange={(e) => editor.chain().focus().toggleHighlight({ color: e.target.value }).run()}
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
                            <Undo size={14} />
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => editor.chain().focus().redo().run()}
                            disabled={!editor.can().redo()}
                            title="Redo"
                        >
                            <Redo size={14} />
                        </ToolbarButton>
                    </div>
                </div>

                {/* Second Row */}
                <div className="flex flex-wrap gap-1 items-center mt-2 pt-2 border-t border-purple-200">
                    {/* Font Size */}
                    <div
                        className="flex items-center gap-1.5 mr-3 p-1.5 bg-white rounded-md shadow-sm border border-purple-200">
                        <Type size={14} className="text-purple-600" />
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
                                onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
                                isActive={editor.isActive('heading', { level })}
                                title={`Heading ${level}`}
                            >
                                <span className="font-bold text-xs">H{level}</span>
                            </ToolbarButton>
                        ))}
                    </div>

                    {/* Table Row Controls (when in table) */}
                    {editor.isActive('table') && (
                        <div
                            className="flex items-center gap-0.5 mr-3 p-1.5 bg-white rounded-md shadow-sm border border-purple-200">
                            <ToolbarButton
                                onClick={deleteTableRow}
                                disabled={!editor.can().deleteRow()}
                                title="Delete Row"
                            >
                                <div className="flex items-center text-red-600">
                                    <Trash2 size={10} />
                                    <MoreHorizontal size={10} />
                                </div>
                            </ToolbarButton>
                            <ToolbarButton
                                onClick={deleteTableColumn}
                                disabled={!editor.can().deleteColumn()}
                                title="Delete Column"
                            >
                                <div className="flex items-center text-red-600">
                                    <Trash2 size={10} />
                                    <MoreVertical size={10} />
                                </div>
                            </ToolbarButton>
                            <ToolbarButton
                                onClick={toggleHeaderRow}
                                title="Toggle Header Row"
                            >
                                <Grid3x3 size={14} />
                            </ToolbarButton>
                            <ToolbarButton
                                onClick={mergeTableCells}
                                disabled={!editor.can().mergeCells()}
                                title="Merge Cells"
                            >
                                <span className="text-xs font-bold">M</span>
                            </ToolbarButton>
                            <ToolbarButton
                                onClick={splitTableCell}
                                disabled={!editor.can().splitCell()}
                                title="Split Cell"
                            >
                                <span className="text-xs font-bold">S</span>
                            </ToolbarButton>
                        </div>
                    )}

                    {/* Image */}
                    <div
                        className="flex items-center gap-0.5 mr-3 p-1.5 bg-white rounded-md shadow-sm border border-purple-200">
                        <ToolbarButton onClick={addImageFromUrl} title="Add Image from URL">
                            <Image size={14} />
                        </ToolbarButton>
                        <ToolbarButton
                            onClick={() => fileInputRef.current?.click()}
                            title="Upload Image"
                        >
                            <div className="flex items-center gap-0.5">
                                <Image size={14} />
                                <span className="text-xs">+</span>
                            </div>
                        </ToolbarButton>
                    </div>

                    {/* Actions */}
                    <div
                        className="flex items-center gap-0.5 ml-auto p-1.5 bg-white rounded-md shadow-sm border border-purple-200">
                        <ToolbarButton onClick={uploadContent} title="View HTML Source">
                            <Upload size={14} />
                        </ToolbarButton>
                        <ToolbarButton onClick={copyToClipboard} title="Copy HTML to Clipboard">
                            <Copy size={14} />
                        </ToolbarButton>
                        <ToolbarButton onClick={saveContent} title="Save as HTML">
                            <Save size={14} />
                        </ToolbarButton>
                        <ToolbarButton onClick={exportAsText} title="Export as Text">
                            <Download size={14} />
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
                            <FileText size={12} />
                            Editor
                        </h3>
                    </div>
                    <div className="flex-1 overflow-auto">
                        <EditorContent editor={editor} />
                    </div>
                </div>

                {/* Preview Side (Right) */}
                {!isFullScreen && (
                    <div className="w-1/2 bg-gradient-to-br from-purple-50 to-indigo-50 flex flex-col">
                        <div className="bg-purple-100 px-3 py-2 border-b border-purple-200">
                            <h3 className="text-xs font-semibold text-purple-700 flex items-center gap-1">
                                <Move size={12} />
                                Live Preview
                            </h3>
                        </div>
                        <div className="flex-1 overflow-auto p-6">
                            <div
                                className="preview-content prose prose-purple max-w-none"
                                style={{ fontSize: `${fontSize}px` }}
                                dangerouslySetInnerHTML={{ __html: editorContent }}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* File Input (Hidden) */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={addImageFromFile}
                className="hidden"
            />

            {/* Upload Modal */}
            {showUploadModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-2xl w-full m-4 max-h-96 overflow-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-purple-700">HTML Source</h3>
                            <button
                                onClick={() => setShowUploadModal(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                        </div>
                        <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-auto max-h-64">
                            <code>{editor.getHTML()}</code>
                        </pre>
                        <div className="mt-4 flex gap-2">
                            <button
                                onClick={copyToClipboard}
                                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                            >
                                Copy to Clipboard
                            </button>
                            <button
                                onClick={() => setShowUploadModal(false)}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Image Modal */}
            {showImageModal && selectedImage && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full m-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-purple-700">Image Settings</h3>
                            <button
                                onClick={() => setShowImageModal(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Width (px)
                                </label>
                                <input
                                    type="number"
                                    value={parseInt(selectedImage.width) || 300}
                                    onChange={(e) => updateImageAttributes({ width: `${e.target.value}px` })}
                                    className="w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Alignment
                                </label>
                                <select
                                    value={selectedImage.align || 'left'}
                                    onChange={(e) => updateImageAttributes({ align: e.target.value })}
                                    className="w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                >
                                    <option value="left">Left</option>
                                    <option value="center">Center</option>
                                    <option value="right">Right</option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-6 flex gap-2">
                            <button
                                onClick={() => setShowImageModal(false)}
                                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                            >
                                Apply Changes
                            </button>
                            <button
                                onClick={() => {
                                    editor.chain().focus().deleteRange({ from: selectedImage.pos, to: selectedImage.pos + 1 }).run();
                                    setShowImageModal(false);
                                }}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                Delete Image
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Table Modal */}
            {showTableModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full m-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-purple-700">Insert Table</h3>
                            <button
                                onClick={() => setShowTableModal(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Rows
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="10"
                                        value={tableSettings.rows}
                                        onChange={(e) => setTableSettings(prev => ({ ...prev, rows: parseInt(e.target.value) }))}
                                        className="w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Columns
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="10"
                                        value={tableSettings.cols}
                                        onChange={(e) => setTableSettings(prev => ({ ...prev, cols: parseInt(e.target.value) }))}
                                        className="w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Table Caption (Optional)
                                </label>
                                <input
                                    type="text"
                                    value={tableSettings.caption}
                                    onChange={(e) => setTableSettings(prev => ({ ...prev, caption: e.target.value }))}
                                    placeholder="Enter table caption..."
                                    className="w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Table Alignment
                                </label>
                                <select
                                    value={tableSettings.alignment}
                                    onChange={(e) => setTableSettings(prev => ({ ...prev, alignment: e.target.value }))}
                                    className="w-full px-3 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                >
                                    <option value="left">Left</option>
                                    <option value="center">Center</option>
                                    <option value="right">Right</option>
                                </select>
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="headerRow"
                                    checked={tableSettings.withHeaderRow}
                                    onChange={(e) => setTableSettings(prev => ({ ...prev, withHeaderRow: e.target.checked }))}
                                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                                />
                                <label htmlFor="headerRow" className="ml-2 block text-sm text-gray-700">
                                    Include header row
                                </label>
                            </div>
                        </div>

                        <div className="mt-6 flex gap-2">
                            <button
                                onClick={insertTable}
                                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                            >
                                Insert Table
                            </button>
                            <button
                                onClick={() => setShowTableModal(false)}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RichTextEditorForEditing;