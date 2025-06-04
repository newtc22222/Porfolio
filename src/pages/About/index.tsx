import { Element } from 'react-scroll';
import { motion } from 'framer-motion';
import { FunFactsCard } from './FunFactsCard';
import { AboutTextCard } from './AboutTextCard';

export const About = () => (
  <Element name="#about">
    <section id="about" className="section-background">
      <div className="container mx-auto max-w-4xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-primary-light dark:text-primary-dark mb-4 text-4xl font-bold">
            $ whoami
          </h2>
          <p className="text-secondary-light dark:text-secondary-dark text-lg">
            Let me tell you a bit about myself...
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          <FunFactsCard />
          <AboutTextCard />
        </div>
      </div>
    </section>
  </Element>
);
