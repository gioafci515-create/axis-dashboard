import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Search, User, Calendar, Link2, Upload } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardBody } from "@/components/ui/Card";
import { Input, Textarea, Label, HelperText } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Switch, Checkbox } from "@/components/ui/Switch";
import { Badge } from "@/components/ui/Badge";

const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const fadeUp = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

export default function Forms() {
  const [notify, setNotify] = useState(true);
  const [digest, setDigest] = useState(false);

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-[1200px] mx-auto space-y-5">
      <motion.header variants={fadeUp}>
        <Badge tone="brand" size="sm" className="mb-1.5">Form elements</Badge>
        <h1 className="text-[24px] font-semibold tracking-tight">Forms</h1>
        <p className="mt-1 text-[14px] text-[var(--text-tertiary)]">
          Inputs, textareas, selects, switches, and validation patterns.
        </p>
      </motion.header>

      <motion.section variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Account details</CardTitle>
            <CardDescription>Basic profile information</CardDescription>
          </CardHeader>
          <CardBody className="space-y-4">
            <div>
              <Label required>Full name</Label>
              <Input placeholder="Giorgi Afciauri" leftIcon={<User />} />
            </div>
            <div>
              <Label required>Email</Label>
              <Input placeholder="you@company.com" leftIcon={<Mail />} type="email" />
              <HelperText>We'll send a verification link.</HelperText>
            </div>
            <div>
              <Label>Password</Label>
              <Input type="password" placeholder="••••••••" leftIcon={<Lock />} error />
              <HelperText error>Must be at least 10 characters with a number.</HelperText>
            </div>
            <div>
              <Label>Search handle</Label>
              <Input placeholder="Try typing…" leftIcon={<Search />} />
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
            <CardDescription>How you'd like to be reached</CardDescription>
          </CardHeader>
          <CardBody className="space-y-4">
            <div>
              <Label>Country</Label>
              <Select defaultValue="us">
                <option value="us">United States</option>
                <option value="uk">United Kingdom</option>
                <option value="de">Germany</option>
                <option value="jp">Japan</option>
                <option value="br">Brazil</option>
              </Select>
            </div>
            <div>
              <Label>Role</Label>
              <Select defaultValue="eng">
                <option value="eng">Engineering</option>
                <option value="pm">Product</option>
                <option value="des">Design</option>
                <option value="mkt">Marketing</option>
              </Select>
            </div>
            <div>
              <Label>Website</Label>
              <Input leftIcon={<Link2 />} placeholder="https://…" />
            </div>
            <div>
              <Label>Birthday</Label>
              <Input leftIcon={<Calendar />} type="date" />
            </div>
          </CardBody>
        </Card>
      </motion.section>

      <motion.section variants={fadeUp}>
        <Card>
          <CardHeader>
            <CardTitle>Bio & notifications</CardTitle>
            <CardDescription>Tell your team about yourself</CardDescription>
          </CardHeader>
          <CardBody className="space-y-5">
            <div>
              <Label>Bio</Label>
              <Textarea rows={4} placeholder="A few sentences about you…" />
              <HelperText>Max 240 characters.</HelperText>
            </div>

            <div className="flex items-center justify-between gap-4 p-4 rounded-[var(--radius-md)] border border-[var(--border)]">
              <div>
                <p className="text-[13.5px] font-medium">Product updates</p>
                <p className="text-[12px] text-[var(--text-tertiary)]">New features and improvements, once a week.</p>
              </div>
              <Switch checked={notify} onCheckedChange={setNotify} />
            </div>

            <div className="flex items-center justify-between gap-4 p-4 rounded-[var(--radius-md)] border border-[var(--border)]">
              <div>
                <p className="text-[13.5px] font-medium">Weekly digest</p>
                <p className="text-[12px] text-[var(--text-tertiary)]">Summary of activity across your workspace.</p>
              </div>
              <Switch checked={digest} onCheckedChange={setDigest} />
            </div>

            <div className="flex items-center gap-3 text-[13px]">
              <Checkbox id="tos" defaultChecked />
              <label htmlFor="tos" className="text-[var(--text-secondary)]">
                I agree to the <a className="text-brand-500 underline-offset-2 hover:underline">terms of service</a>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 rounded-[var(--radius-md)] border border-dashed border-[var(--border-strong)]">
              <div className="flex items-center gap-3">
                <div className="size-10 grid place-items-center rounded-[var(--radius-md)] bg-brand-50 dark:bg-brand-500/10 text-brand-500">
                  <Upload className="size-4" />
                </div>
                <div>
                  <p className="text-[13.5px] font-medium">Upload avatar</p>
                  <p className="text-[12px] text-[var(--text-tertiary)]">PNG or JPG, up to 2MB.</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Choose file</Button>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button variant="ghost">Cancel</Button>
              <Button variant="primary">Save changes</Button>
            </div>
          </CardBody>
        </Card>
      </motion.section>
    </motion.div>
  );
}
