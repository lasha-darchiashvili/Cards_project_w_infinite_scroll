import React, { useContext, useEffect, useState } from "react";
import CharacterInfo from "../components/CharacterInfo";
import CharactersList from "../components/CharactersList";
import { Link, useParams } from "react-router-dom";
import ClickedCharacters from "../components/ClickedCharacters";
import Loader from "../components/Loader";

const CharacterPage = () => {
  const params = useParams();
  const [scrollIsFixed, setScrollIsFixed] = useState(false);

  //scroll reset
  useEffect(() => {
    window.scrollTo(0, 0);
    setScrollIsFixed(true);
  }, []);

  return (
    <div className="max-w-[1200px] mx-auto border-solid border-[1px]">
      <CharacterInfo paramsId={params.id} />
      <ClickedCharacters />
      <div className="flex flex-wrap gap-[1.5rem] mx-auto justify-center">
        {scrollIsFixed && (
          <CharactersList page="friends" paramsId={params.id} />
        )}
      </div>
      <Loader />
    </div>
  );
};

export default CharacterPage;
