import { z } from "zod";
import { nanoid } from "nanoid";
import { adminProcedure, createTRPCRouter } from "~/lib/trpc/trpc";

export const adminRouter = createTRPCRouter({
  generateQrCodes: adminProcedure
    .input(
      z.object({
        qrCount: z.number().min(1),
      }),
    )
    .mutation(async ({ ctx, input: { qrCount } }) => {
      const petTags = [];
      for (let i = 0; i < qrCount; i++) {
        const qrCode = nanoid(12);

        petTags.push({
          registrationCode: "123456",
          qrCode: nanoid(12),
          qrUrl: "https://findmypet.in/pt/" + qrCode,
        });
      }
      return petTags;
    }),
});
