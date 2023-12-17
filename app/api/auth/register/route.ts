import { hash } from "bcrypt";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
  const password = searchParams.get("password");

  try {
    if (!email || !password) throw new Error("User and email are required");
    const hashedPassword = await hash(password, 10);

    await sql`INSERT INTO Users (email, password) VALUES (${email}, ${hashedPassword});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const users = await sql`SELECT * FROM Users;`;
  return NextResponse.json({ users }, { status: 200 });
}
