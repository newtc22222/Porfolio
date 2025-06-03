import { FULLNAME } from "../constants/self-information";

export const Footer = () => (
  <footer className="bg-gray-800 text-white p-4 text-center">
    <p>
      ©{new Date().getFullYear()} {FULLNAME}. All rights reserved.
    </p>
  </footer>
);
