import { Link } from 'react-scroll';
import { NavItem } from './NavItem';

import { NAV_PAGES } from '../../mocks/pages';
import { ThemeToggle } from '../../components/ThemeToggle';

export const Navigation = () => {
  return (
    <nav className="bg-background-light/80 dark:bg-background-dark/80 border-primary-light/20 dark:border-primary-dark/20 fixed top-0 right-0 left-0 z-50 border-b backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link
            spy
            to="#home"
            smooth
            duration={500}
            className="nav-item text-xl font-bold transition-all"
          >
            Portfolio
          </Link>
          <div className="hidden items-center space-x-6 md:flex">
            {NAV_PAGES.map((page) => (
              <NavItem key={page.href} href={page.href} label={page.label} />
            ))}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};
