"use client";
import React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type props = {
  onFilter: (filters: { status: string; assignee: string ;fromCreated:string;toUpdated:string;}) => void;
};
function Sidebar({ onFilter }: props) {
  const [status, setStatus] = useState("");
  const [assignee, setAssignee] = useState("");
  const [fromCreated,setFromCreated]=useState("");
  const [toUpdated,setToUpdated]=useState("");
  const handleApplyFilter = () => {
    onFilter({ status, assignee,fromCreated,toUpdated });
  };
  return (
    <aside className="w-full sm:w-64 border-r bg-white p-4 space-y-6 shadow-md">
      <h2 className="text-2xl font-bold text-orange-500">Filter</h2>
      <div className="space-y-1">
        <Label className="text-gray-700">Status</Label>
        <Select onValueChange={(value) => setStatus(value)}>
          <SelectTrigger className="w-full border-gray-300 focus:ring-orange-500">
            <SelectValue placeholder="select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="To Do">To Do</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Done">Done</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1">
        <Label className="text-gray-700">Assignee</Label>
        <Input
          type="text"
          placeholder="eneter assignee name"
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
          className="border-gray-300 focus:ring-orange-500"
        />
      </div>
      <div className="space-y-1">
        <Label className="text-gray-700">Created From</Label>
          <Input type="datetime-local" value={fromCreated} onChange={(e) => setFromCreated(e.target.value)} className="border-gray-300 focus:ring-orange-500"/>
      </div>
      <div className="space-y-1">
        <Label className="text-gray-700">Updated To</Label>
        <Input type="datetime-local" value={toUpdated} onChange={(e) => setToUpdated(e.target.value)} className="border-gray-300 focus:ring-orange-500"/>
      </div>
      <Button onClick={handleApplyFilter} className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold">
        Apply Filter
      </Button>
    </aside>
  );
}

export default Sidebar;
