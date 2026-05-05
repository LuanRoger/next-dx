import type { Post } from "@/app/actions/posts/schemas/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type PostsListItemProps = {
  post: Post;
};

export default function PostsListItem({ post }: PostsListItemProps) {
  const { title, body } = post;

  return (
    <Alert>
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{body}</AlertDescription>
    </Alert>
  );
}
