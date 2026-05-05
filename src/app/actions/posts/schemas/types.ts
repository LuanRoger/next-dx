import type z from "zod";
import type { getPostsResultSchema, postSchema } from ".";

export type Post = z.infer<typeof postSchema>;
export type GetPostsResult = z.infer<typeof getPostsResultSchema>;
