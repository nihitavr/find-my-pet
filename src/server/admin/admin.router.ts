import { z } from "zod";
import { nanoid } from "nanoid";
import { adminProcedure, createTRPCRouter } from "~/lib/trpc/trpc";
import { QR_CODE_ID_LENGTH } from "~/lib/constants";

export const adminRouter = createTRPCRouter({
  generatePetTagIds: adminProcedure
    .input(
      z.object({
        qrCount: z.number().min(1),
      }),
    )
    .mutation(async ({ ctx, input: { qrCount } }) => {
      const result = [];
      while (true && qrCount > 0) {
        const nanoId = nanoid(QR_CODE_ID_LENGTH);

        const petTagCheck = await ctx.db.petTag.findUnique({
          where: {
            qrCodeId: nanoId,
          },
        });

        if (petTagCheck) {
          continue;
        }

        result.push(
          await ctx.db.petTag.create({
            data: {
              qrCodeId: nanoId,
            },
          }),
        );

        qrCount--;
      }

      return result;
    }),
});
