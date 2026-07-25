import {StrictMode} from 'react';import{createRoot}from'react-dom/client';import'./styles.css';import{App,ErrorBoundary}from'./ui/App';
createRoot(document.getElementById('root')!).render(<StrictMode><ErrorBoundary><App/></ErrorBoundary></StrictMode>);
