import React, { useEffect, useContext, useState } from "react";
import Loader from "./Loader";
import { CharacterContext } from "../context/CharacterContext";
import { Link } from "react-router-dom";

let isActive = false;

const CharactersList = () => {
  const [loading, setLoading] = useState(true);
  const [characters, setCharacters] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  const { chosenCharacter, setChosenCharacter } = useContext(CharacterContext);

  useEffect(() => {
    fetch(
      `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${pageNumber}/20`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(pageNumber, "asd");
        setCharacters((previousCharacters) => [
          ...previousCharacters,
          ...data.list,
        ]);
        setLoading(false);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        console.log("finaly");
        if (pageNumber > 1) isActive = false;
      });
  }, [pageNumber]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (!isActive && scrollTop + clientHeight + 20 >= scrollHeight) {
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
      console.log(scrollTop, clientHeight, scrollHeight);
      isActive = true;
    }
  };

  return (
    <div className="max-w-[1300px] flex flex-wrap gap-[1.5rem] mx-auto justify-center mt-[1rem]">
      {characters.map((character) => (
        <div
          key={character.id}
          className="w-[300px] border-[1px] border-solid cursor-pointer "
          onClick={() => setChosenCharacter(character)}
        >
          <Link to={`/character/${character.id}`}>
            <img src={`${character.imageUrl}/${character.id}`} alt="image" />
            <div className="p-[1rem] text-[1.6rem]">
              <p className="font-bold">{`${character.prefix} ${character.name} ${character.lastName}`}</p>
              <p>{character.title}</p>
            </div>
          </Link>
        </div>
      ))}
      <div>
        <Loader />
      </div>
    </div>
  );
};

export default CharactersList;
