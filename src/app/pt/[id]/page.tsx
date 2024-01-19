import Link from "next/link";
import PetProfile from "~/components/pet-profile";
import SignIn from "~/components/sign-in";
import { Button } from "~/components/ui/button";
import NotFound from "~/components/ui/not-found";
import { getServerAuthSession } from "~/lib/auth";
import { api } from "~/lib/trpc/server";

export default async function PetTag({ params }: { params: { id: string } }) {
  const auth = await getServerAuthSession();
  const petTag = await api.petTag.getPetTag.mutate({ id: params.id });

  if (!petTag) return <NotFound />;

  if (!petTag.petId && !auth?.user)
    return (
      <div className="flex h-[90vh] w-full flex-col items-center justify-center">
        <div className="p-5 font-semibold text-primary">
          This qr code is not associated with any pet. Please sign in to
          register the pet tag with your pet.
        </div>
        <SignIn
          callbackUrl={`/dashboard?petTagRegistration=true&petTagId=${petTag.id}`}
        />
      </div>
    );

  if (!petTag.petId && auth?.user)
    return (
      <div className="flex h-[90vh] w-full flex-col items-center justify-center">
        <div className="p-5 font-semibold text-primary">
          This qr code is not associated with any pet. Please add/select a pet
          to register the pet tag.
        </div>
        <Link href={`/dashboard/pet-tag/pet-selection?petTagId=${petTag.id}`}>
          <Button variant="secondary">Select Pet</Button>
        </Link>
      </div>
    );

  return <PetProfile id={petTag.petId!} />;
}
