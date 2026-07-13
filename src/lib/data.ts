import {
  Activity,
  AlertTriangle,
  BarChart3,
  Building2,
  Camera,
  Car,
  Factory,
  Gauge,
  HardHat,
  Lock,
  Map,
  MapPinned,
  PackageCheck,
  ParkingCircle,
  RadioTower,
  Route,
  ScanLine,
  ShieldCheck,
  Store,
  Truck,
  Users,
  Warehouse,
  type LucideIcon
} from "lucide-react";

export type NavItem = { label: string; href: string; description?: string };
export type NavGroup = { label: string; href: string; items: NavItem[] };
export type DetailPage = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  metaDescription: string;
  icon: LucideIcon;
  points: string[];
  useCases: string[];
};
export type Article = {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  readTime: string;
  body: string[];
};

export const navGroups: NavGroup[] = [
  {
    label: "Platform",
    href: "/platform",
    items: [
      { label: "Platform Overview", href: "/platform" },
      { label: "Live Monitoring", href: "/platform/live-monitoring" },
      { label: "Detection and Tracking", href: "/platform/detection-tracking" },
      { label: "Alerts and Incidents", href: "/platform/alerts-incidents" },
      { label: "Analytics", href: "/platform/analytics" },
      { label: "Multi-Site Monitoring", href: "/platform/multi-site-monitoring" }
    ]
  },
  {
    label: "Capabilities",
    href: "/capabilities",
    items: [
      { label: "Object Detection", href: "/capabilities/object-detection" },
      { label: "Movement Tracking", href: "/capabilities/movement-tracking" },
      { label: "Zone Monitoring", href: "/capabilities/zone-monitoring" },
      { label: "Safety Monitoring", href: "/capabilities/safety-monitoring" },
      { label: "Occupancy Analytics", href: "/capabilities/occupancy-analytics" },
      { label: "Vehicle Intelligence", href: "/capabilities/vehicle-intelligence" }
    ]
  },
  {
    label: "Industries",
    href: "/industries",
    items: [
      { label: "Manufacturing", href: "/industries/manufacturing" },
      { label: "Offices and Commercial Buildings", href: "/industries/offices-commercial-buildings" },
      { label: "Warehousing and Logistics", href: "/industries/warehousing-logistics" },
      { label: "Textile Manufacturing", href: "/industries/textile-manufacturing" },
      { label: "Retail", href: "/industries/retail" },
      { label: "Traffic and Transportation", href: "/industries/traffic-transportation" }
    ]
  },
  {
    label: "Solutions",
    href: "/solutions",
    items: [
      { label: "Safety and Compliance", href: "/solutions/safety-compliance" },
      { label: "Security Monitoring", href: "/solutions/security-monitoring" },
      { label: "Operational Visibility", href: "/solutions/operational-visibility" },
      { label: "Facility Intelligence", href: "/solutions/facility-intelligence" },
      { label: "Traffic and Parking", href: "/solutions/traffic-parking" }
    ]
  },
  {
    label: "Insights",
    href: "/insights",
    items: [
      { label: "Insights", href: "/insights" },
      { label: "Case Studies", href: "/case-studies" }
    ]
  },
  {
    label: "Company",
    href: "/company",
    items: [
      { label: "About", href: "/company/about" },
      { label: "Contact", href: "/company/contact" },
      { label: "Careers", href: "/company/careers" }
    ]
  }
];

