import React from "react";
import CharactersList from "../components/CharactersList";

const Landing = () => {
  return (
    <div className="max-w-[1300px] flex flex-wrap gap-[1.5rem] mx-auto justify-center mt-[1rem]">
      {" "}
      <CharactersList page="LandingCharacters" />;
    </div>
  );
};

export default Landing;
