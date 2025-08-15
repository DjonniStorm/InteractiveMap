import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './pages/App.tsx';
import { Mantine } from './app/providers/mantine.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Mantine>
      <App />
    </Mantine>
  </StrictMode>,
);

