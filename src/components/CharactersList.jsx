import React, { useEffect, useContext, useState } from "react";
import Loader from "./Loader";
import { CharacterContext } from "../context/CharacterContext";
import { Link } from "react-router-dom";
import CHARACTERS_BASE_URL from "../api/api";

// As usual when srcoll event is triggered, scroll fires multiple times, which causes adding more cards than we want, during scroll.
// This variable is created to solve this problem. Logic is - if during one scroll one fetch is active, during that scroll more fetches won't be triggered.
let isFetchActive = false;

const CharactersList = (props) => {
  const [loading, setLoading] = useState(true);
  const [characters, setCharacters] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [isFirstRender, setIsFirstRender] = useState(true);

  const { chosenCharacter, setChosenCharacter } = useContext(CharacterContext);

  const url =
    props.page === "LandingCharacters"
      ? `${CHARACTERS_BASE_URL}/${pageNumber}/20`
      : `${CHARACTERS_BASE_URL}/${props?.paramsId}/friends/${pageNumber}/20`;

  // Is meant to fetch only first 20 cards
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCharacters(data.list);
        setIsFirstRender(false);
      })
      .catch((error) => console.error(error));
  }, [props.paramsId]);

  // Is meant to fetch additional 20 cards on scroll
  useEffect(() => {
    if (!isFirstRender) {
      fetch(url)
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
          if (pageNumber > 1) isFetchActive = false;
        });
    }
  }, [pageNumber]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (!isFetchActive && scrollTop + clientHeight + 20 >= scrollHeight) {
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
      console.log(scrollTop, clientHeight, scrollHeight);

      //after first infinite scroll fetch it becomes true, so we avoid additional fetches
      isFetchActive = true;
    }
  };

  return (
    <>
      {characters.map((character) => (
        <div
          key={character.id}
          className="w-[28rem] border-[1px] border-solid cursor-pointer "
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
    </>
  );
};

export default CharactersList;