export const platformPages: DetailPage[] = [
  {
    slug: "live-monitoring",
    title: "Live Monitoring",
    eyebrow: "Platform",
    description:
      "See your cameras, active alerts, and site status in one simple workspace — without staring at dozens of screens all day.",
    metaDescription:
      "Visrax live monitoring shows camera views, active alerts, site health, and operational status in one easy-to-use monitoring workspace.",
    icon: Camera,
    points: ["Multiple camera views", "Live alert list", "Site and camera status", "Filter by location"],
    useCases: ["Watch production floors", "Check entrances and exits", "See which sites need attention"]
  },
  {
    slug: "detection-tracking",
    title: "Detection and Tracking",
    eyebrow: "Platform",
    description:
      "Spot people, vehicles, and important activity as it happens — and follow movement through the areas you care about.",
    metaDescription:
      "Visrax detection and tracking spots people, vehicles, and important activity in real time and follows movement through your monitored areas.",
    icon: ScanLine,
    points: ["People and vehicle detection", "Movement paths", "Area boundaries", "Custom watch lists"],
    useCases: ["Track vehicles at gates", "Spot restricted entry", "Follow movement in high-risk areas"]
  },
  {
    slug: "alerts-incidents",
    title: "Alerts and Incidents",
    eyebrow: "Platform",
    description:
      "When something important happens, Visrax creates a clear alert with evidence, priority, ownership, and a full history your team can review.",
    metaDescription:
      "Visrax alerts and incidents turn detections into clear cases with camera evidence, priority levels, ownership, and resolution history.",
    icon: AlertTriangle,
    points: ["Custom alert rules", "Camera evidence attached", "Priority and status", "Assignment history"],
    useCases: ["Escalate safety issues", "Review after-hours activity", "Close cases with proof"]
  },
  {
    slug: "analytics",
    title: "Analytics",
    eyebrow: "Platform",
    description:
      "See trends over time — how busy areas get, how many alerts occur, how fast issues are closed, and how sites compare.",
    metaDescription:
      "Visrax analytics shows trends for busy areas, alert volume, response times, camera availability, and location performance.",
    icon: BarChart3,
    points: ["Event trends over time", "Busy-area reports", "Response and closure status", "Export to PDF or CSV"],
    useCases: ["Compare locations", "Review busy hours", "Focus on problem areas"]
  },
  {
    slug: "multi-site-monitoring",
    title: "Multi-Site Monitoring",
    eyebrow: "Platform",
    description:
      "Monitor offices, factories, warehouses, shops, parking areas, and remote sites from one place.",
    metaDescription:
      "Visrax multi-site monitoring gives one view across offices, factories, warehouses, branches, and remote facilities.",
    icon: MapPinned,
    points: ["Site list and hierarchy", "Camera availability", "Active alerts by site", "Organization-wide reports"],
    useCases: ["Manage multiple facilities", "Check site health", "Compare alert levels by location"]
  }
];

