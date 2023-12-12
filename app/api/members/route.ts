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

  const newMember = await prisma.member.create({
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
  return NextResponse.json(newMember, { status: 201 });
}

export async function GET(request: NextRequest) {
  const members = await prisma.member.findMany({
    include: {
      notes: true,
    },
  });

  return NextResponse.json(members, { status: 200 });
}
