import { Skeleton } from "../ui/skeleton";

export default function PostViewLoading() {
  return (
    <div className="flex flex-col gap-2" data-testid="post-view-loading">
      <Skeleton className="h-5 w-46" data-testid="skeleton" />
      <Skeleton className="h-96 w-full" data-testid="skeleton" />
    </div>
  );
}
