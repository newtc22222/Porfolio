import { BADGES } from './badges';

const ALL_PAGES = [
  { href: '#home', label: 'Home' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#education', label: 'Education' },
  { href: '#badges', label: 'Badges' },
  { href: '#blog', label: 'Blog' },
  { href: '#about', label: 'About' },
];

// The Badges section is only rendered once there is at least one badge.
export const NAV_PAGES = ALL_PAGES.filter(
  (page) => page.href !== '#badges' || BADGES.length > 0
);
