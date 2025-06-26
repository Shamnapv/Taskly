'use client'
import React from "react";
import { useState } from "react";
import Header from "@/components/Header";
import TaskGrid from "@/components/TaskGrid";

type Task={
  title:string;
  description:string;
  status:string;
}

export default function Home() {
  const [tasks,setTasks]=useState<Task[]>([]);
  const handleCreateTask=(newTask:Task)=>{
    setTasks([...tasks,newTask]);
  };
  return (
    <div>
      <Header onCreate={handleCreateTask}/>
      <main>
        <TaskGrid tasks={tasks}/>
      </main>
    </div>
  );
};
