import './global.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MatrixBackground from '@/components/MatrixBackground';
import Preloader from '@/components/Preloader';
import { useEffect, useState } from 'react';

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 5000); // 5 seconds
  }, []);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <>
      <MatrixBackground />
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </>
  );
}