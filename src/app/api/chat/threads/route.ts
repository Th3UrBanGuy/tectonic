import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

// GET /api/chat/threads — list all chat threads (admin only)
export async function GET(req: Request) {
  const currentUser = requireAdmin(req);
  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const threads = await db.chatThread.findMany({
    orderBy: { updatedAt: "desc" },
  });
  return NextResponse.json({ threads });
}

// POST /api/chat/threads — create a new chat thread (admin only)
export async function POST(req: NextRequest) {
  const currentUser = requireAdmin(req);
  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const name = String(body?.name ?? "").trim();
  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const thread = await db.chatThread.create({
    data: {
      name,
      avatar: body?.avatar ? String(body.avatar) : name.charAt(0).toUpperCase(),
      status: body?.status ? String(body.status) : "online",
    },
  });

  return NextResponse.json({ thread });
}

// DELETE /api/chat/threads — delete a thread + its messages (admin only)
export async function DELETE(req: NextRequest) {
  const currentUser = requireAdmin(req);
  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const id = String(body?.id ?? "");
  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  await db.chatMessage.deleteMany({ where: { conversationId: id } });
  await db.chatThread.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
