import { createFileRoute } from "@tanstack/react-router";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const name = String(body?.name ?? "").trim();
          const email = String(body?.email ?? "").trim();
          const projectType = String(body?.projectType ?? "").trim();
          const message = String(body?.message ?? "").trim();

          if (!name || name.length > 100) return Response.json({ error: "Invalid name." }, { status: 400 });
          if (!EMAIL_PATTERN.test(email) || email.length > 255) return Response.json({ error: "Invalid email address." }, { status: 400 });
          if (!projectType || projectType.length > 100) return Response.json({ error: "Invalid project type." }, { status: 400 });
          if (!message || message.length > 1000) return Response.json({ error: "Invalid message." }, { status: 400 });

          const apiKey = process.env.RESEND_API_KEY;
          const from = process.env.CONTACT_FROM_EMAIL;
          const to = process.env.CONTACT_TO_EMAIL;

          if (!apiKey || !from || !to) {
            console.error("Contact form is missing RESEND_API_KEY, CONTACT_FROM_EMAIL, or CONTACT_TO_EMAIL.");
            return Response.json({ error: "Contact form is not configured yet. Please try again later." }, { status: 503 });
          }

          const resendResponse = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from,
              to: [to],
              reply_to: email,
              subject: `Portfolio enquiry: ${projectType} — ${name}`,
              text: `Name: ${name}\nEmail: ${email}\nProject type: ${projectType}\n\n${message}`,
            }),
          });

          if (!resendResponse.ok) {
            const detail = await resendResponse.text();
            console.error("Resend rejected contact form submission:", detail);
            return Response.json({ error: "The message could not be sent. Please try again later." }, { status: 502 });
          }

          return Response.json({ ok: true });
        } catch (error) {
          console.error("Contact form error:", error);
          return Response.json({ error: "The message could not be sent. Please try again later." }, { status: 500 });
        }
      },
    },
  },
});
