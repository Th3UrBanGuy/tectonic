import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { writeFile, unlink, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "certifications");

/**
 * GET /api/certification-gallery
 * Public — returns all active gallery items, ordered by orderIndex.
 */
export async function GET() {
  try {
    const rows = await db.certificationGallery.findMany({
      orderBy: { orderIndex: "asc" },
    });
    return NextResponse.json({
      data: rows.map((r) => ({
        id: String(r.id),
        title: r.title,
        issuer: r.issuer || "",
        date: r.date ? new Date(r.date).toISOString().split("T")[0] : "",
        description: r.description || "",
        imageUrl: r.imageUrl || "",
        link: r.link || "",
        category: r.category || "certification",
        orderIndex: r.orderIndex || 0,
        isActive: r.isActive !== false,
      })),
    });
  } catch (error) {
    console.error("CertificationGallery GET error:", error);
    return NextResponse.json({ error: "Failed to fetch gallery" }, { status: 500 });
  }
}

/**
 * POST /api/certification-gallery
 * Admin — create a new gallery item. Supports multipart/form-data with optional "image" file.
 * All other fields come from form fields: title, issuer, date, description, link, category, orderIndex.
 */
export async function POST(req: NextRequest) {
  const currentUser = requireAdmin(req);
  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    if (!existsSync(UPLOAD_DIR)) {
      await mkdir(UPLOAD_DIR, { recursive: true });
    }

    const contentType = req.headers.get("content-type") || "";
    let title = "";
    let issuer = "";
    let dateStr = "";
    let description = "";
    let link = "";
    let category = "certification";
    let orderIndex = 0;
    let imageUrl = "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      title = (formData.get("title") as string) || "";
      issuer = (formData.get("issuer") as string) || "";
      dateStr = (formData.get("date") as string) || "";
      description = (formData.get("description") as string) || "";
      link = (formData.get("link") as string) || "";
      category = (formData.get("category") as string) || "certification";
      orderIndex = parseInt((formData.get("orderIndex") as string) || "0", 10);

      const file = formData.get("image") as File | null;
      if (file && file.size > 0) {
        const ext = file.name.split(".").pop() || "jpg";
        const filename = `cert-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
        const buffer = Buffer.from(await file.arrayBuffer());
        await writeFile(path.join(UPLOAD_DIR, filename), buffer);
        imageUrl = `/uploads/certifications/${filename}`;
      }
    } else {
      const body = await req.json().catch(() => ({}));
      title = body.title || "";
      issuer = body.issuer || "";
      dateStr = body.date || "";
      description = body.description || "";
      link = body.link || "";
      category = body.category || "certification";
      orderIndex = body.orderIndex || 0;
      imageUrl = body.imageUrl || "";
    }

    if (!title) {
      return NextResponse.json({ error: "title is required" }, { status: 400 });
    }

    const row = await db.certificationGallery.create({
      data: {
        title,
        issuer: issuer || null,
        date: dateStr ? new Date(dateStr) : null,
        description: description || null,
        imageUrl: imageUrl || null,
        link: link || null,
        category: category || "certification",
        orderIndex,
        isActive: true,
      },
    });

    return NextResponse.json({
      data: {
        id: String(row.id),
        title: row.title,
        issuer: row.issuer || "",
        date: row.date ? new Date(row.date).toISOString().split("T")[0] : "",
        description: row.description || "",
        imageUrl: row.imageUrl || "",
        link: row.link || "",
        category: row.category || "certification",
        orderIndex: row.orderIndex || 0,
        isActive: row.isActive !== false,
      },
    });
  } catch (error) {
    console.error("CertificationGallery POST error:", error);
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}

/**
 * PUT /api/certification-gallery
 * Admin — bulk replace all gallery items. Expects { data: GalleryItem[] }.
 * Supports multipart if "image" fields are present on individual items.
 */
export async function PUT(req: NextRequest) {
  const currentUser = requireAdmin(req);
  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const items = body.data || body;

    if (!Array.isArray(items)) {
      return NextResponse.json({ error: "data must be an array" }, { status: 400 });
    }

    // Get existing items to find images to potentially clean up
    const existing = await db.certificationGallery.findMany();
    const existingIds = new Set(existing.map((e) => e.id));

    // Delete all and re-create
    await db.certificationGallery.deleteMany();

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      await db.certificationGallery.create({
        data: {
          title: item.title || "Untitled",
          issuer: item.issuer || null,
          date: item.date ? new Date(item.date) : null,
          description: item.description || null,
          imageUrl: item.imageUrl || null,
          link: item.link || null,
          category: item.category || "certification",
          orderIndex: item.orderIndex ?? i,
          isActive: item.isActive !== false,
        },
      });
    }

    return NextResponse.json({ success: true, count: items.length });
  } catch (error) {
    console.error("CertificationGallery PUT error:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

/**
 * DELETE /api/certification-gallery?id=X
 * Admin — delete a single gallery item.
 */
export async function DELETE(req: NextRequest) {
  const currentUser = requireAdmin(req);
  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  try {
    const row = await db.certificationGallery.findUnique({ where: { id: parseInt(id, 10) } });
    if (row?.imageUrl && row.imageUrl.startsWith("/uploads/")) {
      const filePath = path.join(process.cwd(), "public", row.imageUrl);
      if (existsSync(filePath)) {
        await unlink(filePath).catch(() => {});
      }
    }
    await db.certificationGallery.delete({ where: { id: parseInt(id, 10) } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("CertificationGallery DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
