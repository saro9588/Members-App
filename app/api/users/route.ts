import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";

const createUserSchema = z.object({
  firstName: z.string().min(1).max(25),
  lastName: z.string().min(1).max(25),
  info: z.string().min(1, "Notes are required"),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createUserSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const newUser = await prisma.user.create({
    data: {
      firstname: body.firstName,
      lastname: body.lastName,
      info: body.info,
      createdAT: body.createdAT,
      notes: body.notes,
    },
    include: {
      notes: true,
    },
  });
  return NextResponse.json(newUser, { status: 201 });
}

export async function newPOST(
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

export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany({
    include: {
      notes: true,
    },
  });

  return NextResponse.json(users, { status: 200 });
}
