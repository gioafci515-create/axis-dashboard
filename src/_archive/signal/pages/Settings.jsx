import { useState, useCallback } from "react";
import { Copy, Trash2, Plus, ExternalLink, Eye, EyeOff } from "lucide-react";
import StatusBadge from "@/components/common/StatusBadge";
import { teamMembers, apiKeys, integrations } from "@/data/events";
import { formatRelativeTime, cn } from "@/utils/format";
import { toast } from "@/components/common/ToastContainer";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { motion, AnimatePresence } from "framer-motion";

const TABS = [
  { id: "workspace", label: "Workspace" },
  { id: "members", label: "Members" },
  { id: "billing", label: "Billing" },
  { id: "api-keys", label: "API Keys" },
  { id: "integrations", label: "Integrations" },
  { id: "notifications", label: "Notifications" },
];

function Input({ label, value, onChange, type = "text", placeholder, helper, required, disabled }) {
  return (
    <div>
      <label className="block text-[12px] mb-1.5" style={{ color: "var(--text-secondary)" }}>
        {label}
        {required && <span style={{ color: "var(--accent)" }} className="ml-0.5">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full h-9 px-3 rounded-md border text-[13px] bg-transparent outline-none transition-colors duration-150"
        style={{
          borderColor: "var(--border-default)",
          color: disabled ? "var(--text-disabled)" : "var(--text-primary)",
        }}
        onFocus={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.boxShadow = "0 0 0 3px var(--accent-subtle)"; }}
        onBlur={(e) => { e.currentTarget.style.borderColor = "var(--border-default)"; e.currentTarget.style.boxShadow = "none"; }}
      />
      {helper && <p className="text-[11px] mt-1" style={{ color: "var(--text-tertiary)" }}>{helper}</p>}
    </div>
  );
}

function Toggle({ checked, onChange, label }) {
  return (
    <label className="flex items-center justify-between cursor-pointer">
      <span className="text-[13px]" style={{ color: "var(--text-primary)" }}>{label}</span>
      <button
        type="button"
        onClick={() => onChange?.(!checked)}
        className="relative w-8 h-[18px] rounded-full transition-colors duration-200"
        style={{ backgroundColor: checked ? "var(--accent)" : "var(--bg-overlay)" }}
      >
        <span
          className="absolute top-[2px] w-[14px] h-[14px] rounded-full transition-transform duration-200"
          style={{
            backgroundColor: "white",
            left: 2,
            transform: checked ? "translateX(14px)" : "translateX(0)",
          }}
        />
      </button>
    </label>
  );
}

function WorkspaceTab({ onDirty }) {
  const [name, setName] = useState("Acme Corp");
  const [url, setUrl] = useState("acme-corp");

  return (
    <div className="space-y-6 max-w-[480px]">
      <Input label="Workspace name" value={name} onChange={(v) => { setName(v); onDirty(); }} required />
      <Input label="Workspace URL" value={url} onChange={(v) => { setUrl(v); onDirty(); }} helper="signal.dev/acme-corp" />
      <Input label="Workspace ID" value="ws_01HK4M8N2P" disabled helper="Used for API authentication" />

      <div className="pt-4 border-t" style={{ borderColor: "var(--border-subtle)" }}>
        <h4 className="text-[13px] font-medium mb-3" style={{ color: "var(--text-primary)" }}>Danger Zone</h4>
        <button
          className="flex items-center gap-1.5 h-9 px-4 rounded-md border text-[13px] font-medium transition-colors duration-150"
          style={{ borderColor: "var(--danger)", color: "var(--danger)" }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--danger-muted)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
        >
          <Trash2 size={14} />
          Delete Workspace
        </button>
      </div>
    </div>
  );
}

