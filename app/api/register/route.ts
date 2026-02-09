import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const rows = await req.json();
    const { email, name, password } = rows.data;
    if (!email || !password)
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 },
      );
    const checkUser = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, todo: true },
    });

    if (checkUser)
      return NextResponse.json(
        { success: false, message: "User already exist" },
        { status: 400 },
      );

    const bcryptPassword = await bcrypt.hash(password, 10);

    const addUser = await prisma.user.create({
      data: { email, name, password: bcryptPassword },
      select: { id: true, email: true },
    });
    return NextResponse.json(addUser);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      {
        status: 500,
      },
    );
  }
}
