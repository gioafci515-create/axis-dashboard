import { Link } from "react-router-dom";
import { Mail, Lock, User, Github } from "lucide-react";
import { AuthShell } from "./AuthShell";
import { Button } from "@/components/ui/Button";
import { Input, Label, HelperText } from "@/components/ui/Input";
import { Checkbox } from "@/components/ui/Switch";

export default function SignUp() {
  return (
    <AuthShell
      title="Create your account"
      subtitle="Start a free 14-day trial. No card required."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/signin" className="text-brand-500 font-medium hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <Button type="button" variant="outline" className="w-full">
          <Github className="size-4" /> Sign up with GitHub
        </Button>
        <div className="relative text-center">
          <span className="absolute inset-x-0 top-1/2 border-t border-[var(--border)]" />
          <span className="relative bg-[var(--bg-app)] px-2 text-[11px] uppercase tracking-[0.08em] text-[var(--text-muted)]">or</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label required>First name</Label>
            <Input placeholder="Giorgi" leftIcon={<User />} />
          </div>
          <div>
            <Label>Last name</Label>
            <Input placeholder="Afciauri" />
          </div>
        </div>
        <div>
          <Label required>Work email</Label>
          <Input type="email" placeholder="you@company.com" leftIcon={<Mail />} />
        </div>
        <div>
          <Label required>Password</Label>
          <Input type="password" placeholder="At least 10 characters" leftIcon={<Lock />} />
          <HelperText>Use a mix of letters, numbers, and symbols.</HelperText>
        </div>
        <label className="flex items-start gap-2 text-[13px] text-[var(--text-secondary)]">
          <Checkbox className="mt-0.5" defaultChecked />
          <span>
            I agree to the{" "}
            <a className="text-brand-500 hover:underline">terms</a> and{" "}
            <a className="text-brand-500 hover:underline">privacy policy</a>.
          </span>
        </label>
        <Button type="submit" variant="primary" className="w-full" size="lg">
          Create account
        </Button>
      </form>
    </AuthShell>
  );
}
