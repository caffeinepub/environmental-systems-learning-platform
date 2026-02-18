import { useState } from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import { Menu, X, Leaf, User, GraduationCap } from 'lucide-react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useIsCallerAdmin } from '../../hooks/useQueries';
import { Button } from '../ui/button';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { identity, login, clear, loginStatus } = useInternetIdentity();
  const { data: isAdmin } = useIsCallerAdmin();
  const router = useRouterState();
  const currentPath = router.location.pathname;

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
    } else {
      try {
        await login();
      } catch (error: any) {
        console.error('Login error:', error);
        if (error.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/progress', label: 'Progress' },
  ];

  if (isAdmin) {
    navLinks.push({ to: '/teacher', label: 'Teacher Dashboard' });
  }

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-lg bg-gradient-to-br from-forestGreen to-moss text-white group-hover:shadow-nature transition-all">
              <Leaf className="w-5 h-5" />
            </div>
            <span className="font-display font-bold text-lg text-foreground hidden sm:inline">
              Environmental Systems
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  currentPath === link.to ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            <Button
              onClick={handleAuth}
              disabled={isLoggingIn}
              variant={isAuthenticated ? 'outline' : 'default'}
              size="sm"
              className="gap-2"
            >
              {isAuthenticated ? (
                <>
                  <User className="w-4 h-4" />
                  Logout
                </>
              ) : (
                <>
                  <GraduationCap className="w-4 h-4" />
                  {isLoggingIn ? 'Logging in...' : 'Login'}
                </>
              )}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentPath === link.to
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-secondary'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              <Button
                onClick={() => {
                  handleAuth();
                  setIsOpen(false);
                }}
                disabled={isLoggingIn}
                variant={isAuthenticated ? 'outline' : 'default'}
                size="sm"
                className="gap-2 w-full"
              >
                {isAuthenticated ? (
                  <>
                    <User className="w-4 h-4" />
                    Logout
                  </>
                ) : (
                  <>
                    <GraduationCap className="w-4 h-4" />
                    {isLoggingIn ? 'Logging in...' : 'Login'}
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
