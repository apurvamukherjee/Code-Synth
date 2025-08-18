import './global.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MatrixBackground from '@/components/MatrixBackground';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 30,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function RootLayout({ children }) {
  return (
    <>
      <MatrixBackground />
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </>
  );
}