"use server";

import { updateTag } from "next/cache";
import { ENV } from "varlock/env";
import { delay } from "@/lib/delay";
import { actionClient } from "@/lib/safe-actions";

export const getPostsText = actionClient.action(async () => {
  const baseUrl = ENV.JSON_PLACEHOLDER_URL;

  const result = await fetch(`${baseUrl}/posts`);
  await delay(2);

  const lastUpdate = new Date().toLocaleTimeString();

  return { result: await result.text(), lastUpdate };
});

export const refreshPosts = actionClient.action(async () => {
  await delay(1);

  updateTag("posts");
});
