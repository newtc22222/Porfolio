import { Element } from 'react-scroll';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { TabSwitch } from '../../components/TabSwitch';

import { BLOG_POSTS } from '../../mocks/blogs';
import { BlogCard } from './BlogCard';

const TOPICS = [
  'All',
  'Project Docs',
  'Frontend',
  'Backend',
  'Database',
  'DevOps',
  'AI',
  'Principle',
];

export const Blog = () => {
  const [activeTopic, setActiveTopic] = useState('All');
  const filteredPosts =
    activeTopic === 'All'
      ? BLOG_POSTS
      : BLOG_POSTS.filter((post) => post.topic === activeTopic);

  return (
    <Element name="#blog">
      <section id="blog" className="relative z-20 py-12 md:py-20">
        {/* Retro background layers */}
        <div className="retro-gradient absolute inset-0"></div>
        <div className="retro-grid absolute inset-0"></div>

        <div className="relative z-10 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="from-primary-light to-secondary-light dark:from-primary-dark dark:to-secondary-dark mb-3 bg-gradient-to-r bg-clip-text text-center text-3xl font-bold text-transparent md:mb-4 md:text-4xl">
              Blog Posts
            </h2>
            <p className="text-secondary-light dark:text-secondary-dark mb-8 text-center text-base md:mb-10 md:text-lg">
              Sharing knowledge and experiences
            </p>
          </motion.div>

          <div className="relative z-50">
            <TabSwitch
              topics={TOPICS}
              activeTopic={activeTopic}
              setActiveTopic={setActiveTopic}
            />
          </div>

          {filteredPosts.length === 0 && (
            <p
              role="status"
              className="text-secondary-light dark:text-secondary-dark mx-auto max-w-md rounded-lg border-2 border-dashed border-gray-300 px-6 py-10 text-center dark:border-gray-700"
            >
              No {activeTopic} posts yet. Stay tuned, or check out another topic
              in the meantime!
            </p>
          )}

          <motion.div
            className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <BlogCard post={post} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </Element>
  );
};
