export interface NavItem {
  label: string;
  href: string;
  badge?: string;
  children?: { label: string; href: string; description: string }[];
}

export interface TrustBadge {
  id: string;
  label: string;
  sublabel: string;
  iconName: "shield" | "lock" | "checkCircle" | "award";
}

export interface PartnerLogo {
  name: string;
  symbol: string;
}

export interface TabFeature {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  mockupType: "inbox" | "calendar" | "summary" | "subscriptions";
}

export interface FeatureCard {
  id: string;
  icon: "mail" | "calendar" | "sparkles" | "fileText" | "creditCard" | "search";
  title: string;
  description: string;
  href: string;
  tag?: string;
}

export interface SplitSectionItem {
  id: string;
  badge: string;
  title: string;
  description: string;
  bullets: string[];
  ctaText: string;
  ctaHref: string;
  imageSide: "left" | "right";
  illustrationType: "fastReply" | "securityLock" | "unifiedHub";
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
  subtext: string;
}

export interface StepItem {
  step: string;
  title: string;
  description: string;
  detail: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatarText: string;
  rating: number;
  highlight: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: "Security" | "Features" | "Billing";
}

export interface FooterColumn {
  title: string;
  links: { label: string; href: string; badge?: string }[];
}

export const LANDING_CONTENT = {
  utilityBar: {
    modes: [
      { label: "Personal", href: "#", active: true },
      { label: "Business", href: "#", active: false },
      { label: "Enterprise", href: "#", active: false },
    ],
    links: [
      { label: "Help & Docs", href: "#faq" },
      { label: "Security Whitepaper", href: "#security" },
      { label: "EN · US", href: "#" },
    ],
  },

  navigation: {
    links: [
      {
        label: "Products",
        href: "#features",
        children: [
          {
            label: "AI Inbox Copilot",
            href: "#features",
            description: "Smart prioritization, category routing, and instant thread summaries.",
          },
          {
            label: "Calendar Orchestration",
            href: "#features",
            description: "Frictionless availability sharing and autonomous meeting booking.",
          },
          {
            label: "Smart Email Drafter",
            href: "#features",
            description: "Contextual replies written in your personal executive tone.",
          },
          {
            label: "Subscription Guard",
            href: "#features",
            description: "Auto-detect recurring charges, invoices, and newsletter bloat.",
          },
        ],
      },
      {
        label: "Solutions",
        href: "#solutions",
        children: [
          {
            label: "For Founders & Executives",
            href: "#solutions",
            description: "Reclaim 5+ hours weekly from administrative communication overload.",
          },
          {
            label: "For Remote Teams",
            href: "#solutions",
            description: "Sync calendars across timezones without email ping-pong.",
          },
          {
            label: "For Consultants & Freelancers",
            href: "#solutions",
            description: "Automate client follow-ups and booking confirmations.",
          },
        ],
      },
      { label: "How It Works", href: "#how-it-works" },
      { label: "Security", href: "#security" },
      { label: "FAQ", href: "#faq" },
    ] as NavItem[],
    ctaSecondary: {
      label: "Log In",
      href: "/login",
    },
    ctaPrimary: {
      label: "Get Started Free",
      href: "/login",
    },
  },

  hero: {
    badge: "Next-Gen AI Workspace",
    headline: "The calm, intelligent way to master email & meetings",
    subheading:
      "Viscas combines Gmail, Google Calendar, and contextual AI into one unified dashboard. Let AI summarize threads, draft replies, and schedule meetings while you focus on high-impact work.",
    primaryCta: {
      label: "Get Started Free",
      href: "/login",
    },
    secondaryCta: {
      label: "See How It Works",
      href: "#how-it-works",
    },
    guaranteeText: "Free forever plan • No credit card required • Official Google Partner",
  },

  trustStrip: {
    heading: "Trusted by over 14,000+ executives, creators, and modern teams worldwide",
    badges: [
      {
        id: "badge-1",
        label: "Google OAuth 2.0",
        sublabel: "Official Verified Integration",
        iconName: "checkCircle",
      },
      {
        id: "badge-2",
        label: "256-bit Encryption",
        sublabel: "Bank-Grade Transit & Rest",
        iconName: "lock",
      },
      {
        id: "badge-3",
        label: "GDPR & SOC-2 Ready",
        sublabel: "Strict Data Isolation",
        iconName: "shield",
      },
      {
        id: "badge-4",
        label: "Zero Model Training",
        sublabel: "Your Private Data Stays Yours",
        iconName: "award",
      },
    ] as TrustBadge[],
    partners: [
      { name: "Apex Ventures", symbol: "APEX" },
      { name: "Novus Cloud", symbol: "NOVUS" },
      { name: "Starlight Digital", symbol: "STARLIGHT" },
      { name: "VectorScale", symbol: "VECTOR" },
      { name: "OmniGrowth", symbol: "OMNI" },
      { name: "Lumina Labs", symbol: "LUMINA" },
    ] as PartnerLogo[],
  },

  everythingYouNeed: {
    badge: "All-In-One Productivity",
    title: "Everything you need to regain control of your day",
    subtitle:
      "Instead of juggling four browser tabs and repetitive busywork, manage all incoming communication from a single, dependable cockpit.",
    tabs: [
      {
        id: "inbox",
        title: "Intelligent Inbox",
        subtitle: "Cut through 200+ daily emails with AI filtering",
        description:
          "Viscas automatically surfaces urgent client requests, sorts newsletters into background digests, and flags action-required emails before you even open them.",
        highlights: [
          "Auto-categorization into Urgent, Follow-up, and Subscriptions",
          "One-click executive bullet summaries for 20+ message threads",
          "Key entity extraction: deadlines, invoice totals, and action owners",
        ],
        mockupType: "inbox",
      },
      {
        id: "calendar",
        title: "Autonomous Scheduling",
        subtitle: "Never ask 'What time works for you?' again",
        description:
          "Integrated natively with Google Calendar. Share personalized scheduling links, detect conflicts across personal and work calendars, and auto-insert meeting details with one click.",
        highlights: [
          "Zero-friction booking links with smart buffer time preservation",
          "Automated timezone conversion for international clients",
          "Automatic calendar event generation directly from email invitations",
        ],
        mockupType: "calendar",
      },
      {
        id: "summaries",
        title: "Executive Summaries",
        subtitle: "Grasp lengthy conversation threads in 5 seconds",
        description:
          "Stop scrolling through endless CC replies. Viscas condenses sprawling client negotiations and vendor updates into three clear bullet points with explicit next steps.",
        highlights: [
          "Instant TL;DR generation directly inside your inbox preview",
          "Highlights decisions made, open blockers, and agreed dates",
          "Exportable directly into your daily task list or meeting agenda",
        ],
        mockupType: "summary",
      },
      {
        id: "subscriptions",
        title: "Subscription Guard",
        subtitle: "Audit recurring bills and quiet subscriptions",
        description:
          "Viscas parses invoice receipts across your Gmail history to build an automated dashboard of your software subscriptions, renewal dates, and price increases.",
        highlights: [
          "Detects duplicate SaaS charges and upcoming annual renewals",
          "Direct unsubscribe shortcuts to clear marketing clutter",
          "Monthly financial spend summary with exportable receipts",
        ],
        mockupType: "subscriptions",
      },
    ] as TabFeature[],
  },

  featureCards: {
    badge: "Core Capabilities",
    title: "Engineered for speed, built for reliability",
    subtitle:
      "Every tool inside Viscas is designed to eliminate cognitive fatigue and keep your workflow in a frictionless state of flow.",
    cards: [
      {
        id: "feat-1",
        icon: "mail",
        title: "Unified Gmail Sync",
        description:
          "Bidirectional instant synchronization with your Google Workspace or personal Gmail. Read, archive, and label seamlessly.",
        href: "/login",
        tag: "Real-Time Sync",
      },
      {
        id: "feat-2",
        icon: "calendar",
        title: "Google Calendar Hub",
        description:
          "View agendas, resolve schedule collisions, and create Google Meet or Zoom invites without leaving your communication feed.",
        href: "/login",
        tag: "Dual Sync",
      },
      {
        id: "feat-3",
        icon: "sparkles",
        title: "Nuanced AI Co-Author",
        description:
          "Generate courteous, professional responses tailored to previous email history. Adjust tone from warm to executive with one click.",
        href: "/login",
        tag: "Context-Aware",
      },
      {
        id: "feat-4",
        icon: "fileText",
        title: "Action Item Detection",
        description:
          "Viscas automatically detects commitments you made in sent emails and reminds you before deadlines slip through the cracks.",
        href: "/login",
        tag: "Never Miss Tasks",
      },
      {
        id: "feat-5",
        icon: "creditCard",
        title: "Invoice & Receipt Tracker",
        description:
          "Automatically aggregate receipts and invoices in one secure tab. Simplify tax prep and eliminate missing expense claims.",
        href: "/login",
        tag: "Automated Audit",
      },
      {
        id: "feat-6",
        icon: "search",
        title: "Natural Language Search",
        description:
          "Search your email and schedule with human questions like 'What did Sarah propose for the Q3 budget last Tuesday?'",
        href: "/login",
        tag: "Instant Retrieval",
      },
    ] as FeatureCard[],
  },

  splitSections: [
    {
      id: "split-fast",
      badge: "Fast & Effortless",
      title: "Draft replies at 10x speed without losing your voice",
      description:
        "Staring at a blank reply box drains mental energy. Viscas analyzes incoming thread context, proposes three intelligent response options, and drafts complete, polished messages in seconds.",
      bullets: [
        "Select from Quick Affirmation, Detailed Follow-up, or Graceful Decline",
        "Retains your personal vocabulary, sign-offs, and company terminology",
        "Review and modify before sending — you are always in complete control",
      ],
      ctaText: "Try AI Drafting Free",
      ctaHref: "/login",
      imageSide: "right",
      illustrationType: "fastReply",
    },
    {
      id: "split-secure",
      badge: "Bank-Grade Security",
      title: "Your communications remain strictly confidential",
      description:
        "Fintech-grade protection is our foundation. Viscas connects using official Google OAuth 2.0 with restricted read/write scopes. We never sell your data, inspect your confidential attachments, or train public AI models on your private emails.",
      bullets: [
        "End-to-end 256-bit AES encryption at rest and TLS 1.3 in transit",
        "Direct Google OAuth verification — no stored user passwords",
        "Granular permission revocation at any time from your Google Account",
      ],
      ctaText: "Review Security Architecture",
      ctaHref: "#faq",
      imageSide: "left",
      illustrationType: "securityLock",
    },
    {
      id: "split-simple",
      badge: "One Calm Workspace",
      title: "Consolidate your digital workday into a single screen",
      description:
        "The average knowledge worker switches tabs 1,200 times per day. Viscas harmonizes your inbox, meetings, agenda notes, and AI assistant into an orderly, tranquil dashboard built for deep focus.",
      bullets: [
        "Side-by-side split screen for incoming messages and upcoming calls",
        "Keyboard shortcuts for lightning-fast inbox zero triage",
        "Minimalist aesthetic designed to reduce eye strain and cognitive overload",
      ],
      ctaText: "Experience the Unified Workspace",
      ctaHref: "/login",
      imageSide: "right",
      illustrationType: "unifiedHub",
    },
  ] as SplitSectionItem[],

  statsBand: {
    badge: "Proven Productivity Impact",
    heading: "Measurable time back in your calendar every single week",
    stats: [
      {
        id: "stat-1",
        value: "4.8 hrs",
        label: "Saved per user / week",
        subtext: "On repetitive email drafting & booking logistics",
      },
      {
        id: "stat-2",
        value: "14,000+",
        label: "Active Professionals",
        subtext: "Founders, PMs, engineers, and creators",
      },
      {
        id: "stat-3",
        value: "99.98%",
        label: "Sync Reliability",
        subtext: "Backed by enterprise Google Cloud infrastructure",
      },
      {
        id: "stat-4",
        value: "4.9 / 5",
        label: "Average User Rating",
        subtext: "Across over 2,400+ verified customer reviews",
      },
    ] as StatItem[],
  },

  howItWorks: {
    badge: "Simple 3-Step Setup",
    title: "Up and running in less than 60 seconds",
    subtitle:
      "No complex software installations or DNS changes. Viscas connects securely with your existing Google accounts.",
    steps: [
      {
        step: "01",
        title: "Connect Your Google Account",
        description:
          "Sign in with Google OAuth in two clicks. Grant secure read and schedule permissions with granular control.",
        detail: "Takes 20 seconds. No passwords stored.",
      },
      {
        step: "02",
        title: "AI Indexes & Prioritizes",
        description:
          "Viscas organizes your upcoming week, filters low-priority newsletters, and prepares draft replies for urgent mail.",
        detail: "Zero downtime, works seamlessly in background.",
      },
      {
        step: "03",
        title: "Work with Effortless Clarity",
        description:
          "Open your calm unified workspace. Review AI summaries, approve meeting requests, and achieve inbox peace.",
        detail: "Save 5+ hours every single week.",
      },
    ] as StepItem[],
  },

  testimonials: {
    badge: "Customer Love",
    title: "Loved by professionals who value their time",
    subtitle:
      "Discover how founders, remote teams, and managers reclaimed sanity from endless email threads.",
    items: [
      {
        id: "test-1",
        quote:
          "Viscas gave me my mornings back. I used to spend 90 minutes triaging 100+ emails and scheduling calls across 3 time zones. Now I approve AI summaries and send replies in 15 minutes flat.",
        author: "Marcus Vance",
        role: "Managing Director",
        company: "Vance Capital Partners",
        avatarText: "MV",
        rating: 5,
        highlight: "Saved 7+ hours in week one",
      },
      {
        id: "test-2",
        quote:
          "The tone calibration on the AI drafting is phenomenal. It sounds just like me — polite, decisive, and concise. My clients have no idea AI helped draft the responses.",
        author: "Elena Rostova",
        role: "Head of Product",
        company: "Synapse Cloud",
        avatarText: "ER",
        rating: 5,
        highlight: "Flawless executive tone",
      },
      {
        id: "test-3",
        quote:
          "Having my Google Calendar and Gmail in a single screen without 10 open browser tabs has completely eliminated my context switching fatigue. Viscas is essential software.",
        author: "Devon Chen",
        role: "Principal Architect",
        company: "Horizon Dynamics",
        avatarText: "DC",
        rating: 5,
        highlight: "Eliminated tab fatigue",
      },
      {
        id: "test-4",
        quote:
          "The subscription tracker alone saved our team $420/month by identifying inactive software licenses we had forgotten about buried in our receipts.",
        author: "Sophia Martinez",
        role: "Operations Lead",
        company: "Craft & Scale",
        avatarText: "SM",
        rating: 5,
        highlight: "Saved $420/mo on SaaS",
      },
    ] as TestimonialItem[],
  },

  faq: {
    badge: "Got Questions?",
    title: "Frequently Asked Questions",
    subtitle:
      "Everything you need to know about Viscas, our security standards, and getting started.",
    items: [
      {
        id: "faq-1",
        category: "Features",
        question: "How does Viscas integrate with my Gmail and Google Calendar?",
        answer:
          "Viscas connects directly through Google's official OAuth 2.0 API. This means you sign in using your existing Google account and authenticate securely. We never see or store your password, and you can revoke access at any time with a single click from your Google security dashboard.",
      },
      {
        id: "faq-2",
        category: "Security",
        question: "Does Viscas use my private email content to train AI models?",
        answer:
          "Never. We have strict data isolation agreements in place. Your email content, attachments, and calendar invitations are processed strictly in memory to generate your requested summaries and drafts. We never train public or third-party AI models on your proprietary communications.",
      },
      {
        id: "faq-3",
        category: "Billing",
        question: "Is there a completely free plan available?",
        answer:
          "Yes! Our Free plan provides full Gmail and Google Calendar synchronization, daily AI drafting allowances, and calendar scheduling links at zero cost with no credit card required. As your workload grows, you can upgrade to Pro for unlimited AI requests.",
      },
      {
        id: "faq-4",
        category: "Features",
        question: "Can I manage multiple Gmail accounts or workspaces?",
        answer:
          "Yes. Viscas supports multi-inbox switching, enabling you to toggle smoothly between personal email, company workspaces, and consulting client domains without signing in and out.",
      },
      {
        id: "faq-5",
        category: "Security",
        question: "What encryption standards does Viscas enforce?",
        answer:
          "All data in transit is protected using TLS 1.3 with AES-256 cipher suites. At rest, data is protected using AES-256 encryption. We adhere strictly to OWASP security guidelines and SOC-2 Type II standards.",
      },
      {
        id: "faq-6",
        category: "Billing",
        question: "Can I cancel my account or delete my data anytime?",
        answer:
          "Yes. You have complete autonomy over your data. You can delete your account at any moment from your settings, which permanently purges all cached tokens and sync data from our servers immediately.",
      },
    ] as FaqItem[],
  },

  finalCta: {
    badge: "Start in 60 Seconds",
    title: "Reclaim your workday with Viscas today",
    subtitle:
      "Join 14,000+ high-output professionals who eliminated inbox stress and simplified their schedule. Free forever, no card needed.",
    cta: {
      label: "Get Started Free",
      href: "/login",
    },
    secondaryCta: {
      label: "Sign in to Viscas",
      href: "/login",
    },
    perks: [
      "No credit card required",
      "Instant 60-second setup",
      "Official Google OAuth verified",
    ],
  },

  footer: {
    brandDescription:
      "Viscas is the trusted, unified AI productivity workspace that combines Gmail, Google Calendar, and contextual intelligence to give you hours back every week.",
    columns: [
      {
        title: "Product",
        links: [
          { label: "AI Inbox Copilot", href: "#features" },
          { label: "Calendar Scheduling", href: "#features" },
          { label: "Smart Reply Drafter", href: "#features" },
          { label: "Executive Summaries", href: "#features" },
          { label: "Subscription Guard", href: "#features" },
          { label: "Pricing", href: "#pricing" },
        ],
      },
      {
        title: "Solutions",
        links: [
          { label: "For Executives & Founders", href: "#solutions" },
          { label: "For Remote Teams", href: "#solutions" },
          { label: "For Consultants", href: "#solutions" },
          { label: "For High-Volume Inboxes", href: "#solutions" },
          { label: "Workflow Integrations", href: "#solutions" },
        ],
      },
      {
        title: "Trust & Security",
        links: [
          { label: "Security Whitepaper", href: "#security" },
          { label: "Google OAuth Verification", href: "#security" },
          { label: "Privacy Policy", href: "/#" },
          { label: "Terms of Service", href: "/#" },
          { label: "GDPR Compliance", href: "#security" },
          { label: "SOC-2 Readiness", href: "#security" },
        ],
      },
      {
        title: "Resources",
        links: [
          { label: "Product Documentation", href: "#faq" },
          { label: "Product Updates", href: "#" },
          { label: "API Reference", href: "#" },
          { label: "Community & Support", href: "#faq" },
          { label: "Contact Sales", href: "/login" },
        ],
      },
    ] as FooterColumn[],
    copyright: "© 2026 Viscas Technologies, Inc. All rights reserved.",
    disclaimer:
      "Viscas is an independent productivity platform integrated with Google Workspace via official Google APIs. All trademarks and brand names are properties of their respective owners.",
    languages: ["United States (English)", "United Kingdom (English)", "Canada (English)", "Deutschland (Deutsch)", "France (Français)"],
  },
};
