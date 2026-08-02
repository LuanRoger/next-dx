import type { Post } from "@/app/actions/posts/schemas/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type PostsListItemProps = {
  post: Post;
};

export default function PostsListItem({ post }: PostsListItemProps) {
  const { title, body } = post;

  return (
    <li>
      <Card size="sm">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>{body}</CardContent>
      </Card>
    </li>
  );
}
