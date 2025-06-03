import { Element } from "react-scroll";
import { useState } from "react";

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
  // Calculate the position and width for the sliding indicator
  const activeIndex = topics.indexOf(activeTopic);
  const indicatorStyles = {
    transform: `translateX(${activeIndex * 100}%)`,
    width: `${100 / topics.length}%`,
  };

  return (
    <div className="relative flex p-1 bg-gray-200 dark:bg-gray-800 rounded-xl mb-12 max-w-2xl mx-auto shadow-inner">
      {/* Sliding indicator */}
      <div
        className="absolute left-0 top-1 bottom-1 bg-white dark:bg-gray-700 rounded-lg shadow-md 
                   transition-transform duration-300 ease-in-out"
        style={indicatorStyles}
      />

      {topics.map((topic) => (
        <button
          key={topic}
          onClick={() => setActiveTopic(topic)}
          className={`relative flex-1 py-2 text-sm transition-colors duration-300 z-10 hover:cursor-pointer
            ${
              activeTopic === topic
                ? "text-gray-800 dark:text-white font-medium"
                : "text-gray-600 dark:text-gray-400"
            }`}
        >
          <span className="relative">{topic}</span>
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
        {/* Pixel art background */}
        <div className="absolute inset-0 pixel-bg"></div>

        <div className="relative container mx-auto px-4 z-10">
          <h2 className="text-4xl font-bold text-center mb-4 text-primary-light dark:text-primary-dark pixel-text">
            Blog Posts
          </h2>
          <p className="text-secondary-light dark:text-secondary-dark text-center mb-10">
            Sharing knowledge and experiences
          </p>

          <TabSwitch
            topics={topics}
            activeTopic={activeTopic}
            setActiveTopic={setActiveTopic}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <BlogCard key={post.title} post={post} />
            ))}
          </div>
        </div>
      </section>
    </Element>
  );
};
