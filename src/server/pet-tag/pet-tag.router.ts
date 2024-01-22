import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/lib/trpc/trpc";

export const petTagRouter = createTRPCRouter({
  getPetTag: publicProcedure
    .input(
      z.object({
        id: z.string().cuid(),
      }),
    )
    .mutation(async ({ ctx, input: { id } }) => {
      const petTag = await ctx.db.petTag.findUnique({
        where: { id },
      });

      return petTag;
    }),

  registerPetTag: protectedProcedure
    .input(
      z.object({
        petId: z.string().cuid(),
        petTagId: z.string().cuid(),
      }),
    )
    .mutation(async ({ ctx, input: { petTagId, petId } }) => {
      const petTag = await ctx.db.petTag.update({
        where: { id: petTagId, petId: null },
        data: {
          userId: ctx.session.user.id,
          petId: petId,
        },
      });

      return petTag;
    }),

  getPetTags: protectedProcedure.query(({ ctx }) => {
    return ctx.db.petTag.findMany({
      orderBy: { createdAt: "desc" },
      where: { userId: ctx.session.user.id },
      include: {
        pet: true,
      },
    });
  }),
});
