// data.js
'use client';

import {
  IconScan,
  IconBolt,
  IconTrendingUp,
  IconDevices,
  IconTarget,
  IconRocket,
  IconTicket,
  IconBellRinging,
  IconCertificate,
  IconShield,
  IconBrandWhatsapp,
  IconCode,
  IconDatabase,
  IconLock,
  // IconBrandLinkedin,
  // IconBrandGithub,
  IconMail,
  IconMapPin,
  IconPhone,
  IconGlobe,
  IconArrowRight
} from '@tabler/icons-react';

// ------------------- Key Features (Hero Section) -------------------
export const keyFeatures = [
  { title: 'QR Code Scanning', description: 'Instant entry verification', icon: IconScan, color: 'text-blue-500' },
  { title: 'Real-time Updates', description: 'Live event notifications', icon: IconBolt, color: 'text-yellow-500' },
  { title: 'Analytics Dashboard', description: 'Comprehensive insights', icon: IconTrendingUp, color: 'text-green-500' },
  { title: 'Mobile Responsive', description: 'Works on all devices', icon: IconDevices, color: 'text-purple-500' },
];

// ------------------- Platform Features (Expandable Cards) -------------------
export const platformFeatures = [
  {
    id: 'event-management',
    icon: IconTarget,
    title: 'Complete Event Lifecycle Management',
    shortDescription: 'End-to-end event management from creation to analytics with intelligent workflows.',
    colorScheme: { border: 'border-primary', bg: 'bg-primary/10', icon: 'text-primary' },
    fullContent: {
      overview: 'Orgatic handles every step of your event lifecycle, from planning to post-event analysis.',
      keyFeatures: [
        'Rich media event pages with custom branding',
        'Complex registration workflows',
        'Early bird and dynamic pricing',
        'Automated reminders and engagement tracking',
        'Multi-day conference and workshop support',
      ],
      technicalSpecs: 'Supports recurring events, capacity management, resource allocation, and real-time logistics tracking.',
    },
  },
  {
    id: 'digital-ticketing',
    icon: IconTicket,
    title: 'Advanced Digital Ticketing & QR Verification',
    shortDescription: 'Secure tickets with unique QR codes, fraud prevention, and instant verification.',
    colorScheme: { border: 'border-secondary', bg: 'bg-secondary/10', icon: 'text-secondary' },
    fullContent: {
      overview: 'Eliminate paper tickets with encrypted QR codes and instant verification.',
      keyFeatures: [
        'Multiple ticket types (VIP, Student, Group)',
        'Customizable ticket designs',
        'Real-time scanning with offline support',
        'Comprehensive logs and tracking',
      ],
      technicalSpecs: 'Encrypted attendee info, verification tokens, real-time sync, and offline backup.',
    },
  },
  {
    id: 'communication-hub',
    icon: IconBellRinging,
    title: 'Multi-Channel Communication Hub',
    shortDescription: 'WhatsApp integration, email campaigns, and targeted announcements.',
    colorScheme: { border: 'border-destructive', bg: 'bg-destructive/10', icon: 'text-destructive' },
    fullContent: {
      overview: 'Send announcements across WhatsApp, email, and in-app notifications efficiently.',
      keyFeatures: [
        'WhatsApp Business API integration',
        'Segmented campaigns for attendees',
        'Smart scheduling across time zones',
        'Real-time engagement analytics',
      ],
      technicalSpecs: 'Message scheduling, A/B testing, and full analytics for campaigns.',
    },
  },
  {
    id: 'certification-analytics',
    icon: IconCertificate,
    title: 'Automated Certification & Analytics',
    shortDescription: 'Generate professional certificates and track attendee analytics.',
    colorScheme: { border: 'border-chart-1', bg: 'bg-chart-1/10', icon: 'text-chart-1' },
    fullContent: {
      overview: 'Automatically generate verified certificates and track performance metrics.',
      keyFeatures: [
        'Multiple certificate templates',
        'Blockchain verification',
        'Unique QR links for authenticity',
        'Automated distribution',
      ],
      technicalSpecs: 'Integrates with certificate authorities and generates custom reports.',
    },
  },
];

// ------------------- Tech Stack -------------------
export const techStack = [
  { name: 'Next.js', icon: IconCode, category: 'Frontend', color: 'text-gray-700 dark:text-gray-300' },
  { name: 'Node.js', icon: IconRocket, category: 'Backend', color: 'text-green-600 dark:text-green-400' },
  { name: 'MongoDB', icon: IconDatabase, category: 'Database', color: 'text-green-700 dark:text-green-300' },
  { name: 'Razorpay', icon: IconShield, category: 'Payments', color: 'text-blue-600 dark:text-blue-400' },
  { name: 'WhatsApp API', icon: IconBrandWhatsapp, category: 'Communication', color: 'text-green-500 dark:text-green-400' },
  { name: 'JWT', icon: IconLock, category: 'Security', color: 'text-red-600 dark:text-red-400' },
];

// ------------------- Team -------------------
export const team = [
  {
    name: 'Abhishek Kumar',
    role: 'CEO & Full Stack Developer',
    bio: 'Architected and developed the entire platform from frontend to backend, including payments and system design.',
    linkedin: 'https://linkedin.com/in/iamabhi0619',
    github: 'https://github.com/iamabhi0619',
    portfolio: 'https://iamabhi.dev',
    avatar: '/images/abhishek.webp',
  },
  {
    name: 'Alok Kumar',
    role: 'Frontend Lead',
    bio: 'Handles frontend development, API integration, and UI/UX design for smooth experiences.',
    linkedin: 'https://linkedin.com/in/alokumar01',
    github: 'https://github.com/alokumar01',
    portfolio: 'https://whoisalok.tech',
    avatar: '/images/alok.webp',
  },
  {
    name: 'Pradum Kumar',
    role: 'Frontend Developer',
    bio: 'Focuses on frontend components, design enhancements, and responsive UI.',
    linkedin: 'https://www.linkedin.com/in/pradum-kumar',
    github: 'https://github.com/Pradum-codes',
    portfolio: 'https://pradum-codes.vercel.app/',
    avatar: '/images/manish.jpg',
  },
];

// ------------------- Contact Info -------------------
export const contactInfo = [
  { icon: IconMail, title: 'Email Us', info: 'contact@orgatic.com', bg: 'bg-primary/10', iconColor: 'text-primary' },
  { icon: IconMapPin, title: 'Location', info: 'LPU, Punjab, India', bg: 'bg-secondary/10', iconColor: 'text-secondary' },
  { icon: IconPhone, title: 'Support', info: '24/7 Available', bg: 'bg-accent/10', iconColor: 'text-accent' },
  { icon: IconGlobe, title: 'Website', info: 'orgatic.com', bg: 'bg-destructive/10', iconColor: 'text-destructive' },
];

// ------------------- Animation Variants -------------------
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};
