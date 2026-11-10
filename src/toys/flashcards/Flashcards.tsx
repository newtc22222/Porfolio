import { useState, type KeyboardEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Flip } from '../../components/motion';
import { rate, type Rating } from './queue';
import { CARDS, type Card } from './sample';

// A swipe further than this many px rates the card.
const SWIPE = 80;

const cardFace =
  'bg-card-light dark:bg-card-dark border-card-edge-light dark:border-card-edge-dark text-primary-light dark:text-primary-dark flex h-full w-full flex-col items-center justify-center rounded-xl border px-4 text-center';

const key =
  'border-card-edge-light dark:border-card-edge-dark rounded border px-1.5 py-0.5 font-mono text-[0.6875rem]';

const Face = ({ card, side }: { card: Card; side: 'front' | 'back' }) => (
  <div className={cardFace}>
    <span className="text-secondary-light dark:text-secondary-dark absolute top-3 left-4 text-xs font-semibold tracking-wide uppercase">
      {card.tag}
    </span>
    {side === 'front' ? (
      <>
        <span lang="und" className="text-4xl font-bold tracking-tight">
          {card.front}
        </span>
        {card.reading && (
          <span className="text-secondary-light dark:text-secondary-dark mt-2 text-sm">
            {card.reading}
          </span>
        )}
      </>
    ) : (
      <span className="text-brand-strong dark:text-brand-2 text-3xl font-bold tracking-tight">
        {card.back}
      </span>
    )}
  </div>
);

// The LinguFlow toy: a small stack of flashcards driven from the keyboard.
// Space flips, the arrow keys rate, and a card rated "again" comes back
// after two others. It runs on sample data and calls nothing.
const Flashcards = () => {
  const reducedMotion = useReducedMotion();
  const [queue, setQueue] = useState<Card[]>(CARDS);
  const [flipped, setFlipped] = useState(false);
  const [status, setStatus] = useState('');
  const card = queue[0];

  const flip = () => {
    setFlipped((value) => !value);
    setStatus('');
  };

  const rateCard = (rating: Rating) => {
    if (!flipped) return;
    setQueue((current) => rate(current, rating));
    setFlipped(false);
    setStatus(
      rating === 'good'
        ? 'Good: to the back of the stack.'
        : 'Again: it comes back after two cards.'
    );
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      rateCard(event.key === 'ArrowRight' ? 'good' : 'again');
      return;
    }
    // On a button, Space and Enter already press that button.
    if (event.target !== event.currentTarget) return;
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      flip();
    }
  };

  const rateButton = (rating: Rating, label: string) => (
    <button
      type="button"
      aria-disabled={!flipped}
      onClick={() => rateCard(rating)}
      className={`border-card-edge-light dark:border-card-edge-dark text-primary-light dark:text-primary-dark focus-visible:outline-brand rounded-full border px-4 py-1.5 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 ${
        flipped
          ? 'bg-card-light dark:bg-card-dark cursor-pointer'
          : 'cursor-not-allowed opacity-45'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div
        role="group"
        aria-roledescription="flashcard"
        aria-label={`Flashcard toy. ${card.tag}: ${card.front}`}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="focus-visible:outline-brand w-full max-w-[21rem] rounded-2xl p-2 focus-visible:outline-2 focus-visible:outline-offset-4"
      >
        <div className="relative mx-auto h-48 w-full">
          {/* The rest of the stack, as two offset card edges. */}
          <div
            aria-hidden="true"
            className="bg-card-light dark:bg-card-dark border-card-edge-light dark:border-card-edge-dark absolute inset-0 translate-x-3 translate-y-3 rotate-2 rounded-xl border"
          />
          <div
            aria-hidden="true"
            className="bg-card-light dark:bg-card-dark border-card-edge-light dark:border-card-edge-dark absolute inset-0 translate-x-1.5 translate-y-1.5 rotate-1 rounded-xl border"
          />
          <motion.div
            key={card.id}
            className="absolute inset-0 touch-pan-y drop-shadow-[0_10px_10px_rgb(0_0_0/0.18)]"
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            drag={flipped && !reducedMotion ? 'x' : false}
            dragSnapToOrigin
            onDragEnd={(_event, info) => {
              if (info.offset.x > SWIPE) rateCard('good');
              else if (info.offset.x < -SWIPE) rateCard('again');
            }}
            onClick={flip}
          >
            <Flip
              flipped={flipped}
              className="h-full w-full cursor-pointer"
              front={<Face card={card} side="front" />}
              back={<Face card={card} side="back" />}
            />
          </motion.div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2">
          {rateButton('again', 'Again')}
          <button
            type="button"
            onClick={flip}
            className="bg-brand-strong dark:bg-brand-2 dark:text-background-dark focus-visible:outline-brand cursor-pointer rounded-full rounded-bl-md px-5 py-1.5 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Flip
          </button>
          {rateButton('good', 'Good')}
        </div>

        <p
          aria-hidden="true"
          className="text-secondary-light dark:text-secondary-dark mt-3 hidden h-5 items-center justify-center gap-1.5 text-xs [@media(pointer:fine)]:flex"
        >
          {status || (
            <>
              <kbd className={key}>Space</kbd> flip
              <kbd className={`${key} ml-2`}>←</kbd> again
              <kbd className={`${key} ml-2`}>→</kbd> good
            </>
          )}
        </p>
        <p
          aria-hidden="true"
          className="text-secondary-light dark:text-secondary-dark mt-3 h-5 text-center text-xs [@media(pointer:fine)]:hidden"
        >
          {status || 'Tap to flip, then swipe or rate.'}
        </p>

        <p className="sr-only" aria-live="polite">
          {flipped ? `Answer: ${card.back}.` : status}
        </p>
      </div>
    </div>
  );
};

export default Flashcards;
