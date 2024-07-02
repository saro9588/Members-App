import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";
import { note } from "@prisma/client";

// Create a note for a previously created member
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log("POST request params:", params); // Log request params
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  console.log("POST request body:", body); // Log request body

  const member = await prisma.member.findUnique({
    where: { id: params.id },
  });

  if (!member) {
    console.log("Member not found for ID:", params.id); // Log member not found
    return NextResponse.json({ error: "Member not found" }, { status: 404 });
  }

  const note = await prisma.note.create({
    data: {
      authorId: member.id,
      description: body.description,
      createdBy: member.createdBy,
    },
  });

  return NextResponse.json(note, { status: 201 });
}

// Delete a member and notes associated with the member
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log("DELETE request params:", params); // Log request params
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.email) {
    return NextResponse.json({}, { status: 401 });
  }

  const userEmail = session.user.email;
  const member = await prisma.member.findUnique({
    where: { id: params.id },
  });

  if (!member) {
    console.log("Member not found for ID:", params.id); // Log member not found
    return NextResponse.json({ error: "Member not found" }, { status: 404 });
  }

  if (member.createdBy !== userEmail) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  await prisma.member.delete({
    where: { id: params.id },
  });

  return NextResponse.json(
    { message: "Member deleted successfully" },
    { status: 200 }
  );
}

// Update a note for a previously created member
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log("PATCH request params:", params); // Log request params
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  console.log("PATCH request body:", body); // Log request body

  const { id, description } = body;
  const member = await prisma.member.findUnique({
    where: { id: params.id },
    include: {
      notes: true,
    },
  });

  if (!member) {
    console.log("Member not found for ID:", params.id); // Log member not found
    return NextResponse.json({ error: "Member not found" }, { status: 404 });
  }

  const noteToUpdate = member.notes.find((note) => note.id === id);
  if (!noteToUpdate) {
    console.log("Note not found for ID:", id); // Log note not found
    return NextResponse.json({ error: "Note not found" }, { status: 404 });
  }

  const updatedNote = await prisma.note.update({
    where: {
      id: noteToUpdate.id,
    },
    data: {
      authorId: member.id,
      description: description,
      createdBy: member.createdBy,
    },
  });

  return NextResponse.json(updatedNote, { status: 200 });
}
