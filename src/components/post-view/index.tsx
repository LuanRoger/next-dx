import { cacheTag } from "next/cache";
import { getPosts } from "@/app/actions/posts";
import PostsList from "./components/posts-list";

type PostViewProps = {
  userId?: number;
};

export default async function PostView({ userId }: PostViewProps) {
  "use cache";
  cacheTag("posts");

  const posts = await getPosts({ userId });

  const errorMessage = "Failed to fetch posts. Please try again later.";
  const hasError = !posts.data || posts.validationErrors;
  if (hasError) {
    return <span className="text-red-500">{errorMessage}</span>;
  }

  const { result, lastUpdate } = posts.data;
  return (
    <div className="flex flex-col gap-2">
      <p className="flex gap-2 font-mono text-muted-foreground">
        Last updated: {lastUpdate}
      </p>
      <PostsList posts={result} />
    </div>
  );
}
