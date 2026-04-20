import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-72px)] grid place-items-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-[520px] text-center"
      >
        <Badge tone="warning" size="sm" className="mb-3">404</Badge>
        <h1 className="text-[clamp(44px,8vw,80px)] font-semibold tracking-[-0.03em] leading-none">
          Page not found
        </h1>
        <p className="mt-4 text-[14.5px] text-[var(--text-tertiary)] leading-relaxed">
          The page you tried to reach isn't wired up. It might have been renamed, archived, or never existed.
        </p>
        <div className="mt-7 flex items-center justify-center gap-2">
          <Button asChild variant="primary" size="sm">
            <Link to="/"><Home className="size-3.5" /> Back to overview</Link>
          </Button>
          <Button variant="outline" size="sm" onClick={() => history.back()}>
            <ArrowLeft className="size-3.5" /> Previous page
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
