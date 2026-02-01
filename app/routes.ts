import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("select", "routes/select.tsx"),
  route("race", "routes/race.tsx"),
  route("quick-race", "routes/quick-race.tsx"),

  route("api/restaurants", "routes/api.restaurants.ts"),
] satisfies RouteConfig;
