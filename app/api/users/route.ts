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
  });
  return NextResponse.json(newUser, { status: 201 });
}

export async function POST_newNote(request: NextRequest) {
  const body = await request.json();
  const validation = createUserSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });
  const userId = body.userId;
  const newNote = await prisma.note.create({
    data: {
      author: body.author,
      description: body.description,
    },
  });
  return NextResponse.json(newNote, { status: 201 });
}

export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany({
    include: {
      notes: true,
    },
  }); // Fetch all users from the database using Prisma

  return NextResponse.json(users, { status: 200 }); // Return users as JSON response with status 200
}
