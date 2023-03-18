import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center">
      <div className="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
