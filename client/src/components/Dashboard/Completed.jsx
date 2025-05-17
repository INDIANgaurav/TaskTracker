import React from "react";
import TaskCard from "./TaskCard";

const Completed = ({ task }) => {
  return (
    <div>{task && task.map((item, i) => <TaskCard key={i} data={item} />)}</div>
  );
};

export default Completed;
