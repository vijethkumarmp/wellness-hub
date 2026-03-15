import { Link } from 'react-router-dom';
import { Brain, Mail, Shield, Heart, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Articles', path: '/articles' },
    { label: 'Resources', path: '/resources' },
    { label: 'Contact', path: '/contact' }
  ];

  const features = [
    'Predictive Intelligence',
    'Mind-Body Unity',
    'Privacy First',
    'Real-time Tracking'
  ];

  return (
    <footer className="w-full bg-primary border-t border-secondary/20">
      <div className="max-w-[120rem] mx-auto px-6 lg:px-12 py-20">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Brain className="w-8 h-8 text-accentmintgreen" />
              <div>
                <span className="font-heading text-lg text-primary-foreground uppercase font-bold">
                  VITALMIND
                </span>
                <span className="block font-heading text-xs text-accentmintgreen uppercase">
                  AI
                </span>
              </div>
            </div>
            <p className="font-paragraph text-sm text-primary-foreground/70 mb-4 leading-relaxed">
              Proactive holistic health intelligence that predicts, prevents, and personalizes your wellbeing journey.
            </p>
            <p className="font-heading text-xs text-accentmintgreen uppercase tracking-widest">
              Know Before It Happens
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="font-heading text-sm text-primary-foreground uppercase mb-6 tracking-widest font-bold">
              NAVIGATION
            </h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="font-paragraph text-sm text-primary-foreground/70 hover:text-accentmintgreen transition-colors flex items-center gap-2 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-heading text-sm text-primary-foreground uppercase mb-6 tracking-widest font-bold">
              KEY FEATURES
            </h3>
            <ul className="space-y-3">
              {features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Heart className="w-4 h-4 text-accentmintgreen flex-shrink-0 mt-0.5" />
                  <span className="font-paragraph text-sm text-primary-foreground/70">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="font-heading text-sm text-primary-foreground uppercase mb-6 tracking-widest font-bold">
              GET IN TOUCH
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-accentmintgreen flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-paragraph text-sm text-primary-foreground/70 mb-2">
                    Have questions?
                  </p>
                  <Link
                    to="/contact"
                    className="font-heading text-xs text-accentmintgreen hover:text-primary-foreground transition-colors uppercase tracking-wider"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-accentmintgreen flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-paragraph text-sm text-primary-foreground/70">
                    Privacy-first design
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-8 border-t border-secondary/20"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="font-paragraph text-sm text-primary-foreground/60">
              © {currentYear} VitalMind AI. All rights reserved.
            </p>
            <div className="flex gap-8">
              <Link
                to="/contact"
                className="font-paragraph text-sm text-primary-foreground/60 hover:text-accentmintgreen transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/contact"
                className="font-paragraph text-sm text-primary-foreground/60 hover:text-accentmintgreen transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
