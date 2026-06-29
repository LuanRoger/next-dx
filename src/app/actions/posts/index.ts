"use server";

import { updateTag } from "next/cache";
import { ENV } from "varlock";
import { delay } from "@/lib/delay";
import { actionClient } from "@/lib/safe-actions";
import {
  getPostsInputSchema,
  getPostsQuerySerializer,
  getPostsResultSchema,
} from "./schemas";

export const getPosts = actionClient
  .inputSchema(getPostsInputSchema)
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

    return { result: resultSample, lastUpdate };
  });

export const refreshPosts = actionClient.action(async () => {
  await delay(1);

  updateTag("posts");
});
