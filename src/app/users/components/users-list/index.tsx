import { getUsers } from "@/app/actions/users";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import UsersListItem from "./components/users-list-item";

type UserListProps = {
  className?: string;
};

export default async function UsersList({ className }: UserListProps) {
  "use cache";

  const { data, serverError } = await getUsers();

  const hasError = !data || serverError;
  if (hasError) {
    return (
      <span className="text-red-500">{serverError ?? "Unknown error"}</span>
    );
  }

  return (
    <ScrollArea
      className={cn("rounded-md bg-black px-4", className)}
      data-testid="scroll-area"
    >
      <ul className="my-2 flex flex-col gap-2">
        {data.map((user) => (
          <UsersListItem key={user.id} user={user} />
        ))}
      </ul>
    </ScrollArea>
  );
}
