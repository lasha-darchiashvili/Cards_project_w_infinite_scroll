import React, { useEffect, useContext, useState } from "react";
import { CharacterContext } from "../context/CharacterContext";
import { Link } from "react-router-dom";
import CHARACTERS_BASE_URL from "../api/api";

// As usual when srcoll event is triggered, scroll fires multiple times, which causes adding more cards than we want, during scroll.
// This variable is created to solve this problem. Logic is - if during one scroll one fetch is already  active, during that scroll more fetches won't be triggered.
// To achieve this we 'isFetchActive' to false initially, then when first fetch starts we set it to true and give scroll condition : if true no more fetching on that scroll
let isFetchActive = false;

const CharactersList = (props) => {
  const [loading, setLoading] = useState(true);
  const [characters, setCharacters] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [isFirstRender, setIsFirstRender] = useState(true);

  const { clickedCharacters, setClickedCharacters } =
    useContext(CharacterContext);

  // two urls based where we use this component
  const firstCardsUrl =
    props.page === "LandingCharacters"
      ? `${CHARACTERS_BASE_URL}/1/20`
      : `${CHARACTERS_BASE_URL}/${props?.paramsId}/friends/1/20`;

  // two urls based where we use this component
  const restCardsUrl =
    props.page === "LandingCharacters"
      ? `${CHARACTERS_BASE_URL}/${pageNumber}/20`
      : `${CHARACTERS_BASE_URL}/${props?.paramsId}/friends/${pageNumber}/20`;

  // Is meant to fetch only first 20 cards
  useEffect(() => {
    fetch(firstCardsUrl)
      .then((response) => response.json())
      .then((data) => {
        setCharacters(data.list);
        setIsFirstRender(false);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, [props.paramsId]);

  // Is meant to fetch additional 20 cards on scroll
  useEffect(() => {
    if (!isFirstRender && pageNumber !== 1) {
      fetch(restCardsUrl)
        .then((response) => response.json())
        .then((data) => {
          setCharacters((previousCharacters) => [
            ...previousCharacters,
            ...data.list,
          ]);
        })
        .catch((error) => console.error(error))
        .finally(() => {
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

      //after first infinite scroll fetch, it becomes true, so we avoid additional fetches
      isFetchActive = true;
    }
  };

  if (loading) {
    return (
      <div className="text-[2rem]">
        <p>No characters</p>
      </div>
    );
  }

  return (
    <>
      {characters.map((character) => (
        <div
          key={character.id}
          className="w-full border-[1px] border-solid cursor-pointer flex-grow md:flex-grow-0 mx-[0.5rem] md:mx-0"
          onClick={() => {
            setPageNumber(() => 1);

            setClickedCharacters((prev) => [
              ...prev,
              {
                id: character.id,
                name: `${character.prefix} ${character.name} ${character.lastName}`,
              },
            ]);
            window.scrollTo(0, 0);
          }}
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
    </>
  );
};

export default CharactersList;
