import { FileClock, PawPrint, Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AlertsSwitch from "~/components/dashboard/alerts-switch";
import { Button } from "~/components/ui/button";
import NotFound from "~/components/ui/errors/not-found";
import { getServerAuthSession } from "~/lib/auth";
import { api } from "~/lib/trpc/server";

export default async function Dashboard() {
  const auth = await getServerAuthSession();
  if (!auth?.user) return <NotFound />;

  const pets = await api.pet.getPetProfiles.query();

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-xl font-semibold">Dashboard</h1>

      {/* Owner Info */}
      <div className="flex w-full flex-col items-center gap-2">
        <div className="mb-2 flex w-full items-center justify-start gap-4 font-semibold">
          <span>Owner Info</span>
          <Link href="/dashboard/owner-profile">
            <Pencil strokeWidth={3} size={18} />
          </Link>
        </div>
        <div className="relative h-20 w-20">
          <Image
            fill
            style={{ objectFit: "cover" }}
            src={auth.user.image}
            alt="User Avatar"
            className="rounded-full"
          />
        </div>
        <div className="font-semibold text-foreground">{auth.user.name}</div>
      </div>

      {/* Your Pets */}
      <hr />
      <div>
        <div className="flex w-full items-center justify-start gap-4 font-semibold">
          <span>Your Pets</span>
          {pets.length > 0 && (
            <Link href="/dashboard/pets">
              <Pencil strokeWidth={3} size={18} />
            </Link>
          )}
          {pets.length > 0 && (
            <div className="flex-grow">
              <Link className="float-right" href={"/dashboard/pets/add"}>
                <Button
                  variant="secondary"
                  className="flex items-center justify-center gap-1"
                >
                  Add Pet
                  <PawPrint strokeWidth={2.5} className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          )}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-5 md:grid-cols-4">
          {pets.length ? (
            pets.map((pet, idx) => {
              return (
                <div key={idx} className="relative flex flex-col items-start">
                  <div className="absolute right-2 top-2 z-[10] flex flex-col items-start justify-center gap-2 rounded-md bg-secondary/70 p-2">
                    <Link
                      href={`/dashboard/pets/${pet.id}/scan-history`}
                      className="flex gap-1 text-xs font-medium"
                    >
                      <div>Scan History</div>
                      <FileClock className="h-4 w-4" />
                    </Link>
                    <AlertsSwitch
                      petId={pet.id}
                      petName={pet.name}
                      isAlertsEnabled={pet.alertsEnabled}
                    />
                  </div>
                  <div className="relative aspect-square w-full">
                    <Link
                      href={`/dashboard/pets/${pet.id}`}
                      key={idx}
                      className="cols-1"
                    >
                      <Image
                        fill
                        style={{ objectFit: "cover" }}
                        src={
                          pet.profileImages[0]
                            ? pet.profileImages[0]
                            : pet.type === "dog"
                              ? "/dog-avatar.jpeg"
                              : "/cat-avatar.jpeg"
                        }
                        alt="pet profile"
                        className="rounded-lg"
                      />
                    </Link>
                  </div>
                  <div className="font-semibold text-foreground">
                    {pet.name}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-2 flex h-[20vh] flex-col items-center justify-center gap-2 text-center text-foreground/80 md:col-span-4">
              <span>
                No pets added yet. Click{" "}
                <span className="font-semibold">Add Pet </span> to create a new
                pet profile.
              </span>

              <Link href={"/dashboard/pets/add"}>
                <Button
                  variant="secondary"
                  className="flex items-center justify-center gap-1"
                >
                  Add Pet
                  <PawPrint strokeWidth={2.5} className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
