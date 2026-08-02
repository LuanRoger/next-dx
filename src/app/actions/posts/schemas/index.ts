import { createSerializer, parseAsInteger } from "nuqs/server";
import { z } from "zod";

export const userPostsInputSchema = z.object({
  userId: z.number().optional(),
});

export const getPostsQuerySerializer = createSerializer({
  userId: parseAsInteger,
});

export const postSchema = z.object({
  body: z.string(),
  id: z.number(),
  title: z.string(),
  userId: z.number(),
});

export const getPostsResultSchema = z.array(postSchema);
