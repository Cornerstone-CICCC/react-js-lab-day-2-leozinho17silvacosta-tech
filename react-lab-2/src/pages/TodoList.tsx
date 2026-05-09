import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-hot-toast';
import { useUser } from '../context/AppContext';

interface Todo {
  id: string;
  text: string;
}

const TodoList = () => {
  const { user, logout } = useUser();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [task, setTask] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!task.trim()) return;
    setTodos([...todos, { id: uuidv4(), text: task }]);
    setTask('');
    toast.success(`${task} added!`);
  };

  return (
    <div className="max-w-md mx-auto pt-20 px-6">
      <div className="flex justify-between items-center mb-10 border-b pb-4 dark:border-gray-700">
        <h2 className="text-xl">Welcome, <span className="font-bold text-black dark:text-white">{user.name}!</span></h2>
        <button onClick={logout} className="text-red-500 font-semibold hover:underline">Logout</button>
      </div>
      
      <p className="text-xl mb-8">Have a great and productive day!</p>

      <form onSubmit={handleAdd} className="flex gap-2 mb-8">
        <input 
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a new task..."
          className="flex-1 p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 outline-none"
        />
        <button className="bg-black text-white px-6 py-2 rounded-lg font-bold hover:bg-gray-800">
          Add Task
        </button>
      </form>

      <ul className="space-y-3">
        {todos.map(t => (
          <li key={t.id} className="flex justify-between p-4 border rounded-xl bg-gray-50 dark:bg-gray-800 dark:border-gray-700 shadow-sm">
            <span>{t.text}</span>

            <button onClick={() => {
                setTodos(todos.filter(x => x.id !== t.id));
                toast.error(`${t.text} removed!`);
            }} className="text-red-400 font-bold">DELETE</button>

          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
