import { createTRPCRouter } from "~/lib/trpc/trpc";
import { petRouter } from "./pet/pet.router";
import { userProfileRouter } from "./user/user.router";
import { adminRouter } from "./admin/admin.router";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  pet: petRouter,
  user: userProfileRouter,
  admin: adminRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
