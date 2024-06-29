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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const member = await prisma.member.findUnique({
    where: { id: params.id },
  });

  if (!member) {
    return NextResponse.json({ error: "Member not found" }, { status: 404 });
  }

  await prisma.member.delete({
    where: { id: params.id },
  });

  return NextResponse.json(
    { message: "Member deleted successfully" },
    { status: 200 }
  );
}
