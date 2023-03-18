import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center">
      <div class="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
