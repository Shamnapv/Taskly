import React from 'react';
import { Input } from "@/components/ui/input";
import Createtask from './Createtask';
type Task={
    title:string;
    description:string;
    status:string;
}
function Header({ onCreate }: { onCreate: (task: Task) => void }) {
  return (
    <header className="w-full border-b bg-blue-100 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <img src="/taskly.png" alt="Logo" className='h-50 w-50'/>
            </div>
            <div className="flex-1 mx-4 max-w-md">
                <Input type='text' placeholder='search..' className='w-full border-b-black'/>
            </div>
            <div>
                <Createtask onCreate={onCreate}/>
            </div>
        </div>
    </header>
  );
};

export default Header;
