'use client';
import React from "react";
import { useState ,useEffect} from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
type Task = {
  id?:string;
  title: string;
  description: string;
  //assignee: string;
  assigneeName: string;
  status: string;
  comments: [],
};
const BACKEND_URL="http://192.168.112.146:9090";
function Createtask({ onCreate }: { onCreate: (task: Task) => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [open, setOpen] = useState(false);
  //const [assignee, setAssignee] = useState("");
  //const [assigneeId, setAssigneeId] = useState("");
  const [assigneeName, setAssigneeName] = useState("");

  const [users, setUsers] = useState<{ id: number; name: string }[]>([]);
  useEffect(() => {
  fetch(`${BACKEND_URL}/user/users`)
    .then((res) => res.json())
    .then(setUsers)
    .catch(console.error);
}, []);

  /*const handleSubmit = async() => {
    if (!title || !status || !assignee) return;
    const newTask: Task = {
      title,
      description,
      assignee,
      status,
      comments: [],
    };

    try {
      const res = await fetch(`${BACKEND_URL}/tasks/insert`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          //id: newTask.id,
          title: newTask.title,
          description: newTask.description,
          assignee: parseInt(newTask.assignee), 
          status: newTask.status,
        }),
      });

      if (!res.ok) throw new Error("Failed to create task");

      onCreate(newTask); 
      setTitle("");
      setDescription("");
      setStatus("");
      setAssignee("");
      setOpen(false);
    } catch (err) {
      console.error("Error creating task:", err);
      alert("Failed to create task. Try again.");
    }
  };*/

  const handleSubmit = async () => {
  if (!title || !status || !assigneeName) return;

  try {
    const res = await fetch(`${BACKEND_URL}/tasks/insert`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        assigneeName,
        status,
      }),
    });

    if (!res.ok) throw new Error("Failed to create task");

    // Optional: fetch the created task from response if needed
    const createdTask = await res.json();

    // Call onCreate with new task (you may include `id` from backend here if returned)
    onCreate({
      title,
      description,
      /*assignee:*/assigneeName,
      status,
      comments: [],
    });

    // Clear form
    setTitle("");
    setDescription("");
    setStatus("");
    setAssigneeName("");
    setOpen(false);
  } catch (err) {
    console.error("Error creating task:", err);
    alert("Failed to create task. Try again.");
  }
};


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gray-800 text-white hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 font-medium px-4 py-2 rounded-md shadow">+Create</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a New Task</DialogTitle>
          <DialogDescription>
            Provide information about the task
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label>Task:</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="grid gap-3">
            <Label>Description:</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="grid gap-3">
            <Label>Status</Label>
            <Select onValueChange={(value) => setStatus(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="TO DO">To Do</SelectItem>
                  <SelectItem value="IN PROGRESS">In Progress</SelectItem>
                  <SelectItem value="DONE">Done</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-3">
            <Label>Assignee:</Label>
            <Select onValueChange={(value) => setAssigneeName(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Assignee" />
              </SelectTrigger>
              <SelectContent>
                {users.map((user) => (
                <SelectItem key={user.id} value={user.name}>
                  {user.name}
                </SelectItem>

                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSubmit}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default Createtask;
