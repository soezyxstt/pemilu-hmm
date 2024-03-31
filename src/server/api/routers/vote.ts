import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import type { Prince, Senator } from "@prisma/client";

export const voteRouter = createTRPCRouter({
  votePrince: protectedProcedure
    .input(
      z.object({
        prince: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const {
        session: {
          user: { id },
        },
        db,
      } = ctx;

      const { prince } = input;
      const p: Prince = prince === "1" ? "faris" : "wilnat";

      const user = await db.user.findUnique({
        where: {
          id,
        },
        include: {
          votePrince: true,
        }
      });

      if (user?.votePrince) return { error: "Anda sudah memilih Prince!" };
      
      if (!user?.isInPrince) return { error: "Anda tidak terdaftar dalam pemilihan Prince!" }

      try {
        const vote = await db.votePrince.create({
          data: {
            prince: p,
            user: {
              connect: {
                id: id,
              },
            },
          },
        });

        if (!vote) return {error: "Gagal memilih!"};

        return {
          error: null,
          ...vote,
        };
      } catch (error) {
        return {error: "Gagal memilih!"};
      }
    }),
  
  voteSenator: protectedProcedure.input(
    z.object({
      senator: z.string(),
    }),
  ).mutation(async ({ ctx, input }) => {
    const {
      session: {
        user: { id },
      },
      db,
    } = ctx;

    const { senator } = input;
    const s: Senator = senator === "1" ? "nika" : "dihya";

    const user = await db.user.findUnique({
      where: {
        id,
      },
      include: {
        voteSenator: true,
      }
    });

    if (user?.voteSenator) return { error: "Anda sudah memilih Senator!" };
    
    if (!user?.isInSenator) return { error: "Anda tidak terdaftar dalam pemilihan Senator!" }

    try {
      const vote = await db.voteSenator.create({
        data: {
          senator: s,
          user: {
            connect: {
              id: id,
            },
          },
        },
      });

      if (!vote) return {error: "Gagal memilih Senator!"};

      return {
        error: null,
        ...vote,
      };
    } catch (error) {
      return {error: "Gagal memilih Senator!"};
    }
  }),
});
