import React, { createContext, useState } from "react";

export const CharacterContext = createContext();

export const CharacterProvider = ({ children }) => {
  const [clickedCharacters, setClickedCharacters] = useState([]);

  return (
    <CharacterContext.Provider
      value={{ clickedCharacters, setClickedCharacters }}
    >
      {children}
    </CharacterContext.Provider>
  );
};
