import { getCategory } from "@/prisma/category";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await getCategory();
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
}
