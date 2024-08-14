import React from "react";
import { Link } from "react-router-dom";
import FlashcardList from "../components/FlashcardList";

const MyFlashcardsPage = () => {
  const flashcards = JSON.parse(localStorage.getItem("flashcards")) || [];

  const handleDelete = (id) => {
    const updatedFlashcards = flashcards.filter(
      (flashcard) => flashcard.id !== id
    );
    localStorage.setItem("flashcards", JSON.stringify(updatedFlashcards));
    // Trigger re-render or re-fetch flashcards
    window.location.reload();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">My Flashcards</h1>
      <Link to="/create">
        <button className="mt-4 bg-green-500 text-white p-2 rounded">
          Create New Flashcard
        </button>
      </Link>
      {flashcards.length > 0 ? (
        <FlashcardList flashcards={flashcards} onDelete={handleDelete} />
      ) : (
        <p className="mt-4 text-gray-500">
          No flashcards available. Create a new one!
        </p>
      )}
    </div>
  );
};

export default MyFlashcardsPage;
