'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';
import { ThemeToggle } from './theme-toggle';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const services = [
  { name: 'vCISO', href: '/vciso' },
  { name: 'ATOaaS', href: '/atoaas' },
  { name: 'NIST RMF', href: '/nist' },
];

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Services', items: services },
  { name: 'Assessment', href: '/assessment' },
  { name: 'Contact', href: '/contact' },  
  { name: 'About', href: '/about' },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              FoxxCyber
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigation.map((item) => (
            item.items ? (
              <DropdownMenu key={item.name}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-1">
                    {item.name}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center">
                  {item.items.map((service) => (
                    <DropdownMenuItem key={service.href} asChild>
                      <Link href={service.href}>{service.name}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                key={item.href}
                variant={pathname === item.href ? 'default' : 'ghost'}
                className={`transition-all duration-200 ${
                  pathname === item.href
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'hover:bg-accent hover:text-accent-foreground'
                }`}
                asChild
              >
                <Link href={item.href}>{item.name}</Link>
              </Button>
            )
          ))}
          <ThemeToggle />
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-2 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="hover:bg-accent hover:text-accent-foreground"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}
      >
        <nav className="container px-4 py-3 space-y-1">
          {navigation.map((item) => (
            item.items ? (
              <div key={item.name} className="space-y-1">
                <div className="px-2 py-1.5 text-sm font-medium text-muted-foreground">
                  {item.name}
                </div>
                {item.items.map((service) => (
                  <Button
                    key={service.href}
                    variant={pathname === service.href ? 'default' : 'ghost'}
                    className={`w-full justify-start transition-all duration-200 ${
                      pathname === service.href
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                        : 'hover:bg-accent hover:text-accent-foreground'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                    asChild
                  >
                    <Link href={service.href}>{service.name}</Link>
                  </Button>
                ))}
              </div>
            ) : (
              <Button
                key={item.href}
                variant={pathname === item.href ? 'default' : 'ghost'}
                className={`w-full justify-start transition-all duration-200 ${
                  pathname === item.href
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'hover:bg-accent hover:text-accent-foreground'
                }`}
                onClick={() => setMobileMenuOpen(false)}
                asChild
              >
                <Link href={item.href}>{item.name}</Link>
              </Button>
            )
          ))}
        </nav>
      </div>
    </header>
  );
}