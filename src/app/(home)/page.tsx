import { Suspense } from "react";
import FooterNavigation from "@/components/footer-navigation";
import PostView from "@/components/post-view";
import PostViewLoading from "@/components/post-view/loading";
import { ReloadPostsButton } from "@/components/reload-posts-button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UserIdUpdate from "./components/user-id-update";
import { pageSearchParamsCache } from "./search-params";

export default async function Page({ searchParams }: PageProps<"/">) {
  const { userId } = await pageSearchParamsCache.parse(searchParams, {
    strict: true,
  });

  return (
    <>
      <CardHeader>
        <CardTitle>Next.js DX</CardTitle>
        <CardDescription>
          A better developer experience for Next.js
        </CardDescription>
      </CardHeader>
      <CardContent>
        <UserIdUpdate />
        <Suspense fallback={<PostViewLoading />}>
          <PostView userId={userId ?? undefined} />
        </Suspense>
      </CardContent>
      <CardFooter className="justify-between">
        <ReloadPostsButton userId={userId ?? undefined} />
        <FooterNavigation />
      </CardFooter>
    </>
  );
}
