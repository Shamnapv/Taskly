"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import TaskGrid from "@/components/TaskGrid";
import Sidebar from "@/components/Sidebar";

type Task = {
  title: string;
  description: string;
  status: string;
  assignee: string;
  comments?: string[]; // optional if you're using comments
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filters, setFilters] = useState<{ status: string; assignee: string }>({
    status: "",
    assignee: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks, hasMounted]);

  const handleCreateTask = (newTask: Task) => {
    setTasks((prev) => [...prev, newTask]);
  };

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.title === updatedTask.title &&
        task.description === updatedTask.description &&
        task.status === updatedTask.status &&
        task.assignee === updatedTask.assignee
          ? updatedTask
          : task
      )
    );
  };

  const handleDeleteTask = (taskToDelete: Task) => {
    setTasks((prevTasks) =>
      prevTasks.filter(
        (t) =>
          !(
            t.title === taskToDelete.title &&
            t.description === taskToDelete.description &&
            t.status === taskToDelete.status &&
            t.assignee === taskToDelete.assignee
          )
      )
    );
  };

  const handleFilter = (filterValues: { status: string; assignee: string }) => {
    setFilters(filterValues);
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      !filters.status || task.status.toLowerCase() === filters.status.toLowerCase();

    const matchesAssignee =
      !filters.assignee || task.assignee?.toLowerCase().includes(filters.assignee.toLowerCase());

    const matchesSearch =
      !searchQuery ||
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesAssignee && matchesSearch;
  });

  if (!hasMounted) return null;

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
          />
        </main>
      </div>
    </div>
  );
}