export const capabilityPages: DetailPage[] = [
  {
    slug: "object-detection",
    title: "Object Detection",
    eyebrow: "Capability",
    description: "See people, vehicles, equipment, and safety gear in real time — in the areas you choose to monitor.",
    metaDescription: "Visrax object detection spots people, vehicles, equipment, safety gear, and other important items using your existing cameras.",
    icon: ScanLine,
    points: ["People and vehicles", "Equipment and objects", "PPE presence", "Configurable classes"],
    useCases: ["Object appears in restricted space", "Vehicle detected at entrance", "PPE status visible in safety zones"]
  },
  {
    slug: "movement-tracking",
    title: "Movement Tracking",
    eyebrow: "Capability",
    description: "Follow how people, vehicles, and equipment move through your site — from entrance to exit.",
    metaDescription: "Visrax movement tracking follows people, vehicles, and equipment as they move through your monitored areas.",
    icon: Route,
    points: ["Tracking paths", "Direction of travel", "Dwell behavior", "Cross-zone activity"],
    useCases: ["Worker movement across a floor", "Vehicle path at a gate", "Visitor flow through reception"]
  },
  {
    slug: "zone-monitoring",
    title: "Zone Monitoring",
    eyebrow: "Capability",
    description: "Define restricted, hazardous, sensitive, or operational zones and monitor activity inside them.",
    metaDescription: "Visrax zone monitoring helps teams detect restricted-area entry, hazardous-zone activity, and sensitive-space events.",
    icon: Map,
    points: ["Restricted zones", "Hazard areas", "Sensitive spaces", "Operational boundaries"],
    useCases: ["Restricted entry", "Loading zone activity", "Sensitive room movement"]
  },
  {
    slug: "safety-monitoring",
    title: "Safety Monitoring",
    eyebrow: "Capability",
    description: "Monitor PPE, restricted zones, possible fire and smoke events, and worker-equipment proximity.",
    metaDescription: "Visrax safety monitoring supports PPE visibility, restricted zones, fire and smoke alerts, and forklift proximity monitoring.",
    icon: HardHat,
    points: ["PPE monitoring", "Fire and smoke event detection", "Forklift proximity", "Hazard-zone awareness"],
    useCases: ["PPE status in factory zones", "Possible smoke in utility area", "Forklift near-worker event"]
  },
  {
    slug: "security-monitoring",
    title: "Security Monitoring",
    eyebrow: "Capability",
    description: "Identify intrusion, after-hours activity, unauthorized access, perimeter events, and abandoned objects.",
    metaDescription: "Visrax security monitoring identifies intrusion, after-hours activity, unauthorized access, perimeter events, and abandoned objects.",
    icon: ShieldCheck,
    points: ["After-hours movement", "Perimeter monitoring", "Unauthorized access", "Abandoned object review"],
    useCases: ["Movement after closing", "Gate perimeter activity", "Restricted room entry"]
  },
  {
    slug: "occupancy-analytics",
    title: "Occupancy Analytics",
    eyebrow: "Capability",
    description: "Understand occupancy, queues, dwell time, crowd activity, movement patterns, and space utilization.",
    metaDescription: "Visrax occupancy analytics tracks occupancy, queues, dwell time, people flow, and space utilization across facilities.",
    icon: Users,
    points: ["Occupancy levels", "Queue monitoring", "Dwell time", "Space utilization"],
    useCases: ["Office occupancy review", "Retail queue buildup", "Crowd activity in shared areas"]
  },
  {
    slug: "vehicle-intelligence",
    title: "Vehicle Intelligence",
    eyebrow: "Capability",
    description: "Monitor entrances, exits, parking, traffic flow, loading areas, and vehicle activity around facilities.",
    metaDescription: "Visrax vehicle intelligence monitors vehicle movement, parking areas, loading zones, entrances, exits, and traffic patterns.",
    icon: Car,
    points: ["Vehicle tracking", "Entrance and exit flow", "Parking activity", "Loading area monitoring"],
    useCases: ["Traffic buildup at entrance", "Parking movement", "Vehicle activity near loading docks"]
  }
];

