import { createFileRoute } from "@tanstack/react-router";
import { Index } from "./cv";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => pageHead(),
  component: Index,
});
