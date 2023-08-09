import Lottie from "lottie-react";
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import * as React from 'react';
const style = {
    height: 300,
  };
  
export const CairoAnimation = () => {
    return <Lottie animationData={groovyWalkAnimation} style={style} />;
  };
  
export const CairAnimation_New = () => {
    const [lottieInstance, setLottieInstance] = React.useState(null);
  
    return (
      <Player
        lottieRef={instance => {
          setLottieInstance(instance); // the lottie instance is returned in the argument of this prop. set it to your local state
        }}
        autoplay={true}
        loop={true}
        controls={true}
        src="/animations/main-buddy.json"
        style={style}
      ></Player>
    );
  
  };

  export const CairAnimation_Dialog = () => {
    const [lottieInstance, setLottieInstance] = React.useState(null);
  
    return (
      <Player
        lottieRef={instance => {
          setLottieInstance(instance); // the lottie instance is returned in the argument of this prop. set it to your local state
        }}
        autoplay={true}
        loop={true}
        controls={true}
        src="/animations/main-buddy.json"
       // style={style}
      ></Player>
    );
  
  }