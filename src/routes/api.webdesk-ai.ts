import { createFileRoute } from "@tanstack/react-router";

// WebDesk AI is intentionally browser-local. This route remains only as a safe
// compatibility endpoint so old clients never trigger a paid AI service.
export const Route = createFileRoute("/api/webdesk-ai")({
  server: {
    handlers: {
      POST: async () => Response.json({ error: "WebDesk AI runs locally in the browser. No paid AI API is used." }, { status: 410 }),
    },
  },
});
