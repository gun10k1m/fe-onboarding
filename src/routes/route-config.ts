import HomePage from "./home-page";
import InfoPage from "./info-page";
import ProjectDetailPage from "./project-detail-page";

export type RouteItem = {
  path: string;
  label: string;
  element?: React.FC;
  children?: RouteItem[];
};

export const routeConfig: RouteItem[] = [
  {
    path: "/",
    label: "🏠 HOME",
    element: HomePage,
  },
  {
    path: "/info",
    label: "ℹ️ INFO",
    element: InfoPage,
  },
  {
    path: "/projects",
    label: "📋 PROJECTS",
    children: [
      {
        path: "/projects/:projectId",
        label: "Dynamic Project",
        element: ProjectDetailPage,
      },
    ],
  },
];
