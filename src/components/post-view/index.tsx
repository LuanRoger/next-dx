import { cacheLife, cacheTag } from "next/cache";
import { getPostsText } from "@/app/actions/posts";

export default async function PostView() {
  "use cache";
  cacheTag("posts");
  cacheLife("hours");

  const posts = await getPostsText();

  const errorMessage = "Failed to fetch posts. Please try again later.";
  const hasError = !posts.data || posts.validationErrors;
  if (hasError) {
    return <span className="text-red-500">{errorMessage}</span>;
  }

  const { result, lastUpdate } = posts.data;
  return (
    <div className="flex flex-col gap-2">
      <p className="font-mono text-muted-foreground">
        Last updated: {lastUpdate}
      </p>
      <pre className="max-h-96 overflow-scroll rounded-md bg-black p-4">
        <span>{result}</span>
      </pre>
    </div>
  );
}
