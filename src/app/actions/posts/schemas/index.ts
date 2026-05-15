import { createSerializer, parseAsInteger } from "nuqs/server";
import { z } from "zod";

export const getPostsInputSchema = z.object({
  userId: z.number().optional(),
});

export const getPostsQuerySerializer = createSerializer({
  userId: parseAsInteger,
});

export const postSchema = z.object({
  id: z.number(),
  userId: z.number(),
  title: z.string(),
  body: z.string(),
});

export const getPostsResultSchema = z.array(postSchema);
