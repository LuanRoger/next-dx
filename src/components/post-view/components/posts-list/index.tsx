import type { Post } from "@/app/actions/posts/schemas/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import PostsListItem from "./components/item";

type PostsListProps = {
  posts: Post[];
  className?: string;
};

export default function PostsList({ posts, className }: PostsListProps) {
  return (
    <ScrollArea
      className={cn("rounded-md bg-black px-4", className)}
      data-testid="scroll-area"
    >
      <ul className="my-2 flex flex-col gap-2">
        {posts.map((post) => (
          <PostsListItem key={post.id} post={post} />
        ))}
      </ul>
    </ScrollArea>
  );
}
