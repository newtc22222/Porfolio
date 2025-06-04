import type { BlogPost } from './BlogType';

export const BLOG_POSTS: BlogPost[] = [
  {
    title: 'Creating RESTful APIs with Node.js',
    description: 'Learn how to build scalable APIs using Node.js and Express',
    link: 'https://yourblog.com/nodejs-api',
    thumbnail: '/images/nodejs-api.jpg',
    topic: 'Backend',
  },
  {
    title: 'React Best Practices 2025',
    description: 'Modern React patterns and optimization techniques',
    link: 'https://yourblog.com/react-best-practices',
    thumbnail: '/images/react-practices.jpg',
    topic: 'Frontend',
  },
  // Add more blog posts...
];
