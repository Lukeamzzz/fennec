"use client";
import React, { useState, useEffect } from "react";

const TypingEffect = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const words = ["agentes", "agencias", "desarrolladoras", "inversionistas"];
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [displayText, setDisplayText] = useState<string>("");
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const currentWord = words[currentWordIndex];
      
      if (isDeleting) {
        setDisplayText(currentWord.substring(0, displayText.length - 1));
        
        if (displayText === '') {
          setIsDeleting(false);
          setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        }
      } else {
        setDisplayText(currentWord.substring(0, displayText.length + 1));
        
        if (displayText === currentWord) {
          setTimeout(() => setIsDeleting(true), 1000);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentWordIndex, words]);

  return (
    <h1 className="text-5xl font-semibold text-gray-900">
      Ideal para <span className="text-orange-500">
        {displayText}
        <span className="blinking-cursor text-white">|</span>
        </span> del sector inmobiliario
      <style>{`
        .blinking-cursor {
          animation: blink 1.3s step-end infinite;
        }

        @keyframes blink {
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </h1>
  );
};

export default TypingEffect;
