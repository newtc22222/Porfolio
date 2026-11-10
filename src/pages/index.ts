export { About } from './About';
// Badges and Skills are lazy-loaded in App.tsx, and Contact in
// layout/ContactBubble.tsx, so their heavy dependencies (react-confetti,
// @emailjs/browser) get their own chunks.
export { Blog } from './Blogs';
export { Education } from './Education';
export { Experiences } from './Experiences';
export { Hero } from './Hero';
export { Projects } from './Projects';
