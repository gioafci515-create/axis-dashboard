import { useState, useMemo, useCallback } from "react";
import { Download, UserPlus } from "lucide-react";
import DataTable from "@/components/common/DataTable";
import StatusBadge from "@/components/common/StatusBadge";
import FilterChips from "@/components/common/FilterChips";
import SlideOver from "@/components/common/SlideOver";
import { customers, PLAN_OPTIONS, STATUS_OPTIONS } from "@/data/customers";
import { formatCurrency, formatNumber, formatRelativeTime, cn } from "@/utils/format";
import { toast } from "@/components/common/ToastContainer";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

const VIEWS = [
  { id: "all", label: "All Customers" },
  { id: "active", label: "Active" },
  { id: "high-value", label: "High Value" },
  { id: "churned", label: "Churned" },
  { id: "trial", label: "Trial" },
];

export default function Customers() {
  const [activeView, setActiveView] = useState("all");
  const [filters, setFilters] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [search, setSearch] = useState("");
  const { copy } = useCopyToClipboard();

  const filtered = useMemo(() => {
    let data = customers;
    if (activeView === "active") data = data.filter((c) => c.status === "active");
    else if (activeView === "high-value") data = data.filter((c) => c.mrr >= 199);
    else if (activeView === "churned") data = data.filter((c) => c.status === "churned");
    else if (activeView === "trial") data = data.filter((c) => c.status === "trial");

    if (search) {
      const q = search.toLowerCase();
      data = data.filter((c) =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.company.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q)
      );
    }

    filters.forEach((f) => {
      if (f.property === "Plan" && f.value !== "...") data = data.filter((c) => c.plan === f.value);
      if (f.property === "Status" && f.value !== "...") data = data.filter((c) => c.status === f.value);
    });

    return data;
  }, [activeView, filters, search]);

  const columns = [
    {
      key: "name",
      header: "Customer",
      render: (val, row) => (
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-medium shrink-0" style={{ backgroundColor: "var(--accent-muted)", color: "var(--accent)" }}>
            {val.split(" ").map((n) => n[0]).join("")}
          </div>
          <div className="min-w-0">
            <div className="text-[13px] truncate" style={{ color: "var(--text-primary)" }}>{val}</div>
            <div className="text-[11px] truncate" style={{ color: "var(--text-tertiary)" }}>{row.email}</div>
          </div>
        </div>
      ),
      width: 260,
    },
    { key: "company", header: "Company" },
    {
      key: "plan",
      header: "Plan",
      render: (val) => (
        <span className="text-[12px] font-medium px-2 py-0.5 rounded" style={{ backgroundColor: "var(--bg-overlay)", color: "var(--text-secondary)" }}>{val}</span>
      ),
    },
    { key: "mrr", header: "MRR", align: "right", mono: true, render: (val) => formatCurrency(val) },
    { key: "status", header: "Status", render: (val) => <StatusBadge status={val} /> },
    {
      key: "lastSeen",
      header: "Last Seen",
      mono: true,
      render: (val) => <span className="text-[12px]" style={{ color: "var(--text-tertiary)" }}>{formatRelativeTime(val)}</span>,
    },
    {
      key: "country",
      header: "Country",
      render: (val) => <span className="text-[12px]" style={{ color: "var(--text-secondary)" }}>{val}</span>,
    },
  ];

  const handleCopyId = useCallback(async (id) => {
    await copy(id);
    toast("Customer ID copied", "success");
  }, [copy]);

  return (
    <div className="space-y-4">
      {/* View tabs */}
      <div className="flex items-center gap-6 border-b" style={{ borderColor: "var(--border-subtle)" }}>
        {VIEWS.map((view) => (
          <button
            key={view.id}
            onClick={() => setActiveView(view.id)}
            className="relative pb-2.5 text-[13px] transition-colors duration-150"
            style={{
              color: activeView === view.id ? "var(--text-primary)" : "var(--text-tertiary)",
              fontWeight: activeView === view.id ? 500 : 400,
            }}
          >
            {view.label}
            {activeView === view.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
            )}
          </button>
        ))}

        <div className="ml-auto flex items-center gap-2 pb-2">
          <button
            className="flex items-center gap-1.5 h-8 px-3 rounded-md border text-[13px] transition-colors duration-150"
            style={{ borderColor: "var(--border-default)", color: "var(--text-secondary)" }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--bg-hover)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
          >
            <Download size={14} strokeWidth={1.5} />
            Export
          </button>
          <button
            className="flex items-center gap-1.5 h-8 px-3 rounded-md text-[13px] font-medium transition-colors duration-150"
            style={{ backgroundColor: "var(--accent)", color: "white" }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--accent-hover)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--accent)"; }}
          >
            <UserPlus size={14} strokeWidth={1.5} />
            Add Customer
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search customers..."
          className="h-9 px-3 rounded-md border text-[13px] w-64 bg-transparent outline-none transition-colors duration-150"
          style={{ borderColor: "var(--border-default)", color: "var(--text-primary)" }}
          onFocus={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = "var(--border-default)"; }}
        />
        <FilterChips filters={filters} onFiltersChange={setFilters} properties={["Plan", "Status", "Country", "MRR"]} />
      </div>

      <div className="text-[12px]" style={{ color: "var(--text-tertiary)" }}>
        {formatNumber(filtered.length)} customers
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden" style={{ borderColor: "var(--border-subtle)" }}>
        <DataTable data={filtered} columns={columns} selectable onRowClick={(row) => setSelectedCustomer(row)} />
      </div>

      {/* Detail Slide-Over */}
      <SlideOver open={!!selectedCustomer} onClose={() => setSelectedCustomer(null)} title="Customer Details">
        {selectedCustomer && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-[16px] font-medium" style={{ backgroundColor: "var(--accent-muted)", color: "var(--accent)" }}>
                {selectedCustomer.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <h3 className="text-[16px] font-medium" style={{ color: "var(--text-primary)" }}>{selectedCustomer.name}</h3>
                <p className="text-[13px]" style={{ color: "var(--text-secondary)" }}>{selectedCustomer.company}</p>
              </div>
            </div>

            <div>
              <div className="label mb-1">Customer ID</div>
              <button
                onClick={() => handleCopyId(selectedCustomer.id)}
                className="mono text-[13px] px-2 py-1 rounded transition-colors duration-150"
                style={{ color: "var(--text-primary)", backgroundColor: "var(--bg-overlay)" }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--bg-hover)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--bg-overlay)"; }}
              >
                {selectedCustomer.id}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Email", value: selectedCustomer.email },
                { label: "Plan", value: selectedCustomer.plan },
                { label: "Status", value: selectedCustomer.status, badge: true },
                { label: "MRR", value: formatCurrency(selectedCustomer.mrr), mono: true },
                { label: "Country", value: selectedCustomer.country },
                { label: "Industry", value: selectedCustomer.industry },
                { label: "LTV", value: formatCurrency(selectedCustomer.ltv), mono: true },
                { label: "NPS Score", value: selectedCustomer.nps, mono: true },
                { label: "Total Events", value: formatNumber(selectedCustomer.events), mono: true },
                { label: "Sessions", value: formatNumber(selectedCustomer.sessions), mono: true },
              ].map((field) => (
                <div key={field.label}>
                  <div className="label mb-1">{field.label}</div>
                  {field.badge ? <StatusBadge status={field.value} /> : (
                    <div className={cn("text-[13px]", field.mono && "mono")} style={{ color: "var(--text-primary)" }}>{field.value}</div>
                  )}
                </div>
              ))}
            </div>

            <div>
              <div className="label mb-3">Activity Timeline</div>
              <div className="space-y-3">
                {[
                  { event: "Logged in from web", time: "2h ago" },
                  { event: "Exported dashboard as CSV", time: "1d ago" },
                  { event: "Invited team member", time: "3d ago" },
                  { event: `Upgraded to ${selectedCustomer.plan}`, time: "2w ago" },
                  { event: "Completed onboarding", time: "1mo ago" },
                  { event: "Signed up", time: new Date(selectedCustomer.signupDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-1.5">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: i === 0 ? "var(--accent)" : "var(--border-strong)" }} />
                    </div>
                    <div className="flex-1">
                      <p className="text-[13px]" style={{ color: "var(--text-primary)" }}>{item.event}</p>
                      <p className="text-[11px] mono" style={{ color: "var(--text-tertiary)" }}>{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </SlideOver>
    </div>
  );
}
