import { cacheTag } from "next/cache";
import { getPosts } from "@/app/actions/posts";
import { cn } from "@/lib/utils";
import PostsList from "./components/posts-list";

type PostViewProps = {
  userId?: number;
  className?: string;
};

export default async function PostView({ userId, className }: PostViewProps) {
  "use cache";
  cacheTag(`posts:${userId ?? "all"}`);

  const posts = await getPosts({ userId });

  const errorMessage = "Failed to fetch posts. Please try again later.";
  const hasError = !posts.data || posts.validationErrors;
  if (hasError) {
    return <span className="text-red-500">{errorMessage}</span>;
  }

  const { result, lastUpdate } = posts.data;
  return (
    <div className={cn("flex flex-col", className)}>
      <p className="flex gap-2 font-mono text-muted-foreground">
        Last updated: {lastUpdate}
      </p>
      <PostsList className="min-h-0 flex-1" posts={result} />
    </div>
  );
}
