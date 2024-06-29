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
    return NextResponse.json(validation.error.flatten(), { status: 400 });

  const userEmail = session.user.email;
  const newMember = await prisma.member.create({
    data: {
      firstname: body.firstName,
      lastname: body.lastName,
      info: body.info,
      createdBy: userEmail,
    },
    include: {
      notes: true,
    },
  });
  return NextResponse.json(newMember, { status: 201 });
}

export async function GET(request: NextRequest) {
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

    const userEmail = session.user.email;
    const members = await prisma.member.findMany({
      where: {
        createdBy: userEmail,
      },
      include: {
        notes: true,
      },
    });

    return NextResponse.json(members, { status: 200 });
  } catch (error) {
    console.error("Error fetching members:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
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

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

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
