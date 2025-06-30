import React from "react";
import { Input } from "@/components/ui/input";
import Createtask from "./Createtask";
type Task = {
  id?:string;
  title: string;
  description: string;
  status: string;
  assignee: string;
  comments: [],
};
type HeaderProps={
    onCreate: (task: Task) => void;
    onSearch: (query: string) => void;
}
function Header({ onCreate,onSearch }:HeaderProps ) {
  return (
    <header className="w-full border-b bg-orange-500 shadow-sm sticky top-0 z-50 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/taskly.png" alt="Logo" className="h-50 w-50" />
        </div>
        <div className="flex-1 mx-4 max-w-md">
          <Input
            type="text"
            placeholder="search.."
            onChange={(e) => onSearch(e.target.value)}
            className="px-4 py-2 w-80 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-black shadow"
          />
        </div>
        <div>
          <Createtask onCreate={onCreate} />
        </div>
      </div>
    </header>
  );
}

export default Header;
