import { motion, type Variants } from 'framer-motion';
import type { ComponentProps, ReactNode } from 'react';

// One command in the About session: when it starts typing, how long it
// types for, and when its output appears (all in seconds).
export interface Step {
  text: string;
  start: number;
  typing: number;
  outputAt: number;
}

// Framer-motion eases take a 0..1 progress; snapping it to whole characters
// makes the clip reveal one character at a time, like typing.
const stepped = (characters: number) => (t: number) =>
  Math.floor(t * characters) / characters;

const typed = ({ text, start, typing }: Step): Variants => ({
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  visible: {
    clipPath: 'inset(0 0% 0 0)',
    transition: {
      delay: start,
      duration: typing,
      ease: stepped(Math.max(text.length, 1)),
    },
  },
});

const shown = ({ outputAt }: Step): Variants => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: outputAt, duration: 0 } },
});

export const Command = ({ prompt, step }: { prompt: string; step: Step }) => (
  <>
    <motion.span
      aria-hidden="true"
      className="text-brand-strong dark:text-brand-2"
      variants={shown({ ...step, outputAt: step.start })}
    >
      {prompt}
    </motion.span>{' '}
    <motion.span className="inline-block" variants={typed(step)}>
      {step.text}
    </motion.span>
  </>
);

export const Output = ({
  step,
  children,
  ...props
}: { step: Step; children: ReactNode } & ComponentProps<typeof motion.div>) => (
  <motion.div variants={shown(step)} {...props}>
    {children}
  </motion.div>
);
