import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";
import { note } from "@prisma/client";

//create a note for a previously created member
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();
  const member = await prisma.member.findUnique({
    where: { id: params.id },
  });

  if (!member) {
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
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.email) {
    return NextResponse.json({}, { status: 401 });
  }

  const userEmail = session.user.email;
  const member = await prisma.member.findUnique({
    where: { id: params.id },
  });

  if (!member) {
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

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log("PATCH request params:", params); // Log request params
  const session = await getServerSession(authOptions);
  if (!session) {
    console.log("Unauthorized: No session found");
    return NextResponse.json({}, { status: 401 });
  }

  const body = await request.json();
  console.log("PATCH request body:", body); // Log request body

  const { description } = body;

  try {
    const note = await prisma.note.findUnique({
      where: { id: params.id },
    });

    if (!note) {
      console.log("Note not found for ID:", params.id); // Log note not found
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    console.log("Note found:", note); // Log found note

    const member = await prisma.member.findUnique({
      where: { id: note.authorId },
    });

    if (!member) {
      console.log("Member not found for ID:", note.authorId); // Log member not found
      return NextResponse.json({ error: "Member not found" }, { status: 404 });
    }

    console.log("Member found:", member); // Log found member

    const updatedNote = await prisma.note.update({
      where: {
        id: note.id,
      },
      data: {
        description: description,
      },
    });

    console.log("Note updated:", updatedNote); // Log updated note
    return NextResponse.json(updatedNote, { status: 200 });
  } catch (error) {
    console.error("Error updating note:", error); // Log any errors
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
