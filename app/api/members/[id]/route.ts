import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";

//creates a note for a previously created member
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

//Get notes of session user and notes associated with the member
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.email) {
      console.error("No session or user found");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userEmail = session.user.email;
    const note = await prisma.note.findMany({
      where: {
        createdBy: userEmail,
      },
    });
    if (note.some((note) => note.createdBy !== userEmail)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json(note, { status: 200 });
  } catch (error) {
    console.error("Error fetching members:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
