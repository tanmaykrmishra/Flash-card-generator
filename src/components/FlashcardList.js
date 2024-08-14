import React from "react";
import { Link } from "react-router-dom";

const FlashcardList = ({ flashcards, onDelete }) => (
  <div className="mt-4">
    {flashcards.map((flashcard) => (
      <div
        key={flashcard.id}
        className="flex justify-between items-center border p-4 mb-2 bg-white rounded-lg shadow-md"
      >
        <div>
          <h2 className="text-lg font-bold">{flashcard.title}</h2>
          <p className="text-gray-600">{flashcard.description}</p>
        </div>
        <div>
          <Link
            to={`/flashcards/${flashcard.id}`}
            className="bg-blue-500 text-white p-2 rounded mr-2"
          >
            View
          </Link>
          <button
            onClick={() => onDelete(flashcard.id)}
            className="bg-red-500 text-white p-2 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>
);

export default FlashcardList;
