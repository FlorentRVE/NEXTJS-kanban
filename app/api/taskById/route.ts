import { getTaskById } from "@/prisma/task";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (id) {
      const categories = await getTaskById(id);
      return NextResponse.json(categories, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
