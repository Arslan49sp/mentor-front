import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Questions from "./pages/Questions";
import Chapters from "./pages/Chapters";
import Classes from "./pages/Classes";
import Sidebar from "./components/SideBar";
import Subjects from "./pages/Subjects";
import { useState } from "react";

const queryClient = new QueryClient();
function App() {
  const [isClose, setIsClose] = useState(false);
  const Layout = () => {
    return (
      <div>
        <Sidebar isClose={isClose} setIsClose={() => setIsClose(!isClose)} />
        <div
          className={isClose === false ? "content-area" : "content-area-closed"}
        >
          <QueryClientProvider client={queryClient}>
            <Outlet />
            <ReactQueryDevtools />
          </QueryClientProvider>
        </div>
      </div>
    );
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Questions />,
        },
        {
          path: "/chapters",
          element: <Chapters />,
        },
        {
          path: "/subjects",
          element: <Subjects />,
        },
        {
          path: "/classes",
          element: <Classes />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
