"use client";

import { useMemo, useState } from "react";
import { Activity, ArrowDownRight, ArrowUpRight, Building2, ClipboardList, FileBadge, Inbox, KeyRound, LayoutDashboard, LogOut, RefreshCw, Search, ShieldCheck } from "lucide-react";

type Overview = { projects: number; certificates: number; tenders: number; enquiries: number; newEnquiries: number };
type Enquiry = { id: string; name: string; organisation: string | null; email: string; phone: string | null; message: string; status: "NEW" | "IN_PROGRESS" | "RESPONDED" | "CLOSED"; createdAt: string };

const initialOverview: Overview = { projects: 0, certificates: 0, tenders: 0, enquiries: 0, newEnquiries: 0 };

export default function AdminPage() {
  const [key, setKey] = useState("");
  const [savedKey, setSavedKey] = useState("");
  const [overview, setOverview] = useState<Overview>(initialOverview);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<"overview" | "enquiries">("overview");

  async function loadDashboard(apiKey = savedKey) {
    if (!apiKey) { setError("Enter the admin API key to connect."); return; }
    setLoading(true); setError(""); setNotice("");
    try {
      const headers = { "x-admin-key": apiKey };
      const [overviewResponse, enquiryResponse] = await Promise.all([
        fetch("/api/admin/overview", { headers, cache: "no-store" }),
        fetch("/api/admin/enquiries", { headers, cache: "no-store" })
      ]);
      const overviewData = await overviewResponse.json();
      const enquiryData = await enquiryResponse.json();
      if (!overviewResponse.ok || !overviewData.success) throw new Error(overviewData.message || "Admin authentication failed");
      if (!enquiryResponse.ok || !enquiryData.success) throw new Error(enquiryData.message || "Could not load enquiries");
      setOverview(overviewData.overview);
      setEnquiries(enquiryData.enquiries);
      setSavedKey(apiKey);
      setNotice("Dashboard data loaded.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to load dashboard");
    } finally { setLoading(false); }
  }

  async function updateStatus(item: Enquiry, status: Enquiry["status"]) {
    setError(""); setNotice("");
    try {
      const response = await fetch(`/api/admin/enquiries/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "x-admin-key": savedKey },
        body: JSON.stringify({ status })
      });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message || "Status update failed");
      setEnquiries(current => current.map(row => row.id === item.id ? { ...row, status } : row));
      setNotice("Enquiry status updated.");
    } catch (e) { setError(e instanceof Error ? e.message : "Status update failed"); }
  }

  const filtered = useMemo(() => enquiries.filter(item => `${item.name} ${item.organisation || ""} ${item.email} ${item.message}`.toLowerCase().includes(query.toLowerCase())), [enquiries, query]);

  if (!savedKey) return (
    <main className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-logo"><Building2 size={23} /><span>HST <b>ENTERPRISES</b></span></div>
        <div className="admin-login-icon"><ShieldCheck size={26} /></div>
        <p className="admin-eyebrow">ADMINISTRATION PORTAL</p>
        <h1>Manage your company website.</h1>
        <p className="mt-3 text-sm leading-6 text-slate-500">Connect to your configured admin API to review website enquiries and view content totals.</p>
        <form className="mt-7" onSubmit={e => { e.preventDefault(); void loadDashboard(key); }}>
          <label className="admin-field-label">Admin API key
            <span className="admin-input-wrap"><KeyRound size={16} /><input type="password" autoComplete="current-password" required value={key} onChange={e => setKey(e.target.value)} placeholder="Enter key from .env.local" /></span>
          </label>
          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
          <button className="admin-primary-button mt-5 w-full" type="submit" disabled={loading}>{loading ? "Connecting…" : "Connect securely"}</button>
        </form>
        <p className="mt-5 text-xs leading-5 text-slate-400">Starter authentication uses a shared API key. For production, replace it with individual admin accounts and secure sessions.</p>
      </div>
    </main>
  );

  const stats = [
    { label: "Projects", value: overview.projects, icon: Building2, tone: "blue" },
    { label: "Certificates", value: overview.certificates, icon: FileBadge, tone: "gold" },
    { label: "Tender records", value: overview.tenders, icon: ClipboardList, tone: "purple" },
    { label: "Total enquiries", value: overview.enquiries, icon: Inbox, tone: "green" }
  ];

  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <a href="/" className="admin-logo"><Building2 size={23} /><span>HST <b>ENTERPRISES</b></span></a>
        <p className="admin-side-label">WORKSPACE</p>
        <button onClick={() => setTab("overview")} className={`admin-side-link ${tab === "overview" ? "admin-side-link-active" : ""}`}><LayoutDashboard size={17} /> Overview</button>
        <button onClick={() => setTab("enquiries")} className={`admin-side-link ${tab === "enquiries" ? "admin-side-link-active" : ""}`}><Inbox size={17} /> Enquiries <span className="admin-side-count">{overview.newEnquiries}</span></button>
        <div className="admin-sidebar-bottom"><span className="admin-secure-dot" /><span>Admin API connected</span></div>
      </aside>

      <section className="admin-main">
        <header className="admin-topbar">
          <div><p className="admin-eyebrow">HST ENTERPRISES / ADMIN</p><h1>{tab === "overview" ? "Website overview" : "Customer enquiries"}</h1></div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => void loadDashboard()} className="admin-light-button" disabled={loading}><RefreshCw size={15} className={loading ? "animate-spin" : ""} /> Refresh</button>
            <button onClick={() => { setSavedKey(""); setKey(""); setNotice(""); setError(""); }} className="admin-light-button"><LogOut size={15} /> Sign out</button>
          </div>
        </header>

        {error && <div className="admin-alert admin-alert-error">{error}</div>}
        {notice && <div className="admin-alert admin-alert-success">{notice}</div>}

        {tab === "overview" ? <>
          <div className="admin-welcome"><div><p className="text-xs font-bold uppercase tracking-[.17em] text-[#e2c17f]">OPERATIONS SNAPSHOT</p><h2 className="mt-3 text-2xl font-semibold text-white">Your work, in one place.</h2><p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">Track website content totals and follow up on new project enquiries.</p></div><div className="admin-welcome-icon"><Activity size={30} /></div></div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map(item => { const Icon = item.icon; return <article key={item.label} className="admin-stat-card"><div className={`admin-stat-icon admin-tone-${item.tone}`}><Icon size={19} /></div><p className="mt-5 text-xs font-semibold text-slate-500">{item.label}</p><div className="mt-2 flex items-end justify-between"><strong className="text-3xl font-semibold tracking-tight text-ink">{item.value}</strong><ArrowUpRight size={17} className="mb-1 text-slate-300" /></div></article>; })}
          </div>
          <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_.8fr]">
            <div className="admin-panel"><div className="flex items-center justify-between"><h3>Recent enquiries</h3><button className="admin-text-button" onClick={() => setTab("enquiries")}>View all <ArrowDownRight size={14} /></button></div>
              {enquiries.slice(0, 5).length ? <div className="mt-4">{enquiries.slice(0, 5).map(item => <div key={item.id} className="admin-recent-row"><span className="admin-avatar">{item.name.slice(0, 1).toUpperCase()}</span><div className="min-w-0 flex-1"><b>{item.name}</b><small>{item.organisation || item.email}</small></div><span className={`admin-status admin-status-${item.status.toLowerCase()}`}>{item.status.replace("_", " ")}</span></div>)}</div> : <div className="admin-empty"><Inbox size={24} /><p>No enquiries have been received yet.</p></div>}
            </div>
            <div className="admin-panel"><h3>Quick checklist</h3><div className="mt-4 space-y-4">{["Add verified project details", "Upload applicable certificates", "Review new enquiries", "Confirm company contact details"].map((item, i) => <div key={item} className="flex items-center gap-3 text-sm text-slate-600"><span className="admin-check-number">0{i + 1}</span>{item}</div>)}</div><p className="mt-5 border-t border-slate-100 pt-4 text-xs leading-5 text-slate-400">Project and certificate editing screens are the next backend expansion. These checklist items are reminders, not live completion status.</p></div>
          </div>
        </> : <div className="admin-panel mt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><h3>Enquiry inbox</h3><p className="mt-1 text-xs text-slate-500">Review each enquiry and update its follow-up status.</p></div><label className="admin-search"><Search size={16} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search enquiries…" /></label></div>
          <div className="mt-5 overflow-x-auto"><table className="admin-table"><thead><tr><th>Contact</th><th>Requirement</th><th>Received</th><th>Status</th><th>Update status</th></tr></thead><tbody>{filtered.map(item => <tr key={item.id}><td><b>{item.name}</b><small>{item.organisation || "—"}<br />{item.email}{item.phone ? ` · ${item.phone}` : ""}</small></td><td className="admin-message-cell">{item.message}</td><td>{new Date(item.createdAt).toLocaleDateString()}</td><td><span className={`admin-status admin-status-${item.status.toLowerCase()}`}>{item.status.replace("_", " ")}</span></td><td><select aria-label={`Update status for ${item.name}`} className="admin-select" value={item.status} onChange={e => void updateStatus(item, e.target.value as Enquiry["status"])}><option value="NEW">New</option><option value="IN_PROGRESS">In progress</option><option value="RESPONDED">Responded</option><option value="CLOSED">Closed</option></select></td></tr>)}</tbody></table>{filtered.length === 0 && <div className="admin-empty"><Inbox size={24} /><p>No matching enquiries.</p></div>}</div>
        </div>}
        <footer className="admin-footer">HST ENTERPRISES · PHASE 4 STARTER ADMIN</footer>
      </section>
    </main>
  );
}
