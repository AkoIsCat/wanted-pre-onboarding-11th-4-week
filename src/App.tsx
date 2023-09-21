import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages/Home';
import GlobalStyles from './styles/GlobalStyles';

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        <Home />
      </QueryClientProvider>
    </>
  );
}

export default App;
