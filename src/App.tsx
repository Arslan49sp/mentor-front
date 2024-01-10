import { memo, useEffect, useState } from "react";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Sidebar from "./components/SideBar";
import Chapters from "./pages/Chapters";
import Classes from "./pages/Classes";
import Questions from "./pages/Questions";
import Subjects from "./pages/Subjects";

function App() {
  const [isClose, setIsClose] = useState(false);

  const handleResize = () => {
    // Update isClose based on screen width
    if (window.innerWidth <= 700) {
      setIsClose(true);
    } else {
      setIsClose(false);
    }
  };

  useEffect(() => {
    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Initial check on component mount
    handleResize();

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
