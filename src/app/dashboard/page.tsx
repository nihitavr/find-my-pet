import { Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Share } from "~/components/ui/icons";
import NotFound from "~/components/ui/not-found";
import { getServerAuthSession } from "~/lib/auth";
import { api } from "~/lib/trpc/server";

export default async function Dashboard() {
  const auth = await getServerAuthSession();
  if (!auth?.user) return <NotFound />;

  const pets = await api.pet.getPetProfiles.query();

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-xl font-semibold">Dashboard</h1>

      {/* Owner Info */}
      <div className="flex w-full flex-col items-center gap-2">
        <div className="mb-2 flex w-full items-center justify-center gap-4 font-semibold text-foreground/70">
          <span>Owner Info</span>
          <Link href="/dashboard/owner-profile">
            <Pencil strokeWidth={3} size={18} />
          </Link>
        </div>
        <div className="relative h-24 w-24">
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
        <div className="flex w-full items-center justify-center gap-4 font-semibold text-foreground/70">
          <span>Your Pets</span>
          <Link href="/dashboard/pets">
            <Pencil strokeWidth={3} size={18} />
          </Link>
        </div>
        <div className="mt-4 flex flex-wrap gap-5">
          {pets.map((pet, idx) => {
            return (
              <Link href={`/dashboard/pets/${pet.id}`} key={idx}>
                <div className="relative flex flex-col items-start gap-1">
                  <div className="relative h-24 w-24">
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
                  <div className="text-clip font-semibold text-foreground">
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
