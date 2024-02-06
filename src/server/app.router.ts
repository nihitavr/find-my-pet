import { createTRPCRouter } from "~/lib/trpc/trpc";
import { petRouter } from "./pet/pet.router";
import { userProfileRouter } from "./user/user.router";
import { adminRouter } from "./admin/admin.router";
import { petTagRouter } from "./pet-tag/pet-tag.router";
import { productRouter } from "./product/product.router";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  pet: petRouter,
  user: userProfileRouter,
  admin: adminRouter,
  petTag: petTagRouter,
  product: productRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
