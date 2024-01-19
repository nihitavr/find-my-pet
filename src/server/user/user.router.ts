import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/lib/trpc/trpc";

export const userProfileFormSchema = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  phoneNumber: z.string(),
});

export const userProfileRouter = createTRPCRouter({
  getUserProfile: protectedProcedure.query(({ ctx }) => {
    return ctx.db.user.findFirst({
      where: { id: ctx.session.user.id },
      select: { id: true, name: true, phoneNumber: true, email: true },
    });
  }),
  updateUserProfile: protectedProcedure
    .input(userProfileFormSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.user.update({
        where: { id: ctx.session.user.id },
        data: {
          id: input.id,
          name: input.name,
          phoneNumber: input.phoneNumber,
        },
      });
    }),
});
