'use client';
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
type Task = {
  title: string;
  description: string;
  status: string;
  assignee: string;
  comments: string[];
};
function TaskModal({task,onUpdate,onDelete}:{task:Task;onUpdate: (task: Task) => void;
  onDelete: (taskToDelete: Task) => void;}) {
    const [open,setOpen]=useState(false);
    const [editedTask, setEditedTask] = useState({...task,comments: task.comments ?? [], });
    const [newComment,setNewComment]=useState("");
    const handleSave = () => {
        onUpdate(editedTask);
        setOpen(false);
    };
    const handleDelete = () => {
        onDelete(task);
        setOpen(false);
    };
    const addComment = () => {
        const updated = { ...editedTask, comments: [...editedTask.comments, newComment] };
        setEditedTask(updated);
        setNewComment("");
    };
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">View</Button>
            </DialogTrigger>
            <DialogContent className='max-w-lg'>
                <DialogHeader>Edit Task</DialogHeader>
                <div className='space-y4'>
                    <Input  value={editedTask.title} onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}/>
                    <Textarea value={editedTask.description} onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}/>
                    <Input value={editedTask.status} onChange={(e) => setEditedTask({ ...editedTask, status: e.target.value })}/>
                    <Input value={editedTask.assignee} onChange={(e) => setEditedTask({ ...editedTask, assignee: e.target.value })}/>
                    <div>
                        <h4 className="font-semibold mb-2">Comments</h4>
                        <ul className="space-y-1 text-sm">
                            {editedTask.comments.map((c, idx) => (
                                <li key={idx} className="bg-gray-100 p-2 rounded">{c}</li>
                            ))}
                        </ul>
                        <div className="mt-2 flex gap-2">
                            <Input value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Add comment"/>
                            <Button onClick={addComment}>Add</Button>
                        </div>
                    </div>
                </div>
                <DialogFooter className="mt-4 flex justify-between">
                    <Button variant="destructive" onClick={handleDelete}>Delete</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default TaskModal
