export interface CompanyInfo {
  name: string;
  legal: string;
  since: number;
  phones: string[];
  emails: { info: string; hr: string };
  hours: string;
  hq: string;
  mapUrl: string;
  socials: { facebook: string; instagram: string; linkedin: string };
}

export const companyInfo: CompanyInfo = {
  name: "Godavari Wave Technologies",
  legal: "Godavari Wave Technologies Pvt Ltd",
  since: 2024,
  phones: ["+91 7799 822 121", "+91 8688 883 323"],
  emails: {
    info: "info@godavariwave.com",
    hr: "hrhydgodavariwavetech@gmail.com"
  },
  hours: "Mon – Fri · 9:00 – 18:30",
  hq: "Meenakshi Tech Park, Gachibowli, Hyderabad, Telangana 500032",
  mapUrl: "https://www.bing.com/maps/directions?ty=0&v=2&sV=1&rtp=%7Epos.17.44371795654297_78.36994171142578__Meenakshi%2520Tech%2520Park_&cp=17.443718%7E78.369942&lvl=16&style=r",
  socials: {
    facebook: "https://www.facebook.com/godavariwave.tech/",
    instagram: "https://www.instagram.com/godavariwave_tech/?hl=en",
    linkedin: "https://www.linkedin.com/company/godavari-wave-technologies-pvt-ltd/"
  }
};

export const stats = [
  { value: 480, suffix: "+", label: "Trusted clients" },
  { value: 353, suffix: "+", label: "Digital marketing clients" },
  { value: 50, suffix: "+", label: "Innovators" },
  { value: 4, suffix: "", label: "Branches" }
];

export const services = [
  {
    id: "web",
    title: "Web Development",
    short: "Portals, stores and platforms engineered for speed.",
    points: [
      "Custom business websites & portals",
      "E-commerce store development",
      "CMS & dynamic website solutions",
      "SEO-friendly, high-performance builds"
    ]
  },
  {
    id: "mobile",
    title: "Mobile App Development",
    short: "Native and cross-platform apps people love to open.",
    points: [
      "Android app development",
      "iOS app development",
      "Cross-platform app solutions",
      "API integration & backend systems"
    ]
  },
  {
    id: "marketing",
    title: "Digital Marketing",
    short: "Growth campaigns that turn reach into revenue.",
    points: [
      "Search engine optimization (SEO)",
      "Social media marketing & ads",
      "Google Ads & PPC campaigns",
      "Content creation & brand strategy"
    ]
  },
  {
    id: "design",
    title: "UI/UX & Graphic Design",
    short: "Interfaces and identities with intent.",
    points: [
      "Website & app UI/UX design",
      "Brand identity & logo design",
      "Marketing materials & creatives",
      "Interactive prototypes & wireframes"
    ]
  },
  {
    id: "cloud",
    title: "Cloud Hosting Solutions",
    short: "Secure, scalable infrastructure that never sleeps.",
    points: [
      "Secure & scalable cloud hosting",
      "Data backup & disaster recovery",
      "Dedicated & shared hosting plans",
      "24/7 server monitoring & support"
    ]
  },
  {
    id: "nfc",
    title: "NFC Digital Cards",
    short: "One tap. Your entire brand, shared.",
    points: [
      "Smart contactless business cards",
      "Custom branding & designs",
      "Easy sharing via tap or scan",
      "Integration with websites & apps"
    ]
  }
];

export const solutions = [
  {
    tag: "Digital Commerce",
    title: "E-commerce Platforms",
    image: "/images/gw-govt-0.jpg",
    text: "Feature-rich online stores with secure payments and advanced analytics, built to scale."
  },
  {
    tag: "On-Demand Ordering",
    title: "Food Delivery Apps",
    image: "/images/gw-port-abhi24.jpg",
    text: "Real-time ordering and delivery platforms built for speed, accuracy and delight."
  },
  {
    tag: "Financial Automation",
    title: "Billing & Invoicing",
    image: "/images/gw-govt-1.jpg",
    text: "Smart billing tools that remove manual errors and track payments in real time."
  },
  {
    tag: "Ride-Hailing & Mobility",
    title: "Bike Taxi & Cab Services",
    image: "/images/gw-govt-2.jpg",
    text: "GPS-integrated booking platforms for taxis, bikes and shared rides."
  },
  {
    tag: "E-Learning",
    title: "Education Platforms",
    image: "/images/gw-govt-3.jpg",
    text: "Video classes, quizzes, progress tracking and personalised learning paths."
  },
  {
    tag: "Recruitment",
    title: "Job Portals",
    image: "/images/gw-govt-4.jpg",
    text: "Hiring platforms with resume parsing and AI-based matching."
  },
  {
    tag: "E-Governance",
    title: "Government Projects",
    image: "/images/gw-govt-0.jpg",
    text: "Secure, citizen-focused digital services with compliance at every step."
  },
  {
    tag: "Bespoke Software",
    title: "Custom Software",
    image: "/images/gw-govt-1.jpg",
    text: "Fully tailored tools, from concept to deployment."
  },
  {
    tag: "Smart Logistics",
    title: "Transportation & Logistics",
    image: "/images/gw-govt-2.jpg",
    text: "Real-time tracking, route planning and fleet management."
  },
  {
    tag: "PropTech",
    title: "Real Estate Platforms",
    image: "/images/gw-govt-3.jpg",
    text: "Virtual tours, smart search and CRM integrations."
  },
  {
    tag: "Hospitality",
    title: "Hotel Management",
    image: "/images/gw-govt-4.jpg",
    text: "Bookings, housekeeping and guest services in one system."
  },
  {
    tag: "Healthcare",
    title: "Hospital Systems",
    image: "/images/gw-port-abhi24.jpg",
    text: "Secure, interoperable hospital management for better patient care."
  },
  {
    tag: "Enterprise",
    title: "Admin Dashboards",
    image: "/images/gw-govt-0.jpg",
    text: "Real-time insights and centralised data for informed decisions."
  }
];

