import { useMemo, useState } from 'react';
import { Element, Link } from 'react-scroll';
import Particles, { ParticlesProvider } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { Engine, ISourceOptions } from '@tsparticles/engine';
import { FULLNAME, JOB_TITLE, GREETINGS } from '../constants/self-information';

const particlesInit = async (engine: Engine): Promise<void> => {
  await loadSlim(engine);
};

export const Home = () => {
  const [greetingPrefix] = useState(() => {
    const hour = new Date().getHours();
    let timeGreeting = 'Good day! ☀️';
    if (hour >= 5 && hour < 12) {
      timeGreeting = 'Good morning! 🌅';
    } else if (hour >= 12 && hour < 17) {
      timeGreeting = 'Good afternoon! 🌤️';
    } else if (hour >= 17 && hour < 22) {
      timeGreeting = 'Good evening! 🌆';
    } else {
      timeGreeting = "Hope you're having a great night!  🌌";
    }

    const allGreetings = [...GREETINGS, timeGreeting];
    const randomIndex = Math.floor(Math.random() * allGreetings.length);
    return allGreetings[randomIndex];
  });

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: {
        enable: false,
      },
      background: {
        color: {
          value: 'transparent',
        },
      },
      particles: {
        number: {
          value: 200,
          density: {
            enable: true,
          },
        },
        color: {
          value: ['#4DA8DA', '#80D8C3'], // primary and secondary colors
        },
        links: {
          enable: true,
          color: '#80D8C3',
          opacity: 0.2,
        },
        move: {
          enable: true,
          speed: 1,
        },
        size: {
          value: 3,
        },
      },
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: 'repulse',
          },
        },
      },
    }),
    []
  );

  return (
    <Element name="#home">
      <section
        id="home"
        className="bg-background-light dark:bg-background-dark relative mt-[64px] flex min-h-screen items-center justify-center overflow-hidden"
      >
        <ParticlesProvider init={particlesInit}>
          <Particles
            id="tsparticles"
            options={options}
            className="absolute inset-0 h-full w-full"
          />
          <div className="z-10 text-center">
            <h1 className="text-primary-light dark:text-primary-dark my-2 text-3xl font-bold">
              {greetingPrefix}
            </h1>
            <p className="text-primary-light dark:text-primary-dark my-4 text-5xl font-bold">
              I&apos;m {FULLNAME}
            </p>
            <p className="text-secondary-light dark:text-secondary-dark my-8 text-2xl">
              {JOB_TITLE}
            </p>
            <Link
              smooth
              duration={500}
              to="#projects"
              className="border-primary-light dark:border-primary-dark text-primary-light dark:text-primary-dark hover:bg-secondary-light hover:border-secondary-light dark:hover:bg-secondary-dark dark:hover:border-secondary-dark rounded-lg border-2 px-6 py-3 transition-all duration-300 hover:cursor-pointer hover:text-white dark:hover:text-white"
            >
              Explore My Projects
            </Link>
          </div>
        </ParticlesProvider>
      </section>
    </Element>
  );
};
