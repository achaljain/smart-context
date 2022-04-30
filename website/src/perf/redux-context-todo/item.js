import React from "react";

const ToDoItem = ({ todo, toggle }) => {
  const { id, content, isComplete } = todo;

  const ctr = React.useRef(0);
  console.log(`3. Render Todo ${id} - ${ctr.current++}`);

  const color = isComplete ? "green" : "red";
  return (
    <div>
      <span style={{ color }}>{content}</span>
      <button id={`btn-${id}`} onClick={toggle}>
        Toggle
      </button>
    </div>
  );
};

export default React.memo(ToDoItem);
