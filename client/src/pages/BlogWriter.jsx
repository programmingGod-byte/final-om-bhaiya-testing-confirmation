import React, { useState } from 'react';
import axios from 'axios';
import URLSITE from '../constant';

const predefinedTags = [
  { value: 'all' },
  { value: 'vlsi' },
  { value: 'electronics' },
  { value: 'diy-electronics' },
  { value: 'electrical-engineering' },
  { value: 'electronics-design' },
  { value: 'fpga' }
];

const BlogForm = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);             // start empty
  const [spectrum, setSpectrum] = useState(['']);
  const [paperLink, setPaperLink] = useState('');
  const [modal, setModal] = useState({ show: false, message: '', error: false });

  // Spectrum helpers (unchanged)
  const handleAddField = (setter, current) => setter([...current, '']);
  const handleRemoveField = (setter, current, idx) => {
    const copy = [...current];
    copy.splice(idx, 1);
    setter(copy);
  };
  const handleFieldChange = (setter, current, idx, value) => {
    const copy = [...current];
    copy[idx] = value;
    setter(copy);
  };

  // Tag handlers
  const handleAddTag = e => {
    const val = e.target.value;
    if (val && !tags.includes(val)) {
      setTags([...tags, val]);
    }
    e.target.selectedIndex = 0; // reset dropdown
  };
  const handleDeleteTag = tagToRemove => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const handleSubmit = async () => {
    const cleanedSpectrum = spectrum.filter(s => s.trim() !== '');

    if (
      !imageUrl.trim() ||
      !title.trim() ||
      !description.trim() ||
      tags.length === 0 ||
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
        tags,
        spectrum: cleanedSpectrum,
        paperLink: paperLink.trim(),
      };
      await axios.post(`${URLSITE}/api/admin/blog-upload`, payload);
      setModal({ show: true, message: 'Blog submitted successfully!', error: false });
    } catch {
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

      {/* Tags (select from predefinedTags) */}
      <div>
        <label className="font-semibold">Tags</label>
        <div className="mt-2">
          <select
            defaultValue=""
            onChange={handleAddTag}
            className="border rounded px-3 py-2"
          >
            <option value="" disabled>
              -- select a tag --
            </option>
            {predefinedTags.map(tag => (
              <option key={tag.value} value={tag.value}>
                {tag.value}
              </option>
            ))}
          </select>
        </div>
        {tags.length > 0 && (
          <ul className="flex flex-wrap gap-2 mt-3">
            {tags.map(tag => (
              <li
                key={tag}
                className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleDeleteTag(tag)}
                  className="ml-2 text-blue-600 hover:text-blue-800 font-bold"
                >
                  &times;
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Spectrum (free-text dynamic fields) */}
      <div>
        <label className="font-semibold">Spectrum</label>
        {spectrum.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2 mt-2">
            <input
              type="text"
              value={item}
              onChange={e => handleFieldChange(setSpectrum, spectrum, idx, e.target.value)}
              className="flex-1 border rounded px-3 py-1"
              placeholder="Enter spectrum"
            />
            <button
              onClick={() => handleRemoveField(setSpectrum, spectrum, idx)}
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
