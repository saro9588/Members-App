import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

const createUserSchema = z.object({
  firstName: z.string().min(1).max(25),
  lastName: z.string().min(1).max(25),
  info: z.string().min(1, "Notes are required"),
});

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) return NextResponse.json({}, { status: 401 });
  if (!session.user.email) return NextResponse.json({}, { status: 401 });
  const body = await request.json();
  const validation = createUserSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const userEmail = session.user.email;
  const newMember = await prisma.member.create({
    data: {
      firstname: body.firstName,
      lastname: body.lastName,
      info: body.info,
      createdAT: body.createdAT,
      notes: body.notes,
      createdBy: userEmail,
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
