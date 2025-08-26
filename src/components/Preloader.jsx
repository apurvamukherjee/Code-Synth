import React from 'react';

const Preloader = () => {
  return (
    <div className="preloader">
      <div className="loader">
        <svg
          width="115"
          height="81"
          viewBox="0 0 115 81"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          id="bird"
        >
          <rect x="41" y="47" width="20" height="7" fill="#FFEB3B"></rect>
          <rect x="35" y="67" width="33" height="7" fill="#FFC107"></rect>
          <rect x="21" y="54" width="40" height="14" fill="#FFC107"></rect>
          <rect x="48" y="40" width="20" height="7" fill="#FFEB3B"></rect>
          <rect x="48" y="33" width="20" height="7" fill="#FFEB3B"></rect>
          <rect x="41" y="27" width="20" height="7" fill="#FFEB3B"></rect>
          <rect x="34" y="20" width="20" height="7" fill="#FFEB3B"></rect>
          <rect x="28" y="14" width="20" height="7" fill="#FFEB3B"></rect>
          <rect x="40" y="7" width="21" height="7" fill="#FFEB3B"></rect>
          <rect x="41" y="34" width="7" height="13" fill="black"></rect>
          <rect x="21" y="14" width="7" height="7" fill="black"></rect>
          <rect x="41" width="40" height="7" fill="black"></rect>
          <rect x="28" y="7" width="13" height="7" fill="black"></rect>
          <rect x="7" y="27" width="34" height="27" fill="#FFFFCC"></rect>
          <rect x="61" y="12" width="34" height="28" fill="white"></rect>
          <rect x="7" y="20" width="27" height="7" fill="black"></rect>
          <rect x="34" y="27" width="7" height="7" fill="black"></rect>
          <rect x="7" y="40" width="7" height="7" fill="#FFEB3B"></rect>
          <rect x="34" y="40" width="7" height="7" fill="#FFEB3B"></rect>
          <rect x="48" y="14" width="7" height="7" fill="#FFEB3B"></rect>
          <rect x="7" y="47" width="7" height="7" fill="black"></rect>
          <rect x="14" y="47" width="20" height="7" fill="#FFEB3B"></rect>
          <rect
            y="47"
            width="20"
            height="7"
            transform="rotate(-90 0 47)"
            fill="black"
          ></rect>
          <rect x="34" y="47" width="7" height="7" fill="black"></rect>
          <rect x="88" y="13" width="7" height="7" fill="black"></rect>
          <rect x="81" y="6" width="7" height="7" fill="black"></rect>
          <rect
            x="95"
            y="40"
            width="20"
            height="7"
            transform="rotate(-90 95 40)"
            fill="black"
          ></rect>
          <rect
            x="81"
            y="33"
            width="13"
            height="7"
            transform="rotate(-90 81 33)"
            fill="black"
          ></rect>
          <rect
            x="81"
            y="13"
            width="13"
            height="7"
            transform="rotate(-180 81 13)"
            fill="white"
          ></rect>
          <rect x="61" y="33" width="7" height="7" fill="black"></rect>
          <rect x="61" y="6" width="7" height="7" fill="black"></rect>
          <rect
            x="54"
            y="33"
            width="20"
            height="7"
            transform="rotate(-90 54 33)"
            fill="black"
          ></rect>
          <rect x="14" y="60" width="7" height="7" fill="black"></rect>
          <rect x="21" y="67" width="14" height="7" fill="black"></rect>
          <rect x="35" y="74" width="33" height="7" fill="black"></rect>
          <rect x="14" y="54" width="20" height="7" fill="black"></rect>
          <rect x="108" y="47" width="7" height="7" fill="black"></rect>
          <rect x="68" y="53" width="33" height="7" fill="black"></rect>
          <rect x="68" y="46" width="40" height="7" fill="#F44336"></rect>
          <rect x="65" y="60" width="40" height="7" fill="#F44336"></rect>
          <rect
            x="101"
            y="67"
            width="14"
            height="7"
            transform="rotate(-90 101 67)"
            fill="black"
          ></rect>
          <rect x="61" y="46" width="7" height="7" fill="black"></rect>
          <rect x="68" y="40" width="40" height="7" fill="black"></rect>
          <rect x="68" y="67" width="33" height="7" fill="black"></rect>
          <rect x="54" y="53" width="7" height="7" fill="black"></rect>
          <rect x="61" y="53" width="7" height="7" fill="#F44336"></rect>
          <rect x="61" y="60" width="7" height="7" fill="black"></rect>
        </svg>

        <div className="sceneTop">
          <div className="flappyBirdScene">
            <div className="birdObs1" id="birdObstacle"></div>
            <div className="birdObs2" id="birdObstacle"></div>
            <div className="birdObs3" id="birdObstacle"></div>
            <div className="birdObs4" id="birdObstacle"></div>
          </div>
          <div className="flappyBirdScene">
            <div className="birdObs1" id="birdObstacle"></div>
            <div className="birdObs2" id="birdObstacle"></div>
            <div className="birdObs3" id="birdObstacle"></div>
            <div className="birdObs4" id="birdObstacle"></div>
          </div>
        </div>
        <div className="sceneBottom">
          <div className="flappyBirdSceneBottom">
            <div className="birdObs1" id="birdObstacle"></div>
            <div className="birdObs2" id="birdObstacle"></div>
            <div className="birdObs3" id="birdObstacle"></div>
            <div className="birdObs4" id="birdObstacle"></div>
          </div>
          <div className="flappyBirdSceneBottom">
            <div className="birdObs1" id="birdObstacle"></div>
            <div className="birdObs2" id="birdObstacle"></div>
            <div className="birdObs3" id="birdObstacle"></div>
            <div className="birdObs4" id="birdObstacle"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;