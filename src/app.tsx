import React, {useEffect, useState} from 'react';
import './app.css';
import {AdviceResponse, AdviceSlip} from "./types";
import clsx from 'clsx';
import {SpinningCircles} from "react-loading-icons";
import FadeInText from "./FadeInText";

export default function App() {
  const [adviceSlip, setAdviceSlip] = useState<AdviceSlip | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  console.log(isLoading);

  const fetchRandomAdvice = () => {
    if (isLoading) return;
    setIsLoading(true);

    fetch('https://api.adviceslip.com/advice', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      cache: 'no-cache',
    })
      .then(resp => resp.json())
      .then((adviceResponse: AdviceResponse) => {
        setAdviceSlip(adviceResponse.slip);
        setIsLoading(false);
      })
      .catch(() => setTimeout(fetchRandomAdvice, 1000))
  };

  useEffect(fetchRandomAdvice, []);

  return (
    <div className='app'>
      {isLoading && <SpinningCircles className='loading_component'/>}
      <div className={clsx('container', 'dark_grayish_blue_bg', {'loading': isLoading})}>
        <p className={clsx('header', 'neon_green')}>{adviceSlip ? `Advice #${adviceSlip.id}` : ''}</p>
        <FadeInText key={adviceSlip?.advice}>{adviceSlip ? `"${adviceSlip.advice}"` : 'No text'}</FadeInText>
        <picture>
          <source srcSet={"/images/pattern-divider-mobile.svg 2x"} media="(max-width: 350px)"/>
          <img srcSet={"/images/pattern-divider-desktop.svg 2x"} alt="Divider"/>
        </picture>
        <button className={clsx('button', 'neon_green_bg')} onClick={fetchRandomAdvice}>
          <img src={"/images/icon-dice.svg"} alt="More"/>
        </button>
      </div>
    </div>
  );
}
