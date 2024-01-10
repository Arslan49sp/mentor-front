import { memo, useState } from "react";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Sidebar from "./components/SideBar";
import Chapters from "./pages/Chapters";
import Classes from "./pages/Classes";
import Questions from "./pages/Questions";
import Subjects from "./pages/Subjects";

function App() {
  const [isClose, setIsClose] = useState(false);

  const Layout = memo(() => {
    return (
      <div>
        <Sidebar isClose={isClose} setIsClose={() => setIsClose(!isClose)} />
        <div
          className={isClose === false ? "content-area" : "content-area-closed"}
        >
          <Outlet />
        </div>
      </div>
    );
  });

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
