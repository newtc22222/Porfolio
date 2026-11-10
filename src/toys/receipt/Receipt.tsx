import { useState } from 'react';
import { Pickup, Tear } from '../../components/motion';
import { DISHES, PEOPLE } from './sample';
import { formatVnd, splitBill, type Dish } from './split';

const paper =
  'bg-receipt-light dark:bg-receipt-dark text-receipt-ink-light dark:text-receipt-ink-dark';

const focusRing =
  'focus-visible:outline-brand-strong focus-visible:outline-2 focus-visible:outline-offset-2';

// A dotted leader between a label and its amount.
const Leader = () => (
  <span
    aria-hidden="true"
    className="border-receipt-ink-light/40 mx-2 flex-1 translate-y-[-0.3em] border-b border-dotted"
  />
);

// The FF RESTaurent toy: mark who had which dish, then tear the receipt
// into one strip per person. It runs on sample data and calls nothing.
const Receipt = () => {
  const [dishes, setDishes] = useState<Dish[]>(DISHES);
  const [torn, setTorn] = useState(false);

  const total = dishes.reduce((sum, dish) => sum + dish.price, 0);
  const shares = splitBill(dishes, PEOPLE);

  const toggle = (dishId: string, person: string) =>
    setDishes((current) =>
      current.map((dish) =>
        dish.id !== dishId
          ? dish
          : {
              ...dish,
              eaters: dish.eaters.includes(person)
                ? dish.eaters.filter((eater) => eater !== person)
                : [...dish.eaters, person],
            }
      )
    );

  const printAgain = () => {
    setDishes(DISHES);
    setTorn(false);
  };

  return (
    <div className="flex h-full items-center justify-center">
      <Pickup
        rotate={-1.5}
        drag
        onDragOut={printAgain}
        className="w-full max-w-[21rem]"
      >
        <section
          aria-label="Bill splitting toy"
          className="font-mono text-[0.75rem] leading-5 drop-shadow-[0_14px_14px_rgb(0_0_0/0.22)]"
        >
          <div className={`${paper} px-4 pt-4 pb-2`}>
            <p className="text-center text-[0.8125rem] font-semibold tracking-wide">
              FF RESTaurent
            </p>
            <p className="text-center opacity-70">
              {torn
                ? `${formatVnd(total)}, split ${PEOPLE.length} ways`
                : 'Mark who had what. Unmarked dishes are shared.'}
            </p>
          </div>

          {torn ? (
            <Tear
              torn
              pieces={PEOPLE.map((person) => (
                <div
                  key={person}
                  className={`${paper} receipt-edge flex items-baseline px-4 pt-2.5 pb-4`}
                >
                  <span className="font-semibold">{person}</span>
                  <Leader />
                  <span>{formatVnd(shares[person])}</span>
                </div>
              ))}
            />
          ) : (
            <div className={`${paper} receipt-edge px-4 pb-5`}>
              <ul>
                {dishes.map((dish) => (
                  <li
                    key={dish.id}
                    className="border-receipt-ink-light/15 border-t border-dashed py-1.5"
                  >
                    <div className="flex items-baseline">
                      <span>{dish.name}</span>
                      <Leader />
                      <span>{formatVnd(dish.price)}</span>
                    </div>
                    <div
                      role="group"
                      aria-label={`Who had ${dish.name}`}
                      className="mt-1 flex gap-1.5"
                    >
                      {PEOPLE.map((person) => {
                        const pressed = dish.eaters.includes(person);
                        return (
                          <button
                            key={person}
                            type="button"
                            aria-pressed={pressed}
                            onClick={() => toggle(dish.id, person)}
                            className={`h-7 min-w-11 cursor-pointer rounded-full border px-2 ${focusRing} ${
                              pressed
                                ? 'bg-receipt-ink-light border-receipt-ink-light text-receipt-light'
                                : 'border-receipt-ink-light/45 hover:border-receipt-ink-light'
                            }`}
                          >
                            {person}
                          </button>
                        );
                      })}
                    </div>
                  </li>
                ))}
              </ul>
              <div className="border-receipt-ink-light/60 flex items-baseline border-t pt-1.5 font-semibold">
                <span>Total</span>
                <Leader />
                <span>{formatVnd(total)}</span>
              </div>
            </div>
          )}

          <div className="mt-3 flex justify-center">
            <button
              type="button"
              onClick={() => (torn ? printAgain() : setTorn(true))}
              className="bg-brand-strong dark:bg-brand-2 dark:text-background-dark focus-visible:outline-brand cursor-pointer rounded-full rounded-bl-md px-4 py-1.5 font-sans text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              {torn ? 'Print again' : 'Tear to split'}
            </button>
          </div>

          <p className="sr-only" aria-live="polite">
            {torn
              ? `Split: ${PEOPLE.map(
                  (person) => `${person} ${formatVnd(shares[person])}`
                ).join(', ')}.`
              : ''}
          </p>
        </section>
      </Pickup>
    </div>
  );
};

export default Receipt;
