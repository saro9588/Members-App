import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  const member = await prisma.member.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!member) {
    return NextResponse.json({ error: "Member not found" }, { status: 404 });
  }

  const note = await prisma.note.create({
    data: {
      authorId: member.id,
      description: body.description,
    },
  });
  return NextResponse.json(note, { status: 201 });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();

  const noteId = parseInt(params.id);
  const existingNote = await prisma.note.findUnique({
    where: { id: noteId },
  });

  if (!existingNote) {
    return NextResponse.json({ error: "Note not found" }, { status: 404 });
  }

  const updatedNote = await prisma.note.update({
    where: { id: noteId },
    data: {
      description: body.description,
    },
  });

  return NextResponse.json(updatedNote, { status: 200 });
}
