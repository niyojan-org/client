# 🎉 orgatick - Event Management Platform

**orgatick** is a comprehensive event management platform that simplifies event creation, registration, and management for organizers while providing a seamless experience for attendees. Built with modern web technologies, it supports everything from college fests to professional conferences.

## ✨ Features

### 🎯 For Event Organizers
- **Effortless Event Creation** - Create and manage events with customizable registration forms
- **Admin Dashboard** - Comprehensive panel to manage attendees, payments, and analytics
- **Payment Integration** - Secure payment processing with Razorpay integration
- **Real-time Analytics** - Monitor registrations and revenue in real-time
- **Email Notifications** - Automated email updates for participants
- **QR Code Ticketing** - Generate and validate QR code tickets for events
- **Organization Management** - Multi-organizer support with role-based access

### 🎪 For Attendees
- **Easy Registration** - 1-minute event registration process
- **Secure Payments** - Multiple payment options through Razorpay
- **Instant E-Tickets** - QR code tickets delivered instantly via email
- **Event Discovery** - Browse and filter events by category, location, and type
- **Personal Dashboard** - Manage all your event registrations in one place
- **Event Reminders** - Automated notifications for upcoming events

### 🏢 Event Types Supported
- **College Festivals** - Campus events and student activities
- **Nightlife Events** - Parties and social gatherings
- **Music Events** - Concerts and DJ performances
- **Professional Conferences** - Corporate and educational seminars
- **Public Events** - Community gatherings and workshops

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15.3.0 with App Router
- **Styling**: Tailwind CSS 4.0
- **State Management**: Zustand for global state
- **Animations**: Framer Motion for smooth interactions
- **Forms**: Custom form components with validation
- **Notifications**: Sonner for toast notifications

### Key Dependencies
- **HTTP Client**: Axios for API communication
- **Date Handling**: date-fns and dayjs
- **Image Handling**: Cloudinary integration
- **Carousel**: Embla Carousel for image galleries
- **Animations**: Lottie React for complex animations
- **Payments**: Razorpay integration for secure transactions

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager
- Backend server running (check backend repository)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/niyojanems/EMS.git
   cd EMS/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   SERVER_URL=http://localhost:5050
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open the application**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm start` - Start the production server
- `npm run lint` - Run ESLint for code quality
- `npm run analyze` - Analyze bundle size with webpack-bundle-analyzer

## 📁 Project Structure

```
├── app/                          # Next.js App Router pages
│   ├── (legalLinks)/            # Legal pages (privacy, terms, etc.)
│   ├── about/                   # About page
│   ├── auth/                    # Authentication pages
│   ├── contact/                 # Contact page
│   ├── events/                  # Event listing and details
│   ├── features/                # Features showcase
│   ├── org/                     # Organization management
│   ├── profile/                 # User profile pages
│   └── test/                    # Testing pages
├── components/                  # Reusable React components
│   ├── Auth/                    # Authentication components
│   ├── pages/                   # Page-specific components
│   └── ui/                      # UI component library
├── constants/                   # Application constants and content
├── lib/                         # Utility libraries and configurations
├── public/                      # Static assets
├── store/                       # Zustand state management
└── styles/                      # Global styles and Tailwind config
```

## 🎨 Key Components

### State Management
- **User Store** (`store/userStore.js`) - Authentication, user profile, and session management
- **Event Store** (`store/eventStore.js`) - Event data, filtering, and registration management

### Core Features
- **Dynamic Registration Forms** - Customizable form fields for different event types
- **Payment Processing** - Integrated Razorpay payment gateway
- **File Upload** - Cloudinary integration for image and document uploads
- **Protected Routes** - Role-based access control for different user types
- **Responsive Design** - Mobile-first approach with Tailwind CSS

## 🔧 Configuration

### Tailwind CSS
The project uses Tailwind CSS 4.0 with custom configuration for:
- Custom color palette
- Typography scales
- Component variants
- Animation utilities

### ESLint Configuration
Modern ESLint setup with Next.js recommended rules for code quality and consistency.

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on every push to main branch

### Other Platforms
The application can be deployed on any platform that supports Node.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is part of the orgatick Event Management System. Please refer to the main repository for licensing information.

## 🔗 Related Repositories

- **Backend API**: Check the backend directory for the server-side implementation
- **Documentation**: Comprehensive API documentation available in the docs folder

## 📞 Support

For support and queries:
- **Email**: support@orgatick.events
- **GitHub Issues**: Create an issue for bug reports or feature requests

---

**Built with ❤️ by Alok & Team** - Making event management simple and efficient for everyone.
