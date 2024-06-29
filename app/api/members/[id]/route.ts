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
    where: { id: params.id },
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

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      console.error("No session or user found");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (!session.user.email) {
      console.error("User email not found in session");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await request.json();
    if (!id) {
      console.error("No ID provided");
      return NextResponse.json({ error: "Bad Request" }, { status: 400 });
    }

    const userEmail = session.user.email;
    const member = await prisma.member.findUnique({
      where: { id },
      include: { notes: true },
    });

    if (!member) {
      console.error("Member not found");
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }

    if (member.createdBy !== userEmail) {
      console.error("Unauthorized delete attempt");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.member.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Member deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting member:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
