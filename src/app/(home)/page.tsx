import { Suspense } from "react";
import PostView from "@/components/post-view";
import PostViewLoading from "@/components/post-view/loading";
import { ReloadPostsButton } from "@/components/reload-posts-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { pageSearchParamsLoader } from "./search-params";

export default async function Page({ searchParams }: PageProps<"/">) {
  const { userId } = await pageSearchParamsLoader(searchParams);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Card className="w-full lg:max-w-4xl">
        <CardHeader>
          <CardTitle>Next.js DX</CardTitle>
          <CardDescription>
            A better developer experience for Next.js
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<PostViewLoading />}>
            <PostView userId={userId ?? undefined} />
          </Suspense>
        </CardContent>
        <CardFooter>
          <ReloadPostsButton />
        </CardFooter>
      </Card>
    </div>
  );
}
