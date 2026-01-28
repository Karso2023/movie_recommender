import { Navbar } from "@/components/layout/navbar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Note: Actual auth protection should be handled in middleware.ts
  // This layout just provides the UI structure
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
    </>
  );
}