export const industryPages: DetailPage[] = [
  {
    slug: "manufacturing",
    title: "Manufacturing and Factories",
    eyebrow: "Industry",
    description: "Monitor production areas, safety events, equipment movement, restricted zones, and operational activity.",
    metaDescription: "Manufacturing computer vision from Visrax monitors safety, equipment movement, restricted zones, and factory operations.",
    icon: Factory,
    points: ["Production-floor visibility", "Safety-zone events", "Equipment movement", "Operational incident review"],
    useCases: ["Restricted production zones", "PPE activity", "Forklift and worker proximity"]
  },
  {
    slug: "offices-commercial-buildings",
    title: "Offices and Commercial Buildings",
    eyebrow: "Industry",
    description: "Understand occupancy, visitor flow, restricted spaces, after-hours movement, entrances, and facility usage.",
    metaDescription: "Visrax office occupancy analytics and commercial building video intelligence help monitor occupancy, entrances, and after-hours activity.",
    icon: Building2,
    points: ["Occupancy analytics", "Visitor movement", "After-hours activity", "Facility usage patterns"],
    useCases: ["Reception flow", "Restricted floor entry", "Occupancy by area"]
  },
  {
    slug: "warehousing-logistics",
    title: "Warehousing and Logistics",
    eyebrow: "Industry",
    description: "Monitor forklifts, loading areas, worker movement, vehicles, restricted zones, and operational flow.",
    metaDescription: "Warehouse video analytics from Visrax helps monitor forklifts, loading docks, worker movement, vehicles, and restricted areas.",
    icon: Warehouse,
    points: ["Forklift activity", "Loading dock visibility", "Worker movement", "Vehicle flow"],
    useCases: ["Forklift proximity", "Dock queue buildup", "Restricted storage access"]
  },
  {
    slug: "textile-manufacturing",
    title: "Textile Manufacturing",
    eyebrow: "Industry",
    description: "Monitor spinning, weaving, dyeing, finishing, packing, warehouses, utilities, entrances, and critical safety areas.",
    metaDescription: "Textile mill monitoring with Visrax supports safety, restricted zones, utility areas, entrances, warehouses, and production visibility.",
    icon: PackageCheck,
    points: ["Production area monitoring", "Utility and safety zones", "Packing and warehouse visibility", "Entrance activity"],
    useCases: ["Spinning floor activity", "Dyeing area safety", "Packing warehouse movement"]
  },
  {
    slug: "retail",
    title: "Retail and Shopping Centers",
    eyebrow: "Industry",
    description: "Understand queues, movement, occupancy, dwell time, restricted areas, and site operations.",
    metaDescription: "Retail video analytics from Visrax helps monitor queues, occupancy, dwell time, movement, restricted areas, and shopping center operations.",
    icon: Store,
    points: ["Queue monitoring", "Dwell-time analysis", "Occupancy patterns", "Restricted-area events"],
    useCases: ["Checkout queue buildup", "Entrance flow", "Back-of-house access"]
  },
  {
    slug: "construction",
    title: "Construction",
    eyebrow: "Industry",
    description: "Monitor site entrances, PPE visibility, hazardous zones, equipment activity, and after-hours movement.",
    metaDescription: "Visrax supports construction site monitoring for PPE visibility, equipment activity, hazardous zones, and after-hours movement.",
    icon: HardHat,
    points: ["PPE visibility", "Hazard-zone monitoring", "Equipment movement", "Perimeter activity"],
    useCases: ["After-hours movement", "Restricted crane area", "PPE status at entry"]
  },
  {
    slug: "healthcare",
    title: "Healthcare Facilities",
    eyebrow: "Industry",
    description: "Monitor entrances, sensitive areas, occupancy, queue behavior, and operational activity in healthcare environments.",
    metaDescription: "Visrax helps healthcare facilities monitor entrances, sensitive areas, occupancy, queues, and operational video events.",
    icon: Activity,
    points: ["Entrance activity", "Sensitive-space monitoring", "Queue awareness", "Occupancy review"],
    useCases: ["Visitor movement", "Restricted access areas", "Lobby occupancy"]
  },
  {
    slug: "education",
    title: "Educational Campuses",
    eyebrow: "Industry",
    description: "Improve visibility across entrances, common areas, parking, restricted spaces, and campus operations.",
    metaDescription: "Visrax campus video analytics supports entrances, common areas, parking, restricted spaces, and multi-building monitoring.",
    icon: Building2,
    points: ["Campus entrances", "Common-area activity", "Restricted spaces", "Parking flow"],
    useCases: ["Building entry", "After-hours movement", "Parking activity"]
  },
  {
    slug: "traffic-transportation",
    title: "Traffic and Transportation",
    eyebrow: "Industry",
    description: "Analyze vehicle movement, congestion, entrances, parking, lane activity, and traffic patterns.",
    metaDescription: "Traffic video analytics from Visrax monitors vehicle movement, congestion, parking, entrance flow, and lane activity.",
    icon: Truck,
    points: ["Vehicle movement", "Traffic buildup", "Parking activity", "Entrance and exit flow"],
    useCases: ["Lane congestion", "Parking entrance activity", "Vehicle tracking"]
  },
  {
    slug: "energy-utilities",
    title: "Energy and Utilities",
    eyebrow: "Industry",
    description: "Monitor remote facilities, hazardous spaces, perimeter activity, equipment zones, and critical operations.",
    metaDescription: "Visrax supports energy and utility site monitoring for perimeter activity, hazardous zones, equipment areas, and remote facilities.",
    icon: RadioTower,
    points: ["Remote site visibility", "Perimeter events", "Hazardous zones", "Equipment-area monitoring"],
    useCases: ["Utility area smoke event", "After-hours activity", "Restricted equipment zone"]
  },
  {
    slug: "security-critical-infrastructure",
    title: "Security and Critical Infrastructure",
    eyebrow: "Industry",
    description: "Support security operations with perimeter monitoring, intrusion events, restricted areas, and evidence workflows.",
    metaDescription: "Visrax helps security and critical infrastructure teams monitor perimeters, intrusion events, restricted areas, and incident evidence.",
    icon: Lock,
    points: ["Perimeter monitoring", "Intrusion detection", "Evidence workflows", "Site-level permissions"],
    useCases: ["Gate movement", "Perimeter activity", "Sensitive facility access"]
  }
];

