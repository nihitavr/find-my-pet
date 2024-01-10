import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/lib/trpc/trpc";

export const petRouter = createTRPCRouter({
  addPet: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        type: z.string(),
        breed: z.string(),
        birthdate: z.string(),
        description: z.string().nullable(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      console.log("input", input);

      return ctx.db.pet.create({
        data: {
          name: input.name,
          userId: ctx.session.user.id,
          type: input.type,
          breed: input.breed,
          birthdate: input.birthdate,
          description: input.description,
        },
      });
    }),

  getPets: protectedProcedure.query(({ ctx }) => {
    return ctx.db.pet.findMany({
      orderBy: { createdAt: "desc" },
      where: { userId: ctx.session.user.id },
    });
  }),
});
