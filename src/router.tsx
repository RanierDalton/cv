import { QueryClient } from "@tanstack/react-query";
import { createBrowserHistory, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const history = typeof window !== "undefined"
    ? createBrowserHistory({
        base: window.location.pathname.startsWith("/cv") ? "/cv" : "/",
      })
    : undefined;

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    history,
  });

  return router;
};