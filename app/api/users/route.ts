import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";

const createUserSchema = z.object({
  firstName: z.string().min(1).max(25),
  lastName: z.string().min(1).max(25),
  notes: z.string().min(1),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createUserSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const newUser = await prisma.users.create({
    data: {
      firstname: body.firstName,
      lastname: body.lastName,
      notes: body.notes,
    },
  });

  return NextResponse.json(newUser, { status: 201 });
}
