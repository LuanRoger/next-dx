"use client";

import { RefreshCcwIcon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { refreshPosts } from "@/app/actions/posts";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

export function ReloadPostsButton() {
  const { execute, isPending, isExecuting } = useAction(refreshPosts);
  const isLoading = isPending || isExecuting;

  return (
    <Button disabled={isLoading} onClick={() => execute()}>
      {isLoading ? <Spinner /> : <RefreshCcwIcon />}
      Reload
    </Button>
  );
}
