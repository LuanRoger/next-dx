import { Card } from "@/components/ui/card";

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <main className="flex h-screen flex-col items-center justify-center p-4">
      <Card className="w-full lg:max-w-4xl">{children}</Card>
    </main>
  );
}
