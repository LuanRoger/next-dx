import { Suspense } from "react";
import FooterNavigation from "@/components/footer-navigation";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UsersList from "./components/users-list";

export default async function Page() {
  return (
    <>
      <CardHeader>
        <CardTitle>Next.js DX</CardTitle>
        <CardDescription>
          A better developer experience for Next.js
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense>
          <UsersList />
        </Suspense>
      </CardContent>
      <CardFooter className="justify-between">
        <FooterNavigation />
      </CardFooter>
    </>
  );
}
