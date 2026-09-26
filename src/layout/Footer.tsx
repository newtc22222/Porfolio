import { useEffect, useRef, useState } from 'react';
import { animateScroll } from 'react-scroll';
import { AnimatePresence, motion } from 'framer-motion';
import {
  EMAIL,
  FULLNAME,
  INITIALS,
  JOB_TITLE,
  SOCIAL_LINKS,
} from '../constants/self-information';

const SOCIALS = [
  {
    label: 'LinkedIn',
    href: SOCIAL_LINKS.LINKEDIN,
    path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  },
  {
    label: 'GitHub',
    href: SOCIAL_LINKS.GITHUB,
    path: 'M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z',
  },
  {
    label: 'GitLab',
    href: SOCIAL_LINKS.GITLAB,
    path: 'M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 01-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 014.82 2a.43.43 0 01.58 0 .42.42 0 01.11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0118.6 2a.43.43 0 01.58 0 .42.42 0 01.11.18l2.44 7.51L23 13.45a.84.84 0 01-.35.94z',
  },
  {
    label: 'Facebook',
    href: SOCIAL_LINKS.FACEBOOK,
    path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
  },
];

const COPIED_TIMEOUT_MS = 2000;

// The footer is an inverted band: dark slate in light mode, the raised
// surface in dark mode. The email is its one call to action.
export const Footer = () => {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      // Clipboard blocked: the address stays visible and is a mailto link.
      return;
    }
    setCopied(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopied(false), COPIED_TIMEOUT_MS);
  };

  const iconButton =
    'focus-visible:ring-brand-2/60 flex h-10 w-10 items-center justify-center rounded-full text-white/70 transition-colors duration-200 hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:outline-none';

  return (
    <footer className="bg-primary-light dark:bg-surface-dark border-t border-transparent text-white dark:border-white/10">
      <div className="container mx-auto px-4 pt-14 pb-24 sm:pb-8">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="bg-brand-2 text-primary-light flex h-10 w-10 items-center justify-center rounded-full rounded-bl-md text-sm font-extrabold tracking-tight"
            >
              {INITIALS}
            </span>
            <div>
              <p className="text-lg leading-tight font-bold">{FULLNAME}</p>
              <p className="text-sm text-white/65">{JOB_TITLE}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() =>
              animateScroll.scrollToTop({ duration: 500, smooth: true })
            }
            className="focus-visible:ring-brand-2/60 flex items-center gap-2 rounded-full py-2 pr-2 pl-4 text-sm font-medium text-white/80 transition-colors hover:cursor-pointer hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:outline-none"
          >
            Back to top
            <span
              aria-hidden="true"
              className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </span>
          </button>
        </div>

        <div className="mt-12 mb-12">
          <p className="mb-2 text-sm text-white/65">
            Have a project or a role in mind? Write to me.
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
            <a
              href={`mailto:${EMAIL}`}
              className="decoration-brand-2 focus-visible:ring-brand-2/60 hover:text-brand-2 rounded-sm text-2xl font-bold tracking-tight break-all underline decoration-2 underline-offset-8 transition-colors focus-visible:ring-2 focus-visible:outline-none sm:text-4xl"
            >
              {EMAIL}
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="focus-visible:ring-brand-2/60 relative inline-flex h-9 min-w-[5.5rem] items-center justify-center gap-1.5 overflow-hidden rounded-full border border-white/20 px-3 text-sm font-medium text-white/85 transition-colors hover:cursor-pointer hover:border-white/40 hover:text-white focus-visible:ring-2 focus-visible:outline-none"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={copied ? 'copied' : 'copy'}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className={copied ? 'text-brand-2' : undefined}
                >
                  {copied ? 'Copied' : 'Copy'}
                </motion.span>
              </AnimatePresence>
            </button>
            <span role="status" className="sr-only">
              {copied ? 'Email address copied' : ''}
            </span>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white/55">
            © {new Date().getFullYear()} {FULLNAME}. Built with React and
            Tailwind CSS.
          </p>
          <ul className="-ml-2.5 flex items-center gap-1 sm:mr-20 sm:ml-0">
            {SOCIALS.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${social.label} (opens in a new tab)`}
                  title={social.label}
                  className={iconButton}
                >
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d={social.path} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};
