import React, { useEffect, useState } from "react";
import CHARACTERS_BASE_URL from "../api/api";

const CharacterInfo = (props) => {
  const [character, setChacarter] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${CHARACTERS_BASE_URL}/${props.paramsId}`)
      .then((response) => response.json())
      .then((data) => {
        setChacarter(data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, [props.paramsId]);

  if (loading) {
    return <div></div>;
  }

  return (
    <div className="mt-[1rem] px-[2rem]">
      <div className="flex flex-col md:flex-row gap-[0.5rem] w-full md:items-center">
        <img
          className=" md:w-[280px] w-full h-[200px] object-cover "
          src={`${character.imageUrl}/${character.id}`}
          alt=""
        />
        <div className="md:flex-grow ">
          <fieldset className="border-[1.5px] border-gray-500 p-[1rem] text-[1.6rem] md:ml-[2rem]">
            <legend className="ml-[0.1rem] px-[0.5rem]">info</legend>

            <p className="font-bold">{`${character.prefix} ${character.name} ${character.lastName}`}</p>
            <p className="italic ">{character.title}</p>
            <p className="mt-[1.5rem]">
              <span className="underline">Email</span>: {character.email}
            </p>
            <p>
              <span className="underline">Ip Address</span>: {character.ip}
            </p>
            <p>
              <span className="underline">Ip Address</span>: {character.ip}
            </p>
            <p>
              <span className="underline">Job Area</span>: {character.jobArea}
            </p>
            <p>
              <span className="underline">Job Type</span>: {character.jobType}
            </p>
          </fieldset>
        </div>

        <div className="flex-grow md:flex-grow-0">
          <fieldset className="border-[1.5px] border-gray-500 p-[1rem] text-[1.6rem] md:w-[20rem]">
            <legend className="">Address</legend>

            <p className="font-bold">{`${character.company.name} ${character.company.suffix}`}</p>
            <p>
              <span className="underline">City</span>: {character.address.city}
            </p>
            <p>
              <span className="underline">Country</span>:{" "}
              {character.address.country}
            </p>
            <p>
              <span className="underline">State</span>:{" "}
              {character.address.state}
            </p>
            <p>
              <span className="underline">Street Adress</span>:{" "}
              {character.address.streetAddress}
            </p>
            <p>
              <span className="underline">ZIO</span>:{" "}
              {character.address.zipCode}
            </p>
          </fieldset>
        </div>
      </div>
    </div>
  );
};

export default CharacterInfo;
