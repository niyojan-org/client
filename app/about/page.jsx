'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTheme } from 'next-themes';
import {
  keyFeatures,
  platformFeatures,
  techStack,
  team,
  contactInfo,
  containerVariants,
  itemVariants,
  cardVariants
} from './data';
import { IconBrandGithub, IconBrandLinkedin, IconGlobe } from '@tabler/icons-react';

// Expandable Card for Platform Features
const FeatureCard = ({ feature }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = feature.icon;

  return (
    <motion.div
      variants={cardVariants}
      className={`bg-card border ${feature.colorScheme.border} rounded-2xl p-6 hover:shadow-lg transition-all duration-300`}
    >
      <CardHeader className="flex items-center gap-4 mb-4">
        <div className={`p-3 rounded-xl ${feature.colorScheme.bg} flex-shrink-0`}>
          <Icon className={`w-6 h-6 ${feature.colorScheme.icon}`} />
        </div>
        <CardTitle className="text-lg">{feature.title}</CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground">{feature.shortDescription}</p>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="pt-4 border-t border-border space-y-3"
            >
              <h4 className="font-semibold text-foreground">Overview</h4>
              <p className="text-sm text-muted-foreground">{feature.fullContent.overview}</p>

              <h4 className="font-semibold text-foreground">Key Features</h4>
              <ul className="list-disc pl-5 text-sm text-muted-foreground">
                {feature.fullContent.keyFeatures.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>

              <h4 className="font-semibold text-foreground">Technical Specs</h4>
              <p className="text-sm text-muted-foreground">{feature.fullContent.technicalSpecs}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          variant="outline"
          size="sm"
          className="mt-4"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Show Less' : 'Learn More'}
        </Button>
      </CardContent>
    </motion.div>
  );
};

// About Page
const About = () => {
  const { theme } = useTheme();

  return (
    <div className="min-h-dvh space-y-5 bg-background text-foreground transition-colors duration-700 overflow-x-hidden pb-10 scroll-smooth">

      {/* Hero Section */}
      <section className="relative text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-5xl md:text-7xl font-bold pb-6 bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent">
            Orgatic
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A <span className="font-semibold text-primary">student-friendly event management platform</span>
            for hosting, discovering, and attending college events seamlessly.
          </p>

          {/* Key Features */}
          <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {keyFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div key={index} variants={itemVariants} className="bg-card/80 dark:bg-gray-800/70 rounded-2xl p-4 flex flex-col items-center gap-2 hover:shadow-lg transition-all duration-300">
                  <Icon className={`w-8 h-8 ${feature.color}`} />
                  <p className="font-semibold text-sm text-center">{feature.title}</p>
                  <p className="text-xs text-muted-foreground text-center">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </section>

      {/* Platform Features Section */}
      <section className="">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-4" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Platform Features</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover the tools that make Orgatic the ultimate event management solution
            </p>
          </motion.div>

          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {platformFeatures.map((feature) => (
              <FeatureCard key={feature.id} feature={feature} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Powered by Modern Tech</h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Built with cutting-edge technologies for performance, security, and scalability
          </p>
          <motion.div className="grid grid-cols-2 md:grid-cols-3 gap-4" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {techStack.map((tech, index) => (
              <motion.div key={index} variants={cardVariants} className="bg-card dark:bg-gray-800 border border-border rounded-2xl p-2 sm:p-6 hover:shadow-lg transition-all duration-300">
                <tech.icon className={`w-10 h-10 mx-auto ${tech.color}`} />
                <h3 className="font-bold text-lg mb-1">{tech.name}</h3>
                <p className="text-sm text-muted-foreground">{tech.category}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-3">Meet Our Team</h2>
          <p className="text-lg text-muted-foreground mb-5 max-w-2xl mx-auto">The passionate developers behind Orgatic</p>
          <motion.div className="grid md:grid-cols-3 gap-5 sm:gap-12" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {team.map((member, index) => (
              <motion.div key={index} variants={cardVariants} className="bg-card dark:bg-gray-800 border border-border rounded-3xl p-8 text-center hover:shadow-2xl transition-all duration-500">
                <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-border">
                  <Image src={member.avatar} alt={member.name} fill className="object-cover" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                <p className="text-primary font-semibold mb-4">{member.role}</p>
                <p className="text-sm text-muted-foreground mb-6">{member.bio}</p>
                <div className="flex justify-center gap-4">
                  <Link href={member.linkedin} target="_blank"><IconBrandLinkedin size={20} /></Link>
                  <Link href={member.github} target="_blank"><IconBrandGithub size={20} /></Link>
                  <Link href={member.portfolio} target="_blank"><IconGlobe size={20} /></Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Let's Connect</h2>
          <p className="text-lg text-muted-foreground mb-4 sm:mb-12 max-w-3xl mx-auto">Ready to transform your event experience? Get in touch!</p>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4 sm:gap-6 mb-4 sm:mb-12">
            {contactInfo.map((contact, index) => (
              <motion.div key={index} className="bg-card border border-border rounded-2xl p-3 sm:p-6 hover:shadow-lg transition-all duration-300">
                <div className={`w-12 h-12 mx-auto mb-4 rounded-xl ${contact.bg} flex items-center justify-center`}>
                  <contact.icon className={`w-6 h-6 ${contact.iconColor}`} />
                </div>
                <h3 className="font-bold mb-2 text-foreground">{contact.title}</h3>
                <p className="text-sm text-muted-foreground">{contact.info}</p>
              </motion.div>
            ))}
          </div>
          <Link href="/contact">
            <Button size="lg" className="hover:scale-105 transition-transform w-full">
              Contact Us
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
