import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";

export const PUT = async (request: Request) => {
  try {
  const body: { taskId: string, title: string, body: string, categoryId: string} = await request.json();
  const taskModifiy = await prisma.task.update({
    where: {
      id: body.taskId
    },
    data: {
      title: body.title,
      body: body.body,
      categoryId: body.categoryId
    }
  }
  );
  return NextResponse.json(taskModifiy, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
};
