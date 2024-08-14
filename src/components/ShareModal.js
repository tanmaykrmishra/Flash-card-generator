import React from "react";
import PropTypes from "prop-types";

const ShareModal = ({ isOpen, onClose, link }) => {
  const handleCopyClick = () => {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        alert("Link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4">Share this Flashcard</h2>
        <div className="mb-4">
          <p className="text-gray-800 break-all">{link}</p>
        </div>
        <button
          onClick={handleCopyClick}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
        >
          Copy Link
        </button>
        <button
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
};

ShareModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  link: PropTypes.string.isRequired,
};

export default ShareModal;
