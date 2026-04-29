import { RefreshCcwIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Card className="w-4xl">
        <CardHeader>
          <CardTitle>Next.js DX</CardTitle>
          <CardDescription>
            A better developer experience for Next.js
          </CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="rounded-md bg-black p-4">No content.</pre>
        </CardContent>
        <CardFooter>
          <Button>
            <RefreshCcwIcon />
            Reload
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
