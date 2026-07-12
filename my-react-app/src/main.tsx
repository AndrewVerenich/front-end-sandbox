import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import ThemeProvider from './context/ThemeContext';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient();
const root = document.getElementById('root');
if (!root) {
  throw new Error('Root element not found');
}

createRoot(root).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ThemeProvider>
            <App/>
          </ThemeProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </StrictMode>
    ,
);
