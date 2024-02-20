import { hash } from "bcrypt";
import { QueryResult, sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const data: QueryResult = await sql`
      SELECT email FROM users WHERE email = ${email}
    `;
    const userExists = data.rows.length > 0;
    if (userExists) {
      return NextResponse.json(
        { error: "An error occurred, please try again." },
        { status: 400 }
      );
    }

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
