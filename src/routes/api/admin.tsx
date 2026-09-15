import { createFileRoute } from "@tanstack/react-router";

const SESSION_COOKIE = "taiwo_admin_session";
const encoder = new TextEncoder();

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return result === 0;
}

async function sign(value: string, secret: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(value));
  return `${value}.${Array.from(new Uint8Array(signature), (byte) => byte.toString(16).padStart(2, "0")).join("")}`;
}

async function isAuthenticated(request: Request) {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) return false;

  const cookie = request.headers.get("cookie") ?? "";
  const raw = cookie.split(";").map((item) => item.trim()).find((item) => item.startsWith(`${SESSION_COOKIE}=`))?.slice(SESSION_COOKIE.length + 1);
  if (!raw) return false;

  const [value, signature] = raw.split(".");
  if (!value || !signature) return false;
  const expected = await sign(value, secret);
  return safeEqual(raw, expected);
}

function sessionCookie(value: string) {
  return `${SESSION_COOKIE}=${value}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=86400`;
}

export const Route = createFileRoute("/api/admin")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!(await isAuthenticated(request))) {
          return Response.json({ authenticated: false }, { status: 401 });
        }

        return Response.json({
          authenticated: true,
          backend: {
            contactApi: true,
            resendConfigured: Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_FROM_EMAIL && process.env.CONTACT_TO_EMAIL),
          },
          resources: {
            profileImage: true,
            aboutImage: true,
            projectImages: 6,
            serviceImages: 4,
            processImage: true,
          },
          whatsapp: "2349045945470",
        });
      },
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const action = String(body?.action ?? "");

          if (action === "logout") {
            return new Response(JSON.stringify({ ok: true }), {
              status: 200,
              headers: { "Content-Type": "application/json", "Set-Cookie": `${SESSION_COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0` },
            });
          }

          if (action !== "login") return Response.json({ error: "Invalid action." }, { status: 400 });

          const password = String(body?.password ?? "");
          const adminPassword = process.env.ADMIN_PASSWORD;
          const secret = process.env.ADMIN_SESSION_SECRET;

          if (!adminPassword || !secret) {
            return Response.json({ error: "Admin panel is not configured yet." }, { status: 503 });
          }

          if (!safeEqual(password, adminPassword)) {
            return Response.json({ error: "Invalid admin password." }, { status: 401 });
          }

          const session = await sign(`${Date.now()}.${crypto.randomUUID()}`, secret);
          return new Response(JSON.stringify({ ok: true }), {
            status: 200,
            headers: { "Content-Type": "application/json", "Set-Cookie": sessionCookie(session) },
          });
        } catch {
          return Response.json({ error: "Invalid request." }, { status: 400 });
        }
      },
    },
  },
});
