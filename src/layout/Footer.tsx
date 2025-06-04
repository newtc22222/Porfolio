import { FULLNAME } from '../constants/self-information';

export const Footer = () => (
  <footer className="bg-background-light dark:bg-background-dark border-t border-gray-200 dark:border-gray-800">
    <div className="container-fluid flex h-[94px] items-center justify-center">
      <div className="text-center">
        <p className="text-primary-light dark:text-primary-dark">
          © {new Date().getFullYear()} {FULLNAME}. All rights reserved.
        </p>
        <p className="text-secondary-light dark:text-secondary-dark mt-2 text-sm">
          Built with React & Tailwind CSS
        </p>
      </div>
    </div>
  </footer>
);
