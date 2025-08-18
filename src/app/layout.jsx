import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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

export default function RootLayout({children}) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <button
        onClick={() => {
          document.documentElement.classList.toggle('dark');
        }}
        className="p-2 rounded bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
      >
        Toggle Dark Mode
      </button>
    </QueryClientProvider>
  );
}