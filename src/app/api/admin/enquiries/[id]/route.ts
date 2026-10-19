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
    const allowed = ["NEW", "IN_PROGRESS", "RESPONDED", "CLOSED"];
    if (!allowed.includes(body.status)) {
      return NextResponse.json({ success: false, message: "Invalid enquiry status" }, { status: 400 });
    }
    const enquiry = await prisma.enquiry.update({ where: { id }, data: { status: body.status } });
    return NextResponse.json({ success: true, enquiry });
  } catch (error) {
    console.error("ADMIN ENQUIRY UPDATE ERROR", error);
    return NextResponse.json({ success: false, message: "Could not update enquiry" }, { status: 500 });
  }
}
