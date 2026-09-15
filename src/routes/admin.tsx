import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CheckCircle2, ExternalLink, Image, LogOut, Mail, MessageCircle, ShieldCheck, XCircle } from "lucide-react";

export const Route = createFileRoute("/admin")({ component: AdminPage });

type AdminData = {
  backend: { contactApi: boolean; resendConfigured: boolean };
  resources: { profileImage: boolean; aboutImage: boolean; projectImages: number; serviceImages: number; processImage: boolean };
  whatsapp: string;
};

async function adminRequest(input: RequestInit = {}) {
  const response = await fetch("/api/admin", { ...input, headers: { "Content-Type": "application/json", ...(input.headers ?? {}) } });
  const data = await response.json();
  if (!response.ok) throw new Error(data?.error ?? "Request failed.");
  return data;
}

function AdminPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loggingIn, setLoggingIn] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<AdminData | null>(null);

  const loadDashboard = async () => {
    try {
      const result = await adminRequest({ method: "GET" });
      setData(result);
      setAuthenticated(true);
    } catch {
      setAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { void loadDashboard(); }, []);

  const login = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoggingIn(true);
    setError("");
    try {
      await adminRequest({ method: "POST", body: JSON.stringify({ action: "login", password }) });
      setPassword("");
      await loadDashboard();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in.");
    } finally {
      setLoggingIn(false);
    }
  };

  const logout = async () => {
    await adminRequest({ method: "POST", body: JSON.stringify({ action: "logout" }) });
    setAuthenticated(false);
    setData(null);
    void navigate({ to: "/" });
  };

  if (loading) return <main className="flex min-h-screen items-center justify-center bg-background text-muted-foreground">Loading admin panel…</main>;

  if (!authenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-5 py-12">
        <div className="w-full max-w-md rounded-3xl border border-border/70 bg-card p-7 shadow-xl">
          <div className="mb-7 flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground"><ShieldCheck className="size-6" /></div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Taiwo Emmanuel</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">Admin Panel</h1>
          <p className="mt-2 text-sm text-muted-foreground">Secure access to your portfolio controls and system status.</p>
          <form onSubmit={login} className="mt-7 space-y-4">
            <label className="block text-sm font-medium">Admin password<input value={password} onChange={(event) => setPassword(event.target.value)} type="password" autoComplete="current-password" required className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-primary" /></label>
            {error && <p className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</p>}
            <button disabled={loggingIn} className="w-full rounded-xl bg-primary px-4 py-3 font-semibold text-primary-foreground disabled:opacity-60">{loggingIn ? "Signing in…" : "Sign in"}</button>
          </form>
          <Link to="/" className="mt-5 block text-center text-sm text-muted-foreground hover:text-foreground">← Back to portfolio</Link>
        </div>
      </main>
    );
  }

  const resourceCount = data ? 2 + data.resources.projectImages + data.resources.serviceImages + 1 : 0;

  return (
    <main className="min-h-screen bg-background px-5 py-8 md:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-6">
          <div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Taiwo Emmanuel</p><h1 className="mt-1 text-3xl font-bold tracking-tight">Admin Dashboard</h1></div>
          <div className="flex gap-2"><Link to="/" className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-semibold">View site <ExternalLink className="size-4" /></Link><button onClick={() => void logout()} className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-semibold"><LogOut className="size-4" /> Sign out</button></div>
        </header>

        <section className="grid gap-4 py-7 sm:grid-cols-2 lg:grid-cols-4">
          <Stat icon={<ShieldCheck />} label="Admin status" value="Protected" />
          <Stat icon={<Mail />} label="Contact API" value={data?.backend.contactApi ? "Active" : "Missing"} />
          <Stat icon={<Image />} label="Managed resources" value={String(resourceCount)} />
          <Stat icon={<MessageCircle />} label="WhatsApp" value={`+${data?.whatsapp ?? "2349045945470"}`} />
        </section>

        <div className="grid gap-6 lg:grid-cols-[1.3fr_.7fr]">
          <section className="rounded-3xl border border-border/70 bg-card p-6">
            <div className="flex items-center justify-between"><div><h2 className="text-xl font-bold">Portfolio resources</h2><p className="mt-1 text-sm text-muted-foreground">Centralized assets currently used by the live portfolio.</p></div><Image className="size-6 text-muted-foreground" /></div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Resource label="Profile / Hero image" ok={Boolean(data?.resources.profileImage)} />
              <Resource label="About image" ok={Boolean(data?.resources.aboutImage)} />
              <Resource label={`${data?.resources.projectImages ?? 0} project images`} ok />
              <Resource label={`${data?.resources.serviceImages ?? 0} service images`} ok />
              <Resource label="Process image" ok={Boolean(data?.resources.processImage)} />
            </div>
            <p className="mt-5 rounded-2xl bg-muted/50 p-4 text-xs leading-5 text-muted-foreground">Resource editing is intentionally kept server-side. This dashboard does not expose repository files or secrets in the browser.</p>
          </section>

          <section className="rounded-3xl border border-border/70 bg-card p-6">
            <h2 className="text-xl font-bold">Backend health</h2>
            <div className="mt-5 space-y-3"><Health label="Contact endpoint" ok={Boolean(data?.backend.contactApi)} /><Health label="Resend configuration" ok={Boolean(data?.backend.resendConfigured)} /></div>
            {!data?.backend.resendConfigured && <p className="mt-5 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-xs leading-5">Add ADMIN_PASSWORD, ADMIN_SESSION_SECRET, RESEND_API_KEY, CONTACT_FROM_EMAIL and CONTACT_TO_EMAIL in your deployment environment.</p>}
            <a href={`https://wa.me/${data?.whatsapp ?? "2349045945470"}`} target="_blank" rel="noreferrer" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground"><MessageCircle className="size-4" /> Test WhatsApp</a>
          </section>
        </div>
      </div>
    </main>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) { return <div className="rounded-2xl border border-border/70 bg-card p-5"><div className="mb-4 size-5 text-muted-foreground">{icon}</div><p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p><p className="mt-1 text-lg font-bold">{value}</p></div>; }
function Resource({ label, ok }: { label: string; ok: boolean }) { return <div className="flex items-center gap-3 rounded-2xl border border-border/60 p-4"><span>{ok ? <CheckCircle2 className="size-5" /> : <XCircle className="size-5" />}</span><span className="text-sm font-medium">{label}</span></div>; }
function Health({ label, ok }: { label: string; ok: boolean }) { return <div className="flex items-center justify-between rounded-xl border border-border/60 px-4 py-3 text-sm"><span>{label}</span><span className="flex items-center gap-1.5 text-xs font-semibold">{ok ? <CheckCircle2 className="size-4" /> : <XCircle className="size-4" />}{ok ? "Ready" : "Not configured"}</span></div>; }
