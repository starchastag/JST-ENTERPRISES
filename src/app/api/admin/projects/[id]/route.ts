import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";

type Context = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, context: Context) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  const { id } = await context.params;
  try {
    const body = await request.json();
    const data: Record<string, unknown> = {};
    for (const key of ["title", "category", "description", "location", "scope", "imageUrl"] as const) {
      if (body[key] !== undefined) data[key] = body[key] === "" ? null : String(body[key]).trim();
    }
    if (body.status !== undefined && ["DRAFT", "PUBLISHED", "ARCHIVED"].includes(body.status)) data.status = body.status;
    const project = await prisma.project.update({ where: { id }, data });
    return NextResponse.json({ success: true, project });
  } catch (error) {
    console.error("ADMIN PROJECT UPDATE ERROR", error);
    return NextResponse.json({ success: false, message: "Could not update project" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, context: Context) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  const { id } = await context.params;
  try {
    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("ADMIN PROJECT DELETE ERROR", error);
    return NextResponse.json({ success: false, message: "Could not delete project" }, { status: 500 });
  }
}
