import { Element } from 'react-scroll';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { FULLNAME, JOB_TITLE } from '../../constants/self-information';
import { FACTS, FUN_FACTS } from '../../mocks/facts';
import { Command, Output, type Step } from './Terminal';

const PROMPT = `${FULLNAME.split(/\s+/)[0].toLowerCase()}@portfolio:~$`;

// Seconds per typed character, and the pauses around each command's output.
const TYPE_SPEED = 0.04;
const OUTPUT_PAUSE = 0.2;
const NEXT_PAUSE = 0.35;

const COMMANDS = ['whoami', 'cat about.txt', 'cat fun-facts.json', ''];

// Work out when each command starts typing and when its output appears, so
// the session plays as one sequence.
const STEPS: Step[] = COMMANDS.reduce<Step[]>((steps, text) => {
  const prev = steps[steps.length - 1];
  const start = prev ? prev.outputAt + NEXT_PAUSE : 0.3;
  const typing = text.length * TYPE_SPEED;
  steps.push({ text, start, typing, outputAt: start + typing + OUTPUT_PAUSE });
  return steps;
}, []);

const session: Variants = { hidden: {}, visible: {} };

export const About = () => {
  const reducedMotion = useReducedMotion();
  const [whoami, aboutTxt, funFacts, idle] = STEPS;

  return (
    <Element name="#about">
      <section
        id="about"
        className="bg-term-light dark:bg-term-dark py-24 font-mono"
      >
        <motion.div
          className="text-primary-light dark:text-primary-dark mx-auto max-w-4xl px-4 text-[0.875rem] leading-7 sm:px-6 sm:text-[0.9375rem]"
          variants={session}
          initial={reducedMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-2xl leading-tight font-semibold sm:text-4xl">
            <Command prompt={PROMPT} step={whoami} />
          </h2>
          <Output step={whoami} className="mt-3">
            <p>
              {FULLNAME}, {JOB_TITLE}
            </p>
          </Output>

          <p className="mt-10">
            <Command prompt={PROMPT} step={aboutTxt} />
          </p>
          <Output step={aboutTxt} className="mt-2">
            {FACTS.map((fact) => (
              <p key={fact} className="ps-[2ch] -indent-[2ch]">
                {fact}
              </p>
            ))}
          </Output>

          <p className="mt-10">
            <Command prompt={PROMPT} step={funFacts} />
          </p>
          <Output step={funFacts} className="mt-2">
            <p className="text-secondary-light dark:text-secondary-dark">[</p>
            <ul className="ps-[2ch]">
              {FUN_FACTS.map((fact, index) => (
                <li key={fact.text} className="ps-[1ch] -indent-[1ch]">
                  <span className="text-brand-strong dark:text-brand-2">
                    &quot;{fact.icon} {fact.text.replace(/"/g, '\\"')}&quot;
                  </span>
                  {index < FUN_FACTS.length - 1 && (
                    <span className="text-secondary-light dark:text-secondary-dark">
                      ,
                    </span>
                  )}
                </li>
              ))}
            </ul>
            <p className="text-secondary-light dark:text-secondary-dark">]</p>
          </Output>

          <Output step={idle} className="mt-10" aria-hidden="true">
            <p>
              <span className="text-brand-strong dark:text-brand-2">
                {PROMPT}
              </span>{' '}
              <span className="term-cursor bg-primary-light dark:bg-primary-dark inline-block h-[1.1em] w-[0.6em] translate-y-[0.2em]" />
            </p>
          </Output>
        </motion.div>
      </section>
    </Element>
  );
};
