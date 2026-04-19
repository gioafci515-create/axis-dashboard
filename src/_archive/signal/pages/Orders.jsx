import { useState, useMemo, useEffect, useRef } from "react";
import { Pause, Play, Search } from "lucide-react";
import StatusBadge from "@/components/common/StatusBadge";
import { events as allEvents } from "@/data/events";
import { formatDate, cn } from "@/utils/format";

const EVENT_TYPE_COLORS = {
  "user": "var(--info)",
  "subscription": "var(--accent)",
  "invoice": "var(--success)",
  "feature": "var(--warning)",
  "api": "var(--text-secondary)",
  "export": "var(--chart-3)",
  "integration": "var(--chart-2)",
  "alert": "var(--danger)",
};

function getEventColor(type) {
  const prefix = type.split(".")[0];
  return EVENT_TYPE_COLORS[prefix] || "var(--text-secondary)";
}

export default function Events() {
  const [isLive, setIsLive] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const scrollRef = useRef(null);

  const types = useMemo(() => {
    const set = new Set(allEvents.map((e) => e.type.split(".")[0]));
    return ["all", ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    let data = allEvents;
    if (typeFilter !== "all") {
      data = data.filter((e) => e.type.startsWith(typeFilter));
    }
    if (search) {
      const q = search.toLowerCase();
      data = data.filter((e) =>
        e.type.toLowerCase().includes(q) ||
        e.customerName.toLowerCase().includes(q) ||
        e.company.toLowerCase().includes(q)
      );
    }
    return data;
  }, [typeFilter, search]);

  // Auto-scroll when live
  useEffect(() => {
    if (isLive && scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [isLive, filtered]);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-[16px] font-medium" style={{ color: "var(--text-primary)" }}>Event Stream</h2>
          <button
            onClick={() => setIsLive(!isLive)}
            className={cn(
              "flex items-center gap-1.5 h-7 px-2.5 rounded-md text-[12px] font-medium border transition-colors duration-150"
            )}
            style={{
              borderColor: isLive ? "var(--success)" : "var(--border-default)",
              color: isLive ? "var(--success)" : "var(--text-secondary)",
              backgroundColor: isLive ? "var(--success-muted)" : "transparent",
            }}
          >
            {isLive ? (
              <>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: "var(--success)" }} />
                  <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: "var(--success)" }} />
                </span>
                Live
              </>
            ) : (
              <>
                <Pause size={12} />
                Paused
              </>
            )}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2" style={{ color: "var(--text-tertiary)" }} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter events..."
              className="h-8 pl-8 pr-3 rounded-md border text-[13px] w-52 bg-transparent outline-none"
              style={{ borderColor: "var(--border-default)", color: "var(--text-primary)" }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "var(--border-default)"; }}
            />
          </div>
        </div>
      </div>

      {/* Type filter tabs */}
      <div className="flex items-center gap-1 flex-wrap">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => setTypeFilter(type)}
            className="px-2.5 py-1 rounded-md text-[12px] transition-colors duration-100"
            style={{
              backgroundColor: typeFilter === type ? "var(--bg-hover)" : "transparent",
              color: typeFilter === type ? "var(--text-primary)" : "var(--text-tertiary)",
            }}
            onMouseEnter={(e) => { if (typeFilter !== type) e.currentTarget.style.backgroundColor = "var(--bg-hover)"; }}
            onMouseLeave={(e) => { if (typeFilter !== type) e.currentTarget.style.backgroundColor = "transparent"; }}
          >
            {type === "all" ? "All" : type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Event stream - terminal style */}
      <div
        ref={scrollRef}
        className="border rounded-lg overflow-hidden scroll-thin"
        style={{
          borderColor: "var(--border-subtle)",
          backgroundColor: "var(--bg-base)",
          maxHeight: "calc(100vh - 240px)",
          overflowY: "auto",
        }}
      >
        {/* Header bar */}
        <div
          className="sticky top-0 z-10 flex items-center gap-4 px-4 py-2 border-b text-[11px] uppercase font-medium tracking-wider"
          style={{
            borderColor: "var(--border-subtle)",
            backgroundColor: "var(--bg-base)",
            color: "var(--text-disabled)",
          }}
        >
          <span className="w-[140px]">Timestamp</span>
          <span className="w-[200px]">Event</span>
          <span className="w-[140px]">Customer</span>
          <span className="w-[120px]">Company</span>
          <span className="w-[60px]">Source</span>
          <span className="flex-1">Details</span>
        </div>

        {filtered.map((event, i) => (
          <div
            key={event.id}
            className="flex items-center gap-4 px-4 py-1.5 border-b transition-colors duration-100 cursor-default"
            style={{
              borderColor: "var(--border-subtle)",
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--bg-hover)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
          >
            <span className="w-[140px] shrink-0" style={{ color: "var(--text-disabled)" }}>
              {formatDate(event.timestamp, "time")}
            </span>
            <span className="w-[200px] shrink-0 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: getEventColor(event.type) }} />
              <span style={{ color: getEventColor(event.type) }}>{event.type}</span>
            </span>
            <span className="w-[140px] shrink-0 truncate" style={{ color: "var(--text-secondary)" }}>
              {event.customerName}
            </span>
            <span className="w-[120px] shrink-0 truncate" style={{ color: "var(--text-tertiary)" }}>
              {event.company}
            </span>
            <span className="w-[60px] shrink-0" style={{ color: "var(--text-disabled)" }}>
              {event.source}
            </span>
            <span className="flex-1 truncate" style={{ color: "var(--text-disabled)" }}>
              {Object.entries(event.metadata).map(([k, v]) => `${k}=${v}`).join(" ")}
            </span>
          </div>
        ))}
      </div>

      <div className="text-[12px] mono" style={{ color: "var(--text-tertiary)" }}>
        {filtered.length} events
      </div>
    </div>
  );
}
