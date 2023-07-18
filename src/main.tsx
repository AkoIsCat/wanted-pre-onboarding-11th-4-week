import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import RecommenedSearchProvider from './store/RecommendSearch-context.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RecommenedSearchProvider>
    <App />
  </RecommenedSearchProvider>
);
