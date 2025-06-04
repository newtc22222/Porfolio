import type { BlogPost } from './BlogType';

export const BlogCard = ({ post }: { post: BlogPost }) => (
  <article className="pixel-border transform overflow-hidden rounded-lg bg-white transition-all duration-300 hover:scale-[1.02] dark:bg-gray-800">
    <div className="relative">
      <img
        src={post.thumbnail}
        alt={post.title}
        className="h-48 w-full object-cover"
      />
      <div className="pixel-overlay absolute inset-0"></div>
    </div>
    <div className="p-6">
      <h3 className="text-primary-light dark:text-primary-dark mb-2 text-xl font-semibold">
        {post.title}
      </h3>
      <p className="mb-4 text-gray-600 dark:text-gray-300">
        {post.description}
      </p>
      <a
        href={post.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-secondary-light dark:text-secondary-dark inline-flex items-center hover:underline"
      >
        Read more
        <svg
          className="ml-2 h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </a>
    </div>
  </article>
);
