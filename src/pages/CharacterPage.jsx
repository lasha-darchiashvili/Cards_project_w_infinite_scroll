import React, { useEffect, useState } from "react";
import CharacterInfo from "../components/CharacterInfo";
import CharactersList from "../components/CharactersList";
import { useParams } from "react-router-dom";
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
      <div className="mx-auto grid gap-y-[2rem] md:gap-x-[2rem] gap-x-[1rem] md:grid-cols-4 grid-cols-2 mx-auto px-[1rem] mt-[1rem]">
        {scrollIsFixed && (
          <CharactersList page="friends" paramsId={params.id} />
        )}
      </div>
      <Loader />
    </div>
  );
};

export default CharacterPage;
