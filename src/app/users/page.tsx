import FooterNavigation from "@/components/footer-navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UsersList from "./components/users-list";

export default async function Page() {
  return (
    <Card className="h-170 w-full flex-col lg:max-w-4xl">
      <CardHeader>
        <CardTitle>Next.js DX</CardTitle>
        <CardDescription>
          A better developer experience for Next.js
        </CardDescription>
      </CardHeader>
      <CardContent className="flex min-h-0 flex-1 flex-col">
        <UsersList className="min-h-0 flex-1" />
      </CardContent>
      <CardFooter className="flex-none justify-end">
        <FooterNavigation />
      </CardFooter>
    </Card>
  );
}
