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
  onFilter: (filters: { status: string; assignee: string }) => void;
};
function Sidebar({ onFilter }: props) {
  const [status, setStatus] = useState("");
  const [assignee, setAssignee] = useState("");
  const handleApplyFilter = () => {
    onFilter({ status, assignee });
  };
  return (
    <aside className="w-full sm:w-64 border-r bg-gray-50 p-4 space-y-4">
      <h2 className="text-xl font-semibold mb-2">Filter</h2>
      <div className="space-y-1">
        <Label>Status</Label>
        <Select onValueChange={(value) => setStatus(value)}>
          <SelectTrigger className="w-full">
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
        <Label>Assignee</Label>
        <Input
          type="text"
          placeholder="eneter assignee name"
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
        />
      </div>
      <Button onClick={handleApplyFilter} className="w-full mt-2">
        Apply Filter
      </Button>
    </aside>
  );
}

export default Sidebar;
