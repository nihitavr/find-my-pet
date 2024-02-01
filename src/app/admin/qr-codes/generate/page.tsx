import MultipleQrCodeGenerator from "~/components/admin/multiple-qr-code-generator";
import Unauthorised from "~/components/ui/errors/unauthorised";
import { getServerAuthSession } from "~/lib/auth";

export default async function GenerateQrcode() {
  const auth = await getServerAuthSession();

  if (auth?.user?.role != "admin") return <Unauthorised />;

  return <MultipleQrCodeGenerator />;
}
