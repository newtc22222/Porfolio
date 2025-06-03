import { useState } from "react";
import { Element } from "react-scroll";
import { motion } from "framer-motion";

import { EMAIL } from "../constants/self-information";

export const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit: React.FormEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    console.log({ name, email, message });
  };

  return (
    <Element name="#contact">
      <section
        id="contact"
        className="py-20 bg-gradient-to-b from-background-light/90 to-background-light/70 
                  dark:from-background-dark/90 dark:to-background-dark/70 backdrop-blur-sm"
      >
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 text-primary-light dark:text-primary-dark">
              Get in Touch
            </h2>
            <p className="text-secondary-light dark:text-secondary-dark mb-2">
              Feel free to reach out for collaborations or just a friendly hello
            </p>
            <p className="text-primary-light dark:text-primary-dark font-medium">
              {EMAIL}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-800 p-8 shadow-lg backdrop-blur-sm"
          >
            <form className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700
                           bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100
                           placeholder-gray-500 dark:placeholder-gray-400
                           focus:outline-none focus:ring-2 focus:ring-primary-light/20 dark:focus:ring-primary-dark/20
                           focus:border-primary-light dark:focus:border-primary-dark
                           transition-shadow duration-200"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700
                           bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100
                           placeholder-gray-500 dark:placeholder-gray-400
                           focus:outline-none focus:ring-2 focus:ring-primary-light/20 dark:focus:ring-primary-dark/20
                           focus:border-primary-light dark:focus:border-primary-dark
                           transition-shadow duration-200"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  placeholder="Your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700
                           bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100
                           placeholder-gray-500 dark:placeholder-gray-400
                           focus:outline-none focus:ring-2 focus:ring-primary-light/20 dark:focus:ring-primary-dark/20
                           focus:border-primary-light dark:focus:border-primary-dark
                           transition-shadow duration-200 resize-none"
                />
              </div>

              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700
                         bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100
                         hover:bg-gray-50 dark:hover:bg-gray-800 hover:cursor-pointer
                         focus:outline-none focus:ring-2 focus:ring-primary-light/20 dark:focus:ring-primary-dark/20
                         focus:border-primary-light dark:focus:border-primary-dark
                         transition-all duration-200 font-medium"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </Element>
  );
};
