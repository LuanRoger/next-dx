"use client";

import { RefreshCcwIcon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useCallback } from "react";
import { refreshPosts } from "@/app/actions/posts";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

type ReloadPostsButtonProps = {
  userId?: number;
};

export function ReloadPostsButton({ userId }: ReloadPostsButtonProps) {
  const { execute, isPending, isExecuting } = useAction(refreshPosts);
  const isLoading = isPending || isExecuting;

  const handleReload = useCallback(
    () => execute({ userId }),
    [execute, userId]
  );

  return (
    <Button disabled={isLoading} onClick={handleReload}>
      {isLoading ? <Spinner /> : <RefreshCcwIcon />}
      Reload
    </Button>
  );
}
