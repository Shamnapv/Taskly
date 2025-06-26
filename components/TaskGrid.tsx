import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
type Task={
    title:string;
    description:string;
    status:string;
}
  function TaskGrid({tasks=[]}:{tasks?:Task[]}) {
    if(tasks.length==0){
        return<p className="text-muted-foreground text-center mt-10">No Class Found</p>;
    }
  return (
    <div>
        {tasks.map((task,index)=>(
            <Card key={index} className="hover:shadow-md transition">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{task.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                    <p>{task.description}</p>
                    <p>
                        <span className="font-medium text-foreground">Status:</span>{"."}
                        {task.status}
                    </p>
                </CardContent>
            </Card>
        ))}
    </div>
  );
}

export default TaskGrid;
