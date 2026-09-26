import { Link } from 'react-scroll';

export const NavItem: React.FC<{
  href: string;
  label: string;
  className?: string;
  onClick?: () => void;
}> = ({ href, label, className = '', onClick }) => (
  <Link
    spy
    smooth
    duration={500}
    to={href}
    href={href}
    onClick={onClick}
    activeClass="text-secondary-light dark:text-secondary-dark font-medium underline"
    className={`nav-item group relative transition-colors ${className}`}
  >
    {label}
  </Link>
);
