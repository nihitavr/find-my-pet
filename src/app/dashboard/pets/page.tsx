import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { api } from "~/lib/trpc/server";
import { getServerAuthSession } from "~/lib/auth";
import { Share } from "~/components/ui/icons";
import { env } from "~/env";
import { ArrowUpRight, FileClock, PawPrint, Pencil } from "lucide-react";
import { Share as ShareLucid } from "lucide-react";

export default async function Pets() {
  const session = await getServerAuthSession();
  const pets = await api.pet.getPetProfiles.query();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold">All Pets</h1>
        </div>
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

      <Table className="mt-3">
        <TableCaption>
          {pets.length ? (
            <div className="flex items-center justify-center gap-3">
              <Link
                className="flex items-center text-sm "
                href={`/user/${session?.user.id}/pets`}
              >
                <Button
                  className="flex items-center justify-center gap-1"
                  variant="outline"
                >
                  <span>View Pets</span>
                </Button>
              </Link>

              <Share
                className="h-5 w-5"
                shareInfo={{
                  title: "My Pet Family",
                  text: `${session?.user.name}'s pet family!`,
                  url: `${env.SERVER_URL}/user/${session?.user.id}/pets`,
                }}
              >
                <Button className="flex items-center justify-center gap-1">
                  <span>Share Pets</span>
                  <ShareLucid strokeWidth={2.5} className="h-4 w-4" />
                </Button>
              </Share>
            </div>
          ) : (
            <span>
              No pets added. Click{" "}
              <span className="font-semibold">Add Pet </span> to create a new
              pet.
            </span>
          )}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[20px]"></TableHead>
            <TableHead className="min-w-[100px]">Profile</TableHead>
            <TableHead>Scan History</TableHead>
            <TableHead className="cursor-pointer text-right">Edit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pets?.map((pet, idx) => (
            <TableRow key={idx}>
              <TableCell className="w-[20px] font-medium">{idx + 1}</TableCell>
              <TableCell className="font-medium">
                <Link
                  href={`/pet/${pet.id}`}
                  className="flex items-center justify-start text-sm text-blue-700 hover:underline"
                >
                  <span>{pet.name}</span>
                </Link>
              </TableCell>
              <TableCell>
                <Link
                  href={`/dashboard/pets/${pet.id}/scan-history`}
                  className="flex  opacity-70 hover:opacity-50"
                >
                  <FileClock />
                </Link>
              </TableCell>
              <TableCell>
                <Link
                  href={`/dashboard/pets/${pet.id}`}
                  className="flex justify-end opacity-70 hover:opacity-50"
                >
                  <Pencil strokeWidth={3} size={18} />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
