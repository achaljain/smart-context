import React from "react";

const ToDoItem = ({ todo, toggle }) => {
  const { id, content, isComplete } = todo;

  const color = isComplete ? "green" : "red";

  const ctr = React.useRef(0);
  console.log(`2. Render Todo ${id} - ${ctr.current++}`);

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
