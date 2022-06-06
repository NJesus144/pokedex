import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { FavoriteProvider } from "./favorites/contexts/FavoriteContext";
import { MainRoutes } from "./routes/MainRoutes";

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      retry: false
    }
  }
});

const App: React.FC = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <FavoriteProvider>
          <MainRoutes />
        </FavoriteProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
};

export default App;
