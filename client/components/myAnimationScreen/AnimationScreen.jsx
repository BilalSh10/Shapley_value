"use client";
import React from "react";
import Lottie from "lottie-react";
import animationData from "../../public/animation/homeScreen.json"; // Path to your Lottie animation JSON file

const AnimationScreen = () => {
  return (
    <div>
      <Lottie
        autoplay={true}
        style={{ width: 450, height: 450 }}
        animationData={animationData}
        loop={true}
      />
    </div>
  );
};

export default AnimationScreen;
