import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// In the desktop build, route alert/confirm through native OS dialogs.
const desktop = (window as any).deepflowDesktop as
  | { platform: string; alert: (m?: unknown) => void; confirm: (m?: unknown) => boolean }
  | undefined;
if (desktop) {
  window.alert = (message?: unknown) => desktop.alert(message);
  window.confirm = (message?: unknown) => desktop.confirm(message);
  document.documentElement.dataset.platform = desktop.platform;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
