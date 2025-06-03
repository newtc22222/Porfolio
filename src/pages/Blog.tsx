import { Element } from "react-scroll";
import { useState } from "react";
import { motion } from "framer-motion";

import "../styles/globals.css";

interface BlogPost {
  title: string;
  description: string;
  link: string;
  thumbnail: string;
  topic: string;
}

const blogPosts: BlogPost[] = [
  {
    title: "Creating RESTful APIs with Node.js",
    description: "Learn how to build scalable APIs using Node.js and Express",
    link: "https://yourblog.com/nodejs-api",
    thumbnail: "/images/nodejs-api.jpg",
    topic: "Backend",
  },
  {
    title: "React Best Practices 2025",
    description: "Modern React patterns and optimization techniques",
    link: "https://yourblog.com/react-best-practices",
    thumbnail: "/images/react-practices.jpg",
    topic: "Frontend",
  },
  // Add more blog posts...
];

const topics = ["All", "Frontend", "Backend", "DevOps", "Database"];

const TabSwitch = ({
  topics,
  activeTopic,
  setActiveTopic,
}: {
  topics: string[];
  activeTopic: string;
  setActiveTopic: (topic: string) => void;
}) => {
  const activeIndex = topics.indexOf(activeTopic);
  const indicatorStyles = {
    transform: `translateX(${activeIndex * 100}%)`,
    width: `${100 / topics.length}%`,
  };

  return (
    <div
      className="relative flex p-1.5 bg-white/5 dark:bg-gray-800/5 rounded-xl mb-12 
                    max-w-2xl mx-auto backdrop-blur-sm border-2 border-white/10 
                    dark:border-gray-700/20 shadow-lg hover:border-white/20 
                    dark:hover:border-gray-600/30 transition-all duration-300"
    >
      {/* Glowing indicator */}
      <div
        className="absolute left-0 top-1 bottom-1 rounded-lg
                   bg-gradient-to-r from-primary-light/20 to-secondary-light/20
                   dark:from-primary-dark/20 dark:to-secondary-dark/20
                   shadow-[0_0_15px_rgba(77,168,218,0.3)] dark:shadow-[0_0_15px_rgba(128,216,195,0.3)]
                   transition-transform duration-300 ease-out backdrop-blur-sm"
        style={indicatorStyles}
      />

      {topics.map((topic) => (
        <button
          key={topic}
          onClick={() => setActiveTopic(topic)}
          className={`relative flex-1 py-2.5 text-sm font-medium transition-all duration-300 z-10 hover:cursor-pointer
            ${
              activeTopic === topic
                ? "text-primary-light dark:text-primary-dark scale-105"
                : "text-secondary-light/80 dark:text-secondary-dark/80 hover:text-primary-light/90 dark:hover:text-primary-dark/90"
            }
            hover:scale-105`}
        >
          <span className="relative">
            {topic}
            {activeTopic === topic && (
              <span
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r 
                             from-primary-light to-secondary-light
                             dark:from-primary-dark dark:to-secondary-dark
                             rounded-full"
              ></span>
            )}
          </span>
        </button>
      ))}
    </div>
  );
};

const BlogCard = ({ post }: { post: BlogPost }) => (
  <article
    className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden pixel-border
                     transform hover:scale-[1.02] transition-all duration-300"
  >
    <div className="relative">
      <img
        src={post.thumbnail}
        alt={post.title}
        className="w-full h-48 object-cover"
      />
      <div className="absolute inset-0 pixel-overlay"></div>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-semibold text-primary-light dark:text-primary-dark mb-2">
        {post.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        {post.description}
      </p>
      <a
        href={post.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-secondary-light dark:text-secondary-dark hover:underline"
      >
        Read more
        <svg
          className="w-4 h-4 ml-2"
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

export const Blog = () => {
  const [activeTopic, setActiveTopic] = useState("All");
  const filteredPosts =
    activeTopic === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.topic === activeTopic);

  return (
    <Element name="#blog">
      <section id="blog" className="relative py-20 overflow-hidden">
        {/* Retro background layers */}
        <div className="absolute inset-0 retro-gradient"></div>
        <div className="absolute inset-0 retro-grid"></div>

        <div className="relative container mx-auto px-4 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2
              className="text-4xl font-bold text-center mb-4 bg-clip-text text-transparent 
                       bg-gradient-to-r from-primary-light to-secondary-light
                       dark:from-primary-dark dark:to-secondary-dark"
            >
              Blog Posts
            </h2>
            <p className="text-secondary-light dark:text-secondary-dark text-center mb-10 text-lg">
              Sharing knowledge and experiences
            </p>
          </motion.div>

          <TabSwitch
            topics={topics}
            activeTopic={activeTopic}
            setActiveTopic={setActiveTopic}
          />

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
