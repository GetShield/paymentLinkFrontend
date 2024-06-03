import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { Nav } from "@/components";

import Sideb from "@/components/Sideb";
import { authOptions } from "@/lib";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  if (!session || session.isExpired) {
    redirect("/login");
  }
  // Utiliza useRouter para obtener la URL actual+

  return (
    <>
      <Nav session={session} />

      <Sideb session={session} />
      <div className="p-4 sm:ml-64">
        {/* <div className="mt-14 rounded-lg border-2 border-dashed border-gray-200 p-4 dark:border-gray-700"> */}
        {/* <main className="m-auto h-full min-h-screen max-w-6xl pt-[var(--nav-height)]"> */}
        {children}
        {/* </main> */}
        {/* </div> */}
      </div>
    </>
  );
}
