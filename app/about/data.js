import {
  IconTarget,
  IconRocket,
  IconUsers,
  IconBrain,
  IconCode,
  IconDatabase,
  IconShield,
  IconBolt,
  IconStar,
  IconTrendingUp,
  IconGlobe,
  IconMail,
  IconPhone,
  IconMapPin,
  IconSparkles,
  IconDevices,
  IconLock,
  IconQrcode,
  IconCertificate,
  IconBellRinging,
  IconBrandWhatsapp,
  IconScan,
  IconTicket,
  IconBrandLinkedin,
  IconBrandGithub,
  IconArrowRight
} from '@tabler/icons-react';

// Platform features data with expandable content
export const platformFeatures = [
  {
    id: 'event-management',
    icon: IconTarget,
    title: 'Complete Event Lifecycle Management',
    shortDescription: 'End-to-end event management from creation to analytics with intelligent workflows and automated processes.',
    colorScheme: {
      border: 'border-primary',
      bg: 'bg-primary/10',
      icon: 'text-primary'
    },
    fullContent: {
      overview: 'Orgatic transforms the way you approach event management by providing a unified platform that handles every aspect of your event lifecycle. From the initial concept to post-event analysis, our comprehensive system ensures nothing falls through the cracks.',
      keyFeatures: [
        'Rich media event pages with customizable branding',
        'Complex registration workflows with multiple ticket types',
        'Early bird pricing and dynamic pricing models',
        'Automated reminder systems and engagement tracking',
        'Multi-day conference and workshop management',
        'Hybrid event support with seamless integration',
        'Advanced scheduling with time zone conversion',
        'Calendar integration for maximum attendance'
      ],
      technicalSpecs: 'Supports recurring events, capacity management, resource allocation, and real-time logistics tracking with complete visibility over all event operations.'
    }
  },
  {
    id: 'digital-ticketing',
    icon: IconQrcode,
    title: 'Advanced Digital Ticketing & QR Verification',
    shortDescription: 'Secure digital tickets with unique QR codes, fraud prevention, and instant verification with offline capabilities.',
    colorScheme: {
      border: 'border-secondary',
      bg: 'bg-secondary/10',
      icon: 'text-secondary'
    },
    fullContent: {
      overview: 'Our cutting-edge digital ticketing system generates unique, secure QR codes for every attendee, completely eliminating the need for physical tickets and manual check-ins.',
      keyFeatures: [
        'Encrypted QR codes with fraud prevention',
        'Multiple ticket types (VIP, General, Student, Group)',
        'Customizable ticket designs with brand identity',
        'Real-time scanning with offline capabilities',
        'Instant entry verification and attendee info',
        'Comprehensive entry logs and tracking',
        'Capacity monitoring and safety compliance',
        'Mobile scanning app with detailed insights'
      ],
      technicalSpecs: 'Each ticket contains encrypted attendee information, event details, and verification tokens with real-time sync and offline backup capabilities.'
    }
  },
  {
    id: 'registration-system',
    icon: IconRocket,
    title: 'Intelligent Registration & Form Management',
    shortDescription: 'Drag-and-drop form builder with conditional logic, automated workflows, and seamless payment integration.',
    colorScheme: {
      border: 'border-accent',
      bg: 'bg-accent/10',
      icon: 'text-accent'
    },
    fullContent: {
      overview: 'Gone are the days of scattered Google Forms and manual data collection. Our intelligent registration system features a powerful drag-and-drop form builder with advanced capabilities.',
      keyFeatures: [
        'Drag-and-drop form builder with custom fields',
        'Conditional logic and dynamic pricing',
        'Multi-step registration processes',
        'Group registrations and corporate bookings',
        'Automated confirmation emails with calendar attachments',
        'Waitlist management with automatic promotion',
        'CRM integration and data synchronization',
        'Registration analytics and conversion tracking'
      ],
      technicalSpecs: 'Supports complex validation rules, approval workflows, capacity limits per ticket type, and seamless integration with payment gateways and existing systems.'
    }
  },
  {
    id: 'communication-hub',
    icon: IconBellRinging,
    title: 'Multi-Channel Communication Hub',
    shortDescription: 'WhatsApp integration, email campaigns, and targeted announcements with advanced analytics and scheduling.',
    colorScheme: {
      border: 'border-destructive',
      bg: 'bg-destructive/10',
      icon: 'text-destructive'
    },
    fullContent: {
      overview: 'Stay connected with your audience through our comprehensive communication suite that spans email, in-app notifications, SMS, and WhatsApp integration.',
      keyFeatures: [
        'WhatsApp Business API integration',
        'Targeted campaigns based on attendee segments',
        'Intelligent scheduling across time zones',
        'Rich media messaging with interactive buttons',
        'Automated responses and chatbot integration',
        'Email templates with personalization',
        'Real-time delivery and read receipts',
        'Engagement analytics and optimization'
      ],
      technicalSpecs: 'Advanced message scheduling, audience segmentation, A/B testing capabilities, and comprehensive analytics tracking for all communication channels.'
    }
  },
  {
    id: 'certification-analytics',
    icon: IconCertificate,
    title: 'Automated Certification & Analytics Platform',
    shortDescription: 'Professional certificate generation with blockchain verification and comprehensive event analytics dashboard.',
    colorScheme: {
      border: 'border-chart-1',
      bg: 'bg-chart-1/10',
      icon: 'text-chart-1'
    },
    fullContent: {
      overview: 'Recognize and reward your attendees with professionally designed, automatically generated certificates upon event completion or milestone achievement.',
      keyFeatures: [
        'Multiple certificate templates with custom branding',
        'Blockchain-based verification for authenticity',
        'Unique verification codes and QR links',
        'Automated distribution upon event completion',
        'Digital signatures and institutional seals',
        'Comprehensive analytics dashboard',
        'Attendee behavior and engagement tracking',
        'Custom reports and ROI metrics'
      ],
      technicalSpecs: 'Integration with certificate authorities, automated workflow triggers, advanced reporting with custom dashboards, and export capabilities for stakeholder presentations.'
    }
  },
  {
    id: 'enterprise-security',
    icon: IconShield,
    title: 'Enterprise Security & Integration',
    shortDescription: 'GDPR compliance, API integrations, and enterprise-grade security with role-based access control.',
    colorScheme: {
      border: 'border-chart-2',
      bg: 'bg-chart-2/10',
      icon: 'text-chart-2'
    },
    fullContent: {
      overview: 'Built with enterprise-grade security and scalability in mind, Orgatic ensures your event data remains protected with comprehensive compliance and integration capabilities.',
      keyFeatures: [
        'End-to-end encryption and GDPR compliance',
        'SOC 2 security standards implementation',
        'Integration with Salesforce, HubSpot, Mailchimp',
        'Zoom, Microsoft Teams, Google Workspace connectivity',
        'Advanced API capabilities for custom integrations',
        'Webhook support for real-time data sync',
        'Role-based access control and audit logs',
        'Multi-factor authentication and SSO'
      ],
      technicalSpecs: 'Scalable architecture supporting events from intimate workshops to large conferences with tens of thousands of attendees, ensuring consistent performance and reliability.'
    }
  }
];

