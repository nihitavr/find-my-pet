import Image from "next/image";
import Link from "next/link";
import NotFound from "~/components/ui/errors/not-found";
import { api } from "~/lib/trpc/server";
import { titleCase } from "~/lib/utils";

export default async function PetsListView({
  params: { userId },
}: {
  params: { userId: string };
}) {
  const user = await api.user.getUser.query({ id: userId });

  if (!user) return <NotFound />;

  const pets = await api.pet.getPets.query({ userId });

  return (
    <div className="flex w-full flex-col items-center">
      <div className="w-full p-3 lg:w-2/5 lg:p-5">
        <div className="pb-3 text-center text-lg">
          <span className="font-semibold">{user?.name}&apos;s</span> pet family!
        </div>
        <div className="grid grid-cols-2 gap-3">
          {pets.length ? (
            pets?.map((pet, idx) => (
              <Link href={`/pet/${pet.id}`} key={idx}>
                <div className="relative flex aspect-square flex-col items-center">
                  <Image
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-lg object-cover"
                    src={
                      pet.profileImages[0]
                        ? pet.profileImages[0]
                        : pet.type === "dog"
                          ? "/dog-avatar.jpeg"
                          : "/cat-avatar.jpeg"
                    }
                    alt="pet profile"
                  />
                  <div className="absolute bottom-3 mt-2 flex flex-col items-center rounded-lg bg-secondary/60 p-3 py-1 text-center">
                    <div className="text-sm font-semibold">
                      {titleCase(pet.name)}
                    </div>
                    <span className="text-xs">{titleCase(pet.breed)}</span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center text-lg">No pets found.</div>
          )}
        </div>
      </div>
    </div>
  );
}
