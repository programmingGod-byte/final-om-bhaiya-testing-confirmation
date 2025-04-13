import React, { useState } from 'react';
import URLSITE from '../constant';

const PaperForm = () => {
  const [imageUri, setImageUri] = useState('');
  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState(['']);
  const [description, setDescription] = useState('');
  const [paperType, setPaperType] = useState('IEEE');
  const [whatItCovers, setWhatItCovers] = useState(['']);
  const [source, setSource] = useState('IEEE');
  const [researchPaperLink, setResearchPaperLink] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState('success'); // 'success' or 'error'

  // Handle changes in the author input
  const handleAuthorChange = (index, event) => {
    const newAuthors = [...authors];
    newAuthors[index] = event.target.value;
    setAuthors(newAuthors);
  };

  // Add new author field
  const addAuthor = () => {
    setAuthors([...authors, '']);
  };

  // Delete author field
  const deleteAuthor = (index) => {
    const newAuthors = authors.filter((_, i) => i !== index);
    setAuthors(newAuthors);
  };

  // Handle changes in the "What it covers" input
  const handleWhatItCoversChange = (index, event) => {
    const newWhatItCovers = [...whatItCovers];
    newWhatItCovers[index] = event.target.value;
    setWhatItCovers(newWhatItCovers);
  };

  // Add new "What it covers" field
  const addWhatItCovers = () => {
    setWhatItCovers([...whatItCovers, '']);
  };

  // Delete "What it covers" field
  const deleteWhatItCovers = (index) => {
    const newWhatItCovers = whatItCovers.filter((_, i) => i !== index);
    setWhatItCovers(newWhatItCovers);
  };

  // Handle form submission
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
      researchPaperLink, // Added the research paper link
    };
    console.log(formData)

    try {
      // Make a POST request to the server
      const response = await fetch(`${URLSITE}/api/admin/research-paper-upload`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      // Show success or error message in the modal
      if (response.ok) {
        setModalMessage('Your paper has been submitted successfully!');
        setModalType('success');
      } else {
        setModalMessage('Something went wrong. Please try again.');
        setModalType('error');
      }
      setShowModal(true);
    } catch (err) {
      setModalMessage('Network error. Please try again.');
      setModalType('error');
      setShowModal(true);
    }
  };

  // Close the modal
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold mb-8 text-center">Submit Your Paper</h2>
      <form onSubmit={handleSubmit}>
        {/* Image URI Input */}
        <div className="mb-6">
          <label htmlFor="imageUri" className="block text-lg font-medium text-gray-700">Image URI</label>
          <input
            type="text"
            id="imageUri"
            className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={imageUri}
            onChange={(e) => setImageUri(e.target.value)}
            required
          />
        </div>

        {/* Title Input */}
        <div className="mb-6">
          <label htmlFor="title" className="block text-lg font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Authors Section */}
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700">Authors</label>
          {authors.map((author, index) => (
            <div key={index} className="flex items-center space-x-4 mb-3">
              <input
                type="text"
                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter author name"
                value={author}
                onChange={(e) => handleAuthorChange(index, e)}
              />
              <button
                type="button"
                onClick={() => deleteAuthor(index)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
              {index === authors.length - 1 && (
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

        {/* Description Input */}
        <div className="mb-6">
          <label htmlFor="description" className="block text-lg font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            rows="5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {/* Paper Type Select */}
        <div className="mb-6">
          <label htmlFor="paperType" className="block text-lg font-medium text-gray-700">Type of Paper</label>
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

        {/* What it covers Section */}
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700">What it covers</label>
          {whatItCovers.map((cover, index) => (
            <div key={index} className="flex items-center space-x-4 mb-3">
              <input
                type="text"
                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="What does this paper cover?"
                value={cover}
                onChange={(e) => handleWhatItCoversChange(index, e)}
              />
              <button
                type="button"
                onClick={() => deleteWhatItCovers(index)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
              {index === whatItCovers.length - 1 && (
                <button
                  type="button"
                  onClick={addWhatItCovers}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Add What it Covers
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Research Paper Link Input */}
        <div className="mb-6">
          <label htmlFor="researchPaperLink" className="block text-lg font-medium text-gray-700">Research Paper Link</label>
          <input
            type="url"
            id="researchPaperLink"
            className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={researchPaperLink}
            onChange={(e) => setResearchPaperLink(e.target.value)}
            required
          />
        </div>

        {/* Submit Button */}
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
            <h3 className={`text-xl font-semibold mb-4 ${modalType === 'success' ? 'text-green-600' : 'text-red-600'}`}>
              {modalType === 'success' ? 'Success' : 'Error'}
            </h3>
            <p>{modalMessage}</p>
            <button
              onClick={closeModal}
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