export const solutionPages: DetailPage[] = [
  {
    slug: "safety-compliance",
    title: "Safety and Compliance",
    eyebrow: "Solution",
    description: "Monitor safety zones, PPE visibility, fire and smoke indicators, and worker-equipment proximity.",
    metaDescription: "Visrax safety and compliance monitoring supports PPE visibility, safety zones, fire and smoke events, and incident workflows.",
    icon: ShieldCheck,
    points: ["PPE visibility", "Restricted hazard zones", "Possible fire and smoke events", "Reviewable safety incidents"],
    useCases: ["PPE status", "Forklift proximity", "Safety-zone entry"]
  },
  {
    slug: "security-monitoring",
    title: "Security Monitoring",
    eyebrow: "Solution",
    description: "Detect intrusion, after-hours activity, perimeter events, unauthorized access, and abandoned objects.",
    metaDescription: "Visrax security monitoring helps detect intrusion, after-hours activity, unauthorized access, perimeter events, and abandoned objects.",
    icon: Lock,
    points: ["After-hours activity", "Perimeter events", "Unauthorized entry", "Evidence capture"],
    useCases: ["Commercial building after-hours movement", "Warehouse perimeter alert", "Restricted office access"]
  },
  {
    slug: "operational-visibility",
    title: "Operational Visibility",
    eyebrow: "Solution",
    description: "Give teams a live understanding of facility activity, events, site health, and operational trends.",
    metaDescription: "Visrax operational visibility connects camera alerts, reports, site health, and team workflows in one monitoring system.",
    icon: Gauge,
    points: ["Live event awareness", "Operational trends", "Site comparison", "Central reporting"],
    useCases: ["Factory events by shift", "Warehouse movement", "Office occupancy"]
  },
  {
    slug: "facility-intelligence",
    title: "Facility Intelligence",
    eyebrow: "Solution",
    description: "Understand occupancy, space use, visitor movement, restricted areas, and camera availability.",
    metaDescription: "Visrax facility intelligence monitors occupancy, space utilization, visitor movement, restricted areas, and camera health.",
    icon: Building2,
    points: ["Occupancy analytics", "Visitor flow", "Restricted spaces", "Camera health"],
    useCases: ["Office occupancy", "Commercial building entrances", "Campus common areas"]
  },
  {
    slug: "traffic-parking",
    title: "Traffic and Parking",
    eyebrow: "Solution",
    description: "Monitor vehicle movement, parking areas, entrance congestion, lane activity, and transport zones.",
    metaDescription: "Visrax traffic and parking analytics monitor vehicle movement, congestion, parking activity, entrances, and transport areas.",
    icon: ParkingCircle,
    points: ["Vehicle tracking", "Parking activity", "Traffic buildup", "Entrance flow"],
    useCases: ["Parking entrance queue", "Lane congestion", "Vehicle movement by area"]
  }
];

export const useCases = [
  "Someone enters a restricted area",
  "Person or vehicle detected",
  "Follow a person or vehicle",
  "Track vehicle movement",
  "Safety gear not worn",
  "Possible smoke or fire",
  "How many people in an area",
  "Queue getting too long",
  "People staying too long in one spot",
  "Large crowd forming",
  "Unwanted entry after hours",
  "Movement near the perimeter",
  "Activity when site is closed",
  "Forklift too close to people",
  "Traffic backing up",
  "Parking area activity",
  "Visitor movement",
  "Camera offline or faulty",
  "Unusual activity flagged"
];

