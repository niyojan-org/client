'use client';

import { useState } from 'react';
import { Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="h-screen w-full bg-[#F9FAFB] flex items-center justify-center px-6">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        
        {/* Contact Info */}
        <div className="bg-[#3447AA] text-white p-8 md:p-10 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-sm mb-6 opacity-90">
              We're here to help! Reach out via message or contact info.
            </p>

            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <Mail size={18} />
                <span>support@orgatic.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} />
                <span>+91 98765 43210</span>
              </div>
              <div className="mt-4">
                <strong>Address:</strong><br />
                Lovely Professional University,<br />
                Jalandhar, Punjab, India
              </div>
            </div>
          </div>

          <p className="text-xs mt-10 opacity-60">We usually respond within 24 hours.</p>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="p-8 md:p-10 bg-white space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[#141D38] mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#3447AA]"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#141D38] mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#3447AA]"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-[#141D38] mb-1">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#3447AA]"
              placeholder="Type your message..."
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-[#3447AA] hover:bg-[#2b3a8f] text-white font-semibold py-2 rounded-md"
          >
            Send Message
          </Button>

          {submitted && (
            <p className="text-sm text-green-600 mt-2">Thank you! We'll be in touch soon.</p>
          )}
        </form>
      </div>
    </div>
  );
}
