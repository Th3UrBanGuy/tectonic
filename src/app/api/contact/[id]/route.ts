import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin, sanitizeString } from "@/lib/auth";

type Params = { params: Promise<{ id: string }> };

// PATCH /api/contact/[id] — update status (ADMIN ONLY)
export async function PATCH(req: NextRequest, { params }: Params) {
  const currentUser = requireAdmin(req);
  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const numericId = parseInt(id, 10);
  if (isNaN(numericId) || numericId < 1) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const body = await req.json().catch(() => ({}));
  // Validate status — only allow known values
  const validStatuses = ["New", "Read", "Starred", "Archived"];
  const status = body?.status ? sanitizeString(String(body.status), 20) : undefined;

  if (!status || !validStatuses.includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  try {
    const updated = await db.contactSubmission.update({
      where: { id: numericId },
      data: { status },
    });
    return NextResponse.json({ submission: updated });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}

// DELETE /api/contact/[id] — delete a submission (ADMIN ONLY)
export async function DELETE(req: NextRequest, { params }: Params) {
  const currentUser = requireAdmin(req);
  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const numericId = parseInt(id, 10);
  if (isNaN(numericId) || numericId < 1) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  try {
    await db.contactSubmission.delete({ where: { id: numericId } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
