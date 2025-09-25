import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import rootsRoutesLogo from "@/assets/roots-routes-logo.png";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Destinations", href: "/destinations" },
  { name: "AI Planner", href: "/ai-planner" },
  { name: "Marketplace", href: "/marketplace" },
  { name: "Virtual Tours", href: "/virtual-tours" },
  { name: "Community", href: "/community" },
  { name: "Analytics", href: "/analytics" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" }
];

const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिंदी" },
  { code: "ho", name: "Ho" }
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-elegant border-b"
          : "bg-transparent"
      )}
    >
      <nav className="container mx-auto px-4 py-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-5 group">
          <img
            src={rootsRoutesLogo}
            alt="Roots & Routes"
            className="h-[100px] w-[100px] transition-transform duration-300 group-hover:scale-110"
          />
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold text-nature">Roots & Routes</h1>
            <p className="text-xs text-muted-foreground -mt-1">Journey with Jharkhand</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-3">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                location.pathname === item.href
                  ? "bg-nature text-nature-foreground shadow-cultural"
                  : "text-foreground hover:bg-nature/10 hover:text-nature"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* Language Switcher */}
          <div className="relative group hidden md:block">
            <button className="flex items-center space-x-2 px-3 py-1 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
              <Globe className="h-4 w-4" />
              <span className="text-sm">{selectedLang.code.toUpperCase()}</span>
              <ChevronDown className="h-3 w-3" />
            </button>
            <div className="absolute right-0 top-full mt-2 py-2 bg-card border rounded-lg shadow-elegant opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setSelectedLang(lang)}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors"
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <Button
            className="hidden md:flex bg-gradient-accent hover:shadow-golden animate-bounce-gentle"
            asChild
          >
            <Link to="/ai-planner">Start AI Journey</Link>
          </Button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden bg-background/95 backdrop-blur-md border-t">
          <div className="container mx-auto px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                  location.pathname === item.href
                    ? "bg-nature text-nature-foreground"
                    : "text-foreground hover:bg-nature/10 hover:text-nature"
                )}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 border-t">
              <Button
                className="w-full bg-gradient-accent hover:shadow-golden"
                asChild
              >
                <Link to="/ai-planner">Start AI Journey</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}