import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();

  const note = await prisma.note.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!note)
    return NextResponse.json({ error: "Invalid Note" }, { status: 404 });

  const userNotes = await prisma.note.create({
    data: {
      description: note.description,
      authorId: note.authorId,
    },
  });
  return NextResponse.json(userNotes);
}
