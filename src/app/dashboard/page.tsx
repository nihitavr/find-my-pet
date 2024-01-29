import { BellOff, BellRing, Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AlertsSwitch from "~/components/dashboard/alerts-switch";
import NotFound from "~/components/ui/not-found";
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
          <Link href="/dashboard/pets">
            <Pencil strokeWidth={3} size={18} />
          </Link>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-5 md:grid-cols-4">
          {pets.map((pet, idx) => {
            return (
              <Link
                href={`/dashboard/pets/${pet.id}`}
                key={idx}
                className="cols-1"
              >
                <div className="relative flex flex-col items-start">
                  <div className="absolute right-2 top-2 z-[10] flex flex-col items-center justify-center gap-1 rounded-md bg-secondary/70 p-2">
                    <AlertsSwitch
                      petId={pet.id}
                      petName={pet.name}
                      isAlertsEnabled={pet.alertsEnabled}
                    />
                  </div>
                  <div className="relative aspect-square w-full">
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
                  </div>
                  <div className="font-semibold text-foreground">
                    {pet.name}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
