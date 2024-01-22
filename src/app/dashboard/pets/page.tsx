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

export default async function Pets() {
  const data = await api.pet.getPetProfiles.query();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">All Pets</h1>
        <Link href={"/dashboard/pets/add"}>
          <Button variant="default">Add Pet</Button>
        </Link>
      </div>

      <Table className="mt-3">
        <TableCaption>A list of your pets.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="cursor-pointer text-right">Breed</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((pet, idx) => (
            <TableRow key={idx}>
              <TableCell className="font-medium">
                <Link
                  className="cursor-pointer hover:underline"
                  href={`/dashboard/pets/${pet.id}`}
                >
                  {pet.name}
                </Link>
              </TableCell>
              <TableCell>{pet.type}</TableCell>
              <TableCell className="text-right">{pet.breed}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
