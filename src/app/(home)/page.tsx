import FooterNavigation from "@/components/footer-navigation";
import PostView from "@/components/post-view";
import { ReloadPostsButton } from "@/components/reload-posts-button";
import {
  Card,
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
    <Card className="h-180 w-full flex-col lg:max-w-4xl">
      <CardHeader>
        <CardTitle>Next.js DX</CardTitle>
        <CardDescription>
          A better developer experience for Next.js
        </CardDescription>
        <UserIdUpdate />
      </CardHeader>
      <CardContent className="flex min-h-0 flex-1 flex-col">
        <PostView className="min-h-0 flex-1" userId={userId ?? undefined} />
      </CardContent>
      <CardFooter className="flex-none justify-between">
        <ReloadPostsButton userId={userId ?? undefined} />
        <FooterNavigation />
      </CardFooter>
    </Card>
  );
}