export const govtProjects = [
  {
    title: "Digital Door Number",
    tag: "E-Governance · Andhra Pradesh",
    image: "/images/gw-govt-0.jpg",
    text: "A QR-based addressing system giving every property in 123 urban bodies a unique digital identity."
  },
  {
    title: "DTCP ERP",
    tag: "Town & Country Planning",
    image: "/images/gw-govt-1.jpg",
    text: "One platform for permissions, layouts, GIS and citizen services across 21 Urban Development Authorities."
  },
  {
    title: "APSCSCL Command Centre",
    tag: "Civil Supplies Corporation",
    image: "/images/gw-govt-3.jpg",
    text: "Unified command and monitoring with real-time KPIs and actionable insights."
  },
  {
    title: "APSFL BSS",
    tag: "AP State FiberNet",
    image: "/images/gw-govt-4.jpg",
    text: "Business support system for Internet, IPTV and Voice — dashboard, agent app and middleware."
  },
  {
    title: "PuraMithra Municipal ERP",
    tag: "Urban & Rural Local Bodies",
    image: "/images/gw-govt-2.jpg",
    text: "Revenue, permissions, finance, works and GIS in one transparent, connected system."
  },
  {
    title: "Abhi24",
    tag: "Food & Meat Delivery",
    image: "/images/gw-port-abhi24.jpg",
    text: "Customer app, admin dashboard and website for daily essentials, delivered delightfully.",
    link: "https://abhi24.in/"
  }
];

