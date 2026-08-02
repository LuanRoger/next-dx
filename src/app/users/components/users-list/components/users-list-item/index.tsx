import type { UserSchema } from "@/app/actions/users/schemas/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type UserListItemProps = {
  user: UserSchema;
};

export default function UsersListItem({ user }: UserListItemProps) {
  const { id, name, email, username } = user;

  return (
    <li>
      <Card size="sm">
        <CardHeader>
          <CardTitle>
            {name}{" "}
            <span className="text-muted-foreground text-sm">@{username}</span>
          </CardTitle>
          <CardDescription>{email}</CardDescription>
        </CardHeader>
        <CardContent>
          <span>ID: {id}</span>
        </CardContent>
      </Card>
    </li>
  );
}
