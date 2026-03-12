import { NextRequest, NextResponse } from "next/server";
import { newContactNotification } from "@/utils/emails";

// Simple in-memory rate limiter (per IP, resets on server restart)
const rateLimitMap = new Map<string, { count: number; ts: number }>();
const RATE_WINDOW_MS = 60_000; // 1 min window
const MAX_REQUESTS = 2; // max 2 submissions per minute per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now - entry.ts > RATE_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, ts: now });
    return false;
  }
  if (entry.count >= MAX_REQUESTS) return true;
  entry.count += 1;
  return false;
}

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment and try again." },
        { status: 429 },
      );
    }

    const body = await req.json();
    const { name, email, subject, message } = body as Record<string, string>;

    // Validation
    const errors: Record<string, string> = {};
    if (!name?.trim()) errors.name = "El nombre es requerido.";
    if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errors.email = "Email inválido.";
    if (!subject?.trim()) errors.subject = "El asunto es requerido.";
    if (!message?.trim() || message.trim().length < 10)
      errors.message = "El mensaje debe tener al menos 10 caracteres.";

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 422 });
    }

    const recipientEmail = process.env.EMAIL_USER ?? "";
    if (!recipientEmail) {
      console.error("EMAIL_USER env variable is not set");
      return NextResponse.json(
        { error: "Server configuration error." },
        { status: 500 },
      );
    }

    await newContactNotification({
      to: recipientEmail,
      context: {
        senderName: name.trim(),
        senderEmail: email.trim(),
        subject: subject.trim(),
        message: message.trim(),
        sentAt: new Date().toLocaleString("es-VE", {
          timeZone: "America/Caracas",
          dateStyle: "full",
          timeStyle: "short",
        }),
      },
    });

    return NextResponse.json(
      { success: true, message: "Mensaje enviado correctamente." },
      { status: 200 },
    );
  } catch (err) {
    console.error("[new-contact] Error:", err);
    return NextResponse.json(
      { error: "Error interno del servidor. Intenta de nuevo más tarde." },
      { status: 500 },
    );
  }
}
