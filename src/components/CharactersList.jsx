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

  const { clickedCharacters, setClickedCharacters } =
    useContext(CharacterContext);

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
        setLoading(false);
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

  if (loading) {
    return <div className=" align-start text-[2rem]">No characters</div>;
  }

  return (
    <>
      {characters.map((character) => (
        <div
          key={character.id}
          className="w-[28rem] border-[1px] border-solid cursor-pointer flex-grow md:flex-grow-0 mx-[0.5rem] md:mx-0"
          onClick={() =>
            setClickedCharacters((prev) => [
              ...prev,
              {
                id: character.id,
                name: `${character.prefix} ${character.name} ${character.lastName}`,
              },
            ])
          }
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
