import React, {useEffect, useState} from 'react';
import './app.css';
import {MouseEvent} from 'react';
import {AdviceSlip} from "./types";
import clsx from 'clsx';
import {SpinningCircles} from "react-loading-icons";

export default function App() {
  const [adviceSlip, setAdviceSlip] = useState<AdviceSlip | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const appClassName = clsx('app');
  const containerClassName = clsx('container', 'dark_grayish_blue_bg', {'loading': isLoading});
  const headerClassName = clsx('header', 'neon_green');
  const textClassName = clsx('text', 'light_cyan');
  const moreButtonClassName = clsx('button', 'neon_green_bg');
  const loadingClassName = clsx('loading_component');

  const fetchRandomAdvice = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://api.adviceslip.com/advice', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
        cache: 'no-cache',
      });

      if (!response.ok) {
        throw new Error(`Error! Status: ${response.status}`);
      }

      const result = await response.json();
      setAdviceSlip(result.slip as AdviceSlip);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomAdvice().then(() => {});
  }, [])

  function moreButtonClick(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    fetchRandomAdvice().then(() => {});
  }

  return <>
    <div className={appClassName}>
      {isLoading && <SpinningCircles className={loadingClassName} />}
      <div className={containerClassName}>
        <p className={headerClassName}>{adviceSlip ? `Advice #${adviceSlip.id}` : ''}</p>
        <p className={textClassName}>{adviceSlip ? `"${adviceSlip.advice}"` : 'No text'}</p>
        <picture>
          <source srcSet={"/images/pattern-divider-mobile.svg 2x"} media={"(max-width: 350px)"} />
          <img srcSet={"/images/pattern-divider-desktop.svg 2x"} alt={"Divider"} />
        </picture>
        <button className={moreButtonClassName} onClick={moreButtonClick}>
          <img src={"/images/icon-dice.svg"} alt={"More"} />
        </button>
      </div>
    </div>
  </>;
}