// Team members data
export const team = [
  {
    name: 'Abhishek Kumar',
    role: 'CEO & Full Stack Developer',
    bio: 'The visionary behind Orgatic. Architected and developed the entire platform from frontend to backend, payment integration, and system design.',
    linkedin: 'https://linkedin.com/in/iamabhi0619',
    github: 'https://github.com/iamabhi0619',
    portfolio: 'https://iamabhi.tech',
    avatar: '/images/abhishek.webp',
  },
  {
    name: 'Alok Kumar',
    role: 'Full Stack Developer & Frontend Lead',
    bio: 'Handles major frontend development, API integration, and UI/UX design, ensuring smooth and responsive user experiences.',
    linkedin: 'https://linkedin.com/in/alokumar01',
    github: 'https://github.com/alokumar01',
    portfolio: 'https://whoisalok.tech',
    avatar: '/images/alok.webp',
  },
  {
    name: 'Pradum Kumar',
    role: 'Frontend Developer',
    bio: 'Handles the frontend development, UI components, and design enhancements.',
    linkedin: 'https://www.linkedin.com/in/pradum-kumar',
    github: 'https://github.com/Pradum-codes',
    portfolio: 'https://pradum-codes.vercel.app/',
    avatar: '/images/manish.jpg',
  },
];


// Tech stack data
export const techStack = [
  { name: 'Next.js', icon: IconCode, category: 'Frontend', color: 'text-gray-700 dark:text-gray-300' },
  { name: 'Node.js', icon: IconBolt, category: 'Backend', color: 'text-green-600 dark:text-green-400' },
  { name: 'MongoDB', icon: IconDatabase, category: 'Database', color: 'text-green-700 dark:text-green-300' },
  { name: 'Razorpay', icon: IconShield, category: 'Payments', color: 'text-blue-600 dark:text-blue-400' },
  { name: 'WhatsApp API', icon: IconBrandWhatsapp, category: 'Communication', color: 'text-green-500 dark:text-green-400' },
  { name: 'JWT', icon: IconLock, category: 'Security', color: 'text-red-600 dark:text-red-400' }
];

// Key features for hero section
export const keyFeatures = [
  { title: 'QR Code Scanning', description: 'Instant entry verification', icon: IconScan, color: 'text-blue-500' },
  { title: 'Real-time Updates', description: 'Live event notifications', icon: IconBolt, color: 'text-yellow-500' },
  { title: 'Analytics Dashboard', description: 'Comprehensive insights', icon: IconTrendingUp, color: 'text-green-500' },
  { title: 'Mobile Responsive', description: 'Works on all devices', icon: IconDevices, color: 'text-purple-500' }
];

// Contact information
export const contactInfo = [
  { icon: IconMail, title: 'Email Us', info: 'contact@orgatic.com', bg: 'bg-primary/10', iconColor: 'text-primary' },
  { icon: IconMapPin, title: 'Location', info: 'LPU, Punjab, India', bg: 'bg-secondary/10', iconColor: 'text-secondary' },
  { icon: IconPhone, title: 'Support', info: '24/7 Available', bg: 'bg-accent/10', iconColor: 'text-accent' },
  { icon: IconBrandWhatsapp, title: 'WhatsApp', info: 'Quick Support', bg: 'bg-destructive/10', iconColor: 'text-destructive' }
];

// Animation variants
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' }
  }
};

export const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4 }
  }
};