import type { Post } from "@/app/actions/posts/schemas/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import PostsListItem from "./components/item";

type PostsListProps = {
  posts: Post[];
};

export default function PostsList({ posts }: PostsListProps) {
  return (
    <ScrollArea
      className="h-96 rounded-md bg-black px-4"
      data-testid="scroll-area"
    >
      <div className="my-2 flex flex-col space-y-2">
        {posts.map((post) => (
          <PostsListItem key={post.id} post={post} />
        ))}
      </div>
    </ScrollArea>
  );
}
