// app/api/todos/route.ts
import { NextRequest, NextResponse } from 'next/server';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

const todos: Todo[] = [
  { id: 1, title: 'Learn Next.js', completed: false },
  { id: 2, title: 'Build a project', completed: false },
];

// GET - return all todos
export function GET() {
  return NextResponse.json(todos);
}

// POST - add a new todo
export async function POST(request: NextRequest) {
  const body = await request.json();
  const newTodo: Todo = {
    id: Date.now(),
    title: body.title,
    completed: false,
  };
  todos.push(newTodo);
  return NextResponse.json(newTodo, { status: 201 });
}
