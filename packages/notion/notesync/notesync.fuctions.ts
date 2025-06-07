
// packages/integrations/notion/notesync/notesync.functions.ts

import { listNotesSchema, ListNotesInput } from "./notesync.schema";

/**
 * Mock implementation of the list-notes API.
 * Accepts validated input and returns fake notes data.
 */
export async function listNotes(input: unknown) {
  // Validate input using Zod schema
  const parsedInput: ListNotesInput = listNotesSchema.parse(input);

  // Simulate a mock notes list
  const fakeNotes = Array.from({ length: parsedInput.maxResults }, (_, i) => ({
    id: `note-${i + 1}`,
    title: `Mock Note ${i + 1}`,
    content: `This is the content of mock note ${i + 1}`,
    createdAt: new Date().toISOString(),
  }));

  // If a query is provided, filter mock notes by title
  const filteredNotes = parsedInput.query
    ? fakeNotes.filter((note) =>
        note.title.toLowerCase().includes(parsedInput.query!.toLowerCase())
      )
    : fakeNotes;

  return {
    notes: filteredNotes,
    total: filteredNotes.length,
  };
}