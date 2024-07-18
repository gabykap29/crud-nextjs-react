"use client"
import TaskCard from "@/components/TaskCard";
import { useEffect, useState } from "react";

async function getTask(){
  try {
    const res = await fetch('/api/task');
    const data = await res.json();
    return data;

  } catch (error) {
    console.log("Error al traer las tareas...",error);
  }
}
 function Home(){
    const [tasks, setTasks] = useState([]);
    
    useEffect( () => {
    async function fetchTasks() {
      const data = await getTask();
      setTasks(data);
    }
    fetchTasks();
  }, []);
  return (
    <div className="grid grid-cols-3 gap-2">
      {
        tasks.map(task => (
          <TaskCard task={task} key={task._id} />
        ))
      }
    </div>
  )
}

export default Home;