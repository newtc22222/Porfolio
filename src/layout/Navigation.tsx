import { Link } from "react-scroll";
import { ThemeToggle } from "../components/ThemeToggle";

const NavItem: React.FC<{ href: string; label: string }> = ({
  href,
  label,
}) => (
  <Link
    spy
    smooth
    duration={500}
    to={href}
    activeClass="text-secondary font-medium"
    className="text-primary hover:text-secondary transition-colors cursor-pointer relative group"
  >
    {label}
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all group-[.active]:w-full"></span>
  </Link>
);

const pages = [
  { href: "#home", label: "Home" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#blog", label: "Blog" },
  { href: "#about", label: "About" },
  { href: "#achievements", label: "Achievements" },
  { href: "#contact", label: "Contact" },
];

export const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            spy
            to="#home"
            smooth
            duration={500}
            activeClass="!text-secondary-light dark:!text-secondary-dark"
            className="text-primary-light dark:text-primary-dark font-bold text-xl cursor-pointer transition-all"
          >
            Portfolio
          </Link>
          <div className="hidden md:flex space-x-6 items-center">
            {pages.map((page) => (
              <NavItem key={page.href} href={page.href} label={page.label} />
            ))}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};
