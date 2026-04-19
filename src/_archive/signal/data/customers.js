import { rand, randInt, pick, weightedPick } from "./seed";

const FIRST_NAMES = [
  "James","Mary","Robert","Patricia","John","Jennifer","Michael","Linda","David","Elizabeth",
  "William","Barbara","Richard","Susan","Joseph","Jessica","Thomas","Sarah","Christopher","Karen",
  "Charles","Lisa","Daniel","Nancy","Matthew","Betty","Anthony","Margaret","Mark","Sandra",
  "Alejandro","Yuki","Priya","Lars","Fatima","Chen","Olga","Ahmed","Ingrid","Marco",
  "Aisha","Kenji","Sofia","Henrik","Ananya","Dmitri","Isabella","Obi","Linnea","Raj",
];

const LAST_NAMES = [
  "Smith","Johnson","Williams","Brown","Jones","Garcia","Miller","Davis","Rodriguez","Martinez",
  "Hernandez","Lopez","Gonzalez","Wilson","Anderson","Thomas","Taylor","Moore","Jackson","Martin",
  "Lee","Perez","Thompson","White","Harris","Sanchez","Clark","Ramirez","Lewis","Robinson",
  "Nakamura","Petrov","Johansson","Muller","Patel","O'Brien","Ferrari","Santos","Kim","Nguyen",
  "Okafor","Bergström","Kowalski","Ivanova","Das","Yamamoto","Rossi","Andersen","Novak","Svensson",
];

const COMPANIES = [
  "Stripe","Vercel","Linear","Notion","Figma","Retool","Supabase","PlanetScale","Railway","Resend",
  "Clerk","Neon","Turso","Drizzle","Prisma","Inngest","Trigger.dev","Upstash","Axiom","Tinybird",
  "PostHog","Segment","LaunchDarkly","Split","Statsig","Amplitude","Mixpanel","Heap","FullStory","LogRocket",
  "Datadog","Grafana Labs","New Relic","Sentry","PagerDuty","Incident.io","FireHydrant","Rootly","Better Stack","Chronosphere",
  "HashiCorp","Pulumi","Spacelift","Env0","Terraform Cloud","Crossplane","Port","Cortex","Backstage","OpsLevel",
  "Loom","Pitch","Miro","Coda","Airtable","Monday.com","ClickUp","Asana","Shortcut","Huly",
  "Plaid","Finch","Moov","Unit","Mercury","Ramp","Brex","Navan","Rippling","Gusto",
  "Twilio","Vonage","MessageBird","Sendgrid","Postmark","Mailgun","Customer.io","Braze","OneSignal","Knock",
  "Algolia","Typesense","Meilisearch","Elasticsearch","Pinecone","Weaviate","Qdrant","Chroma","LanceDB","Marqo",
  "Snowflake","Databricks","dbt Labs","Fivetran","Airbyte","Stitch","Census","Hightouch","RudderStack","Segment",
  "Cloudflare","Fastly","Akamai","Bunny.net","KeyCDN","StackPath","Limelight","Edgio","Imperva","Sucuri",
  "GitHub","GitLab","Bitbucket","Sourcegraph","CodeSee","Swimm","ReadMe","Mintlify","GitBook","Docusaurus",
  "Auth0","Okta","OneLogin","JumpCloud","Stytch","WorkOS","FusionAuth","Keycloak","Descope","Passage",
  "Salesforce","HubSpot","Pipedrive","Close","Attio","Folk","Clay","Apollo","ZoomInfo","Lusha",
  "AWS","Google Cloud","Azure","DigitalOcean","Linode","Vultr","Hetzner","OVHcloud","Scaleway","Fly.io",
  "Zapier","Make","n8n","Tray.io","Workato","Pipedream","Paragon","Merge","Alloy","Pandium",
  "Lattice","Culture Amp","15Five","Leapsome","Deel","Remote","Oyster","Papaya Global","Multiplier","Omnipresent",
  "Webflow","Framer","Builder.io","Contentful","Sanity","Storyblok","Strapi","Payload","Ghost","Directus",
];

