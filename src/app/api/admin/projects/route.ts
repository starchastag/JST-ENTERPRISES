import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";

export async function GET(request: NextRequest) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  try {
    const projects = await prisma.project.findMany({ orderBy: { updatedAt: "desc" } });
    return NextResponse.json({ success: true, projects });
  } catch (error) {
    console.error("ADMIN PROJECT LIST ERROR", error);
    return NextResponse.json({ success: false, message: "Could not load projects" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  try {
    const body = await request.json();
    if (!body.title?.trim() || !body.category?.trim() || !body.description?.trim()) {
      return NextResponse.json({ success: false, message: "Title, category and description are required" }, { status: 400 });
    }
    const project = await prisma.project.create({
      data: {
        title: String(body.title).trim(),
        category: String(body.category).trim(),
        description: String(body.description).trim(),
        location: body.location ? String(body.location).trim() : null,
        scope: body.scope ? String(body.scope).trim() : null,
        imageUrl: body.imageUrl ? String(body.imageUrl).trim() : null,
        status: body.status === "PUBLISHED" ? "PUBLISHED" : "DRAFT",
      },
    });
    return NextResponse.json({ success: true, project }, { status: 201 });
  } catch (error) {
    console.error("ADMIN PROJECT CREATE ERROR", error);
    return NextResponse.json({ success: false, message: "Could not create project" }, { status: 500 });
  }
}
