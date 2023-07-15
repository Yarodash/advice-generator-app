import './app.css';
import clsx from "clsx";
import React from "react";

interface IProps {
  children: string,
}

const FadeInText = ({children}: IProps) => {
  const words = children.split(" ");

  console.log(words);

  return (
    <p className={clsx('text', 'light_cyan')}>
      {words.map((word, index) => (
        <span key={index} className='word-container'>
          <div key={index} className='word' style={{"--index": index} as React.CSSProperties}>
            {word}&nbsp;
          </div>
        </span>
      ))}
    </p>
  )
}

export default FadeInText;
