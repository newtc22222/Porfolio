import { Link } from 'react-scroll';
import { motion } from 'framer-motion';

// The active item is marked by a brand "speech bubble" (one squared corner,
// like the contact bubble) that slides between items via a shared layoutId.
export const NavItem = ({
  href,
  label,
  isActive,
  onActive,
  onClick,
  variant = 'bar',
}: {
  href: string;
  label: string;
  isActive: boolean;
  onActive: (href: string) => void;
  onClick?: () => void;
  variant?: 'bar' | 'menu';
}) => (
  <Link
    spy
    smooth
    duration={500}
    to={href}
    href={href}
    onClick={onClick}
    onSetActive={onActive}
    aria-current={isActive ? 'location' : undefined}
    className={`focus-visible:ring-brand/50 dark:focus-visible:ring-brand-2/50 relative isolate block cursor-pointer rounded-full rounded-bl-md font-medium transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none ${
      variant === 'bar' ? 'px-3 py-1.5 text-sm' : 'py-3 pr-4 pl-5 text-base'
    } ${
      isActive
        ? variant === 'bar'
          ? 'dark:text-background-dark text-white'
          : 'text-brand-strong dark:text-brand-2'
        : 'text-secondary-light hover:text-primary-light dark:text-secondary-dark dark:hover:text-primary-dark'
    }`}
  >
    {isActive &&
      (variant === 'bar' ? (
        <motion.span
          layoutId="nav-active-bubble"
          aria-hidden="true"
          className="bg-brand-strong dark:bg-brand-2 absolute inset-0 -z-10 rounded-full rounded-bl-md"
          transition={{ type: 'spring', bounce: 0.2, duration: 0.45 }}
        />
      ) : (
        <span
          aria-hidden="true"
          className="bg-brand-strong dark:bg-brand-2 absolute inset-y-3 left-1 w-1 rounded-full"
        />
      ))}
    {label}
  </Link>
);
