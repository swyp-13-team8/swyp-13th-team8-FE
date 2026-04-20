import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

/**
 *  React 앱 진입점
 */

createRoot(document.getElementById('root')!).render(<App />);
