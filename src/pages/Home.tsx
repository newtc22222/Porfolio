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
        className="min-h-screen bg-light flex items-center justify-center relative overflow-hidden mt-[64px]"
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
                value: "#F5F5F5", // matches bg-light
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
                value: "#4DA8DA", // primary color
              },
              links: {
                enable: true,
                color: "#80D8C3", // secondary color
                opacity: 0.3,
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
          <h1 className="text-5xl font-bold mb-4 text-primary">
            Hi guys, I am {FULLNAME}!
          </h1>
          <p className="text-2xl mb-6 text-secondary">{JOB_TITLE}</p>
          <Link
            smooth
            duration={500}
            to="#projects"
            className="text-primary px-6 py-3 border rounded hover:bg-secondary hover:text-white hover:cursor-pointer transition-all"
          >
            Explore My Projects
          </Link>
        </div>
      </section>
    </Element>
  );
};
