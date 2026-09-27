import { motion, useReducedMotion } from 'framer-motion';
import type { ProjectProps } from './ProjectType';

interface ProjectPieceProps extends ProjectProps {
  // The featured piece hangs large with its label beside it.
  featured?: boolean;
  // Position within its row on the wall, so lights in view switch on in turn.
  order: number;
}

const isSourceRepo = (link: string) => /(github|gitlab)\.com/.test(link);

const focusRing =
  'focus-visible:outline-brand rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4';

export const ProjectPiece = ({
  title,
  period,
  description,
  technologies,
  link,
  image,
  imageDark,
  featured = false,
  order,
}: ProjectPieceProps) => {
  const reducedMotion = useReducedMotion();

  return (
    <article
      className={
        featured
          ? 'grid items-center gap-10 lg:grid-cols-12 lg:gap-12'
          : 'flex flex-col gap-8'
      }
    >
      <div className={`relative ${featured ? 'lg:col-span-7' : ''}`}>
        <motion.div
          aria-hidden="true"
          className="picture-light"
          initial={reducedMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, delay: 0.2 + order * 0.35 }}
        />
        <span aria-hidden="true" className="picture-lamp" />
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={-1}
          aria-hidden="true"
          className="border-frame-light dark:border-frame-dark bg-mat-light dark:bg-mat-dark relative block border-[6px] p-[6%] shadow-[0_18px_30px_-18px_rgb(0_0_0/0.45)] sm:p-[7%]"
        >
          {image && (
            <div className="border-frame-light/25 dark:border-frame-dark aspect-video overflow-hidden border">
              <img
                src={image}
                alt=""
                loading="lazy"
                className={`h-full w-full object-cover object-top ${imageDark ? 'dark:hidden' : ''}`}
              />
              {imageDark && (
                <img
                  src={imageDark}
                  alt=""
                  loading="lazy"
                  className="hidden h-full w-full object-cover object-top dark:block"
                />
              )}
            </div>
          )}
        </a>
      </div>

      <div
        className={`max-w-[38ch] ${featured ? 'lg:col-span-4 lg:col-start-9' : 'ps-1'}`}
      >
        <h3 className="text-primary-light dark:text-primary-dark text-2xl leading-tight font-bold tracking-tight">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={`decoration-2 underline-offset-4 hover:underline ${focusRing}`}
          >
            {title}
          </a>
        </h3>
        {period && (
          <p className="text-secondary-light dark:text-secondary-dark mt-1 text-sm">
            {period}
          </p>
        )}
        <p className="text-primary-light/90 dark:text-primary-dark/85 mt-4 leading-relaxed">
          {description}
        </p>
        <p className="text-secondary-light dark:text-secondary-dark mt-4 text-sm leading-relaxed italic">
          Built with {technologies.join(', ')}
        </p>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className={`text-brand-strong dark:text-brand-2 mt-5 inline-block font-semibold underline decoration-1 underline-offset-4 hover:decoration-2 ${focusRing}`}
        >
          {isSourceRepo(link) ? 'View the source' : 'Open the site'}
          <span className="sr-only"> for {title} (opens in a new tab)</span>
        </a>
      </div>
    </article>
  );
};
