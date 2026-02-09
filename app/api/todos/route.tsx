import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getUserid } from "../getUserid";

export async function GET(req: NextRequest) {
  try {
    const filter = req.nextUrl.searchParams.get("filter");
    console.log(filter);
    const userid = await getUserid();
    if (!userid)
      return NextResponse.json(
        { success: false, message: "USERID_REQUIRED" },
        { status: 400 },
      );
    let todos;
    if (filter === "all") {
      todos = await prisma.todo.findMany({ where: { userid } });
    } else {
      todos = await prisma.todo.findMany({
        where: {
          AND: [
            { userid },
            { completed: filter === "completed" ? true : false },
          ],
        },
      });
    }
    return NextResponse.json(todos);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userid = await getUserid();

    if (!userid || !body.title) {
      return NextResponse.json(
        {
          success: false,
          message: "INVALID_PAYLOAD",
          errors: {
            userid: !userid ? "USERID_REQUIRED" : undefined,
            title: !body.title ? "TITLE_REQUIRED" : undefined,
          },
        },
        { status: 422 },
      );
    }

    const rows = await prisma.todo.create({
      data: {
        ...body,
        userid,
        deadline: body.deadline ? new Date(body.deadline) : null,
      },
    });

    return NextResponse.json(
      { success: true, message: "SUCCESS", data: rows },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
