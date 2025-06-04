import { Link } from 'react-scroll';

export const NavItem: React.FC<{ href: string; label: string }> = ({
  href,
  label,
}) => (
  <Link
    spy
    smooth
    duration={500}
    to={href}
    activeClass="text-secondary-light dark:text-secondary-dark font-medium underline"
    className="nav-item group relative transition-colors"
  >
    {label}
  </Link>
);
