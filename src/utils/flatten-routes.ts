// utils/flatten-routes.ts
import { RouteItem } from "../routes/route-config";

export function flattenRoutes(routes: RouteItem[]): RouteItem[] {
  return routes.flatMap((route) => {
    if (route.children) {
      return [route, ...flattenRoutes(route.children)];
    }
    return [route];
  });
}
