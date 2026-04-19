import { useState, useEffect, useCallback, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from "lucide-react";

const ToastContext = createContext(null);

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const iconColors = {
  success: "var(--success)",
  error: "var(--danger)",
  warning: "var(--warning)",
  info: "var(--info)",
};

let toastId = 0;
let addToastFn = null;

export function toast(message, type = "info", action = null) {
  addToastFn?.({ id: ++toastId, message, type, action, createdAt: Date.now() });
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  addToastFn = useCallback((t) => {
    setToasts((prev) => [...prev.slice(-2), t]); // Max 3
  }, []);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Auto-dismiss after 5s
  useEffect(() => {
    if (toasts.length === 0) return;
    const timers = toasts.map((t) =>
      setTimeout(() => dismiss(t.id), 5000 - (Date.now() - t.createdAt))
    );
    return () => timers.forEach(clearTimeout);
  }, [toasts, dismiss]);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-[320px]">
      <AnimatePresence mode="popLayout">
        {toasts.map((t) => {
          const Icon = icons[t.type] || Info;
          const elapsed = Date.now() - t.createdAt;
          const remaining = Math.max(0, 5000 - elapsed);

          return (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 80, scale: 0.96 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-lg border overflow-hidden"
              style={{
                backgroundColor: "var(--bg-raised)",
                borderColor: "var(--border-default)",
                boxShadow: "var(--shadow-modal)",
              }}
            >
              <div className="flex items-start gap-3 p-3">
                <Icon size={16} style={{ color: iconColors[t.type], marginTop: 1, flexShrink: 0 }} strokeWidth={1.5} />
                <div className="flex-1 min-w-0">
                  <p className="text-[13px]" style={{ color: "var(--text-primary)" }}>{t.message}</p>
                  {t.action && (
                    <button
                      onClick={() => { t.action.onClick(); dismiss(t.id); }}
                      className="text-[12px] mt-1 font-medium hover:underline"
                      style={{ color: "var(--accent)" }}
                    >
                      {t.action.label}
                    </button>
                  )}
                </div>
                <button
                  onClick={() => dismiss(t.id)}
                  className="shrink-0 w-5 h-5 flex items-center justify-center rounded hover:opacity-70"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  <X size={12} />
                </button>
              </div>
              {/* Progress bar */}
              <motion.div
                className="h-[2px] absolute bottom-0 left-0"
                style={{ backgroundColor: iconColors[t.type], opacity: 0.4 }}
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: remaining / 1000, ease: "linear" }}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
