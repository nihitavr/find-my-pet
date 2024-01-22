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
import { ArrowUpRight } from "lucide-react";
import { titleCase } from "~/lib/utils";

export default async function Pets() {
  const session = await getServerAuthSession();
  const pets = await api.pet.getPetProfiles.query();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold">All Pets</h1>
          <Link
            className="flex items-center text-sm text-blue-700 hover:underline"
            target="_blank"
            href={`/user/${session?.user.id}/pets`}
          >
            <span>View Pets</span> <ArrowUpRight size={15} />
          </Link>
        </div>
        <Link href={"/dashboard/pets/add"}>
          <Button variant="outline">Add Pet</Button>
        </Link>
      </div>

      <Table className="mt-3">
        <TableCaption>
          <Button className="flex items-center justify-center gap-2">
            <Share
              className="h-5 w-5"
              shareInfo={{
                title: "My Pet Family",
                text: `${session?.user.name}'s pet family!`,
                url: `${env.SERVER_URL}/user/${session?.user.id}/pets`,
              }}
            >
              Share Pets List
            </Share>
          </Button>
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="cursor-pointer text-right">Profile</TableHead>
            <TableHead className="cursor-pointer text-right">Edit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pets?.map((pet, idx) => (
            <TableRow key={idx}>
              <TableCell className="font-medium">
                <Link
                  className="cursor-pointer hover:underline"
                  href={`/dashboard/pets/${pet.id}`}
                >
                  {pet.name}
                </Link>
              </TableCell>
              <TableCell>{titleCase(pet.type)}</TableCell>
              <TableCell className="text-right">
                <Link
                  href={`/pet/${pet.id}`}
                  target="_blank"
                  className="flex items-center justify-end text-sm text-blue-700 hover:underline"
                >
                  <span>View</span> <ArrowUpRight size={15} />
                </Link>
              </TableCell>
              <TableCell className="text-right text-sm text-blue-700 hover:underline">
                <Link href={`/dashboard/pets/${pet.id}`}>Edit</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
