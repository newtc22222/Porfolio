import { BADGES } from './badges';

const ALL_PAGES = [
  { href: '#home', label: 'Home' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#blog', label: 'Blogs' },
  { href: '#experience', label: 'Experiences' },
  { href: '#education', label: 'Education' },
  { href: '#about', label: 'About' },
  { href: '#badges', label: 'Badges' },
  { href: '#contact', label: 'Contact' },
];

// The Badges section is only rendered once there is at least one badge.
export const NAV_PAGES = ALL_PAGES.filter(
  (page) => page.href !== '#badges' || BADGES.length > 0
);
