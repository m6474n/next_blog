import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma"; // Adjust import based on your project structure
import { hash } from "bcrypt";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, username, password } = body;

    // Check if a user already exists with the given email
    const existingUserEmail = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUserEmail) {
      return NextResponse.json(
        { user: null, message: "User already exists with this email" },
        { status: 409 } // Conflict status code
      );
    }

    // Check if a user already exists with the given username
    const existingUserUsername = await prisma.user.findUnique({
      where: { username },
    });
    if (existingUserUsername) {
      return NextResponse.json(
        { user: null, message: "User already exists with this username" },
        { status: 409 } // Conflict status code
      );
    }

    // Hash the password
    const hashedPass = await hash(password, 10);

    // Create the new user
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPass,
      },
    });

    // Destructure to exclude the password field
    const { password: newUserPassword, ...rest } = newUser;

    // Respond with the newly created user (excluding the password) and a success message
    return NextResponse.json(
      { user: rest, message: "User created successfully" },
      { status: 201 } // Created status code
    );
  } catch (error) {
    console.error('Error creating user:', error); // Log the error for debugging
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 } // Internal server error status code
    );
  }
}
