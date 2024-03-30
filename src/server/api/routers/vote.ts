import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import type { Prince, Senator } from "@prisma/client";

export const voteRouter = createTRPCRouter({
  vote: protectedProcedure
    .input(
      z.object({
        prince: z.string(),
        senator: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const {
        session: {
          user: { id },
        },
        db,
      } = ctx;

      const { prince, senator } = input;
      const p: Prince = prince === "1" ? "faris" : "wilnat";
      const s: Senator = senator === "1" ? "nika" : "dihya";

      const user = await db.user.findUnique({
        where: {
          id,
        },
        include: {
          vote: true,
        }
      });

      if (user?.vote) return {error: "Anda sudah memilih!"};

      try {
        const vote = await db.vote.create({
          data: {
            prince: p,
            senator: s,
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
});
