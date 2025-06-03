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
            <p className="text-accent-light dark:text-accent-dark font-medium">
              {EMAIL}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg max-w-2xl mx-auto"
          >
            <form className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-4 rounded-lg border border-gray-200 dark:border-gray-700 
                           bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark
                           focus:border-transparent outline-none transition-all"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-4 rounded-lg border border-gray-200 dark:border-gray-700 
                           bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark
                           focus:border-transparent outline-none transition-all"
                />
              </div>
              <div>
                <textarea
                  placeholder="Your Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  className="w-full p-4 rounded-lg border border-gray-200 dark:border-gray-700 
                           bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white
                           focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark
                           focus:border-transparent outline-none transition-all resize-none"
                ></textarea>
              </div>
              <button
                onClick={handleSubmit}
                className="w-full bg-primary-light dark:bg-primary-dark dark:text-white border py-4 px-8 hover:cursor-pointer
                         rounded-lg font-medium hover:bg-secondary-light dark:hover:bg-secondary-dark 
                         transform hover:scale-[1.02] transition-all duration-300 
                         focus:outline-none focus:ring-2 focus:ring-offset-2 
                         focus:ring-primary-light dark:focus:ring-primary-dark"
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
