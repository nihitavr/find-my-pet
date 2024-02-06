import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/lib/trpc/trpc";

export const productRouter = createTRPCRouter({
  getProductById: publicProcedure
    .input(
      z.object({
        id: z.string().cuid(),
      }),
    )
    .query(async ({ ctx, input: { id } }) => {
      return ctx.db.product.findFirst({
        where: { id },
        include: {
          variants: true,
        },
      });
    }),
});