function MembersTab() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-[14px] font-medium" style={{ color: "var(--text-primary)" }}>Team Members</h3>
        <button
          className="flex items-center gap-1.5 h-8 px-3 rounded-md text-[13px] font-medium transition-colors duration-150"
          style={{ backgroundColor: "var(--accent)", color: "white" }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--accent-hover)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--accent)"; }}
        >
          <Plus size={14} />
          Invite Member
        </button>
      </div>

      <div className="border rounded-lg overflow-hidden" style={{ borderColor: "var(--border-subtle)" }}>
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border-subtle)" }}>
              {["Member", "Role", "Status", "Last Active", ""].map((h) => (
                <th key={h} className="label px-4 py-2.5 text-left">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {teamMembers.map((member) => (
              <tr
                key={member.id}
                className="border-b transition-colors duration-100"
                style={{ borderColor: "var(--border-subtle)" }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--bg-hover)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
              >
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-medium" style={{ backgroundColor: "var(--accent-muted)", color: "var(--accent)" }}>
                      {member.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <div className="text-[13px]" style={{ color: "var(--text-primary)" }}>{member.name}</div>
                      <div className="text-[11px]" style={{ color: "var(--text-tertiary)" }}>{member.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-2.5">
                  <span className="text-[12px] font-medium px-2 py-0.5 rounded" style={{ backgroundColor: member.role === "Owner" ? "var(--accent-muted)" : "var(--bg-overlay)", color: member.role === "Owner" ? "var(--accent)" : "var(--text-secondary)" }}>
                    {member.role}
                  </span>
                </td>
                <td className="px-4 py-2.5"><StatusBadge status={member.status} /></td>
                <td className="px-4 py-2.5 mono text-[12px]" style={{ color: "var(--text-tertiary)" }}>
                  {member.lastActive ? formatRelativeTime(member.lastActive) : "\u2014"}
                </td>
                <td className="px-4 py-2.5 text-right">
                  {member.role !== "Owner" && (
                    <button className="text-[12px] hover:underline" style={{ color: "var(--text-tertiary)" }}>Remove</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function APIKeysTab() {
  const [showKey, setShowKey] = useState(null);
  const { copy } = useCopyToClipboard();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-[14px] font-medium" style={{ color: "var(--text-primary)" }}>API Keys</h3>
        <button
          className="flex items-center gap-1.5 h-8 px-3 rounded-md text-[13px] font-medium transition-colors duration-150"
          style={{ backgroundColor: "var(--accent)", color: "white" }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--accent-hover)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--accent)"; }}
        >
          <Plus size={14} />
          Create Key
        </button>
      </div>

      <div className="space-y-3">
        {apiKeys.map((key) => (
          <div
            key={key.id}
            className="flex items-center gap-4 px-4 py-3 rounded-lg border transition-colors duration-100"
            style={{ borderColor: "var(--border-default)" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--border-strong)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-default)"; }}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-medium" style={{ color: "var(--text-primary)" }}>{key.name}</span>
                <StatusBadge status={key.status} />
              </div>
              <div className="mono text-[12px] mt-1 flex items-center gap-2" style={{ color: "var(--text-tertiary)" }}>
                {showKey === key.id ? key.key : `${key.prefix}${"•".repeat(12)}`}
                <button
                  onClick={() => setShowKey(showKey === key.id ? null : key.id)}
                  className="p-0.5 rounded hover:opacity-70"
                  style={{ color: "var(--text-disabled)" }}
                >
                  {showKey === key.id ? <EyeOff size={12} /> : <Eye size={12} />}
                </button>
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-[11px]" style={{ color: "var(--text-tertiary)" }}>Last used</div>
              <div className="mono text-[12px]" style={{ color: "var(--text-secondary)" }}>{formatRelativeTime(key.lastUsed)}</div>
            </div>
            <button
              onClick={async () => { await copy(key.key); toast("API key copied", "success"); }}
              className="w-7 h-7 flex items-center justify-center rounded transition-colors duration-100"
              style={{ color: "var(--text-tertiary)" }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--bg-hover)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
            >
              <Copy size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function IntegrationsTab() {
  return (
    <div className="space-y-4">
      <h3 className="text-[14px] font-medium" style={{ color: "var(--text-primary)" }}>Integrations</h3>
      <div className="grid grid-cols-2 gap-3">
        {integrations.map((integ) => (
          <div
            key={integ.id}
            className="flex items-center gap-4 px-4 py-4 rounded-lg border transition-colors duration-150 cursor-pointer"
            style={{ borderColor: "var(--border-default)" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--border-strong)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-default)"; }}
          >
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: "var(--bg-overlay)" }}>
              <span className="text-[14px] font-medium" style={{ color: "var(--text-secondary)" }}>
                {integ.name.slice(0, 2)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-medium" style={{ color: "var(--text-primary)" }}>{integ.name}</div>
              <div className="text-[12px] truncate" style={{ color: "var(--text-tertiary)" }}>{integ.description}</div>
            </div>
            <StatusBadge status={integ.status} />
          </div>
        ))}
      </div>
    </div>
  );
}

function NotificationsTab({ onDirty }) {
  const [settings, setSettings] = useState({
    emailDigest: true,
    slackAlerts: true,
    churnWarning: true,
    weeklyReport: true,
    newSignup: false,
    invoiceFailed: true,
    apiLimits: true,
    productUpdates: false,
  });

  const toggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    onDirty();
  };

  return (
    <div className="space-y-6 max-w-[480px]">
      <h3 className="text-[14px] font-medium" style={{ color: "var(--text-primary)" }}>Notification Preferences</h3>
      <div className="space-y-4">
        {[
          { key: "emailDigest", label: "Daily email digest" },
          { key: "slackAlerts", label: "Slack alerts for critical events" },
          { key: "churnWarning", label: "Churn risk warnings" },
          { key: "weeklyReport", label: "Weekly revenue report" },
          { key: "newSignup", label: "New signup notifications" },
          { key: "invoiceFailed", label: "Failed invoice alerts" },
          { key: "apiLimits", label: "API rate limit warnings" },
          { key: "productUpdates", label: "Product update announcements" },
        ].map((item) => (
          <div key={item.key} className="pb-3 border-b" style={{ borderColor: "var(--border-subtle)" }}>
            <Toggle checked={settings[item.key]} onChange={() => toggle(item.key)} label={item.label} />
          </div>
        ))}
      </div>
    </div>
  );
}

function BillingTab() {
  return (
    <div className="space-y-6 max-w-[560px]">
      <div>
        <h3 className="text-[14px] font-medium mb-1" style={{ color: "var(--text-primary)" }}>Current Plan</h3>
        <p className="text-[13px]" style={{ color: "var(--text-secondary)" }}>You are on the <strong>Business</strong> plan.</p>
      </div>

      <div className="flex items-center justify-between p-4 rounded-lg border" style={{ borderColor: "var(--border-default)" }}>
        <div>
          <div className="text-[13px] font-medium" style={{ color: "var(--text-primary)" }}>Business Plan</div>
          <div className="text-[12px]" style={{ color: "var(--text-tertiary)" }}>Billed monthly &middot; Next invoice Apr 30, 2026</div>
        </div>
        <div className="text-right">
          <div className="mono text-[20px] font-medium" style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}>$199</div>
          <div className="text-[11px]" style={{ color: "var(--text-tertiary)" }}>/month</div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          className="h-9 px-4 rounded-md text-[13px] font-medium transition-colors duration-150"
          style={{ backgroundColor: "var(--accent)", color: "white" }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--accent-hover)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--accent)"; }}
        >
          Upgrade Plan
        </button>
        <button
          className="h-9 px-4 rounded-md border text-[13px] transition-colors duration-150"
          style={{ borderColor: "var(--border-default)", color: "var(--text-secondary)" }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--bg-hover)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
        >
          View Invoices
        </button>
      </div>
    </div>
  );
}

export default function Settings() {
  const [activeTab, setActiveTab] = useState("workspace");
  const [isDirty, setIsDirty] = useState(false);

  const markDirty = useCallback(() => setIsDirty(true), []);
  const save = useCallback(() => {
    toast("Settings saved", "success");
    setIsDirty(false);
  }, []);

  const renderTab = () => {
    switch (activeTab) {
      case "workspace": return <WorkspaceTab onDirty={markDirty} />;
      case "members": return <MembersTab />;
      case "billing": return <BillingTab />;
      case "api-keys": return <APIKeysTab />;
      case "integrations": return <IntegrationsTab />;
      case "notifications": return <NotificationsTab onDirty={markDirty} />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex items-center gap-1 border-b" style={{ borderColor: "var(--border-subtle)" }}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="relative px-3 pb-2.5 pt-1 text-[13px] transition-colors duration-150"
            style={{
              color: activeTab === tab.id ? "var(--text-primary)" : "var(--text-tertiary)",
              fontWeight: activeTab === tab.id ? 500 : 400,
            }}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="pb-20">
        {renderTab()}
      </div>

      {/* Unsaved changes bar */}
      <AnimatePresence>
        {isDirty && (
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-center gap-3 h-14 border-t"
            style={{
              backgroundColor: "var(--bg-overlay)",
              borderColor: "var(--border-default)",
              backdropFilter: "blur(8px)",
            }}
          >
            <span className="text-[13px]" style={{ color: "var(--text-secondary)" }}>Unsaved changes</span>
            <button
              onClick={() => setIsDirty(false)}
              className="h-8 px-3 rounded-md border text-[13px] transition-colors duration-150"
              style={{ borderColor: "var(--border-default)", color: "var(--text-secondary)" }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--bg-hover)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
            >
              Discard
            </button>
            <button
              onClick={save}
              className="h-8 px-4 rounded-md text-[13px] font-medium transition-colors duration-150"
              style={{ backgroundColor: "var(--accent)", color: "white" }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--accent-hover)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--accent)"; }}
            >
              Save Changes
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
