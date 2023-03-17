import React, { createContext, useState } from "react";

export const CharacterContext = createContext();

export const CharacterProvider = ({ children }) => {
  const [chosenCharacter, setChosenCharacter] = useState();

  return (
    <CharacterContext.Provider value={{ chosenCharacter, setChosenCharacter }}>
      {children}
    </CharacterContext.Provider>
  );
};
