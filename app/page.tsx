"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import TaskGrid from "@/components/TaskGrid";
import Sidebar from "@/components/Sidebar";

export type Task = {
  id?: string;
  title: string;
  description: string;
  assigneeName: string;
  status: string;
  comments?: string[];
  createdAt?: string;
  updatedAt?: string;
};

const BACKEND_URL = "http://192.168.112.146:9090";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filters, setFilters] = useState({ status: "", assigneeName: "", fromCreated: "", toUpdated: "" });
  const [searchQuery, setSearchQuery] = useState("");

  const fetchTasks = () => {
    fetch(`${BACKEND_URL}/tasks`)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

 useEffect(() => {
  const hasDateFilters = filters.fromCreated || filters.toUpdated;

  const params = new URLSearchParams();
  if (filters.status) params.append("status", filters.status);
  if (filters.assigneeName) params.append("assigneeName", filters.assigneeName);
  if (filters.fromCreated) params.append("fromCreated", filters.fromCreated);
  if (filters.toUpdated) params.append("toUpdated", filters.toUpdated);

  const endpoint = hasDateFilters
    ? `${BACKEND_URL}/tasks/filter/date?${params.toString()}`
    : `${BACKEND_URL}/tasks/filter?${params.toString()}`;

  fetch(endpoint)
    .then((res) => res.json())
    .then((data) => setTasks(data))
    .catch(console.error);
}, [filters]);


  const handleCreateTask = (newTask: Task) => {
    fetch(`${BACKEND_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newTask, assigneeName: parseInt(newTask.assigneeName) }),
    })
      .then(() => fetchTasks())
      .catch(console.error);
  };

 
  const handleUpdateTask = async (updatedTask: Task) => {
    console.log("Sending update payload:", {
    title: updatedTask.title,
    description: updatedTask.description,
    assigneeName: updatedTask.assigneeName,
    status: updatedTask.status,
  });
  try {
    const response = await fetch(`${BACKEND_URL}/tasks/update/${updatedTask.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: updatedTask.title,
        description: updatedTask.description,
        assigneeName: updatedTask.assigneeName, // Send name, not ID
        status: updatedTask.status,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update task. Status: ${response.status}`);
    }

    await response.json();
    fetchTasks(); // refresh UI
  } catch (error) {
    console.error("Update error:", error);
    alert("Failed to update task. Please try again.");
  }
};



  const handleAddComment = (taskId: string, content: string) => {
    fetch(`${BACKEND_URL}/comments/insert`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ taskId: parseInt(taskId), content }) // cast to number if taskId is string
    })
      .then(() => fetchTasks()) // refresh task list
      .catch(console.error);
  };

  

const handleDeleteTask = async (taskToDelete: Task) => {
  try {
    const res = await fetch(`${BACKEND_URL}/tasks/delete/${taskToDelete.id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Delete failed");
    }

    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== taskToDelete.id)
    );

    alert("Task deleted successfully");
  } catch (error) {
    console.error("Failed to delete task:", error);
    alert("Failed to delete task");
  }
};



  const handleFilter = (filterValues: { status: string; assigneeName: string; fromCreated: string; toUpdated: string }) => {
    setFilters(filterValues);
  };

  const filteredTasks = tasks.filter((task) => {
    return (
      !searchQuery ||
      task.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div>
      <Header onCreate={handleCreateTask} onSearch={setSearchQuery} />
      <div className="flex flex-col sm:flex-row">
        <Sidebar onFilter={handleFilter} />
        <main className="flex-1 p-4">
          <TaskGrid
            tasks={filteredTasks}
            onUpdate={handleUpdateTask}
            onDelete={handleDeleteTask}
            onAddComment={handleAddComment}
          />

        </main>
      </div>
    </div>
  );
}
