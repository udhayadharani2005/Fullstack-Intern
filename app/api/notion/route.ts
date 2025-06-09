import { NextRequest, NextResponse } from "next/server";
import { listNotes } from "@/packages/notion/notesync/notesync.functions";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  // Extract query parameters
  let maxResults = parseInt(searchParams.get("maxResults") || "10");
  if (isNaN(maxResults) || maxResults < 1) {
    maxResults = 10;
  } else if (maxResults > 100) {
    maxResults = 100;
  }

  const query = searchParams.get("query") || undefined;

  try {
  const result = await listNotes({ maxResults, query });
  // result has { notes: [...], total: number }
  return NextResponse.json({ success: true, data: result }, { status: 200 });
} catch (error: unknown) {
  const errMsg = error instanceof Error ? error.message : 'Notion API error';
  return NextResponse.json(
    {
      success: false,
      error: errMsg || "Invalid input",
    },
    { status: 400 }
  );
}

}
