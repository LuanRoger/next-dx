import { getUsers } from "@/app/actions/users";
import { ScrollArea } from "@/components/ui/scroll-area";
import UsersListItem from "./components/users-list-item";

export default async function UsersList() {
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
      className="h-96 rounded-md bg-black px-4"
      data-testid="scroll-area"
    >
      <ul className="my-2 flex flex-col space-y-2">
        {data.map((user) => (
          <UsersListItem key={user.id} user={user} />
        ))}
      </ul>
    </ScrollArea>
  );
}
