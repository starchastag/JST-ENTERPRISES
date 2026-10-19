import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";

export async function GET(request: NextRequest) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  try {
    const certificates = await prisma.certificate.findMany({ orderBy: { updatedAt: "desc" } });
    return NextResponse.json({ success: true, certificates });
  } catch (error) {
    console.error("ADMIN CERTIFICATE LIST ERROR", error);
    return NextResponse.json({ success: false, message: "Could not load certificates" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  try {
    const body = await request.json();
    if (!body.title?.trim()) return NextResponse.json({ success: false, message: "Certificate title is required" }, { status: 400 });
    const certificate = await prisma.certificate.create({
      data: {
        title: String(body.title).trim(),
        issuer: body.issuer ? String(body.issuer).trim() : null,
        certificateNo: body.certificateNo ? String(body.certificateNo).trim() : null,
        documentUrl: body.documentUrl ? String(body.documentUrl).trim() : null,
        notes: body.notes ? String(body.notes).trim() : null,
        status: body.status === "PUBLISHED" ? "PUBLISHED" : "DRAFT",
        issueDate: body.issueDate ? new Date(body.issueDate) : null,
        expiryDate: body.expiryDate ? new Date(body.expiryDate) : null,
      },
    });
    return NextResponse.json({ success: true, certificate }, { status: 201 });
  } catch (error) {
    console.error("ADMIN CERTIFICATE CREATE ERROR", error);
    return NextResponse.json({ success: false, message: "Could not create certificate" }, { status: 500 });
  }
}
