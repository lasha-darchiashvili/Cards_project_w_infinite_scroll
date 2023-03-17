import React from "react";
import ReactDOM from "react-dom/client";
import CharacterPage from "./pages/CharacterPage";
import Landing from "./pages/Landing";
import "./index.css";
import { Route, Routes } from "react-router-dom";
import { CharacterProvider } from "./context/CharacterContext";

const App = () => {
  return (
    <div className="app w-full">
      <CharacterProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/character/:id" element={<CharacterPage />} />
        </Routes>
      </CharacterProvider>
    </div>
  );
};

export default App;
