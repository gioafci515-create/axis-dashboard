import { Link } from "react-router-dom";
import { Mail, Lock, Github } from "lucide-react";
import { AuthShell } from "./AuthShell";
import { Button } from "@/components/ui/Button";
import { Input, Label } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Switch";

export default function SignIn() {
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to your Axis workspace."
      footer={
        <>
          Don't have an account?{" "}
          <Link to="/signup" className="text-brand-500 font-medium hover:underline">
            Sign up
          </Link>
        </>
      }
    >
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <Button type="button" variant="outline" className="w-full">
          <Github className="size-4" /> Continue with GitHub
        </Button>
        <div className="relative text-center">
          <span className="absolute inset-x-0 top-1/2 border-t border-[var(--border)]" />
          <span className="relative bg-[var(--bg-app)] px-2 text-[11px] uppercase tracking-[0.08em] text-[var(--text-muted)]">or</span>
        </div>
        <div>
          <Label>Email</Label>
          <Input type="email" placeholder="you@company.com" leftIcon={<Mail />} />
        </div>
        <div>
          <div className="flex items-baseline justify-between">
            <Label>Password</Label>
            <a className="text-[12px] text-brand-500 hover:underline cursor-pointer">Forgot?</a>
          </div>
          <Input type="password" placeholder="••••••••" leftIcon={<Lock />} />
        </div>
        <label className="flex items-center gap-2 text-[13px] text-[var(--text-secondary)]">
          <Checkbox defaultChecked /> Remember me for 30 days
        </label>
        <Button type="submit" variant="primary" className="w-full" size="lg">
          Sign in
        </Button>
      </form>
    </AuthShell>
  );
}