export const insights: Article[] = [
  {
    slug: "existing-camera-analytics",
    title: "How existing cameras become an operational intelligence layer",
    description:
      "A practical look at turning compatible camera infrastructure into real-time events, alerts, evidence, and analytics.",
    category: "Platform",
    date: "2026-07-13",
    readTime: "5 min read",
    body: [
      "Most organizations already have cameras watching entrances, floors, yards, and shared spaces. The missing layer is not more screens. It is a system that translates visual activity into structured events teams can review and act on.",
      "Visrax is designed around that operational gap. Compatible camera feeds can be configured around zones, object classes, movement patterns, severity levels, and incident workflows.",
      "The result is a monitoring model where teams focus on relevant events, evidence, and trends rather than continuous manual observation."
    ]
  },
  {
    slug: "multi-site-video-monitoring",
    title: "What multi-site video monitoring needs beyond a camera wall",
    description:
      "Multi-location operations need health, incident volume, occupancy, and event context, not only live thumbnails.",
    category: "Operations",
    date: "2026-07-13",
    readTime: "4 min read",
    body: [
      "A wall of live feeds does not scale across offices, factories, warehouses, branches, and transport areas. Multi-site monitoring needs a hierarchy that makes the organization understandable.",
      "Teams need to see which sites have active events, which cameras are unavailable, where occupancy is changing, and which incidents require ownership.",
      "Visrax organizes visual intelligence around locations, zones, events, alerts, and analytics so distributed operations can be reviewed from one place."
    ]
  },
  {
    slug: "safety-security-operations",
    title: "Where safety, security, and operations meet in video analytics",
    description:
      "Restricted-area activity, PPE visibility, intrusion, occupancy, and vehicle movement often belong in the same operational workflow.",
    category: "Strategy",
    date: "2026-07-13",
    readTime: "6 min read",
    body: [
      "Computer vision programs are strongest when safety, security, and operations share a common event model. A restricted-zone entry may involve a safety team, a security team, or a facility manager depending on context.",
      "The useful output is a reviewable incident with visual evidence, severity, assignment, status, and reporting. That makes events auditable without exposing internal technical details to every stakeholder.",
      "Visrax keeps the public workflow simple: detect what matters, preserve context, alert the right team, and learn from trends over time."
    ]
  }
];

export const caseStudies: Article[] = [
  {
    slug: "manufacturing-safety-pilot",
    title: "Manufacturing safety pilot framework",
    description:
      "A sample rollout pattern for focused safety monitoring in a production environment using synthetic demo data.",
    category: "Sample Framework",
    date: "2026-07-13",
    readTime: "3 min read",
    body: [
      "A focused manufacturing pilot begins with a small number of high-value zones: entrances, production aisles, utility rooms, and forklift paths.",
      "Visrax can be configured to review restricted-zone entry, PPE visibility, worker-equipment proximity, and possible fire or smoke events.",
      "The pilot goal is operational clarity: which event types matter, who receives alerts, how incidents are resolved, and what analytics should be reviewed weekly."
    ]
  },
  {
    slug: "commercial-building-occupancy-model",
    title: "Commercial building occupancy model",
    description:
      "A sample model for monitoring entrances, restricted spaces, after-hours movement, and occupancy patterns.",
    category: "Sample Framework",
    date: "2026-07-13",
    readTime: "3 min read",
    body: [
      "Commercial buildings often need visibility into entrances, shared floors, restricted areas, and after-hours movement.",
      "A Visrax deployment can convert those spaces into configured zones with occupancy, visitor flow, active events, and camera availability.",
      "Teams can review trends by time of day, site, and incident status without relying on constant live observation."
    ]
  }
];

export const deploymentSteps = [
  ["Site walkthrough", "Walk the site together and agree which cameras and areas matter most."],
  ["Pilot start", "Begin with a few high-value checks and confirm alerts reach the right people."],
  ["Camera and area setup", "Set up cameras, monitored zones, alert rules, and who can access what."],
  ["Team rollout", "Train the people who will receive alerts and review cases day to day."],
  ["Improve over time", "Add more locations, refine rules, and adjust reports as operations change."]
] as const;

export const securityItems = [
  "Can run on your own premises",
  "On-site deployment options",
  "You choose how long footage is kept",
  "Role-based access for each user",
  "Secure connections",
  "Controlled access to evidence",
  "Full activity history",
  "Separate access per organization",
  "Permissions by site"
];

export function allDetailPages() {
  return [
    ...platformPages.map((page) => ({ ...page, base: "/platform" })),
    ...capabilityPages.map((page) => ({ ...page, base: "/capabilities" })),
    ...industryPages.map((page) => ({ ...page, base: "/industries" })),
    ...solutionPages.map((page) => ({ ...page, base: "/solutions" }))
  ];
}
