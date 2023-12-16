import { hash } from "bcrypt";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userEmail = searchParams.get("userEmail");
  const userPassword = searchParams.get("userPassword");

  try {
    if (!userEmail || !userPassword)
      throw new Error("Pet and owner names required");
    await sql`INSERT INTO Users (email, password) VALUES (${userEmail}, ${userPassword});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const users = await sql`SELECT * FROM Users;`;
  return NextResponse.json({ users }, { status: 200 });
}
