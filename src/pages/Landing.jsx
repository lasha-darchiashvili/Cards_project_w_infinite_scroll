import React from "react";
import CharactersList from "../components/CharactersList";
import Loader from "../components/Loader";

const Landing = () => {
  return (
    <div>
      <div className="max-w-[1300px] flex flex-wrap gap-[1.5rem] mx-auto justify-center mt-[1rem]">
        {" "}
        <CharactersList page="LandingCharacters" />
      </div>
      <Loader />
    </div>
  );
};

export default Landing;
