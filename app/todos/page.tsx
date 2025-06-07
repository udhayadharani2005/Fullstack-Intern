'use client';

import { useEffect, useState } from 'react';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  // Fetch todos from API
  useEffect(() => {
    fetch('/api/todos')
      .then(res => res.json())
      .then(setTodos);
  }, []);

  // Add new todo
  const handleAdd = async () => {
    if (!newTodo.trim()) return;
    const res = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTodo }),
    });
    const data = await res.json();
    setTodos(prev => [...prev, data]);
    setNewTodo('');
  };

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">To-Do List</h1>

      <div className="mb-4 flex gap-2">
        <input
          className="border px-2 py-1 flex-1"
          type="text"
          placeholder="Enter a new task"
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-1 rounded"
          onClick={handleAdd}
        >
          Add
        </button>
      </div>

      <ul className="list-disc pl-5 space-y-1">
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.title} {todo.completed ? '✅' : ''}
          </li>
        ))}
      </ul>
    </main>
  );
}
