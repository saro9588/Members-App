import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const user = await prisma.user.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const note = await prisma.note.create({
    data: {
      description: body.description,
      authorId: user.id,
    },
  });
  return NextResponse.json(note, { status: 201 });
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const notes = await prisma.note.findUnique({
    where: { id: parseInt(params.id) },
  }); // Fetch all users from the database using Prisma
  console.log(notes);
  return NextResponse.json(notes, { status: 200 }); // Return users as JSON response with status 200
}
