
// app/api/notion/notesync/route.ts
import { NextRequest, NextResponse } from "next/server";
import { listNotes } from "@/packages/integrations/notion/notesync/notesync.functions";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  // Extract query parameters
  const maxResults = parseInt(searchParams.get("maxResults") || "10");
  const query = searchParams.get("query") || undefined;

  try {
    const result = await listNotes({ maxResults, query });
    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Invalid input",
      },
      { status: 400 }
    );
  }
}