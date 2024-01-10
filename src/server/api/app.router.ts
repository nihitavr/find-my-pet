import { createTRPCRouter } from "~/lib/trpc/trpc";
import { petRouter } from "./pets/pets.router";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  pet: petRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
