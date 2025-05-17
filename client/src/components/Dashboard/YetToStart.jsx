import React from "react";
import TaskCard from "./TaskCard";

const YetToStart = ({ task }) => {
  
  return (
    <div className="flex flex-col gap-2">
      {task && task.map((item, i) => <TaskCard key={i} data={item} />)}

    
    </div>
  );
};

export default YetToStart;
