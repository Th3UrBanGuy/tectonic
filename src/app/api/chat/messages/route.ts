import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

// GET /api/chat/messages?threadId=... — list messages in a thread (admin only)
export async function GET(req: NextRequest) {
  const currentUser = requireAdmin(req);
  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const threadId = searchParams.get("threadId");
  if (!threadId) {
    return NextResponse.json({ error: "threadId is required" }, { status: 400 });
  }

  const messages = await db.chatMessage.findMany({
    where: { conversationId: threadId },
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json({ messages });
}

// POST /api/chat/messages — send a message (admin side) (admin only)
export async function POST(req: NextRequest) {
  const currentUser = requireAdmin(req);
  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const threadId = String(body?.threadId ?? "");
  const text = String(body?.text ?? "").trim();

  if (!threadId || !text) {
    return NextResponse.json(
      { error: "threadId and text are required" },
      { status: 400 }
    );
  }

  const thread = await db.chatThread.findUnique({ where: { id: threadId } });
  if (!thread) {
    return NextResponse.json({ error: "Thread not found" }, { status: 404 });
  }

  // Persist the admin's message
  const msg = await db.chatMessage.create({
    data: {
      conversationId: threadId,
      senderName: currentUser.name || "Admin",
      senderAvatar: currentUser.name?.charAt(0).toUpperCase() || "A",
      text,
      isMe: true,
      read: true,
    },
  });

  // Update thread last message
  const timeStr = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  await db.chatThread.update({
    where: { id: threadId },
    data: { lastMsg: text, lastTime: timeStr, updatedAt: new Date() },
  });

  return NextResponse.json({ message: msg });
}
