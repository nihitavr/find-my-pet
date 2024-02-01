import Link from "next/link";
import PetProfile from "~/components/pet-profile";
import SignIn from "~/components/sign-in";
import { Button } from "~/components/ui/button";
import NotFound from "~/components/ui/errors/not-found";
import { getServerAuthSession } from "~/lib/auth";
import { api } from "~/lib/trpc/server";

export default async function PetTag({
  params,
}: {
  params: { qrCodeId: string };
}) {
  const auth = await getServerAuthSession();
  const petTag = await api.petTag.getPetTag.query({
    qrCodeId: params.qrCodeId,
  });

  if (!petTag) return <NotFound />;

  if (!petTag.petId && !auth?.user)
    return (
      <div className="flex h-[90vh] w-full flex-col items-center justify-center">
        <div className="p-5 font-semibold text-foreground">
          This qr code is not associated with any pet. Please sign in to
          register the pet tag with your pet.
        </div>
        <SignIn
          callbackUrl={`/dashboard/owner-profile?qrCodeId=${petTag.qrCodeId}`}
        />
      </div>
    );

  if (!petTag.petId && auth?.user)
    return (
      <div className="flex h-[90vh] w-full flex-col items-center justify-center">
        <div className="p-5 font-semibold text-foreground">
          This qr code is not associated with any pet. Please add/select a pet
          to register the pet tag.
        </div>
        <Link
          href={`/dashboard/pet-tags/pet-selection?qrCodeId=${petTag.qrCodeId}`}
        >
          <Button variant="secondary">Select or Create New Pet</Button>
        </Link>
      </div>
    );

  const user = await api.user.getUser.query({ id: petTag.userId! });

  return (
    <PetProfile id={petTag.petId!} user={user} qrCodeId={petTag.qrCodeId} />
  );
}