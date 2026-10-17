"use client";

import { RefreshCcwIcon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { type MouseEvent, useCallback, useState } from "react";
import { refreshPosts } from "@/app/actions/posts";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

type ReloadPostsButtonProps = {
  userId?: number;
};

export function ReloadPostsButton({ userId }: ReloadPostsButtonProps) {
  const { execute, isPending, isExecuting } = useAction(refreshPosts);
  const isLoading = isPending || isExecuting;
  const [crossfade, setCrossfade] = useState(false);

  const handleReload = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      setCrossfade(event.detail > 0);
      execute({ userId });
    },
    [execute, userId]
  );

  return (
    <>
      <Button disabled={isLoading} onClick={handleReload}>
        <span
          aria-hidden="true"
          className="group/reload-icon relative inline-block size-4 shrink-0"
          data-crossfade={crossfade}
          data-loading={isLoading}
        >
          <span
            className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-none duration-120 ease-[cubic-bezier(0.22,1,0.36,1)] data-[visible=true]:opacity-100 group-data-[crossfade=true]/reload-icon:transition-opacity motion-reduce:duration-80"
            data-visible={!isLoading}
          >
            <RefreshCcwIcon aria-hidden="true" />
          </span>
          <span
            className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-none duration-120 ease-[cubic-bezier(0.22,1,0.36,1)] data-[visible=true]:opacity-100 group-data-[crossfade=true]/reload-icon:transition-opacity motion-reduce:duration-80"
            data-visible={isLoading}
          >
            <Spinner
              aria-hidden="true"
              className="group-data-[loading=false]/reload-icon:paused motion-reduce:animate-none"
            />
          </span>
        </span>
        Reload
      </Button>
      <span aria-atomic="true" className="sr-only" role="status">
        {isLoading ? "Loading posts" : ""}
      </span>
    </>
  );
}
