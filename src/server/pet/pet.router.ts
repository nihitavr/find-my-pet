import { type Gender } from "@prisma/client";
import { z } from "zod";
import { api } from "~/lib/trpc/server";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/lib/trpc/trpc";

export const petProfileFormSchema = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  gender: z.string(),
  profileImages: z.array(z.string().url()),
  socialMediaLinks: z.object({
    instagram: z.string().url().optional(),
  }),
  type: z.string(),
  breed: z.string(),
  birthdate: z.string(),
  description: z.string().optional(),
  petTagId: z.string().cuid().optional(),
});

export const petRouter = createTRPCRouter({
  addPetProfile: protectedProcedure
    .input(petProfileFormSchema)
    .mutation(async ({ ctx, input }) => {
      const pet = await ctx.db.pet.create({
        data: {
          name: input.name,
          userId: ctx.session.user.id,
          type: input.type,
          gender: input.gender as Gender,
          socialMediaLinks: input.socialMediaLinks,
          profileImages: input.profileImages,
          breed: input.breed,
          birthdate: new Date(input.birthdate),
          description: input.description,
        },
      });

      if (input.petTagId) {
        await ctx.db.petTag.update({
          where: { id: input.petTagId, petId: null },
          data: {
            userId: ctx.session.user.id,
            petId: pet.id,
          },
        });
      }

      return pet;
    }),
  updatePetProfile: protectedProcedure
    .input(petProfileFormSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.pet.update({
        where: { id: input.id },
        data: {
          id: input.id,
          name: input.name,
          gender: input.gender as Gender,
          socialMediaLinks: input.socialMediaLinks,
          profileImages: input.profileImages,
          userId: ctx.session.user.id,
          type: input.type,
          breed: input.breed,
          birthdate: new Date(input.birthdate),
          description: input.description,
        },
      });
    }),

  getPetProfiles: protectedProcedure.query(({ ctx }) => {
    return ctx.db.pet.findMany({
      orderBy: { createdAt: "desc" },
      where: { userId: ctx.session.user.id },
    });
  }),

  getPetProfile: protectedProcedure
    .input(
      z.object({
        id: z.string().cuid(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.pet.findFirst({
        orderBy: { createdAt: "desc" },
        where: { userId: ctx.session.user.id, id: input.id },
      });
    }),
  getPet: publicProcedure
    .input(
      z.object({
        id: z.string().cuid(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.pet.findFirst({
        orderBy: { createdAt: "desc" },
        where: { id: input.id },
      });
    }),
  getPets: publicProcedure
    .input(
      z.object({
        userId: z.string().cuid(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.pet.findMany({
        orderBy: { createdAt: "desc" },
        where: { userId: input.userId },
      });
    }),
});
