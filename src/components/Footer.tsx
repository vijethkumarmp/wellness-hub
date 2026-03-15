import { Link } from 'react-router-dom';
import { Brain, Mail, Shield, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-footerbackground">
      <div className="max-w-[100rem] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Brain className="w-8 h-8 text-accentmintgreen" />
              <span className="font-heading text-2xl text-primary-foreground uppercase">
                VITALMIND AI
              </span>
            </div>
            <p className="font-paragraph text-primary-foreground mb-4">
              Proactive holistic health intelligence that predicts, prevents, and personalizes your wellbeing journey.
            </p>
            <p className="font-heading text-sm text-accentmintgreen uppercase">
              Know Before It Happens
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg text-primary-foreground uppercase mb-6">
              QUICK LINKS
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/dashboard" className="font-paragraph text-primary-foreground hover:text-accentmintgreen transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/articles" className="font-paragraph text-primary-foreground hover:text-accentmintgreen transition-colors">
                  Health Articles
                </Link>
              </li>
              <li>
                <Link to="/resources" className="font-paragraph text-primary-foreground hover:text-accentmintgreen transition-colors">
                  Wellness Resources
                </Link>
              </li>
              <li>
                <Link to="/contact" className="font-paragraph text-primary-foreground hover:text-accentmintgreen transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="font-heading text-lg text-primary-foreground uppercase mb-6">
              KEY FEATURES
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Heart className="w-5 h-5 text-accentmintgreen flex-shrink-0 mt-0.5" />
                <span className="font-paragraph text-primary-foreground">
                  Predictive Health Intelligence
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Heart className="w-5 h-5 text-accentmintgreen flex-shrink-0 mt-0.5" />
                <span className="font-paragraph text-primary-foreground">
                  Mind-Body Unity Tracking
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Heart className="w-5 h-5 text-accentmintgreen flex-shrink-0 mt-0.5" />
                <span className="font-paragraph text-primary-foreground">
                  Vitality Index Scoring
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Shield className="w-5 h-5 text-accentmintgreen flex-shrink-0 mt-0.5" />
                <span className="font-paragraph text-primary-foreground">
                  Privacy-First Design
                </span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading text-lg text-primary-foreground uppercase mb-6">
              GET IN TOUCH
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-accentmintgreen flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-paragraph text-primary-foreground">
                    Have questions about your health journey?
                  </p>
                  <Link to="/contact" className="font-paragraph text-accentmintgreen hover:underline">
                    Submit a question
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-paragraph text-primary-foreground text-sm">
              © {currentYear} VitalMind AI. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/contact" className="font-paragraph text-primary-foreground text-sm hover:text-accentmintgreen transition-colors">
                Privacy Policy
              </Link>
              <Link to="/contact" className="font-paragraph text-primary-foreground text-sm hover:text-accentmintgreen transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
