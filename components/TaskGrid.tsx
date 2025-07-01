import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import TaskModal from "./TaskModal";
type Task = {
  id?:string;
  title: string;
  description: string;
  status: string;
  //assignee: string;
  assigneeName: string;
  comments: string[];
};
type Props = {
  tasks: Task[];
  onUpdate: (task: Task) => void;
  onDelete: (taskToDelete: Task) => void;
  onAddComment: (taskId: string, content: string) => void; 
};
function TaskGrid({ tasks, onUpdate, onDelete ,onAddComment}: Props) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  if (tasks.length == 0) {
    return (
      <p className="text-muted-foreground text-center mt-10">No Class Found</p>
    );
  }
  return (
    <>
      <div className="flex flex-wrap gap-4 justify-items-start">
        {tasks.map((task) => (
          <Card key={task.id} className="bg-white border border-gray-200 hover:border-orange-500 hover:shadow-orange-md transition w-64 cursor-pointer" onClick={() => setSelectedTask(task)}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{task.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>{task.description}</p>
              <p>
                <span className="font-medium text-foreground">Status:</span>
                {"."}
                {task.status}
              </p>
              <p>
                <span className="font-medium text-foreground">Assignee:</span>{" "}
                {task.assigneeName}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
        {selectedTask && (
          <TaskModal
            task={selectedTask}
            isOpen={!!selectedTask}
            onClose={() => setSelectedTask(null)}
            onUpdate={(updatedTask) => {
              onUpdate(updatedTask);
              setSelectedTask(null);
            }}
            onDelete={(taskToDelete) => {
              onDelete(taskToDelete); 
              setSelectedTask(null);
            }}
            onAddComment={onAddComment}
          />
        )}
    </>
    
  );
}

export default TaskGrid;
