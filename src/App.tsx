import { Navigation } from "./layout/Navigation";
import { Footer } from "./layout/Footer";
import {
  Home,
  Projects,
  Skills,
  Blog,
  About,
  Achievements,
  Contact,
} from "./pages";

import "./App.css";

function App() {
  return (
    <div className="bg-light">
      <Navigation />
      <Home />
      <Projects />
      <Skills />
      <Blog />
      <About />
      <Achievements />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
