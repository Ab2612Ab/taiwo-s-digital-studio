import { createFileRoute } from "@tanstack/react-router";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clean = (value: unknown, max = 255) => String(value ?? "").trim().slice(0, max);

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const name = clean(body?.name, 100);
          const email = clean(body?.email, 255);
          const phone = clean(body?.phone, 40);
          const company = clean(body?.company, 120);
          const projectType = clean(body?.projectType, 100);
          const budget = clean(body?.budget, 80);
          const timeline = clean(body?.timeline, 80);
          const message = clean(body?.message, 2000);

          if (!name) return Response.json({ error: "Please enter your name." }, { status: 400 });
          if (!EMAIL_PATTERN.test(email)) return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
          if (!projectType) return Response.json({ error: "Please select a project type." }, { status: 400 });
          if (!message) return Response.json({ error: "Please enter a message." }, { status: 400 });

          const apiKey = process.env.RESEND_API_KEY;
          const from = process.env.CONTACT_FROM_EMAIL;
          const to = process.env.CONTACT_TO_EMAIL;
          if (!apiKey || !from || !to) {
            console.error("Contact form is missing RESEND_API_KEY, CONTACT_FROM_EMAIL, or CONTACT_TO_EMAIL.");
            return Response.json({ error: "Contact form is not configured yet. Please try again later." }, { status: 503 });
          }

          const resendResponse = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
            body: JSON.stringify({
              from,
              to: [to],
              reply_to: email,
              subject: `Portfolio enquiry: ${projectType} — ${name}`,
              text: [`Name: ${name}`, `Email: ${email}`, phone ? `Phone: ${phone}` : "", company ? `Company: ${company}` : "", `Project type: ${projectType}`, budget ? `Budget: ${budget}` : "", timeline ? `Timeline: ${timeline}` : "", "", message].filter(Boolean).join("\n"),
            }),
          });

          if (!resendResponse.ok) {
            console.error("Resend rejected contact form submission:", await resendResponse.text());
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
