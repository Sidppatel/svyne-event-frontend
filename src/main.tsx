import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from '@/App';
import { ThemeProvider } from '@/shared/theme/ThemeContext';
import { ErrorBoundary } from '@/shared/components/ErrorBoundary';
import { initErrorReporter } from '@/shared/errorReporter';
import '@/index.css';

initErrorReporter();
document.documentElement.style.colorScheme = 'light';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root container missing');
}

createRoot(container).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
);
