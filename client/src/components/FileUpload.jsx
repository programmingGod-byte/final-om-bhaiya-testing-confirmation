import React, { useState } from 'react';
import URLSITE from '../constant';
export default function FileUploader() {
  const [fileUrl, setFileUrl] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch(`${URLSITE}/api/admin/upload-file`, {
        method: 'POST',
        body: formData,
      });
      
      const data = await res.json();
      console.log('Signed URL:', data.url); // 🔥 Here's your URL
      setFileUrl(data.url);
      setShowModal(true);
      
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  const triggerUpload = () => {
    document.getElementById('fileInput').click();
  };

  const copyToClipboard = () => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(fileUrl)
        .then(() => {
          alert('Link copied to clipboard!');
        })
        .catch(() => {
          fallbackCopy(fileUrl);
        });
    } else {
      fallbackCopy(fileUrl);
    }
  };

  const fallbackCopy = (text) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.top = 0;
    textArea.style.left = 0;
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = 0;
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand('copy');
      alert(successful ? 'Link copied!' : 'Failed to copy!');
    } catch (err) {
      alert('Copy failed');
    }

    document.body.removeChild(textArea);
  };

  return (
    <div className="inline-block">
      <input
        type="file"
        id="fileInput"
        className="hidden"
        onChange={handleFileUpload}
      />
      <button
        onClick={triggerUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Upload File
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-lg text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Upload Successful ✅</h2>
            <p className="text-sm text-gray-600 break-all bg-gray-100 p-2 rounded mb-4">{fileUrl}</p>
            <div className="flex justify-center gap-3">
              <button
                onClick={copyToClipboard}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
              >
                Copy Link
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
