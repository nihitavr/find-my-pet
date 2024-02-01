import { getServerAuthSession } from "~/lib/auth";
import Unauthorised from "./ui/errors/unauthorised";

export default async function AuthCheck({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = await getServerAuthSession();

  if (!auth?.user) {
    return <Unauthorised />;
  }

  return <>{children}</>;
}
