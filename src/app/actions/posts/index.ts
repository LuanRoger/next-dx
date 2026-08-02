"use server";

import { updateTag } from "next/cache";
import { ENV } from "varlock/env";
import { delay } from "@/lib/delay";
import { actionClient } from "@/lib/safe-actions";
import {
  getPostsQuerySerializer,
  getPostsResultSchema,
  userPostsInputSchema,
} from "./schemas";

export const getPosts = actionClient
  .inputSchema(userPostsInputSchema)
  .action(async ({ parsedInput }) => {
    const { userId } = parsedInput;
    const baseUrl = ENV.JSON_PLACEHOLDER_URL;

    const query = getPostsQuerySerializer({ userId });
    const result = await fetch(`${baseUrl}/posts${query}`);
    await delay(2);

    const lastUpdate = new Date().toLocaleTimeString();

    const parsedJson = await result.json();
    const parsedResult = getPostsResultSchema.parse(parsedJson);
    const resultSample = parsedResult.slice(0, 10);

    return { lastUpdate, result: resultSample };
  });

export const refreshPosts = actionClient
  .inputSchema(userPostsInputSchema)
  .action(async ({ parsedInput }) => {
    const { userId } = parsedInput;
    await delay(1);

    updateTag(`posts:${userId ?? "all"}`);
  });
