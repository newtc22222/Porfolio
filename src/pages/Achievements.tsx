import { Element } from "react-scroll";

export const Achievements = () => (
  <Element name="#achievements">
    <section id="achievements" className="py-20 bg-blue-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Archievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          <div className="bg-gray-100 p-6 rounded-lg shadow text-center hover:scale-105 transition-transform">
            <h3 className="text-xl font-semibold">5 React Projects</h3>
            <p>Excellent work</p>
          </div>
        </div>
      </div>
    </section>
  </Element>
);
