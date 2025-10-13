'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  IconBrandLinkedin,
  IconBrandGithub,
  IconMail,
  IconSparkles,
  IconChevronRight,
  IconChevronDown,
  IconChevronUp,
  IconArrowRight,
  IconGlobe
} from '@tabler/icons-react';
import { motion, AnimatePresence } from 'framer-motion';

// Import data from separate file
import {
  platformFeatures,
  team,
  techStack,
  keyFeatures,
  contactInfo,
  containerVariants,
  itemVariants,
  cardVariants
} from './data';

const FeatureCard = ({ feature }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      variants={cardVariants}
      className={`bg-card border ${feature.colorScheme.border} rounded-2xl p-6 hover:shadow-lg transition-all duration-300`}
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className={`p-3 rounded-xl ${feature.colorScheme.bg} flex-shrink-0`}>
          <feature.icon className={`w-6 h-6 ${feature.colorScheme.icon}`} />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
          <p className="text-muted-foreground leading-relaxed">{feature.shortDescription}</p>
        </div>
      </div>

      {/* Expandable Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-4 border-t border-border space-y-4">
              {/* Overview */}
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-2">Overview</h4>
                <p className="text-muted-foreground leading-relaxed">{feature.fullContent.overview}</p>
              </div>

              {/* Key Features */}
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-3">Key Features</h4>
                <div className="grid md:grid-cols-2 gap-2">
                  {feature.fullContent.keyFeatures.map((keyFeature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <IconArrowRight className={`w-4 h-4 mt-0.5 flex-shrink-0 ${feature.colorScheme.icon}`} />
                      <span className="text-sm text-muted-foreground">{keyFeature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Specs */}
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-2">Technical Specifications</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.fullContent.technicalSpecs}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`mt-4 w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg ${feature.colorScheme.bg} ${feature.colorScheme.icon} hover:bg-opacity-80 transition-colors`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="font-medium">{isExpanded ? 'Show Less' : 'Learn More'}</span>
        {isExpanded ? <IconChevronUp size={18} /> : <IconChevronDown size={18} />}
      </motion.button>
    </motion.div>
  );
};

const About = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Hero Section */}
      <motion.section
        className="relative py-20 md:py-28 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <IconSparkles size={16} />
              Complete Event Management Ecosystem
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent leading-tight">
              Orgatic
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-12">
              Transform your event management with our comprehensive platform featuring
              <span className="text-primary font-semibold"> Digital ticketing</span>,
              <span className="text-primary font-semibold"> QR verification</span>,
              <span className="text-primary font-semibold"> Auto certificates</span>, and
              <span className="text-destructive font-semibold"> WhatsApp announcements</span>.
            </p>
          </motion.div>

          {/* Enhanced Key Features Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 mt-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {keyFeatures.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-1 py-2 text-center hover:shadow-lg transition-all duration-300"
              >
                <feature.icon className={`w-8 h-8 mx-auto mb-3 ${feature.color}`} />
                <div className="text-lg font-semibold mb-1">{feature.title}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Enhanced Features Section - Expandable Cards */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Platform Features</h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Discover the comprehensive tools that make Orgatic the ultimate event management solution
            </p>
          </motion.div>

          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {platformFeatures.map((feature) => (
              <FeatureCard key={feature.id} feature={feature} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Tech Stack Section */}
      <section className="px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4">Powered by Modern Tech</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Built with cutting-edge technologies for performance, security, and scalability
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -5, scale: 1.05 }}
                className="bg-white dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-1 py-2 text-center group hover:shadow-lg transition-all duration-300"
              >
                <tech.icon className={`w-10 h-10 mx-auto mb-4 ${tech.color} group-hover:scale-110 transition-transform duration-300`} />
                <h3 className="font-bold text-lg mb-1">{tech.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{tech.category}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Team Section */}
      <section className="px-4 bg-gray-50/50 dark:bg-gray-800/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              The passionate developers revolutionizing event management
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-12 max-w-7xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {team.map((member, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-8 text-center group hover:shadow-2xl transition-all duration-500"
              >
                <motion.div
                  className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-gray-200 dark:border-gray-600 group-hover:border-blue-400 transition-colors duration-300"
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>

                <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                <p className="text-blue-600 dark:text-blue-400 font-semibold mb-4">{member.role}</p>

                <motion.div
                  className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto my-6"
                  initial={{ width: 0 }}
                  whileInView={{ width: 64 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />

                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">{member.bio}</p>

                {/* Social Links */}
                <div className="flex justify-center gap-4">
                  {[
                    { href: member.linkedin, icon: IconBrandLinkedin, color: 'hover:bg-blue-600' },
                    { href: member.github, icon: IconBrandGithub, color: 'hover:bg-gray-800 dark:hover:bg-gray-600' },
                    { href: member.portfolio, icon: IconGlobe, color: 'hover:bg-green-600' }
                  ].map((social, socialIndex) => (
                    <motion.a
                      key={socialIndex}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:text-white transition-all duration-300 ${social.color}`}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <social.icon size={20} />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Let's Connect</h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Ready to transform your event management experience? Get in touch with us today!
            </p>

            <div className="grid md:grid-cols-4 gap-6 mb-12">
              {contactInfo.map((contact, index) => (
                <motion.div
                  key={index}
                  className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
                  whileHover={{ y: -5, scale: 1.02 }}
                  variants={itemVariants}
                >
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-xl ${contact.bg} flex items-center justify-center`}>
                    <contact.icon className={`w-6 h-6 ${contact.iconColor}`} />
                  </div>
                  <h3 className="font-bold mb-2 text-foreground">{contact.title}</h3>
                  <p className="text-sm text-muted-foreground">{contact.info}</p>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-2xl hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl">
                <IconMail size={20} />
                Get in Touch
                <IconChevronRight size={20} />
              </Link>
            </motion.div>

            {/* Additional Info */}
            <motion.div
              className="mt-12 p-6 bg-card/80 backdrop-blur-sm border border-border rounded-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
                <IconSparkles size={16} />
                <span>Trusted by organizations worldwide for seamless event management</span>
                <IconSparkles size={16} />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;