import { motion } from "framer-motion";
import { Mail, MapPin, Globe, Github, Twitter, Linkedin, Pencil, AtSign, Eye } from "lucide-react";
import { Card, CardHeader, CardTitle, CardBody } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";

const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const fadeUp = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.3 } } };

const ACTIVITY = [
  { type: "commit", title: "Pushed 3 commits to axis/web", when: "2h ago", desc: "phase-5: analytics dashboard" },
  { type: "comment", title: "Commented on Issue #248", when: "5h ago", desc: "Merge after review." },
  { type: "merge", title: "Merged pull request #412", when: "Yesterday", desc: "phase-4: marketing dashboard" },
  { type: "ship", title: "Deployed v2.4.1 to production", when: "2 days ago", desc: "13 commits, 0 hot-fixes" },
];

export default function Profile() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-[1200px] mx-auto space-y-5">
      <motion.section variants={fadeUp}>
        <Card className="overflow-hidden">
          <div className="h-32 bg-gradient-to-br from-brand-500 via-brand-600 to-brand-800 relative">
            <div className="absolute inset-0 opacity-30" style={{
              backgroundImage: "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.25) 0%, transparent 40%), radial-gradient(circle at 80% 60%, rgba(255,255,255,0.2) 0%, transparent 45%)",
            }} />
          </div>
          <CardBody className="pt-0 -mt-12">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div className="flex items-end gap-4">
                <div className="rounded-full ring-4 ring-[var(--bg-surface)]">
                  <Avatar size="xl" name="Giorgi Afciauri" />
                </div>
                <div className="mb-1">
                  <h1 className="text-[22px] font-semibold tracking-tight">Giorgi Afciauri</h1>
                  <p className="text-[13.5px] text-[var(--text-tertiary)]">Full-stack engineer · Tbilisi, GE</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm"><Pencil className="size-3.5" /> Edit profile</Button>
                <Button variant="primary" size="sm">Follow</Button>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-[var(--text-secondary)]">
              <span className="inline-flex items-center gap-1.5"><Mail className="size-3.5 text-[var(--text-tertiary)]" /> afciaurigiorgi046@gmail.com</span>
              <span className="inline-flex items-center gap-1.5"><MapPin className="size-3.5 text-[var(--text-tertiary)]" /> Tbilisi, Georgia</span>
              <span className="inline-flex items-center gap-1.5"><Globe className="size-3.5 text-[var(--text-tertiary)]" /> kosha.app</span>
              <span className="inline-flex items-center gap-1.5"><Github className="size-3.5 text-[var(--text-tertiary)]" /> @giorgi</span>
              <span className="inline-flex items-center gap-1.5"><Twitter className="size-3.5 text-[var(--text-tertiary)]" /> @giorgi_a</span>
              <span className="inline-flex items-center gap-1.5"><Linkedin className="size-3.5 text-[var(--text-tertiary)]" /> /in/giorgi</span>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <Badge tone="brand">React</Badge>
              <Badge tone="info">TypeScript</Badge>
              <Badge tone="success">Node.js</Badge>
              <Badge tone="warning">Python</Badge>
              <Badge tone="neutral">Postgres</Badge>
              <Badge tone="neutral">Redis</Badge>
            </div>
          </CardBody>
        </Card>
      </motion.section>

      <motion.section variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card>
          <CardBody className="text-center py-6">
            <p className="text-[28px] font-semibold tracking-tight tabular-nums">1,284</p>
            <p className="mt-0.5 text-[11.5px] uppercase tracking-[0.06em] text-[var(--text-muted)]">Commits this year</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center py-6">
            <p className="text-[28px] font-semibold tracking-tight tabular-nums">48</p>
            <p className="mt-0.5 text-[11.5px] uppercase tracking-[0.06em] text-[var(--text-muted)]">PRs merged</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center py-6">
            <p className="text-[28px] font-semibold tracking-tight tabular-nums">4.2k</p>
            <p className="mt-0.5 text-[11.5px] uppercase tracking-[0.06em] text-[var(--text-muted)]">Followers</p>
          </CardBody>
        </Card>
      </motion.section>

      <motion.section variants={fadeUp}>
        <Card>
          <CardHeader>
            <CardTitle>Activity</CardTitle>
          </CardHeader>
          <div className="px-5 pb-5">
            <Tabs defaultValue="recent">
              <TabsList>
                <TabsTrigger value="recent">Recent</TabsTrigger>
                <TabsTrigger value="mentions">Mentions</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="recent">
                <ul className="space-y-3">
                  {ACTIVITY.map((a, i) => (
                    <li key={i} className="flex items-start gap-3 p-3 rounded-[var(--radius-md)] hover:bg-[var(--bg-hover)] transition-colors">
                      <div className="size-8 shrink-0 rounded-full bg-[var(--bg-muted)] grid place-items-center text-[11px] font-bold text-[var(--text-secondary)]">
                        {a.type[0].toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-3">
                          <p className="text-[13.5px] font-medium text-[var(--text-primary)] truncate">{a.title}</p>
                          <span className="text-[11.5px] text-[var(--text-tertiary)] shrink-0">{a.when}</span>
                        </div>
                        <p className="text-[12.5px] text-[var(--text-tertiary)] truncate mt-0.5">{a.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="mentions">
                <EmptyState icon={AtSign} title="No mentions yet" hint="When someone @mentions you, it'll show up here." />
              </TabsContent>
              <TabsContent value="reviews">
                <EmptyState icon={Eye} title="No reviews yet" hint="Reviews you give or receive will appear here." />
              </TabsContent>
            </Tabs>
          </div>
        </Card>
      </motion.section>
    </motion.div>
  );
}

function EmptyState({ icon: Icon, title, hint }) {
  return (
    <div className="py-10 flex flex-col items-center text-center gap-2">
      <div className="size-10 rounded-full bg-[var(--bg-muted)] grid place-items-center text-[var(--text-tertiary)]">
        <Icon className="size-4.5" />
      </div>
      <p className="text-[13.5px] font-medium text-[var(--text-secondary)]">{title}</p>
      <p className="text-[12.5px] text-[var(--text-tertiary)] max-w-[280px]">{hint}</p>
    </div>
  );
}
