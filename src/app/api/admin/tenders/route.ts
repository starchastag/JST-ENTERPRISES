import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";

export async function GET(request: NextRequest) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  try {
    const tenders = await prisma.tenderRecord.findMany({ orderBy: { updatedAt: "desc" } });
    return NextResponse.json({ success: true, tenders });
  } catch (error) {
    console.error("ADMIN TENDER LIST ERROR", error);
    return NextResponse.json({ success: false, message: "Could not load tender records" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  try {
    const body = await request.json();
    if (!body.title?.trim()) return NextResponse.json({ success: false, message: "Tender title is required" }, { status: 400 });
    const rawValue = body.value === "" || body.value == null ? null : Number(body.value);
    if (rawValue !== null && (!Number.isFinite(rawValue) || rawValue < 0)) {
      return NextResponse.json({ success: false, message: "Tender value must be a valid non-negative number" }, { status: 400 });
    }
    const tender = await prisma.tenderRecord.create({
      data: {
        title: String(body.title).trim(),
        department: body.department ? String(body.department).trim() : null,
        tenderNo: body.tenderNo ? String(body.tenderNo).trim() : null,
        category: body.category ? String(body.category).trim() : null,
        value: rawValue,
        description: body.description ? String(body.description).trim() : null,
        documentUrl: body.documentUrl ? String(body.documentUrl).trim() : null,
        status: body.status === "PUBLISHED" ? "PUBLISHED" : "DRAFT",
      },
    });
    return NextResponse.json({ success: true, tender }, { status: 201 });
  } catch (error) {
    console.error("ADMIN TENDER CREATE ERROR", error);
    return NextResponse.json({ success: false, message: "Could not create tender record" }, { status: 500 });
  }
}
