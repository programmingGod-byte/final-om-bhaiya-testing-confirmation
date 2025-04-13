import React, { useState } from 'react';
import axios from 'axios';
import URLSITE from '../constant';
const BlogForm = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState(['']);
  const [spectrum, setSpectrum] = useState(['']);
  const [paperLink, setPaperLink] = useState('');
  const [modal, setModal] = useState({ show: false, message: '', error: false });

  const handleAddField = (stateSetter, current) => {
    stateSetter([...current, '']);
  };

  const handleRemoveField = (stateSetter, current, index) => {
    const newList = [...current];
    newList.splice(index, 1);
    stateSetter(newList);
  };

  const handleFieldChange = (stateSetter, current, index, value) => {
    const newList = [...current];
    newList[index] = value;
    stateSetter(newList);
  };

  const handleSubmit = async () => {
    const cleanedTags = tags.filter(tag => tag.trim() !== '');
    const cleanedSpectrum = spectrum.filter(item => item.trim() !== '');

    if (
      !imageUrl.trim() ||
      !title.trim() ||
      !description.trim() ||
      cleanedTags.length === 0 ||
      cleanedSpectrum.length === 0 ||
      !paperLink.trim()
    ) {
      setModal({ show: true, message: 'Please fill in all required fields.', error: true });
      return;
    }

    try {
      const payload = {
        imageUrl,
        title,
        description,
        tags: cleanedTags,
        spectrum: cleanedSpectrum,
        paperLink: paperLink.trim(),
      };

      console.log(payload)
      const res = await axios.post(`${URLSITE}/api/admin/blog-upload`, payload);
      setModal({ show: true, message: 'Blog submitted successfully!', error: false });
    } catch (err) {
      setModal({ show: true, message: 'Error submitting blog', error: true });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-xl rounded-xl space-y-6">
      <h2 className="text-2xl font-bold">Write a Blog</h2>

      <input
        type="text"
        placeholder="Image URL"
        value={imageUrl}
        onChange={e => setImageUrl(e.target.value)}
        className="w-full border rounded px-3 py-2"
      />

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="w-full border rounded px-3 py-2"
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        className="w-full border rounded px-3 py-2 min-h-[120px]"
      />

      {/* Tags */}
      <div>
        <label className="font-semibold">Tags</label>
        {tags.map((tag, index) => (
          <div key={index} className="flex items-center gap-2 mt-2">
            <input
              type="text"
              value={tag}
              onChange={e => handleFieldChange(setTags, tags, index, e.target.value)}
              className="flex-1 border rounded px-3 py-1"
              placeholder="Enter tag"
            />
            <button
              onClick={() => handleRemoveField(setTags, tags, index)}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          onClick={() => handleAddField(setTags, tags)}
          className="mt-2 text-blue-500 hover:underline text-sm"
        >
          + Add Tag
        </button>
      </div>

      {/* Spectrum */}
      <div>
        <label className="font-semibold">Spectrum</label>
        {spectrum.map((item, index) => (
          <div key={index} className="flex items-center gap-2 mt-2">
            <input
              type="text"
              value={item}
              onChange={e => handleFieldChange(setSpectrum, spectrum, index, e.target.value)}
              className="flex-1 border rounded px-3 py-1"
              placeholder="Enter spectrum"
            />
            <button
              onClick={() => handleRemoveField(setSpectrum, spectrum, index)}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          onClick={() => handleAddField(setSpectrum, spectrum)}
          className="mt-2 text-blue-500 hover:underline text-sm"
        >
          + Add Spectrum
        </button>
      </div>

      {/* Paper Link */}
      <div>
        <label className="font-semibold block mb-2">Paper Link</label>
        <input
          type="text"
          value={paperLink}
          onChange={e => setPaperLink(e.target.value)}
          className="w-full border rounded px-3 py-2"
          placeholder="https://example.com/paper"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Submit Blog
      </button>

      {/* Modal */}
      {modal.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className={`text-lg font-semibold ${modal.error ? 'text-red-600' : 'text-green-600'}`}>
              {modal.message}
            </h3>
            <button
              onClick={() => setModal({ ...modal, show: false })}
              className="mt-4 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogForm;
