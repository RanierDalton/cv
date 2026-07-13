import "@/lib/i18n";
import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

const getBasePath = () => {
  if (typeof window !== "undefined") {
    if (
      window.location.hostname.includes("github.io") &&
      (window.location.pathname === "/cv" || window.location.pathname.startsWith("/cv/"))
    ) {
      return "/cv";
    }
  }
  return "/";
};

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    basepath: getBasePath(),
  });

  return router;
};