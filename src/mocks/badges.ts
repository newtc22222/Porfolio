import type { Badge } from '../pages/Badges/BadgeType';

// Earned course badges and certificates. The Badges section (and its nav link)
// is hidden while this list is empty.
//
// Claude Academy badges: use the public /verify/<code> link as credentialUrl
// (the /badges/<id> page only works when signed in). The course artwork is at
// https://academy.claude.com/og/badges/<course-slug>.png.
export const BADGES: Badge[] = [
  {
    id: 'claude-academy-introduction-to-model-context-protocol',
    title: 'Introduction to Model Context Protocol',
    issuer: 'Claude Academy',
    issuedOn: '2026-09-17',
    image: '/assets/badges/introduction-to-model-context-protocol.png',
    credentialUrl:
      'https://academy.claude.com/verify/61a80639ae0072f31ce98604a0ef5afc',
    description:
      'Build MCP servers and clients from scratch with the Python SDK, covering the three core primitives (tools, resources, and prompts) that connect Claude to external services.',
    skills: ['MCP', 'Python SDK', 'Tools, resources & prompts'],
  },
  {
    id: 'claude-academy-claude-code-in-action',
    title: 'Claude Code in Action',
    issuer: 'Claude Academy',
    issuedOn: '2026-08-27',
    image: '/assets/badges/claude-code-in-action.png',
    credentialUrl:
      'https://academy.claude.com/verify/bd6a3e52097780ba3ec962bced6d44db',
    description:
      'Run long, hands-off Claude Code sessions you can trust: steer, configure, automate, and verify.',
    skills: ['Claude Code', 'Automation', 'Agentic workflows'],
  },
  {
    id: 'claude-academy-claude-code-101',
    title: 'Claude Code 101',
    issuer: 'Claude Academy',
    issuedOn: '2026-08-26',
    image: '/assets/badges/claude-code-101.png',
    credentialUrl:
      'https://academy.claude.com/verify/d4517c312e23aa2a1fc9897e7cd6edff',
    description:
      'What Claude Code is, how it works, and the core workflows for getting real work done with an agentic coding tool that lives in the terminal.',
    skills: ['Claude Code', 'Agentic coding'],
  },
  {
    id: 'claude-academy-introduction-to-claude-cowork',
    title: 'Introduction to Claude Cowork',
    issuer: 'Claude Academy',
    issuedOn: '2026-08-25',
    image: '/assets/badges/introduction-to-claude-cowork.png',
    credentialUrl:
      'https://academy.claude.com/verify/47459bbd56c9803ae920a64e5fcff3dc',
    description:
      'Delegate multi-step work to Claude in Cowork: set up workspaces, give context, run task loops, and use plugins for research, documents, and browser tasks.',
    skills: ['Claude Cowork', 'Task delegation', 'Plugins'],
  },
  {
    id: 'claude-academy-claude-101',
    title: 'Claude 101',
    issuer: 'Claude Academy',
    issuedOn: '2026-08-24',
    image: '/assets/badges/claude-101.png',
    credentialUrl:
      'https://academy.claude.com/verify/eebaf6bc5ff725d6f686dac4a7f24f31',
    description:
      'Using Claude for everyday work, from the first conversation and effective prompting to projects, artifacts, skills, and connected tools.',
    skills: ['Prompting', 'Projects', 'Artifacts'],
  },
  {
    id: 'educative-become-a-react-developer',
    title: 'Become a React Developer',
    issuer: 'Educative',
    issuedOn: '2025-10-06',
    image: '/assets/badges/educative-become-a-react-developer.png',
    credentialUrl: 'https://www.educative.io/verify-certificate/1080M243OP',
    description:
      'Skill path: React from JavaScript basics to components, hooks, routing, React 19 features, and real-world projects.',
    skills: ['React', 'React 19', 'Hooks', 'Routing'],
  },
  {
    id: 'educative-become-a-full-stack-developer',
    title: 'Become a Full Stack Developer',
    issuer: 'Educative',
    issuedOn: '2025-09-29',
    image: '/assets/badges/educative-become-a-full-stack-developer.png',
    credentialUrl:
      'https://www.educative.io/verify-certificate/Z4JLg2tXEox9kZMrOIJBr9xxLZ5EIV',
    description:
      'Skill path: full stack web development with the MERN stack (HTML, CSS, Bootstrap, JavaScript, React, Node.js, and MongoDB) through real-world projects.',
    skills: ['MERN', 'Node.js', 'MongoDB', 'React'],
  },
  {
    id: 'educative-java-for-programmers',
    title: 'Java for Programmers',
    issuer: 'Educative',
    issuedOn: '2025-09-23',
    image: '/assets/badges/educative-java-for-programmers.png',
    credentialUrl:
      'https://www.educative.io/verify-certificate/MjprXLCRQ2RNYV6QguR6m3QQ82v7sZ',
    description:
      'Skill path: transition from another programming language to a mastery of Java.',
    skills: ['Java'],
  },
  {
    id: 'udemy-the-complete-full-stack-development-bootcamp',
    title: 'The Complete Full-Stack Web Development Bootcamp',
    issuer: 'Udemy',
    instructor: 'Dr. Angela Yu',
    issuedOn: '2026-09-27',
    image:
      '/assets/badges/udemy-complete-full-stack-web-development-bootcamp.jpg',
    credentialUrl:
      'https://www.udemy.com/certificate/UC-7de39b5d-a925-476c-a05a-c4391ca227b6/',
  },
  {
    id: 'udemy-modern-react-with-redux',
    title: 'Modern React with Redux',
    issuer: 'Udemy',
    instructor: 'Stephen Grider',
    issuedOn: '2023-06-05',
    image: '/assets/badges/udemy-modern-react-with-redux.jpg',
    credentialUrl:
      'https://www.udemy.com/certificate/UC-8d0e7f7a-a42c-4469-abad-b97f0384485c/',
  },
  {
    id: 'udemy-master-spring-boot-3-with-spring-framework-6',
    title: 'Master Spring Boot 3 & Spring Framework 6 with Java',
    issuer: 'Udemy',
    instructor: 'in28Minutes Official',
    issuedOn: '2023-04-06',
    image: '/assets/badges/udemy-master-spring-boot-3.jpg',
    credentialUrl:
      'https://www.udemy.com/certificate/UC-ffb02146-5c54-44da-b9c1-9166f770a0f1/',
  },
  {
    id: 'udemy-node-js-express-mongodb-more-the-complete-bootcamp',
    title: 'Node.js, Express, MongoDB & More: The Complete Bootcamp',
    issuer: 'Udemy',
    instructor: 'Jonas Schmedtmann',
    issuedOn: '2025-07-08',
    image: '/assets/badges/udemy-nodejs-express-mongodb-bootcamp.jpg',
    credentialUrl:
      'https://www.udemy.com/certificate/UC-22ee4a06-6a49-4f2e-9d4d-0eb5c0b7b3fd/',
  },
  {
    id: 'udemy-nestjs-the-complete-developer-s-guide',
    title: "NestJS: The Complete Developer's Guide",
    issuer: 'Udemy',
    instructor: 'Stephen Grider',
    issuedOn: '2025-06-17',
    image: '/assets/badges/udemy-nestjs-complete-developers-guide.jpg',
    credentialUrl:
      'https://www.udemy.com/certificate/UC-74f1bd98-51ee-4e2f-918b-2a749ff25286/',
  },
  {
    id: 'udemy-go-the-complete-guide',
    title: 'Go - The Complete Guide',
    issuer: 'Udemy',
    instructor: 'Maximilian Schwarzmüller',
    issuedOn: '2025-11-08',
    image: '/assets/badges/udemy-go-the-complete-guide.jpg',
    credentialUrl:
      'https://www.udemy.com/certificate/UC-57cc40bf-ec87-439c-bbb7-d6d8875520fe/',
  },
  // In progress:
  //   {
  //     platform: 'Udemy',
  //     title: 'Master Microservices with Spring Boot, Docker, and Kubernetes',
  //     period: '2025 - present',
  //     issuer: 'Eazy Bytes, Madan Reddy',
  //   },
  //   {
  //     platform: 'Udemy',
  //     title: "Redis: The Complete Developer's Guide",
  //     period: '2025 - present',
  //     issuer: 'Stephen Grider',
  //   },
  //   {
  //     platform: 'Udemy',
  //     title: "Microfrontends with React: A Complete Developer's Guide",
  //     period: '2025 - present',
  //     issuer: 'Stephen Grider',
  //   },
  //   {
  //     platform: 'Udemy',
  //     title: 'Complete Guide to Elasticsearch',
  //     period: '2025 - present',
  //     issuer: 'Bo Andersen',
  //   },
];
