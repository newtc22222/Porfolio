import { Element, Link } from "react-scroll";
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";

import { FULLNAME, JOB_TITLE } from "../constants/self-information";

export const Home = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Element name="#home">
      <section
        id="home"
        className="min-h-screen bg-background-light dark:bg-background-dark 
                   flex items-center justify-center relative overflow-hidden mt-[64px]"
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
                value: "transparent",
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
                value: ["#4DA8DA", "#80D8C3"], // primary and secondary colors
              },
              links: {
                enable: true,
                color: "#80D8C3",
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
                  mode: "repulse",
                },
              },
            },
          }}
          className="absolute inset-0 w-full h-full"
        />
        <div className="text-center z-10">
          <h1 className="text-5xl font-bold mb-4 text-primary-light dark:text-primary-dark">
            Hi guys, I am {FULLNAME}!
          </h1>
          <p className="text-2xl mb-6 text-secondary-light dark:text-secondary-dark">
            {JOB_TITLE}
          </p>
          <Link
            smooth
            duration={500}
            to="#projects"
            className="px-6 py-3 border-2 rounded-lg
                     border-primary-light dark:border-primary-dark
                     text-primary-light dark:text-primary-dark
                     hover:bg-secondary-light hover:border-secondary-light
                     dark:hover:bg-secondary-dark dark:hover:border-secondary-dark
                     hover:text-white dark:hover:text-white
                     hover:cursor-pointer transition-all duration-300"
          >
            Explore My Projects
          </Link>
        </div>
      </section>
    </Element>
  );
};
