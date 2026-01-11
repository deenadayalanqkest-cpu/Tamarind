import React, { useState } from 'react';
import { Sparkles, Heart, Activity, Shield, Instagram, Send, Mail, ExternalLink, X, ArrowLeft } from 'lucide-react';

export default function TamarindSeedsWebsite() {
  const [activeSection, setActiveSection] = useState('home');
  const [showModal, setShowModal] = useState(null); // 'terms' or 'privacy'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    if (formData.name && formData.email && formData.mobile && formData.message) {
      try {
        const form = new FormData();
        form.append('name', formData.name);
        form.append('email', formData.email);
        form.append('mobile', formData.mobile);
        form.append('description', formData.message);

        const response = await fetch("/api/contact", {
          method: 'POST',
          body: form
        });

        const data = await response.json();
        
        if (data.status === 'success') {
          alert('Message sent successfully! ✅');
          setFormData({ name: '', email: '', mobile: '', message: '' });
        } else {
          alert('Failed to send message ❌');
        }
      } catch (error) {
        alert('Error: ' + error.message);
      }
    } else {
      alert('Please fill all fields!');
    }
  };

  const scrollToSection = (section) => {
    setActiveSection(section);
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Modal Component
  const Modal = ({ title, content, onClose }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl max-w-3xl w-full max-h-[80vh] overflow-hidden">
        <div className="sticky top-0 bg-gray-900 border-b border-gray-700 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
          {content}
        </div>
      </div>
    </div>
  );

  // Terms of Service Content
  const termsContent = (
    <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
      <p className="text-gray-400 italic">Last updated: January 2, 2026</p>
      
      <h3 className="text-lg font-bold text-white mt-6">1. Acceptance of Terms</h3>
      <p>
        By accessing and using the Tamarind Seeds website, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use our services.
      </p>

      <h3 className="text-lg font-bold text-white mt-6">2. Use of Products</h3>
      <p>
        Our tamarind seed products are intended for dietary and wellness purposes. While we provide information about potential health benefits, individual results may vary. We recommend consulting with a healthcare professional before starting any new dietary supplement.
      </p>

      <h3 className="text-lg font-bold text-white mt-6">3. Product Information</h3>
      <p>
        We strive to provide accurate information about our products. However, we do not warrant that product descriptions, pricing, or other content is accurate, complete, reliable, current, or error-free. All products are subject to availability.
      </p>

      <h3 className="text-lg font-bold text-white mt-6">4. Health Disclaimer</h3>
      <p>
        The statements made about our products have not been evaluated by the Food and Drug Administration. Our products are not intended to diagnose, treat, cure, or prevent any disease. Always consult your healthcare provider before using any dietary supplement.
      </p>

      <h3 className="text-lg font-bold text-white mt-6">5. Intellectual Property</h3>
      <p>
        All content on this website, including text, graphics, logos, and images, is the property of Tamarind Seeds and is protected by copyright laws. Unauthorized use is prohibited.
      </p>

      <h3 className="text-lg font-bold text-white mt-6">6. Contact Information</h3>
      <p>
        For questions about these Terms of Service, please contact us through the contact form on our website.
      </p>
    </div>
  );

  // Privacy Policy Content
  const privacyContent = (
    <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
      <p className="text-gray-400 italic">Last updated: January 2, 2026</p>
      
      <h3 className="text-lg font-bold text-white mt-6">1. Information We Collect</h3>
      <p>
        We collect information you provide directly to us, including your name, email address, phone number, and any messages you send through our contact form. This information is used solely to respond to your inquiries and provide you with information about our products.
      </p>

      <h3 className="text-lg font-bold text-white mt-6">2. How We Use Your Information</h3>
      <p>
        We use the information we collect to:
      </p>
      <ul className="list-disc list-inside space-y-2 ml-4">
        <li>Respond to your inquiries and provide customer support</li>
        <li>Send you information about our products and services</li>
        <li>Improve our website and user experience</li>
        <li>Comply with legal obligations</li>
      </ul>

      <h3 className="text-lg font-bold text-white mt-6">3. Information Sharing</h3>
      <p>
        We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
      </p>
      <ul className="list-disc list-inside space-y-2 ml-4">
        <li>With your explicit consent</li>
        <li>To comply with legal requirements</li>
        <li>To protect our rights and property</li>
      </ul>

      <h3 className="text-lg font-bold text-white mt-6">4. Data Security</h3>
      <p>
        We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
      </p>

      <h3 className="text-lg font-bold text-white mt-6">5. Cookies</h3>
      <p>
        Our website may use cookies to enhance user experience. You can choose to disable cookies through your browser settings, though this may affect website functionality.
      </p>

      <h3 className="text-lg font-bold text-white mt-6">6. Your Rights</h3>
      <p>
        You have the right to access, correct, or delete your personal information. To exercise these rights, please contact us through our contact form.
      </p>

      <h3 className="text-lg font-bold text-white mt-6">7. Changes to Privacy Policy</h3>
      <p>
        We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page with an updated date.
      </p>

      <h3 className="text-lg font-bold text-white mt-6">8. Contact Us</h3>
      <p>
        If you have questions about this Privacy Policy, please contact us through the contact form on our website.
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Modals */}
      {showModal === 'terms' && (
        <Modal
          title="Terms of Service"
          content={termsContent}
          onClose={() => setShowModal(null)}
        />
      )}
      {showModal === 'privacy' && (
        <Modal
          title="Privacy Policy"
          content={privacyContent}
          onClose={() => setShowModal(null)}
        />
      )}

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold">Tamarind Seeds</span>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => scrollToSection('home')}
                className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                  activeSection === 'home' ? 'bg-green-600 text-white' : 'hover:text-green-400'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                  activeSection === 'about' ? 'bg-green-600 text-white' : 'hover:text-green-400'
                }`}
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                  activeSection === 'contact' ? 'bg-green-600 text-white' : 'hover:text-green-400'
                }`}
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - REPLACE THIS URL WITH YOUR IMAGE */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-16 px-4" style={{
        backgroundImage: 'url(/Tamaimg.png)', // REPLACE WITH YOUR IMAGE PATH
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-green-600/20 border border-green-600 rounded-full px-4 py-1.5 mb-6">
            <Sparkles className="w-4 h-4 text-green-400" />
            <span className="text-green-400 text-sm font-medium">Natural Wellness</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-300 to-emerald-500 bg-clip-text text-transparent">
            Tamarind Seeds
          </h1>
          <p className="text-base md:text-lg text-gray-300 mb-3 leading-relaxed max-w-2xl mx-auto">
            Nature's powerhouse for radiant skin, optimal digestion, and stronger joints.
          </p>
          <p className="text-base md:text-lg text-gray-300 mb-6 leading-relaxed max-w-2xl mx-auto">
            Experience holistic wellness with every seed, crafted by nature for your vitality.
          </p>
          <a
            href="https://en.wikipedia.org/wiki/Tamarind"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full text-base font-semibold transition-all transform hover:scale-105 shadow-lg shadow-green-600/50"
          >
            Discover Benefits
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* About/Benefits Section */}
      <section id="about" className="min-h-screen py-16 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-green-600/20 border border-green-600 rounded-full px-4 py-1.5 mb-4">
              <Sparkles className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-sm font-medium">Benefits</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Complete Body Wellness</h2>
            <p className="text-base text-gray-400 max-w-2xl mx-auto">
              Experience transformative health benefits from head to toe with nature's most powerful superfood
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-12">
            {/* Radiant Skin Card */}
            <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border border-purple-700/50 rounded-2xl p-6 hover:scale-105 transition-transform">
              <Activity className="w-10 h-10 text-purple-400 mb-3" />
              <p className="text-xs text-purple-300 mb-1">Upper Body Wellness</p>
              <h3 className="text-2xl font-bold mb-3">Radiant Skin</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Rich in antioxidants and vitamins that promote collagen production, reduce inflammation, and give your skin a natural, healthy glow from within.
              </p>
            </div>

            {/* Optimal Digestion Card */}
            <div className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 border border-green-700/50 rounded-2xl p-6 hover:scale-105 transition-transform">
              <Heart className="w-10 h-10 text-green-400 mb-3" />
              <p className="text-xs text-green-300 mb-1">Core Wellness</p>
              <h3 className="text-2xl font-bold mb-3">Optimal Digestion</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Natural dietary fiber aids in smooth digestion, promotes gut health, and helps maintain balanced metabolism for sustained energy throughout the day.
              </p>
            </div>

            {/* Joint Strength Card */}
            <div className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border border-blue-700/50 rounded-2xl p-6 hover:scale-105 transition-transform">
              <Activity className="w-10 h-10 text-blue-400 mb-3" />
              <p className="text-xs text-blue-300 mb-1">Lower Body Wellness</p>
              <h3 className="text-2xl font-bold mb-3">Joint Strength</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Anti-inflammatory compounds support joint flexibility, reduce stiffness, and promote mobility, helping you stay active and comfortable in daily movement.
              </p>
            </div>

            {/* Overall Vitality Card */}
            <div className="bg-gradient-to-br from-amber-900/40 to-orange-900/40 border border-amber-700/50 rounded-2xl p-6 hover:scale-105 transition-transform">
              <Shield className="w-10 h-10 text-amber-400 mb-3" />
              <p className="text-xs text-amber-300 mb-1">Complete Wellness</p>
              <h3 className="text-2xl font-bold mb-3">Overall Vitality</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                A comprehensive blend of minerals and nutrients that strengthen immunity, boost energy levels, and support your body's natural healing processes.
              </p>
            </div>
          </div>

          {/* About Tamarind Seeds */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-8 mb-8">
            <h3 className="text-2xl font-bold mb-4">About Tamarind Seeds</h3>
            <div className="space-y-3 text-sm text-gray-300 leading-relaxed">
              <p>
                Tamarind seeds are the hidden gems within the tamarind fruit pod. While the tangy pulp is widely known, the seeds contain powerful nutrients that have been used in traditional medicine for centuries.
              </p>
              <p>
                These seeds are packed with polyphenols, dietary fiber, and essential minerals. They contain unique compounds that support digestive health, boost skin elasticity, and provide anti-inflammatory benefits throughout the body.
              </p>
              <p>
                Rich in protein and amino acids, tamarind seeds help strengthen joints and connective tissues. Their antioxidant properties combat free radicals, promoting cellular health and overall vitality.
              </p>
            </div>
          </div>

          {/* Why Choose Section */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Why Choose Tamarind Seeds?</h3>
            <p className="text-sm text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed">
              Sourced from organic farms and processed with care to preserve maximum nutritional value. Our tamarind seeds are 100% natural, free from additives, and packed with the goodness nature intended.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-green-400 text-sm">
              <div className="flex items-center gap-1.5">
                <span className="text-lg">✓</span>
                <span>100% Organic</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg">✓</span>
                <span>Lab Tested</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg">✓</span>
                <span>Sustainably Sourced</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg">✓</span>
                <span>Non-GMO</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen py-16 px-4 bg-gradient-to-b from-gray-900 to-black flex items-center">
        <div className="max-w-xl mx-auto w-full">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Start Your Wellness Journey</h2>
            <p className="text-base text-gray-400">
              Connect with us to learn more about our products and how tamarind seeds can transform your health
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium mb-1.5 text-gray-300">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-green-600 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1.5 text-gray-300">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your@email.com"
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-green-600 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1.5 text-gray-300">Mobile Number</label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                placeholder="+91 98765 43210"
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-green-600 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1.5 text-gray-300">Message / Description</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Write your message or inquiry here..."
                rows="5"
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-green-600 transition-colors resize-none"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-sm font-semibold transition-all transform hover:scale-105 shadow-lg shadow-green-600/50 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Send Message
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center gap-6 mb-4">
            <a href="https://instagram.com/YOUR_INSTAGRAM" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://t.me/YOUR_TELEGRAM" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 transition-colors">
              <Send className="w-5 h-5" />
            </a>
            <a href="mailto:your@email.com" className="text-gray-400 hover:text-green-400 transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>
          <div className="flex justify-center gap-6 mb-4 text-xs text-gray-400">
            <button onClick={() => setShowModal('terms')} className="hover:text-green-400 transition-colors">
              Terms of Service
            </button>
            <button onClick={() => setShowModal('privacy')} className="hover:text-green-400 transition-colors">
              Privacy Policy
            </button>
          </div>
          <div className="text-center mb-4">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-green-400" />
              <span className="text-base font-bold">Tamarind Seeds</span>
            </div>
            <p className="text-gray-500 text-xs">© 2026 Tamarind Seeds. All rights reserved.</p>
            <p className="text-gray-600 text-xs">Nature's gift for your wellness journey</p>
          </div>
          
          {/* Developer Credit */}
          <div className="border-t border-gray-800 pt-4 mt-4">
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-2">
                Website designed & developed by
              </p>
              <a 
                href="https://qkest.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-green-400 hover:text-green-300 font-semibold text-sm transition-colors inline-block mb-2"
              >
                Qkest.com
              </a>
              <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
                <a 
                  href="https://instagram.com/YOUR_DEV_INSTAGRAM" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-green-400 transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>@your_instagram</span>
                </a>
                <span className="text-gray-600">|</span>
                <a 
                  href="tel:+919876543210"
                  className="hover:text-green-400 transition-colors"
                >
                  +91 98765 43210
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
