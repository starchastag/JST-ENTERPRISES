import { NextRequest, NextResponse } from "next/server";

/**
 * Phase 4 starter guard.
 * Set ADMIN_API_KEY in .env.local and send it as x-admin-key.
 * For production, replace this shared-key approach with individual accounts,
 * hashed passwords, secure sessions, rate limiting and audit logging.
 */
export function requireAdmin(request: NextRequest) {
  const configuredKey = process.env.ADMIN_API_KEY;
  if (!configuredKey) {
    return NextResponse.json(
      { success: false, message: "Admin API is not configured. Set ADMIN_API_KEY." },
      { status: 503 }
    );
  }
  const suppliedKey = request.headers.get("x-admin-key");
  if (!suppliedKey || suppliedKey !== configuredKey) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }
  return null;
}
