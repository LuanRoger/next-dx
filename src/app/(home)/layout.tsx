export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <main className="flex h-screen flex-col items-center justify-center p-4">
      {children}
    </main>
  );
}
