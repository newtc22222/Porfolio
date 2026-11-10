import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import './styles/globals.css';
import './index.css';
import App from './App.tsx';

const container = document.getElementById('root')!;
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// A built page arrives prerendered (scripts/prerender.mjs), so attach to that
// HTML. In `npm run dev` the root is empty and is rendered from scratch.
if (container.firstElementChild) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
