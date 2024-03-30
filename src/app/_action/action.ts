"use server";

import { api } from '~/trpc/server';

export const vote = async ({prince, senator}: { prince: string; senator: string }) => {
  const res = await api.vote.vote({
    prince: prince,
    senator: senator,
  });

  return res;
};
