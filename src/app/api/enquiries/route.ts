import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function clean(value: unknown, max = 3000) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = clean(body.name, 120);
    const organisation = clean(body.organisation, 180);
    const email = clean(body.email, 254).toLowerCase();
    const phone = clean(body.phone, 40);
    const message = clean(body.message, 3000);

    if (!name || !email || !message) {
      return NextResponse.json({ success: false, message: "Name, email and message are required" }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ success: false, message: "Enter a valid email address" }, { status: 400 });
    }

    const enquiry = await prisma.enquiry.create({
      data: { name, organisation: organisation || null, email, phone: phone || null, message },
      select: { id: true, createdAt: true },
    });
    return NextResponse.json({ success: true, enquiry }, { status: 201 });
  } catch (error) {
    console.error("PUBLIC ENQUIRY CREATE ERROR", error);
    return NextResponse.json({ success: false, message: "Could not submit enquiry right now" }, { status: 500 });
  }
}
