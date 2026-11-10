import { Link } from 'react-router';

export const NotFound = () => (
  <section className="bg-background-light dark:bg-background-dark mt-16 flex min-h-[70vh] items-center justify-center px-4 py-24">
    <div className="max-w-md text-center">
      <p className="text-secondary-light dark:text-secondary-dark font-mono text-sm">
        404
      </p>
      <h1 className="text-primary-light dark:text-primary-dark mt-2 text-4xl font-bold tracking-tight">
        Nothing on the desk here
      </h1>
      <p className="text-secondary-light dark:text-secondary-dark mt-4 text-lg">
        That page was never here, or it has been tidied away.
      </p>
      <Link
        to="/"
        className="text-brand-strong dark:text-brand-2 focus-visible:outline-brand mt-8 inline-block rounded-sm font-semibold underline decoration-1 underline-offset-4 hover:decoration-2 focus-visible:outline-2 focus-visible:outline-offset-4"
      >
        Back to the desk
      </Link>
    </div>
  </section>
);
