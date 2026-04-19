import { useState, useCallback } from "react";
import { GripVertical, Plus, Trash2, BarChart3 } from "lucide-react";
import { funnelData } from "@/data/metrics";
import { formatNumber, cn } from "@/utils/format";

const AVAILABLE_STEPS = [
  "Website Visitors", "Signup Started", "Email Verified", "Onboarding Complete",
  "First Value Moment", "Invited Teammate", "Converted to Paid", "Second Purchase",
  "Feature Adoption", "Upgraded Plan",
];

export default function Funnels() {
  const [steps, setSteps] = useState(funnelData.map((d) => d.stage));
  const [dragIndex, setDragIndex] = useState(null);

  // Generate funnel data based on selected steps
  const funnel = steps.map((step, i) => {
    const base = funnelData.find((d) => d.stage === step);
    if (i === 0) return { stage: step, count: base?.count || 48720, rate: 100 };
    const prev = funnelData[Math.min(i, funnelData.length - 1)];
    const count = Math.round((base?.count || prev?.count || 10000) * (0.6 + Math.random() * 0.3));
    return { stage: step, count, rate: 0 };
  });
  // Recalculate rates
  funnel.forEach((step, i) => {
    if (i > 0) step.rate = Math.round((step.count / funnel[i - 1].count) * 1000) / 10;
  });

  const addStep = (stepName) => {
    if (!steps.includes(stepName)) {
      setSteps([...steps, stepName]);
    }
  };

  const removeStep = (index) => {
    if (steps.length <= 2) return;
    setSteps(steps.filter((_, i) => i !== index));
  };

  const handleDragStart = (index) => {
    setDragIndex(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === index) return;
    const newSteps = [...steps];
    const [removed] = newSteps.splice(dragIndex, 1);
    newSteps.splice(index, 0, removed);
    setSteps(newSteps);
    setDragIndex(index);
  };

  const handleDragEnd = () => {
    setDragIndex(null);
  };

  const availableToAdd = AVAILABLE_STEPS.filter((s) => !steps.includes(s));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-[16px] font-medium" style={{ color: "var(--text-primary)" }}>Funnel Builder</h2>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Builder */}
        <div className="space-y-3">
          <div className="label mb-2">Funnel Steps</div>
          {steps.map((step, i) => (
            <div
              key={step}
              draggable
              onDragStart={() => handleDragStart(i)}
              onDragOver={(e) => handleDragOver(e, i)}
              onDragEnd={handleDragEnd}
              className={cn(
                "flex items-center gap-3 h-11 px-3 rounded-lg border transition-all duration-150 cursor-grab active:cursor-grabbing",
                dragIndex === i && "opacity-50"
              )}
              style={{
                borderColor: dragIndex === i ? "var(--accent)" : "var(--border-default)",
                backgroundColor: "var(--bg-raised)",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--border-strong)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = dragIndex === i ? "var(--accent)" : "var(--border-default)"; }}
            >
              <GripVertical size={14} style={{ color: "var(--text-disabled)" }} />
              <span className="mono text-[12px] w-5 text-center" style={{ color: "var(--text-disabled)" }}>{i + 1}</span>
              <span className="flex-1 text-[13px]" style={{ color: "var(--text-primary)" }}>{step}</span>
              {steps.length > 2 && (
                <button
                  onClick={() => removeStep(i)}
                  className="w-6 h-6 flex items-center justify-center rounded opacity-0 group-hover:opacity-100 hover:opacity-100 transition-opacity"
                  style={{ color: "var(--text-tertiary)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "var(--danger)"; e.currentTarget.style.opacity = 1; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-tertiary)"; }}
                >
                  <Trash2 size={13} />
                </button>
              )}
            </div>
          ))}

          {/* Add step */}
          {availableToAdd.length > 0 && (
            <div className="relative">
              <details className="group">
                <summary
                  className="flex items-center gap-2 h-11 px-3 rounded-lg border border-dashed cursor-pointer text-[13px] transition-colors duration-150 list-none"
                  style={{ borderColor: "var(--border-default)", color: "var(--text-tertiary)" }}
                >
                  <Plus size={14} />
                  Add step
                </summary>
                <div
                  className="mt-1 py-1 rounded-lg border absolute left-0 right-0 z-20"
                  style={{ backgroundColor: "var(--bg-raised)", borderColor: "var(--border-default)", boxShadow: "var(--shadow-modal)" }}
                >
                  {availableToAdd.map((s) => (
                    <button
                      key={s}
                      onClick={() => addStep(s)}
                      className="w-full text-left px-3 py-1.5 text-[13px] transition-colors duration-100"
                      style={{ color: "var(--text-primary)" }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--bg-hover)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </details>
            </div>
          )}
        </div>

        {/* Live funnel visualization */}
        <div className="border rounded-lg p-5" style={{ borderColor: "var(--border-subtle)" }}>
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 size={16} style={{ color: "var(--text-tertiary)" }} />
            <h3 className="text-[14px] font-medium" style={{ color: "var(--text-primary)" }}>Conversion</h3>
          </div>

          <div className="space-y-3">
            {funnel.map((step, i) => {
              const width = (step.count / funnel[0].count) * 100;
              const dropoff = i > 0 ? ((funnel[i - 1].count - step.count) / funnel[i - 1].count * 100).toFixed(1) : null;
              return (
                <div key={step.stage}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[12px]" style={{ color: "var(--text-secondary)" }}>{step.stage}</span>
                    <span className="mono text-[12px]" style={{ color: "var(--text-tertiary)" }}>
                      {formatNumber(step.count)}
                      {dropoff && <span style={{ color: "var(--danger)", marginLeft: 6 }}>-{dropoff}%</span>}
                    </span>
                  </div>
                  <div className="h-7 rounded" style={{ backgroundColor: "var(--bg-overlay)" }}>
                    <div
                      className="h-full rounded flex items-center justify-end pr-2 transition-all duration-500"
                      style={{
                        width: `${Math.max(width, 3)}%`,
                        backgroundColor: i === funnel.length - 1 ? "var(--accent)" : "var(--border-strong)",
                      }}
                    >
                      {width > 15 && (
                        <span className="mono text-[10px] font-medium" style={{ color: i === funnel.length - 1 ? "white" : "var(--text-secondary)" }}>
                          {width.toFixed(1)}%
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Overall conversion */}
          <div className="mt-6 pt-4 border-t" style={{ borderColor: "var(--border-subtle)" }}>
            <div className="flex items-center justify-between">
              <span className="text-[13px]" style={{ color: "var(--text-secondary)" }}>Overall Conversion</span>
              <span className="mono text-[20px] font-medium" style={{ color: "var(--accent)", letterSpacing: "-0.02em" }}>
                {((funnel[funnel.length - 1].count / funnel[0].count) * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
