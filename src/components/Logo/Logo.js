import React from "react";
import Tilt from "react-parallax-tilt";
import "../../styles/ParallaxEffect.demozap.css";
import logo from "../../assets/img/AldenaireSmall.png";

const Logo = () => {
  return (
    <div
      className="ma4 mt0"
      style={{
        display: "flex",
        justifyContent: "left",
      }}
    >
      <Tilt
        className="parallax-effect"
        perspective={500}
        glareEnable={true}
        glareMaxOpacity={0.8}
        glareColor="#ffffff"
        glarePosition="bottom"
        glareBorderRadius="20px"
        tiltReverse={true}
      >
        <div
          className="inner-element"
          style={{ 
            height: "100px", 
            width: "100px",
            position: 'relative'
          }}
        >
          <img 
            src={logo} 
            alt="Logo" 
            style={{ 
              maxWidth: "100%", 
              maxHeight: "100%",
              position: 'relative',
              zIndex: 1
            }} 
          />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
