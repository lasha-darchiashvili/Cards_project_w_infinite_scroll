import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CharacterContext } from "../context/CharacterContext";

const ClickedCharacters = () => {
  const { clickedCharacters, setClickedCharacters } =
    useContext(CharacterContext);

  return (
    <>
      <div className="px-[2rem] my-[4rem]">
        {clickedCharacters.map((character, index) => {
          return (
            <span key={index}>
              {index !== 0 && <span className="text-[1.6rem]"> &#62; </span>}
              <Link
                className="underline text-[1.6rem] text-purple-900"
                to={`/character/${character.id}`}
              >
                {character.name}
              </Link>
            </span>
          );
        })}
      </div>
      <p className="text-[2.4em] ml-[1.6rem] font-bold mb-[3rem] ">Friends:</p>
    </>
  );
};

export default ClickedCharacters;
