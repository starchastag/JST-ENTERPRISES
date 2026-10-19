import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";

export async function GET(request: NextRequest) {
  const denied = requireAdmin(request);
  if (denied) return denied;

  try {
    const [projects, certificates, tenders, enquiries, newEnquiries] = await Promise.all([
      prisma.project.count(),
      prisma.certificate.count(),
      prisma.tenderRecord.count(),
      prisma.enquiry.count(),
      prisma.enquiry.count({ where: { status: "NEW" } }),
    ]);
    return NextResponse.json({
      success: true,
      overview: { projects, certificates, tenders, enquiries, newEnquiries },
    });
  } catch (error) {
    console.error("ADMIN OVERVIEW ERROR", error);
    return NextResponse.json({ success: false, message: "Could not load overview" }, { status: 500 });
  }
}
