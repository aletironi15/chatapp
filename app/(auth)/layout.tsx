import { isUserOnline } from "@/lib/actions/auth";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const res = await isUserOnline();
  if (res.user) {
    redirect("/");
  }
  return <>{children}</>;
}
