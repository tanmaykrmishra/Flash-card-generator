// src/pages/FlashcardDetailsPage.js

import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import ShareModal from "../components/ShareModal"; // Ensure this path is correct

const FlashcardDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [flashcard, setFlashcard] = React.useState(null);
  const [selectedTermIndex, setSelectedTermIndex] = React.useState(0);
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  React.useEffect(() => {
    // Fetch flashcard data from localStorage
    const flashcards = JSON.parse(localStorage.getItem("flashcards")) || [];
    const selectedFlashcard = flashcards.find(
      (card) => card.id === parseInt(id, 10)
    );
    setFlashcard(selectedFlashcard);
  }, [id]);

  if (!flashcard) return <p>Flashcard not found.</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white shadow-lg rounded-lg">
      <button
        onClick={() => navigate("/")}
        className="mb-4 bg-gray-500 text-white px-4 py-2 rounded-lg"
      >
        Back
      </button>
      <div className="flex flex-col lg:flex-row">
        {/* Left Side: Terms List */}
        <div className="lg:w-1/3 lg:border-r lg:border-gray-200 pr-6">
          <h1 className="text-3xl font-bold mb-4">{flashcard.title}</h1>
          <p className="text-lg text-gray-600 mb-6">{flashcard.description}</p>
          <div className="space-y-2">
            {flashcard.terms.map((term, index) => (
              <button
                key={index}
                onClick={() => setSelectedTermIndex(index)}
                className={`block p-4 w-full text-left rounded-lg border border-gray-300 transition-colors duration-300 ${
                  selectedTermIndex === index
                    ? "bg-blue-100 font-semibold"
                    : "hover:bg-gray-100"
                }`}
              >
                {term.term}
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Term Details */}
        <div className="lg:w-2/3 p-6">
          {flashcard.terms.length > 0 && (
            <div className="bg-gray-50 p-6 border rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold mb-2">Term</h2>
              <p className="text-xl mb-4 font-bold">
                {flashcard.terms[selectedTermIndex].term}
              </p>
              <h2 className="text-2xl font-semibold mb-2">Definition</h2>
              <p className="text-lg">
                {flashcard.terms[selectedTermIndex].definition}
              </p>
            </div>
          )}
        </div>
      </div>
      {/* Share Button */}
      <div className="mt-6">
        <button
          onClick={() => setModalIsOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Share
        </button>
      </div>
      {/* Share Modal */}
      <ShareModal
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        link={`http://your-app.com/flashcards/${flashcard.id}`}
      />
    </div>
  );
};

export default FlashcardDetailsPage;