export const portfolioProjects = [
  {
    name: "Yoloo",
    type: "Fashion & Clothing App",
    cat: "E-commerce",
    logo: "/images/gw-client-50.png",
    image: "/images/gw-govt-0.jpg",
    link: "https://yoloo.shop/",
    accent: "from-pink-500/20 via-sea/20 to-ocean-deep",
    desc: "Full-scale fashion e-commerce application with dynamic catalogs and checkout."
  },
  {
    name: "Fresho Zapcart",
    type: "Food & Grocery Superstore",
    cat: "Food",
    logo: "/images/gw-client-58.png",
    image: "/images/gw-port-abhi24.jpg",
    accent: "from-emerald-500/20 via-mint/20 to-ocean-deep",
    desc: "Hyperlocal grocery ordering engine with real-time stock and routing."
  },
  {
    name: "Abhi24",
    type: "Food & Fresh Meat Delivery",
    cat: "Food",
    logo: "/images/gw-client-11.png",
    image: "/images/gw-port-abhi24.jpg",
    link: "https://abhi24.in/",
    accent: "from-amber-500/20 via-ember/20 to-ocean-deep",
    desc: "Customer app, admin operations and delivery fleet management."
  },
  {
    name: "Wedzing",
    type: "Catering & Food Delivery",
    cat: "Food",
    logo: "/images/gw-client-53.png",
    image: "/images/gw-govt-1.jpg",
    link: "https://wedzing.in/",
    accent: "from-rose-500/20 via-sea/20 to-ocean-deep",
    desc: "Events and on-demand dining platform with custom catering schedules."
  },
  {
    name: "Intlo Kitchen",
    type: "Home-Cooked Food Delivery",
    cat: "Food",
    logo: "/images/gw-client-31.png",
    image: "/images/gw-govt-2.jpg",
    link: "https://intlokitchen.com/",
    accent: "from-orange-500/20 via-mint/20 to-ocean-deep",
    desc: "Authentic homemade meals marketplace connecting local home chefs."
  },
  {
    name: "Varadhi",
    type: "Express Food Delivery",
    cat: "Food",
    logo: "/images/gw-client-40.png",
    image: "/images/gw-govt-3.jpg",
    link: "https://varadhifood.com/",
    accent: "from-red-500/20 via-ember/20 to-ocean-deep",
    desc: "Fast delivery network platform with live order tracker."
  },
  {
    name: "MeLocal",
    type: "Hyperlocal Food & Groceries",
    cat: "Food",
    logo: "/images/gw-client-45.png",
    image: "/images/gw-govt-4.jpg",
    link: "https://melocalapp.com/",
    accent: "from-cyan-500/20 via-sea/20 to-ocean-deep",
    desc: "Neighborhood commerce app connecting local stores to doorstep deliveries."
  },
  {
    name: "Quickee",
    type: "Instant Essentials Delivery",
    cat: "Food",
    logo: "/images/gw-client-8.png",
    image: "/images/gw-govt-0.jpg",
    link: "https://quickiee.in/",
    accent: "from-yellow-500/20 via-mint/20 to-ocean-deep",
    desc: "Under-30-minute quick commerce ordering and dispatch system."
  },
  {
    name: "Cabrastey",
    type: "Outstation & City Taxi",
    cat: "Mobility",
    logo: "/images/gw-client-59.png",
    image: "/images/gw-govt-1.jpg",
    link: "https://cabrastey.com/",
    accent: "from-blue-500/20 via-sea/20 to-ocean-deep",
    desc: "City cabs, outstation rides and fleet tracking with instant driver matching."
  },
  {
    name: "Zig Zag",
    type: "On-Demand Bike Taxi",
    cat: "Mobility",
    logo: "/images/gw-client-52.png",
    image: "/images/gw-govt-2.jpg",
    link: "https://zigzakapp.com/",
    accent: "from-amber-500/20 via-mint/20 to-ocean-deep",
    desc: "Rapid urban mobility with live GPS ride tracking and zero surge fees."
  },
  {
    name: "Manasavari",
    type: "Ride-Hailing & Rentals",
    cat: "Mobility",
    logo: "/images/gw-client-35.png",
    image: "/images/gw-govt-3.jpg",
    link: "https://manasavari.com/",
    accent: "from-sky-500/20 via-sea/20 to-ocean-deep",
    desc: "Regional ride-hailing platform engineered for Andhra Pradesh travel routes."
  },
  {
    name: "Nagzo",
    type: "Bike & Taxi Dispatch",
    cat: "Mobility",
    logo: "/images/gw-client-30.png",
    image: "/images/gw-govt-4.jpg",
    link: "https://nagzo.in/",
    accent: "from-teal-500/20 via-mint/20 to-ocean-deep",
    desc: "Automated ride dispatch and driver incentive management platform."
  },
  {
    name: "Hospital Management",
    type: "Multi-Speciality Hospital ERP",
    cat: "Dashboards",
    image: "/images/gw-govt-1.jpg",
    accent: "from-indigo-500/20 via-sea/20 to-ocean-deep",
    desc: "Patient records, doctor scheduling, pharmacy and billing in unified dashboard."
  },
  {
    name: "Truedoit",
    type: "Enterprise Telemetry Dashboard",
    cat: "Dashboards",
    image: "/images/gw-govt-4.jpg",
    accent: "from-purple-500/20 via-sea/20 to-ocean-deep",
    desc: "Real-time systems monitoring, audit logs and KPI reporting suites."
  },
  {
    name: "Complete Digital Marketing",
    type: "SEO · Creatives · Video Campaigns",
    cat: "Marketing",
    image: "/images/d19c307e08d3240f7f34ddd04756bfe9_1794307592007.png",
    accent: "from-rose-500/20 via-ember/20 to-ocean-deep",
    desc: "End-to-end multi-channel marketing campaigns, brand identity and video production."
  }
];

