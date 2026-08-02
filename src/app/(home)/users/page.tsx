import FooterNavigation from "@/components/footer-navigation";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page() {
  return (
    <>
      <CardHeader>
        <CardTitle>Next.js DX</CardTitle>
        <CardDescription>
          A better developer experience for Next.js
        </CardDescription>
      </CardHeader>
      <CardContent>
        <h1>Users</h1>
      </CardContent>
      <CardFooter className="justify-between">
        <FooterNavigation />
      </CardFooter>
    </>
  );
}
