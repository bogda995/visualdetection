import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <>
      <div>
        <p className="center f3">{"This will detect faces in your pictures"}</p>
      </div>
      <div className="center">
        <div className="form center pa4 br3 shadow-5">
          <input
            className="f4 pa2 w-70 center"
            type="text"
            onChange={onInputChange}
          />
          <button
            onClick={onButtonSubmit}
            className="glow-on-hover w-30 grow f3 link ph3 pv2 dib white"
          >
            Detect
          </button>
        </div>
      </div>
    </>
  );
};

export default ImageLinkForm;
