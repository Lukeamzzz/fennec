"use client";
import React, { useState, useEffect } from "react";

const TypingEffect = () => {
  const words = ["agentes", "agencias", "desarrolladoras", "inversionistas"];
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [displayText, setDisplayText] = useState<string>("");
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    let typingSpeed = 100;

    if (isDeleting) { // Delete faster than typing
      typingSpeed -= 30;
    }

    const timeout = setTimeout(() => {
      setDisplayText((prev) =>
        isDeleting
          ? prev.slice(0, -1)
          : currentWord.slice(0, prev.length + 1)
      );

      // When finished typing the word
      if (!isDeleting && displayText === currentWord) {
        setTimeout(() => setIsDeleting(true), 3000);
      }

      // When finished deleting the word
      if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentWordIndex]);

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
