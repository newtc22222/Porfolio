import type { BlogPost } from './BlogType';

// Posts live on one of two sites; name the site so readers know where the
// link goes.
const siteName = (link: string) => {
  if (link.includes('technical-documents')) return 'Technical Documents';
  if (link.includes('web-notes')) return 'Web Notes';
  return new URL(link).hostname;
};

export const BlogEntry = ({ post }: { post: BlogPost }) => (
  <article className="py-6">
    <h3 className="text-primary-light dark:text-primary-dark text-xl leading-snug font-semibold">
      <a
        href={post.link}
        target="_blank"
        rel="noopener noreferrer"
        className="focus-visible:outline-brand rounded-sm decoration-2 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4"
      >
        {post.title}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    </h3>
    <p className="text-primary-light/85 dark:text-primary-dark/80 mt-2 max-w-[60ch] leading-relaxed">
      {post.description}
    </p>
    <p className="text-secondary-light dark:text-secondary-dark mt-3 text-sm">
      <span className="text-brand-strong dark:text-brand-2 font-medium">
        {post.topic}
      </span>{' '}
      in {siteName(post.link)}
    </p>
  </article>
);
