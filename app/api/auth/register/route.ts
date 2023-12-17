import { hash } from "bcrypt";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

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

//     if (!email || !password) throw new Error("User and email are required");

//     await sql`INSERT INTO Users (email, password) VALUES (${email}, ${hashedPassword});`;
//   } catch (error) {
//     return NextResponse.json({ error }, { status: 500 });
//   }

//   const users = await sql`SELECT * FROM Users;`;
//   return NextResponse.json({ users }, { status: 200 });
// }
