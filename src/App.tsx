import { Navigation } from './layout/Navigation';
import { Footer } from './layout/Footer';
import { Layout } from './layout';
import {
  Home,
  Projects,
  Skills,
  Blog,
  About,
  Achievements,
  Experiences,
  Education,
  Contact,
} from './pages';

import './App.css';

function App() {
  return (
    <>
      <Navigation />
      <main className="container mx-auto px-4">
        <Layout>
          <Home />
        </Layout>
        <Layout>
          <Projects />
        </Layout>
        <Layout>
          <Skills />
        </Layout>
        <Layout>
          <Blog />
        </Layout>
        <Layout>
          <Experiences />
        </Layout>
        <Layout>
          <Education />
        </Layout>
        <Layout>
          <About />
        </Layout>
        <Layout>
          <Achievements />
        </Layout>
        <Layout>
          <Contact />
        </Layout>
      </main>
      <Footer />
    </>
  );
}

export default App;
