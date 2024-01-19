import { z } from "zod";

import { adminProcedure, createTRPCRouter } from "~/lib/trpc/trpc";

export const adminRouter = createTRPCRouter({
  generateQrCodes: adminProcedure
    .input(
      z.object({
        numberOfQrCodes: z.number().min(1),
      }),
    )
    .mutation(async ({ ctx, input: { numberOfQrCodes } }) => {
      const petTags = [];
      for (let i = 0; i < numberOfQrCodes; i++) {
        petTags.push({
          registrationCode: "1234567890",
        });
      }

      // const newRecords = await ctx.db.petTag.createMany({
      //   data: petTags,
      // });

      return petTags;
    }),
});