export const clientLogos = [
  { name: "Abhi24", industry: "Food & meat delivery", logo: "/images/gw-client-11.png" },
  { name: "TipTop", industry: "Retail commerce", logo: "/images/gw-client-151.png" },
  { name: "Sports Connectz", industry: "Sports marketplace", logo: "/images/gw-client-27.png" },
  { name: "Auto Wala", industry: "Mobility", logo: "/images/gw-client-30.png" },
  { name: "Intlo Kitchen", industry: "Food delivery", logo: "/images/gw-client-31.png" },
  { name: "Local Daddy", industry: "Hyperlocal delivery", logo: "/images/gw-client-33.png" },
  { name: "Mana Savari", industry: "Ride-hailing", logo: "/images/gw-client-35.png" },
  { name: "Food Trail", industry: "Food delivery", logo: "/images/gw-client-40.png" },
  { name: "MeLocal", industry: "Food & grocery", logo: "/images/gw-client-45.png" },
  { name: "DIY Drive", industry: "Self-drive platform", logo: "/images/gw-client-46.png" },
  { name: "Yoloo", industry: "Fashion e-commerce", logo: "/images/gw-client-50.png" },
  { name: "Ghum Pher", industry: "Bike & taxi", logo: "/images/gw-client-52.png" },
  { name: "Wedzing", industry: "Food delivery", logo: "/images/gw-client-53.png" },
  { name: "Fresho Zapcart", industry: "Food & grocery", logo: "/images/gw-client-58.png" },
  { name: "Cabrastey", industry: "Taxi services", logo: "/images/gw-client-59.png" },
  { name: "Zapyee", industry: "Food & grocery", logo: "/images/gw-client-62.png" },
  { name: "RareYouWear", industry: "Menswear e-commerce", logo: "/images/gw-client-63.png" },
  { name: "Zeengi", industry: "Delivery", logo: "/images/gw-client-8.png" },
  { name: "Home Studio", industry: "Interiors · Marketing", logo: "/images/gw-dm-1.png" },
  { name: "Subhadra Hospital", industry: "Healthcare · Marketing", logo: "/images/gw-dm-10.png" },
  { name: "Universal Cancer Centre", industry: "Healthcare · Marketing", logo: "/images/gw-dm-11.png" },
  { name: "Tri-O-Dent", industry: "Dental care · Marketing", logo: "/images/gw-dm-12.png" },
  { name: "Solar Tech", industry: "Energy · Marketing", logo: "/images/gw-dm-2.png" },
  { name: "Anand Sweets", industry: "Food retail · Marketing", logo: "/images/gw-dm-3.png" },
  { name: "City Computer", industry: "IT retail · Marketing", logo: "/images/gw-dm-4.png" },
  { name: "Ankura School", industry: "Education · Marketing", logo: "/images/gw-dm-5.png" },
  { name: "Kusumaa Hospital", industry: "Healthcare · Marketing", logo: "/images/gw-dm-6.png" },
  { name: "Neubaby", industry: "Baby care · Marketing", logo: "/images/gw-dm-7.png" },
  { name: "SDR Ventures", industry: "Real estate · Marketing", logo: "/images/gw-dm-8.png" },
  { name: "Sri Shakti Hospital", industry: "Healthcare · Marketing", logo: "/images/gw-dm-9.png" }
];

export const techStack = [
  {
    id: "web",
    name: "Web & Mobile",
    skills: ["React", "Next.js", "Node", "Vue.js", "Angular", "Laravel", "Ionic", "React Native", "Swift"],
    projects: "Stores, portals, delivery & ride apps",
    experience: "Full product lifecycle, web to app store"
  },
  {
    id: "ai",
    name: "AI",
    skills: ["AI Agents", "Chatbots", "Generative AI", "MCP Integration", "LangChain / LangGraph", "Python FastAPI", "Claude"],
    projects: "Assistants, automation, intelligent search",
    experience: "Production AI woven into real workflows"
  },
  {
    id: "data",
    name: "Databases",
    skills: ["MySQL", "PostgreSQL", "MongoDB", "Redis", "DynamoDB", "SQLite", "MS SQL", "Pinecone", "Supabase"],
    projects: "ERPs, dashboards, real-time systems",
    experience: "Relational, NoSQL and vector data at scale"
  },
  {
    id: "cloud",
    name: "Cloud & DevOps",
    skills: ["AWS", "Azure", "Docker", "CI/CD Pipelines", "cPanel"],
    projects: "Government platforms, hosting, monitoring",
    experience: "Secure deployments with 24/7 monitoring"
  },
  {
    id: "design",
    name: "UI/UX & Creative",
    skills: ["Figma", "Adobe XD", "Sketch", "Photoshop", "Illustrator", "After Effects", "Premiere Pro", "InDesign", "Canva"],
    projects: "Product UI, brand identity, video",
    experience: "Design systems from wireframe to motion"
  },
  {
    id: "tools",
    name: "Tools",
    skills: ["Git", "GitHub", "Bitbucket", "Jira"],
    projects: "Every engagement, every sprint",
    experience: "Transparent, versioned, tracked delivery"
  }
];

export const milestones = [
  {
    label: "2024",
    title: "Born on the Godavari",
    text: "Founded in Rajahmundry to make digital transformation affordable, accessible and impactful for every enterprise."
  },
  {
    label: "2026",
    title: "Hyderabad Innovation Hub",
    text: "Expanded to Hyderabad's high-tech corridor at Meenakshi Tech Park, Gachibowli — scaling advanced AI, mobile and cloud solutions globally."
  },
  {
    label: "Reach",
    title: "Four Strategic Branches",
    text: "Rajahmundry (Global HQ), Hyderabad (2026 Innovation Hub), Visakhapatnam, and Vijayawada — always close to our clients."
  },
  {
    label: "Scale",
    title: "State-wide platforms",
    text: "Mission-critical e-governance systems serving Andhra Pradesh's urban bodies, municipal ERPs, and civil corporations."
  },
  {
    label: "Trust",
    title: "480+ clients",
    text: "Commerce, mobility, healthcare and government partners across industries and geographies."
  },
  {
    label: "Future",
    title: "Worldwide impact powered by AI",
    text: "Engineering autonomous AI agents, enterprise cloud systems, and intelligent digital experiences for global clients."
  }
];

