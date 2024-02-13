import { nanoid } from "nanoid";
import { z } from "zod";
import { QR_CODE_ID_LENGTH } from "~/lib/constants";
import { sendPetTagScanEmail } from "~/lib/mail";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/lib/trpc/trpc";

export const petTagRouter = createTRPCRouter({
  getPetTag: publicProcedure
    .input(
      z.object({
        qrCodeId: z.string().min(12),
      }),
    )
    .query(async ({ ctx, input: { qrCodeId } }) => {
      const petTag = await ctx.db.petTag.findUnique({
        where: { qrCodeId },
      });

      return petTag;
    }),

  registerPetTag: protectedProcedure
    .input(
      z.object({
        petId: z.string().cuid(),
        qrCodeId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input: { qrCodeId, petId } }) => {
      const petTag = await ctx.db.petTag.update({
        where: { qrCodeId: qrCodeId, petId: null },
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

  recordScan: publicProcedure
    .input(
      z.object({
        petId: z.string().cuid(),
        qrCodeId: z.string().cuid(),
        geoCode: z.object({
          latitude: z.number(),
          longitude: z.number(),
        }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const petTag = await ctx.db.petTag.findUnique({
        where: { qrCodeId: input.qrCodeId },
        include: {
          pet: true,
          user: true,
        },
      });

      if (!petTag) {
        return {};
      }

      // Send email to pet owner
      if (petTag?.user?.email) {
        void sendPetTagScanEmail(
          petTag.user.email,
          petTag.user.name!,
          petTag.pet!.name,
          petTag.pet!.id,
        );
      }

      return ctx.db.scanHistory.create({
        data: {
          petId: input.petId,
          petTagId: petTag.id,
          scannedAt: new Date(),
          geoCode: input.geoCode,
        },
      });
    }),

  generatePetTags: publicProcedure
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
