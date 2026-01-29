import { Navbar } from "@/components/layout/navbar";
import { getSessionUser } from "@/app/actions/auth";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSessionUser();

  return (
    <>
      <Navbar user={user} />
      <main className="flex-1">{children}</main>
    </>
  );
}