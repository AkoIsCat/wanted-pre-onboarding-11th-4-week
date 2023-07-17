import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import SuggestedSearchProvider from './store/SuggestedSearch-context.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <SuggestedSearchProvider>
    <App />
  </SuggestedSearchProvider>
);
