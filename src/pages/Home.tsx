import { useCallback } from 'react';
import { Element, Link } from 'react-scroll';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import type { Engine } from 'tsparticles-engine';

import { FULLNAME, JOB_TITLE } from '../constants/self-information';

export const Home = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Element name="#home">
      <section
        id="home"
        className="bg-background-light dark:bg-background-dark relative mt-[64px] flex min-h-screen items-center justify-center overflow-hidden"
      >
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
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
                value: 50,
                density: {
                  enable: true,
                  value_area: 800,
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
                value: 2,
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
          }}
          className="absolute inset-0 h-full w-full"
        />
        <div className="z-10 text-center">
          <h1 className="text-primary-light dark:text-primary-dark mb-4 text-5xl font-bold">
            Hi there! I'm {FULLNAME}
          </h1>
          <p className="text-secondary-light dark:text-secondary-dark mb-6 text-2xl">
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
      </section>
    </Element>
  );
};
