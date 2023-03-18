import React from "react";
import CharacterInfo from "../components/CharacterInfo";
import CharactersList from "../components/CharactersList";
import { useParams } from "react-router-dom";

const CharacterPage = () => {
  const params = useParams();
  return (
    <div>
      <div className="max-w-[1200px] mx-auto border-solid border-[1px]">
        <CharacterInfo paramsId={params.id} />
        <div className=" h-min-[10rem "></div>
        <p className="text-[2.4rem] ml-[2rem] ">Friends:</p>
        <div className="flex flex-wrap gap-[1.5rem] mx-auto justify-center">
          <CharactersList page="friends" paramsId={params.id} />
        </div>

        <div className="h-[20rem]">adadsa AsdasD</div>
      </div>
    </div>
  );
};

export default CharacterPage;
