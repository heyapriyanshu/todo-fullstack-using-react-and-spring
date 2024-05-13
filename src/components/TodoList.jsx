import React, { useRef, useEffect } from "react";
import Typewriter from "typewriter-effect";

const TodoList = () => {
  const typewriterRef = useRef(null);
  const headings = ["TODO list", "Tommorow list", "What's Next list", "Grocery list", "Goals list"];

  useEffect(() => {
    const typewriter = typewriterRef.current;

    const loopTypewriter = () => {
      typewriter
        .deleteAll()
        .typeString(getRandomHeading())
        .pauseFor(1000)
        .callFunction(() => {
          loopTypewriter();
        })
        .start();
    };

    loopTypewriter();

    return () => {
      typewriter?.stop();
    };
  }, []);

  const getRandomHeading = () => {
    const randomIndex = Math.floor(Math.random() * headings.length);
    return headings[randomIndex];
  };

  return (
    <div>
      <h1>
        <Typewriter
          options={{
            loop: true,
            delay: 50,
            deleteSpeed: 20,
          }}
          onInit={(typewriter) => {
            typewriterRef.current = typewriter;
          }}
        />
      </h1>
    </div>
  );
};

export default TodoList;
