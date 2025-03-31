// router.ts
import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../components/layout";
import HomePage from "./home-page";
import { routeConfig } from "./route-config";
import { flattenRoutes } from "../utils/flatten-routes";

const flatRoutes = flattenRoutes(routeConfig);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      ...flatRoutes
        .filter((r) => r.element)
        .map(({ path, element: Element }) => ({
          path,
          element: Element ? <Element /> : null,
        })),
    ],
  },
]);
