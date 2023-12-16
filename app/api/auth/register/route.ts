import { hash } from "bcrypt";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const result =
      await sql`CREATE TABLE Users ( Name varchar(255), password varchar(255) );`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const hashedPassword = await hash(password, 10);
    const dbRes = await sql`
            INSERT INTO users (email, password)
            VALUES (${email}, ${hashedPassword})
        `;
    return NextResponse.json(
      { message: "User created successfully." },
      {
        status: 201,
      }
    );
  } catch (e) {
    return NextResponse.json(
      { error: "An error occurred while processing your request." },
      {
        status: 500,
      }
    );
  }
}