export const processSteps = [
  { title: "Idea", text: "We listen to your vision, define goals and align expectations from day one." },
  { title: "Research", text: "Market, users and technology — we map the fastest path to real value." },
  { title: "Design", text: "Intuitive interfaces and architecture, prototyped before a line of code." },
  { title: "Development", text: "Creative and technical teams build a powerful, tailored solution." },
  { title: "Testing", text: "Every element rigorously tested for performance, security and experience." },
  { title: "Deployment", text: "A smooth, zero-disruption launch into the real world." },
  { title: "Support", text: "Updates, security checks and enhancements keep you at peak performance." }
];

export const comparisonMetrics = [
  { metric: "Performance", trad: 42, gw: 94, tradText: "Template builds, heavy pages", gwText: "Optimised, high-performance builds" },
  { metric: "Security", trad: 48, gw: 92, tradText: "Patched after problems", gwText: "Security checks at every stage" },
  { metric: "Innovation", trad: 35, gw: 90, tradText: "Yesterday's stack", gwText: "Modern frameworks & cloud-native" },
  { metric: "AI", trad: 15, gw: 88, tradText: "Bolted on, if at all", gwText: "Agents, chatbots & generative AI built in" },
  { metric: "Support", trad: 40, gw: 95, tradText: "Ends at handover", gwText: "24/7 monitoring & ongoing care" },
  { metric: "Delivery", trad: 38, gw: 91, tradText: "Slow, opaque timelines", gwText: "Faster to market, without compromise" }
];

export const testimonials = [
  {
    quote: "They turned our idea into a delivery app our customers use every single day. Fast, reliable, and always available when we need them.",
    name: "Founder",
    company: "Food delivery startup"
  },
  {
    quote: "From the admin dashboard to the customer app, everything felt considered. Our operations run smoother than ever.",
    name: "Operations Head",
    company: "Mobility platform"
  },
  {
    quote: "Their marketing team grew our reach across the region while the dev team rebuilt our website. One partner, real results.",
    name: "Managing Director",
    company: "Healthcare group"
  }
];

export const offices = [
  {
    city: "Hyderabad",
    hq: false,
    tag: "Strategic Innovation Hub",
    address: "Meenakshi Tech Park, Gachibowli, Hyderabad, Telangana 500032",
    phone: "+91 7799 822 121",
    x: 28,
    y: 28,
    map: "https://www.bing.com/maps/directions?ty=0&v=2&sV=1&rtp=%7Epos.17.44371795654297_78.36994171142578__Meenakshi%2520Tech%2520Park_&cp=17.443718%7E78.369942&lvl=16&style=r"
  },
  {
    city: "Rajahmundry",
    hq: true,
    tag: "Global Headquarters",
    address: "3rd Floor, BVR Enclave, Above Yamaha Showroom, Morampudi, Rajamahendravaram, AP 533103",
    phone: "+91 7799 822 811 · +91 8688 883 323",
    x: 60,
    y: 44,
    map: "https://maps.app.goo.gl/9SFKGCzoofzQZzAd6"
  },
  {
    city: "Visakhapatnam",
    hq: false,
    tag: "Regional Technology Hub",
    address: "KP ICON, opp. MK Gold Coast, Yendada, Visakhapatnam, Andhra Pradesh",
    phone: "+91 81216 72244",
    x: 78,
    y: 26,
    map: "https://www.google.com/maps/search/?api=1&query=KP+ICON+Yendada+Visakhapatnam"
  },
  {
    city: "Vijayawada",
    hq: false,
    tag: "Enterprise Consulting Branch",
    address: "Vijayawada, Andhra Pradesh",
    phone: "+91 7799 822 811",
    x: 50,
    y: 56,
    map: "https://www.google.com/maps/search/?api=1&query=Vijayawada+Andhra+Pradesh"
  }
];

export interface CareerPosition {
  id: string;
  title: string;
  category: 'Software' | 'Marketing' | 'Social Media' | 'Sales' | 'HR';
  level: 'Fresher' | 'Experienced';
  experience: string;
  location: string;
  type: string;
  openings: number;
  highlight: string;
  description: string;
  responsibilities: string[];
  skills: string[];
  perks: string[];
}

