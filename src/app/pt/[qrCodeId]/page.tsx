import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
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

  if (!petTag.petId) {
    return (
      <div className="bg-primary/90 flex h-[85vh] w-full flex-col items-center justify-start">
        <div className="relative h-96 w-full">
          <Image
            fill
            style={{ objectFit: "cover" }}
            src="/new-scan-photo.jpg"
            alt="Dog Image with QR Tag"
          />
        </div>
        <div className="z-[50] -mt-5 flex flex-col items-center gap-5 rounded-t-3xl bg-white py-5">
          <Image
            src="/find-my-pet-logo-small.svg"
            alt="find-my-pet logo"
            width={35}
            height={35}
          />
          <span className="text-2xl font-semibold">
            New <span className="text-primary">Pet Tag</span> Detected!
          </span>
          {auth?.user ? (
            <Fragment>
              <div className="px-5 text-center text-foreground">
                This QR tag is not associated with any pet. Please click
                add/select a pet profile to register the pet tag.
              </div>
              <Link
                href={`/dashboard/pet-tags/pet-selection?qrCodeId=${petTag.qrCodeId}`}
              >
                <Button>Select or Create New Pet Profile</Button>
              </Link>
            </Fragment>
          ) : (
            <Fragment>
              <div className="px-5 text-center text-foreground">
                This QR tag is not associated with any pet. Please sign in to
                register the pet tag with your pet.
              </div>
              <SignIn
                className="w-44"
                callbackUrl={`/dashboard/owner-profile?qrCodeId=${petTag.qrCodeId}`}
              />
            </Fragment>
          )}
        </div>
      </div>
    );
  }

  const user = await api.user.getUser.query({ id: petTag.userId! });

  return (
    <PetProfile id={petTag.petId} user={user} qrCodeId={petTag.qrCodeId} />
  );
}
