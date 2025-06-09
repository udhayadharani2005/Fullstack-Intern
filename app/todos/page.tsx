'use client';

import { useEffect, useState } from 'react';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export default function Page() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Fetch todos from API
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await fetch('/api/todos');
        if (!res.ok) throw new Error('Failed to fetch todos');
        const data = await res.json();
        setTodos(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load todos');
      }
    };

    fetchTodos();
  }, []);

  // Add new todo
  const handleAdd = async () => {
    if (!newTodo.trim()) return;

    try {
      const res = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTodo }),
      });

      if (!res.ok) throw new Error('Failed to add todo');

      const newTask = await res.json();
      setTodos(prev => [...prev, newTask]);
      setNewTodo('');
    } catch (err) {
      console.error(err);
      setError('Failed to add todo');
    }
  };

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">To-Do List</h1>

      {error && (
        <p className="text-red-600 mb-4">
          {error}
        </p>
      )}

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
