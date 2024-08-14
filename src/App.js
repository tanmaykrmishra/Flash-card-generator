import React from "react";
import { Route, Routes } from "react-router-dom";
import CreateFlashcardPage from "./pages/CreateFlashcardPage";
import MyFlashcardsPage from "./pages/MyFlashcardsPage";
import FlashcardDetailsPage from "./pages/FlashcardDetailsPage";

const App = () => (
  <Routes>
    <Route path="/" element={<MyFlashcardsPage />} />
    <Route path="/create" element={<CreateFlashcardPage />} />
    <Route path="/flashcards/:id" element={<FlashcardDetailsPage />} />
  </Routes>
);

export default App;
