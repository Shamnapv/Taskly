'use client';
import React, { useState ,useEffect} from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
type User={id:number;name:string};
type Task = {
  id?:string;
  title: string;
  description: string;
  status: string;
  assignee: string;
  comments: string[];
};
type Props = {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (task: Task) => void;
  onDelete: (taskToDelete: Task) => void;
  onAddComment: (taskId: string, content: string) => void; 
};
const BACKEND_URL = "http://192.168.43.207:9090";
function TaskModal({task,isOpen,onClose,onUpdate,onDelete,onAddComment}:Props) {
    const [editedTask, setEditedTask] = useState({...task,comments: task.comments ?? [], });
    const [newComment,setNewComment]=useState("");
    const [users, setUsers] = useState<User[]>([]);
    useEffect(() => {
    fetch(`${BACKEND_URL}/user/users`)
      .then((res) => res.json())
      .then(setUsers)
      .catch(console.error);
    }, []);
    const handleSave = () => {
        onUpdate(editedTask);
        onClose();
    };
    const handleDelete = () => {
        onDelete(task);
        onClose();
    };
    const addComment = () => {
        if (!newComment.trim()) return;

        onAddComment(task.id!, newComment);

        setEditedTask(prev => ({ ...prev, comments: [...prev.comments, newComment] }));
        setNewComment("");
    };
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className='max-w-lg'>
                <DialogHeader>
                    <DialogTitle>Edit Task</DialogTitle>
                </DialogHeader>
                <div className='space-y4'>
                    <Label>Title</Label>
                    <Input  value={editedTask.title} onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}/>
                    <Label>Description</Label>
                    <Textarea value={editedTask.description} onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}/>
                    <Label>Status</Label>
                    <Select value={editedTask.status} onValueChange={(value) =>setEditedTask({ ...editedTask, status: value })}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="To Do">To Do</SelectItem>
                            <SelectItem value="In Progress">In Progress</SelectItem>
                            <SelectItem value="Done">Done</SelectItem>
                        </SelectContent>
                    </Select>
                    <Label>Assignee</Label>
                    <Select value={editedTask.assignee} onValueChange={(value) => setEditedTask({ ...editedTask, assignee: value })}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select assignee" />
                        </SelectTrigger>
                        <SelectContent>
                            {users.map((user) => (
                                <SelectItem key={user.id} value={user.id.toString()}>{user.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
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
