import React from 'react';
import { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import  {Input} from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
function Sidebar({assignees,onFilter}:{assignees:string[];
    onFilter:(filters: {status:string;assignee:string})=>void;

}) {
    const [selectedStatus,setSelectedStatus]=useState("");
    const [searchText,setSearchText]=useState("");
    const [selectedAssignee,setSelectedAssignee]=useState("");

     const filteredSuggestions = assignees.filter((a) =>
    a.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleFilter = (status: string, assignee: string) => {
    setSelectedStatus(status);
    setSelectedAssignee(assignee);
    onFilter({ status, assignee });
  };
  return (
    <aside className="w-64 p-4 border-r bg-gray-100">
        <h2 className="text-lg font-bold mb-4">Filters</h2>
        <div className="mb-6">
            <h3 className="text-sm font-semibold mb-2">Status</h3>
            
        </div>
    </aside>
  )
}

export default Sidebar
