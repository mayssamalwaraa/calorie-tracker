import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  LandingPage,
  TrackPage,
  PageLayout,
  ErrorPage,
  DetailPage,
} from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <PageLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "track",
        element: <TrackPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "track/:recordId",
        element: <DetailPage />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
