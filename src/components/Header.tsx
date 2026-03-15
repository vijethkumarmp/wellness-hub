import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Brain } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'HOME' },
    { path: '/dashboard', label: 'DASHBOARD' },
    { path: '/articles', label: 'ARTICLES' },
    { path: '/resources', label: 'RESOURCES' },
    { path: '/contact', label: 'CONTACT' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary border-b border-secondary">
      <div className="max-w-[100rem] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <Brain className="w-8 h-8 text-accentmintgreen" />
            <span className="font-heading text-2xl text-primary-foreground uppercase tracking-wider">
              VITALMIND AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-heading text-sm uppercase tracking-wider transition-colors ${
                  isActive(link.path)
                    ? 'text-accentmintgreen'
                    : 'text-primary-foreground hover:text-accentmintgreen'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-primary-foreground hover:text-accentmintgreen transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-6 border-t border-secondary">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`font-heading text-lg uppercase tracking-wider transition-colors ${
                    isActive(link.path)
                      ? 'text-accentmintgreen'
                      : 'text-primary-foreground hover:text-accentmintgreen'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
