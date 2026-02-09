import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET({ params }: { params: { id: string } }) {
  try {
    const { id } = await params;

    if (!id)
      return NextResponse.json(
        { success: false, message: "ID_REQUIRED" },
        { status: 400 }
      );

    const todos = await prisma.todo.findUnique({ where: { id } });

    if (!todos)
      return NextResponse.json(
        { success: false, message: "TODOS_NOT_FOUND" },
        { status: 404 }
      );

    return NextResponse.json(
      {
        success: true,
        message: "SUCCESS",
        data: todos,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const data = await req.json();

    if (!id)
      return NextResponse.json(
        { success: false, message: "ID_REQUIRED" },
        { status: 400 }
      );

    const checkTodo = await prisma.todo.findUnique({ where: { id } });

    if (!checkTodo)
      return NextResponse.json(
        { success: false, message: "TODOS_NOT_FOUND" },
        { status: 404 }
      );

    const todos = await prisma.todo.update({ where: { id }, data });
    return NextResponse.json(
      {
        success: true,
        message: "SUCCESS",
        data: todos,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    console.log("ini params nya: ");

    if (!id)
      return NextResponse.json(
        { success: false, message: "ID_REQUIRED" },
        { status: 400 }
      );

    const checkTodo = await prisma.todo.findUnique({ where: { id } });

    if (!checkTodo)
      return NextResponse.json(
        { success: false, message: "TODOS_NOT_FOUND" },
        { status: 404 }
      );

    const todos = await prisma.todo.delete({ where: { id } });
    return NextResponse.json(
      {
        success: true,
        message: "SUCCESS",
        data: todos,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
