"use server";

import { api } from '~/trpc/server';

export const vote = async ({prince, senator}: { prince: string; senator: string }) => {
  const p = await api.vote.votePrince({ prince });
  const s = await api.vote.voteSenator({ senator });

  return {
    prince: p,
    senator: s,
  }
};
