import { deleteTask } from "@/prisma/task";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
  const body: { taskId: string } = await request.json();
  const taskDelete = await deleteTask(body.taskId);
  return NextResponse.json(taskDelete, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
};
