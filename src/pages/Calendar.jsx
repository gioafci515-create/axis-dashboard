import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Card, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const fadeUp = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.3 } } };

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const EVENTS = [
  { date: 3, tone: "brand", title: "Team standup" },
  { date: 7, tone: "success", title: "Design review" },
  { date: 12, tone: "warning", title: "Release v2.5" },
  { date: 12, tone: "info", title: "Marketing sync" },
  { date: 18, tone: "error", title: "Incident retro" },
  { date: 22, tone: "brand", title: "1:1 with Sarah" },
  { date: 25, tone: "success", title: "Quarterly review" },
  { date: 28, tone: "info", title: "All-hands" },
];

const TONE_DOT = {
  brand: "bg-brand-500",
  success: "bg-success-500",
  warning: "bg-warning-500",
  info: "bg-info-500",
  error: "bg-error-500",
};

export default function CalendarPage() {
  const [cursor, setCursor] = useState(new Date());

  const grid = useMemo(() => {
    const year = cursor.getFullYear();
    const month = cursor.getMonth();
    const first = new Date(year, month, 1);
    const offset = first.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells = [];
    for (let i = 0; i < offset; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  }, [cursor]);

  const monthLabel = `${MONTHS[cursor.getMonth()]} ${cursor.getFullYear()}`;
  const today = new Date();
  const isCurrent = today.getMonth() === cursor.getMonth() && today.getFullYear() === cursor.getFullYear();

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-[1200px] mx-auto space-y-5">
      <motion.header variants={fadeUp} className="flex items-end justify-between gap-3">
        <div>
          <Badge tone="info" size="sm" className="mb-1.5">Calendar</Badge>
          <h1 className="text-[24px] font-semibold tracking-tight">{monthLabel}</h1>
          <p className="mt-1 text-[14px] text-[var(--text-tertiary)]">Your schedule at a glance.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon-sm" aria-label="Previous month" onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}>
            <ChevronLeft />
          </Button>
          <Button variant="outline" size="sm" onClick={() => setCursor(new Date())}>Today</Button>
          <Button variant="outline" size="icon-sm" aria-label="Next month" onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}>
            <ChevronRight />
          </Button>
          <Button variant="primary" size="sm"><Plus className="size-3.5" /> Event</Button>
        </div>
      </motion.header>

      <motion.section variants={fadeUp}>
        <Card>
          <CardBody className="p-0 overflow-hidden">
            <div className="grid grid-cols-7 border-b border-[var(--border)]">
              {DAYS.map((d) => (
                <div key={d} className="px-3 py-2.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--text-tertiary)] text-center">
                  {d}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7">
              {grid.map((d, i) => {
                const isToday = isCurrent && d === today.getDate();
                const dayEvents = d ? EVENTS.filter((e) => e.date === d) : [];
                return (
                  <div
                    key={i}
                    className={`min-h-[96px] p-2 border-r border-b border-[var(--border)] ${(i + 1) % 7 === 0 ? "border-r-0" : ""} ${d == null ? "bg-[var(--bg-muted)]/30" : "hover:bg-[var(--bg-hover)]"} transition-colors`}
                  >
                    {d && (
                      <>
                        <div className="flex items-center justify-end mb-1">
                          <span className={`text-[12px] font-semibold tabular-nums size-6 grid place-items-center rounded-full ${isToday ? "bg-brand-500 text-white" : "text-[var(--text-secondary)]"}`}>
                            {d}
                          </span>
                        </div>
                        <ul className="space-y-1">
                          {dayEvents.map((e, idx) => (
                            <li key={idx} className={`flex items-center gap-1.5 text-[11.5px] text-[var(--text-primary)] truncate px-1.5 py-0.5 rounded bg-[var(--bg-surface)]`}>
                              <span className={`size-1.5 rounded-full shrink-0 ${TONE_DOT[e.tone]}`} />
                              <span className="truncate">{e.title}</span>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </CardBody>
        </Card>
      </motion.section>
    </motion.div>
  );
}
