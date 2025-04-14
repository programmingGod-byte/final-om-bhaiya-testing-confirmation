import React, { useState } from 'react';
import URLSITE from '../constant';

const popularTags = [
  'UVM', 'RISC-V', 'FPGA', 'SystemVerilog', 'Verification', 'Low Power',
  'Machine Learning', 'EDA Tools', 'RTL Design', 'Formal Verification',
  'Power Analysis', 'Hardware Security'
];

const PaperForm = () => {
  const [imageUri, setImageUri] = useState('');
  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState(['']);
  const [description, setDescription] = useState('');
  const [paperType, setPaperType] = useState('IEEE');
  const [whatItCovers, setWhatItCovers] = useState(['']);  // holds selected tags
  const [source, setSource] = useState('IEEE');
  const [researchPaperLink, setResearchPaperLink] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState('success');

  // --- Authors handlers (unchanged) ---
  const handleAuthorChange = (idx, e) => {
    const newAuthors = [...authors];
    newAuthors[idx] = e.target.value;
    setAuthors(newAuthors);
  };
  const addAuthor = () => setAuthors([...authors, '']);
  const deleteAuthor = (idx) => setAuthors(authors.filter((_, i) => i !== idx));

  // --- What-it-covers handlers (now only selects) ---
  const handleWhatItCoversChange = (idx, e) => {
    const newCovers = [...whatItCovers];
    newCovers[idx] = e.target.value;
    setWhatItCovers(newCovers);
  };
  const addWhatItCovers = () => setWhatItCovers([...whatItCovers, '']);
  const deleteWhatItCovers = (idx) =>
    setWhatItCovers(whatItCovers.filter((_, i) => i !== idx));

  // --- Submit ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      imageUri,
      title,
      authors,
      description,
      paperType,
      whatItCovers,
      source,
      researchPaperLink,
    };
    try {
      const resp = await fetch(`${URLSITE}/api/admin/research-paper-upload`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (resp.ok) {
        setModalMessage('Your paper has been submitted successfully!');
        setModalType('success');
      } else {
        setModalMessage('Something went wrong. Please try again.');
        setModalType('error');
      }
    } catch {
      setModalMessage('Network error. Please try again.');
      setModalType('error');
    }
    setShowModal(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold mb-8 text-center">Submit Your Paper</h2>
      <form onSubmit={handleSubmit}>
        {/* Image URI */}
        <div className="mb-6">
          <label htmlFor="imageUri" className="block text-lg font-medium text-gray-700">
            Image URI
          </label>
          <input
            type="text"
            id="imageUri"
            className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={imageUri}
            onChange={(e) => setImageUri(e.target.value)}
            required
          />
        </div>

        {/* Title */}
        <div className="mb-6">
          <label htmlFor="title" className="block text-lg font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Authors */}
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700">Authors</label>
          {authors.map((author, idx) => (
            <div key={idx} className="flex items-center space-x-4 mb-3">
              <input
                type="text"
                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter author name"
                value={author}
                onChange={(e) => handleAuthorChange(idx, e)}
                required
              />
              <button
                type="button"
                onClick={() => deleteAuthor(idx)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
              {idx === authors.length - 1 && (
                <button
                  type="button"
                  onClick={addAuthor}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Add Author
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="mb-6">
          <label htmlFor="description" className="block text-lg font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            rows="5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {/* Paper Type */}
        <div className="mb-6">
          <label htmlFor="paperType" className="block text-lg font-medium text-gray-700">
            Type of Paper
          </label>
          <select
            id="paperType"
            className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={paperType}
            onChange={(e) => setPaperType(e.target.value)}
            required
          >
            <option value="IEEE">IEEE</option>
            <option value="ACM">ACM</option>
            <option value="SPRINGER">SPRINGER</option>
            <option value="arXiv">arXiv</option>
            <option value="Elsevier">Elsevier</option>
          </select>
        </div>

        {/* What it covers (select only) */}
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700">What it covers</label>
          {whatItCovers.map((tag, idx) => (
            <div key={idx} className="flex items-center space-x-4 mb-3">
              <select
                value={tag}
                onChange={(e) => handleWhatItCoversChange(idx, e)}
                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                <option value="" disabled>
                  -- select a topic --
                </option>
                {popularTags.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => deleteWhatItCovers(idx)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
              {idx === whatItCovers.length - 1 && (
                <button
                  type="button"
                  onClick={addWhatItCovers}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Add Topic
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Research Paper Link */}
        <div className="mb-6">
          <label htmlFor="researchPaperLink" className="block text-lg font-medium text-gray-700">
            Research Paper Link
          </label>
          <input
            type="url"
            id="researchPaperLink"
            className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={researchPaperLink}
            onChange={(e) => setResearchPaperLink(e.target.value)}
            required
          />
        </div>

        {/* Submit */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit Paper
          </button>
        </div>
      </form>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h3
              className={`text-xl font-semibold mb-4 ${
                modalType === 'success' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {modalType === 'success' ? 'Success' : 'Error'}
            </h3>
            <p>{modalMessage}</p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaperForm;
