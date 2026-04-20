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
            <Label htmlFor="signup-first" required>First name</Label>
            <Input id="signup-first" name="firstName" autoComplete="given-name" placeholder="Giorgi" leftIcon={<User />} />
          </div>
          <div>
            <Label htmlFor="signup-last">Last name</Label>
            <Input id="signup-last" name="lastName" autoComplete="family-name" placeholder="Afciauri" />
          </div>
        </div>
        <div>
          <Label htmlFor="signup-email" required>Work email</Label>
          <Input id="signup-email" name="email" type="email" autoComplete="email" placeholder="you@company.com" leftIcon={<Mail />} />
        </div>
        <div>
          <Label htmlFor="signup-password" required>Password</Label>
          <Input id="signup-password" name="password" type="password" autoComplete="new-password" placeholder="At least 10 characters" leftIcon={<Lock />} />
          <HelperText>Use a mix of letters, numbers, and symbols.</HelperText>
        </div>
        <label className="flex items-start gap-2 text-[13px] text-[var(--text-secondary)]">
          <Checkbox className="mt-0.5" defaultChecked />
          <span>
            I agree to the{" "}
            <button type="button" className="text-brand-500 hover:underline">terms</button> and{" "}
            <button type="button" className="text-brand-500 hover:underline">privacy policy</button>.
          </span>
        </label>
        <Button type="submit" variant="primary" className="w-full" size="lg">
          Create account
        </Button>
      </form>
    </AuthShell>
  );
}
