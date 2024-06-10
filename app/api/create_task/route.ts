import { createTask } from "@/prisma/task";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
  const body: { title: string, body: string, categoryId: string } = await request.json();
  const create = await createTask(body.title, body.body, body.categoryId);
  return NextResponse.json(create, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
};
