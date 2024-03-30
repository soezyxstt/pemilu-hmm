import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { Prince, Senator } from "@prisma/client";
import { TRPCClientError } from "@trpc/client";

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

      try {
        const user = await db.vote.create({
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

        if (!user) throw new TRPCClientError("Failed to vote");

        return user;
      } catch (error) {
        throw new TRPCClientError(error as string);
      }
    }),
});