export const hrContact = {
  name: "Renusri",
  role: "Talent Acquisition & HR Lead",
  email: "hrhydgodavariwavetech@gmail.com",
  phone: "+91 7799 822 121",
  phoneRaw: "7799822121",
  whatsappUrl: "https://wa.me/917799822121",
  location: "Meenakshi Tech Park, Gachibowli, Hyderabad, Telangana 500032",
  hours: "Mon – Sat · 9:30 AM – 6:30 PM",
  responseNote: "Applications reviewed directly by HR Renusri within 24 hours."
};

export const careersPositions: CareerPosition[] = [
  // 1. SOFTWARE DEVELOPER (FRESHER)
  {
    id: "software-dev-fresher",
    title: "Software Developer",
    category: "Software",
    level: "Fresher",
    experience: "0 – 1 Years (2024–2026 Batch Graduates)",
    location: "Hyderabad (Meenakshi Tech Park, Gachibowli)",
    type: "Full-Time · On-site",
    openings: 4,
    highlight: "Mentorship & Hands-on Production Code",
    description: "Launch your engineering career at Godavari Wave Technologies. Work directly alongside senior architects to build modern web and mobile applications for enterprise clients.",
    responsibilities: [
      "Develop responsive user interfaces using React, TypeScript, and modern CSS/Tailwind",
      "Write clean, maintainable backend services and RESTful APIs using Node.js or Python",
      "Collaborate with senior developers on database schema design, debugging, and code reviews",
      "Participate in daily engineering standups and sprint planning sessions"
    ],
    skills: ["React", "JavaScript / TypeScript", "HTML5 & CSS3", "Node.js or Python basics", "Git / GitHub", "Problem Solving"],
    perks: ["Structured 1-on-1 mentorship", "Real enterprise project experience", "Fast-track performance appraisal", "Modern Gachibowli tech campus"]
  },
  // 2. SOFTWARE DEVELOPER (EXPERIENCED)
  {
    id: "software-dev-exp",
    title: "Senior Software Developer",
    category: "Software",
    level: "Experienced",
    experience: "2 – 6+ Years",
    location: "Hyderabad (Meenakshi Tech Park, Gachibowli)",
    type: "Full-Time · On-site / Hybrid",
    openings: 3,
    highlight: "Lead Architecture & High-Impact Systems",
    description: "Architect and scale high-throughput digital platforms, cloud backends, and AI-powered interfaces for enterprise clients across healthcare, e-governance, and e-commerce.",
    responsibilities: [
      "Lead technical architecture design for full-stack web and cloud applications",
      "Build high-performance microservices, GraphQL / REST APIs, and database models (PostgreSQL, MongoDB)",
      "Oversee code reviews, CI/CD pipelines, and cloud deployments on AWS / GCP",
      "Mentor junior engineers and drive engineering excellence across project teams"
    ],
    skills: ["React / Next.js", "TypeScript", "Node.js / Express", "Python / FastAPI", "PostgreSQL / MongoDB", "Docker & AWS", "System Design"],
    perks: ["Competitive industry compensation", "Leadership & tech decision autonomy", "Flexible project delivery model", "Annual performance bonuses"]
  },
  // 3. DIGITAL MARKETING (FRESHER)
  {
    id: "digital-marketing-fresher",
    title: "Digital Marketing Specialist",
    category: "Marketing",
    level: "Fresher",
    experience: "0 – 1 Years (Freshers Welcome)",
    location: "Hyderabad (Meenakshi Tech Park, Gachibowli)",
    type: "Full-Time · On-site",
    openings: 3,
    highlight: "Learn Multi-Channel Growth Marketing",
    description: "Join our dynamic digital marketing division handling 350+ corporate clients. Learn search engine optimization, paid ad campaigns, social media strategy, and conversion analytics.",
    responsibilities: [
      "Assist in running organic campaigns across LinkedIn, Instagram, and search platforms",
      "Conduct keyword research, on-page SEO audits, and content optimization for client websites",
      "Draft engaging marketing copy, ad headlines, and campaign creative briefs",
      "Track daily campaign analytics and prepare client performance reports"
    ],
    skills: ["Search Engine Optimization (SEO)", "Google Ads Basics", "Content Marketing", "Canva / Design Basics", "Google Analytics Basics", "Creative Communication"],
    perks: ["Certification allowances (Google / Meta)", "Exposure to 350+ brand accounts", "Accelerated promotion pathways", "Energetic creative team culture"]
  },
  // 4. DIGITAL MARKETING (EXPERIENCED)
  {
    id: "digital-marketing-exp",
    title: "Digital Marketing Lead / Strategist",
    category: "Marketing",
    level: "Experienced",
    experience: "2 – 5+ Years",
    location: "Hyderabad (Meenakshi Tech Park, Gachibowli)",
    type: "Full-Time · On-site",
    openings: 2,
    highlight: "Drive ROI & Large-Budget Campaigns",
    description: "Take command of end-to-end digital growth strategies for high-value enterprise accounts. Manage performance marketing funnels across Meta Ads, Google Ads, programmatic networks, and advanced SEO.",
    responsibilities: [
      "Plan and execute high-ROI paid ad funnels on Meta Ads Manager and Google Ads (PPC, Display, YouTube)",
      "Formulate technical and content SEO roadmaps to achieve page-one organic rankings",
      "Analyze full-funnel conversion metrics (CPA, ROAS, LTV) and deliver weekly client growth reviews",
      "Manage and guide a team of content creators, SEO executives, and graphic designers"
    ],
    skills: ["Meta Ads Manager (ROAS Focus)", "Google Ads & Search Console", "Advanced SEO & SEM", "Conversion Rate Optimization (CRO)", "Client Strategy", "Team Leadership"],
    perks: ["Lucrative campaign performance incentives", "Direct enterprise client engagement", "Authority over ad budgets & creative direction", "Executive career progression"]
  },
  // 5. SALES EXECUTIVE (FRESHER)
  {
    id: "sales-executive-fresher",
    title: "Business Development / Sales Executive",
    category: "Sales",
    level: "Fresher",
    experience: "0 – 1 Years (Dynamic Communicators)",
    location: "Hyderabad (Meenakshi Tech Park, Gachibowli)",
    type: "Full-Time · On-site",
    openings: 4,
    highlight: "High Incentives & Corporate IT Exposure",
    description: "Step into the fast-paced world of technology solutions sales. Identify potential business clients needing custom software, mobile apps, or digital marketing, and arrange high-level discovery calls.",
    responsibilities: [
      "Research target industry segments (B2B, retail, healthcare, real estate) and generate qualified leads",
      "Reach out to decision-makers via phone, email, and LinkedIn to introduce Godavari Wave services",
      "Coordinate with technical solution teams to prepare client discovery meetings",
      "Maintain active prospect pipelines in CRM and assist in closing new accounts"
    ],
    skills: ["Fluent English & Telugu / Hindi", "Persuasive Presentation", "Active Listening", "Cold Calling & Email Outreach", "Relationship Building", "Resilience & Drive"],
    perks: ["Generous uncapped monthly sales incentives", "Intensive corporate sales training", "Direct mentorship under executive management", "Rapid path to Account Manager"]
  },
  // 6. SALES EXECUTIVE (EXPERIENCED)
  {
    id: "sales-executive-exp",
    title: "Senior Enterprise Sales Executive",
    category: "Sales",
    level: "Experienced",
    experience: "2 – 5+ Years (IT / Software Sales)",
    location: "Hyderabad (Meenakshi Tech Park, Gachibowli)",
    type: "Full-Time · On-site",
    openings: 2,
    highlight: "High-Ticket Enterprise Deals & Top Commission",
    description: "Drive high-ticket enterprise IT solution deals, software outsourcing contracts, and multi-year digital transformation partnerships for Godavari Wave Technologies across India and overseas.",
    responsibilities: [
      "Own the entire B2B enterprise sales cycle from prospecting to negotiation and contract signing",
      "Present high-level software, cloud, and digital engineering proposals to CXOs and business directors",
      "Collaborate with engineering heads to formulate customized RFP responses and technical estimates",
      "Build long-term enterprise client relationships and drive repeat account expansions"
    ],
    skills: ["B2B Enterprise IT Sales", "Deal Structuring & Contract Closing", "C-Level Executive Pitching", "CRM Pipeline Mastery", "Market Research & RFP Responses", "Negotiation"],
    perks: ["Industry-leading base pay + top-tier commission structure", "High-visibility role reporting to direct leadership", "Travel allowances & executive allowances", "Quarterly achievement bonuses"]
  },
  // 7. SOCIAL MEDIA MANAGEMENT (FRESHER)
  {
    id: "social-media-fresher",
    title: "Social Media Executive / Content Creator",
    category: "Social Media",
    level: "Fresher",
    experience: "0 – 1 Years (Creative Storytellers)",
    location: "Hyderabad (Meenakshi Tech Park, Gachibowli)",
    type: "Full-Time · On-site",
    openings: 3,
    highlight: "Viral Storytelling & Brand Creative Control",
    description: "Create buzzworthy reels, carousels, stories, and social campaigns for leading tech and lifestyle brands. Curate viral trends, engage communities, and build vibrant digital brand identities.",
    responsibilities: [
      "Create high-engagement reels, short videos, and visual carousels for Instagram, LinkedIn, and YouTube Shorts",
      "Draft catchy hooks, captions, and hashtag strategies tailored to each brand's voice",
      "Monitor social conversations, reply to direct messages, and foster active community growth",
      "Track viral trends, memes, and content formats to keep brand feeds fresh and ahead of the curve"
    ],
    skills: ["Reels & Video Creation (CapCut / Premiere)", "Canva / Figma Basics", "Copywriting & Storytelling", "Instagram & LinkedIn Algorithms", "Trend Spotting", "Community Engagement"],
    perks: ["Access to studio equipment & creative tools", "Portfolio building across 50+ diverse brand niches", "Collaborative creator environment", "Performance-based creative bonuses"]
  },
  // 8. SOCIAL MEDIA MANAGEMENT (EXPERIENCED)
  {
    id: "social-media-exp",
    title: "Senior Social Media Strategist & Brand Lead",
    category: "Social Media",
    level: "Experienced",
    experience: "2 – 5+ Years (Agency / Brand Experience)",
    location: "Hyderabad (Meenakshi Tech Park, Gachibowli)",
    type: "Full-Time · On-site",
    openings: 2,
    highlight: "Lead Omni-Channel Social Brand Strategy",
    description: "Head end-to-end social media growth, influencer collaborations, and organic engagement strategies for corporate enterprises and consumer apps managed by Godavari Wave Technologies.",
    responsibilities: [
      "Architect monthly editorial calendars, visual guidelines, and multi-channel content roadmaps",
      "Lead creative brainstorming sessions with designers, copywriters, and video animators",
      "Oversee influencer outreach, podcast partnerships, and co-branded brand activation campaigns",
      "Analyze audience demographic shifts, sentiment analytics, and engagement velocity to optimize strategy"
    ],
    skills: ["Omni-Channel Social Strategy", "Content Direction & Team Leadership", "Influencer Campaign Management", "Social Analytics (Sprout / Hootsuite)", "Brand Narrative Development", "Viral Video Direction"],
    perks: ["Leadership over high-growth brand accounts", "Freedom to experiment with bold creative concepts", "Executive compensation & incentives", "Direct visibility with founding leaders"]
  },
  // 9. HR - HUMAN RESOURCES (FRESHER)
  {
    id: "hr-executive-fresher",
    title: "HR Trainee / Junior Talent Acquisition",
    category: "HR",
    level: "Fresher",
    experience: "0 – 1 Years (MBA / BBA HR or Equivalent)",
    location: "Hyderabad (Meenakshi Tech Park, Gachibowli)",
    type: "Full-Time · On-site",
    openings: 2,
    highlight: "Work Directly With HR Lead Renusri",
    description: "Kickstart your HR career in a rapid-growth tech enterprise. Work closely with Talent Acquisition Lead Renusri to source exceptional tech candidates, coordinate interviews, and support employee onboarding.",
    responsibilities: [
      "Screen candidate resumes across job portals (Naukri, LinkedIn, Indeed) and campus recruitment drives",
      "Coordinate interview schedules between candidates and engineering hiring managers",
      "Assist in new joinee onboarding documentation, asset allocation, and orientation workflows",
      "Support internal culture events, team-building activities, and employee engagement drives"
    ],
    skills: ["Candidate Sourcing & Screening", "Interview Coordination", "Warm & Professional Communication", "HR Documentation Basics", "MS Excel & Google Workspace", "Interpersonal Empathy"],
    perks: ["Direct mentorship under HR Lead Renusri", "Exposure to end-to-end tech recruitment cycles", "Fast-track promotion to Talent Acquisition Specialist", "Vibrant company culture"]
  },
  // 10. HR - HUMAN RESOURCES (EXPERIENCED)
  {
    id: "hr-specialist-exp",
    title: "HR Specialist & People Operations Lead",
    category: "HR",
    level: "Experienced",
    experience: "2 – 5+ Years (IT Recruitment / HR Operations)",
    location: "Hyderabad (Meenakshi Tech Park, Gachibowli)",
    type: "Full-Time · On-site",
    openings: 2,
    highlight: "Lead Talent Acquisition & People Operations",
    description: "Partner with company leadership to spearhead strategic hiring for senior engineering, marketing, and sales talent. Manage end-to-end employee lifecycle, performance appraisals, and HR policies.",
    responsibilities: [
      "Manage full-cycle technical recruiting for niche IT roles, cloud developers, and executive leaders",
      "Design employee engagement programs, performance review cycles, and retention initiatives",
      "Ensure HR statutory compliance, offer letter generation, background checks, and payroll coordination",
      "Partner with leadership to shape an inclusive, high-performance company culture across all 4 branches"
    ],
    skills: ["Technical Recruitment & Headhunting", "Employee Relations & Grievance Handling", "HR Policies & Labour Compliance", "Performance Appraisal Systems", "HRMS & ATS Tools", "Strategic People Management"],
    perks: ["Senior leadership position with strategic impact", "Competitive compensation package", "Autonomous role driving organizational culture", "Annual leadership incentives"]
  }
];

export const navLinks = [
  { to: "#services", label: "Services" },
  { to: "#about", label: "About" },
  { to: "#solutions", label: "Solutions" },
  { to: "#portfolio", label: "Portfolio" },
  { to: "#careers", label: "Careers" },
  { to: "#contact", label: "Contact" }
];
