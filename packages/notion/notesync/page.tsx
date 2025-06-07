
// app/notion/notesync/page.tsx

"use client";

import { useEffect, useState } from "react";

interface Note {
  id: string;
  title: string;
  content: string;
}

export default function NotesyncPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch("/api/notion/notesync?maxResults=5&query=mock");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Unknown error");
        setNotes(data.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">🗒️ Notion Notesync (Mock)</h1>

      {loading && <p>Loading notes...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      <ul className="space-y-3">
        {notes.map((note) => (
          <li key={note.id} className="p-4 border rounded shadow-sm bg-white">
            <h2 className="font-bold">{note.title}</h2>
            <p className="text-sm text-gray-700">{note.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}