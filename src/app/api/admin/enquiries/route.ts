import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";

export async function GET(request: NextRequest) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  try {
    const enquiries = await prisma.enquiry.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json({ success: true, enquiries });
  } catch (error) {
    console.error("ADMIN ENQUIRY LIST ERROR", error);
    return NextResponse.json({ success: false, message: "Could not load enquiries" }, { status: 500 });
  }
}
