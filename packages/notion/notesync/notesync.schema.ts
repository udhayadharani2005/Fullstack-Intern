import { z } from "zod";

/**
 * Schema for listNotes input parameters.
 * - `maxResults`: limits the number of notes returned (1-100)
 * - `query`: optional search string
 */
export const listNotesSchema = z.object({
  maxResults: z
    .number()
    .min(1, "Minimum 1 result")
    .max(100, "Maximum 100 results")
    .default(10),
  query: z.string().optional(),
});

// Export inferred TypeScript type
export type ListNotesInput = z.infer<typeof listNotesSchema>;
