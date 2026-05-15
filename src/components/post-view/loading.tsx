import { Skeleton } from "../ui/skeleton";

export default function PostViewLoading() {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="h-5 w-46" />
      <Skeleton className="h-96 w-full" />
    </div>
  );
}
