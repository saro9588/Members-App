import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";

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

//update member note
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    console.log("Unauthorized: No session found");
    return NextResponse.json({}, { status: 401 });
  }
  const body = await request.json();
  const { description } = body;
  try {
    const note = await prisma.note.findUnique({
      where: { id: params.id },
    });
    if (!note) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }
    const member = await prisma.member.findUnique({
      where: { id: note.authorId },
    });
    if (!member) {
      return NextResponse.json({ error: "Member not found" }, { status: 404 });
    }
    const updatedNote = await prisma.note.update({
      where: {
        id: note.id,
      },
      data: {
        description: description,
      },
    });
    return NextResponse.json(updatedNote, { status: 200 });
  } catch (error) {
    console.error("Error updating note:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
