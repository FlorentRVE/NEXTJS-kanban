import { getTask } from "@/prisma/task";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
  const create = await getTask();
  return NextResponse.json(create, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
};
