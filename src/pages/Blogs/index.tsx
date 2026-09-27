import { Element } from 'react-scroll';
import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import { BLOG_POSTS } from '../../mocks/blogs';
import { BlogEntry } from './BlogEntry';
import { TopicTabs } from './TopicTabs';

const ALL = 'All';
const PANEL_ID = 'blog-posts';

// Tab order. Topics without posts are hidden rather than shown as empty tabs.
const TOPICS = [
  ALL,
  'Project Docs',
  'Frontend',
  'Backend',
  'Database',
  'DevOps',
  'AI',
  'Principle',
]
  .map((name) => ({
    name,
    id: `blog-tab-${name.toLowerCase().replace(/\s+/g, '-')}`,
    count:
      name === ALL
        ? BLOG_POSTS.length
        : BLOG_POSTS.filter((post) => post.topic === name).length,
  }))
  .filter((topic) => topic.count > 0);

export const Blog = () => {
  const [activeTopic, setActiveTopic] = useState(ALL);
  const reducedMotion = useReducedMotion();
  const filteredPosts =
    activeTopic === ALL
      ? BLOG_POSTS
      : BLOG_POSTS.filter((post) => post.topic === activeTopic);

  return (
    <Element name="#blog">
      <section id="blog" className="bg-blog-light dark:bg-blog-dark py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <header className="mb-12 max-w-2xl">
            <h2 className="text-primary-light dark:text-primary-dark text-5xl leading-none font-bold tracking-tight">
              Blog
            </h2>
            <p className="text-secondary-light dark:text-secondary-dark mt-4 text-lg">
              Notes and docs from building my projects.
            </p>
          </header>

          <TopicTabs
            topics={TOPICS}
            activeTopic={activeTopic}
            onSelect={setActiveTopic}
            panelId={PANEL_ID}
          />

          <div
            id={PANEL_ID}
            role="tabpanel"
            aria-labelledby={
              TOPICS.find((topic) => topic.name === activeTopic)?.id
            }
            className="graph-paper bg-surface-light dark:bg-surface-dark border-frame-light/20 dark:border-frame-dark rounded-lg border px-5 py-4 shadow-[0_18px_30px_-22px_rgb(0_0_0/0.35)] sm:px-10 sm:py-6"
          >
            {filteredPosts.length === 0 ? (
              <p className="text-secondary-light dark:text-secondary-dark py-10">
                No posts in {activeTopic} yet. Choose All to see every post.
              </p>
            ) : (
              <ul className="[&>li]:border-frame-light/15 dark:[&>li]:border-frame-dark/60 grid gap-x-16 lg:grid-cols-2 [&>li]:border-t [&>li:first-child]:border-t-0 lg:[&>li:nth-child(2)]:border-t-0">
                {filteredPosts.map((post) => (
                  <motion.li
                    key={post.title}
                    layout={reducedMotion ? false : 'position'}
                    initial={reducedMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.25 }}
                  >
                    <BlogEntry post={post} />
                  </motion.li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </Element>
  );
};