const DOMAINS = ["com","io","co","dev","app","ai","so","sh","run","cloud"];

const PLANS = ["Free", "Starter", "Pro", "Business", "Enterprise"];
const PLAN_WEIGHTS = [15, 25, 35, 18, 7];
const PLAN_MRR = { Free: 0, Starter: 29, Pro: 79, Business: 199, Enterprise: 499 };

const STATUSES = ["active", "churned", "trial", "paused"];
const STATUS_WEIGHTS = [65, 12, 18, 5];

const COUNTRIES = [
  "United States","United Kingdom","Germany","France","Canada","Australia","Japan","Netherlands",
  "Sweden","Brazil","India","Singapore","South Korea","Spain","Italy","Mexico","Poland","Norway",
  "Denmark","Finland","Switzerland","Israel","New Zealand","Ireland","Belgium","Austria","Portugal","Czech Republic",
];

const COUNTRY_CODES = {
  "United States":"US","United Kingdom":"GB","Germany":"DE","France":"FR","Canada":"CA",
  "Australia":"AU","Japan":"JP","Netherlands":"NL","Sweden":"SE","Brazil":"BR",
  "India":"IN","Singapore":"SG","South Korea":"KR","Spain":"ES","Italy":"IT",
  "Mexico":"MX","Poland":"PL","Norway":"NO","Denmark":"DK","Finland":"FI",
  "Switzerland":"CH","Israel":"IL","New Zealand":"NZ","Ireland":"IE","Belgium":"BE",
  "Austria":"AT","Portugal":"PT","Czech Republic":"CZ",
};

const INDUSTRIES = [
  "SaaS","Fintech","E-commerce","Healthcare","EdTech","MarTech","DevTools","Security",
  "Infrastructure","Data & Analytics","AI/ML","Communication","Productivity","HR Tech",
];

function generateEmail(first, last, company) {
  const domain = company.toLowerCase().replace(/[^a-z0-9]/g, "") + "." + pick(DOMAINS);
  return `${first.toLowerCase()}.${last.toLowerCase()}@${domain}`;
}

function generateDate(monthsBack) {
  const now = new Date(2026, 3, 17); // April 17, 2026
  const start = new Date(now);
  start.setMonth(start.getMonth() - monthsBack);
  const diff = now.getTime() - start.getTime();
  return new Date(start.getTime() + rand() * diff);
}

export function generateCustomers(count = 2847) {
  const customers = [];

  for (let i = 0; i < count; i++) {
    const firstName = pick(FIRST_NAMES);
    const lastName = pick(LAST_NAMES);
    const company = pick(COMPANIES);
    const plan = weightedPick(PLANS, PLAN_WEIGHTS);
    const status = weightedPick(STATUSES, STATUS_WEIGHTS);
    const country = pick(COUNTRIES);
    const signupDate = generateDate(18);
    const lastSeen = generateDate(1);
    const mrr = plan === "Enterprise"
      ? PLAN_MRR[plan] + randInt(0, 500) * 10
      : PLAN_MRR[plan] + randInt(-5, 15) * (plan === "Free" ? 0 : 1);

    customers.push({
      id: `cus_${String(i + 1).padStart(5, "0")}`,
      name: `${firstName} ${lastName}`,
      email: generateEmail(firstName, lastName, company),
      company,
      avatar: null,
      plan,
      status,
      mrr: Math.max(0, mrr),
      country,
      countryCode: COUNTRY_CODES[country] || "US",
      industry: pick(INDUSTRIES),
      signupDate: signupDate.toISOString(),
      lastSeen: lastSeen.toISOString(),
      events: randInt(12, 4800),
      sessions: randInt(3, 320),
      nps: status === "churned" ? randInt(1, 5) : randInt(4, 10),
      ltv: mrr * randInt(6, 36),
    });
  }

  return customers;
}

export const customers = generateCustomers();
export const PLAN_OPTIONS = PLANS;
export const STATUS_OPTIONS = STATUSES;
export const COUNTRY_OPTIONS = COUNTRIES;
export const INDUSTRY_OPTIONS = INDUSTRIES;
