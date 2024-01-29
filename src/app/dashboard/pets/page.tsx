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
import { ArrowUpRight, FileClock, Pencil } from "lucide-react";
import { titleCase } from "~/lib/utils";
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
          <Button>Add Pet</Button>
        </Link>
      </div>

      <Table className="mt-3">
        <TableCaption>
          {pets.length ? (
            <div className="flex items-center justify-center gap-3">
              <Link
                className="flex items-center text-sm "
                target="_blank"
                href={`/user/${session?.user.id}/pets`}
              >
                <Button
                  className="flex items-center justify-center gap-2 "
                  variant="outline"
                >
                  <span>View Pets</span> <ArrowUpRight size={15} />
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
                <Button className="flex items-center justify-center gap-2">
                  <span>Share Pets</span>
                  <ShareLucid className="h-5 w-5" />
                </Button>
              </Share>
            </div>
          ) : (
            <span>No pets added.</span>
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
                  target="_blank"
                  className="flex items-center justify-start text-sm text-blue-700 hover:underline"
                >
                  <span>{pet.name}</span> <ArrowUpRight size={15} />
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
