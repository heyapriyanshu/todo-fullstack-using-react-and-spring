/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */

import {forwardRef} from "react";

const Note = forwardRef(({content, initialPos,targetDate, ...props}, ref) => {
  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        left: `${initialPos?.x}px`,
        top: `${initialPos?.y}px`,
        border: "1px solid black",
        userSelect: "none",
        padding: "10px",
        width: "auto",
        maxWidth: "300px",
        display: "inline-block",
        cursor: "move",
        backgroundColor: "lightyellow",
        whiteSpace: "pre-wrap", // Allows the text to wrap within the element
        overflowWrap: "break-word", // Ensures that long words will break and wrap to the next line
      }}
      {...props}
    >
      📌 {content}
      <div className="text-muted" style={
        {
           
        }
      }>
        Date: {targetDate}
      </div>
      
    </div>
  );
});

export default Note;