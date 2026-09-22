import { createFileRoute } from "@tanstack/react-router";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clean = (value: unknown, max = 255) => String(value ?? "").trim().slice(0, max);

export const Route = createFileRoute("/api/booking")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const name = clean(body?.name, 100);
          const email = clean(body?.email, 255);
          const service = clean(body?.service, 100);
          const date = clean(body?.date, 40);
          const time = clean(body?.time, 40);
          const budget = clean(body?.budget, 80);
          const note = clean(body?.note, 1500);

          if (!name) return Response.json({ error: "Please enter your name." }, { status: 400 });
          if (!EMAIL_PATTERN.test(email)) return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
          if (!service) return Response.json({ error: "Please select a service." }, { status: 400 });
          if (!date || !time) return Response.json({ error: "Please choose a preferred date and time." }, { status: 400 });

          const apiKey = process.env["RESEND_API_KEY"];
          const from = process.env["CONTACT_FROM_EMAIL"];
          const to = process.env["CONTACT_TO_EMAIL"];
          if (!apiKey || !from || !to) {
            console.error("Booking form is missing RESEND_API_KEY, CONTACT_FROM_EMAIL, or CONTACT_TO_EMAIL.");
            return Response.json({ error: "Booking requests are not configured yet. Please try again later." }, { status: 503 });
          }

          const resendResponse = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
            body: JSON.stringify({
              from,
              to: [to],
              reply_to: email,
              subject: `Booking request: ${service} — ${name} (${date} ${time})`,
              text: [`Name: ${name}`, `Email: ${email}`, `Service: ${service}`, `Preferred date: ${date}`, `Preferred time: ${time}`, budget ? `Budget: ${budget}` : "", "", note].filter(Boolean).join("\n"),
            }),
          });

          if (!resendResponse.ok) {
            console.error("Resend rejected booking submission:", await resendResponse.text());
            return Response.json({ error: "The booking request could not be sent. Please try again later." }, { status: 502 });
          }
          return Response.json({ ok: true });
        } catch (error) {
          console.error("Booking form error:", error);
          return Response.json({ error: "The booking request could not be sent. Please try again later." }, { status: 500 });
        }
      },
    },
  },
});
