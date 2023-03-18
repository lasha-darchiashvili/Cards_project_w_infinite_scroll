import React from "react";
import CharactersList from "../components/CharactersList";
import Loader from "../components/Loader";

const Landing = () => {
  return (
    <div>
      <div className="max-w-[1300px] grid gap-y-[2rem] md:gap-x-[2rem] gap-x-[1rem] md:grid-cols-4 grid-cols-2 mx-auto px-[1rem] mt-[1rem] ">
        {" "}
        <CharactersList page="LandingCharacters" />
      </div>
      <Loader />
    </div>
  );
};

export default Landing;
