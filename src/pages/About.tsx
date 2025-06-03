import { Element } from "react-scroll";
import { motion } from "framer-motion";

export const About = () => (
  <Element name="#about">
    <section
      id="about"
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
            $ whoami
          </h2>
          <p className="text-secondary-light dark:text-secondary-dark text-lg">
            Let me tell you a bit about myself...
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Fun Facts Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-gray-800/50 p-6 rounded-lg shadow-lg
                     border-2 border-dashed border-primary-light/20 dark:border-primary-dark/20"
          >
            <h3 className="text-2xl font-bold mb-4 text-primary-light dark:text-primary-dark">
              Fun Facts.json
            </h3>
            <ul className="space-y-3 text-secondary-light dark:text-secondary-dark">
              <li className="flex items-center">
                <span className="text-xl mr-2">🎮</span>
                <span>Casual gamer who believes in "just one more turn"</span>
              </li>
              <li className="flex items-center">
                <span className="text-xl mr-2">☕</span>
                <span>Powered by coffee and curiosity</span>
              </li>
              <li className="flex items-center">
                <span className="text-xl mr-2">🐛</span>
                <span>Bug hunter by day, bug creator by night</span>
              </li>
              <li className="flex items-center">
                <span className="text-xl mr-2">🎵</span>
                <span>Coding playlist: Lofi beats + Keyboard clicks</span>
              </li>
            </ul>
          </motion.div>

          {/* About Text Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white dark:bg-gray-800/50 p-6 rounded-lg shadow-lg
                     border-2 border-dashed border-primary-light/20 dark:border-primary-dark/20"
          >
            <div className="flex items-center mb-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="ml-4 text-xs text-secondary-light dark:text-secondary-dark">
                about.txt
              </span>
            </div>
            <div className="font-mono space-y-2 text-secondary-light dark:text-secondary-dark">
              <p>
                <span className="text-accent-light dark:text-accent-dark">
                  &gt;_
                </span>{" "}
                Passionate developer who loves creating cool stuff
              </p>
              <p>
                <span className="text-accent-light dark:text-accent-dark">
                  &gt;_
                </span>{" "}
                Believes in writing code that humans can understand
              </p>
              <p>
                <span className="text-accent-light dark:text-accent-dark">
                  &gt;_
                </span>{" "}
                Always learning, forever curious
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  </Element>
);
