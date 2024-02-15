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
import { api } from "~/lib/trpc/server";
import { Pencil } from "lucide-react";

export default async function PetTags() {
  const petTags = await api.petTag.getPetTags.query();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold">Pet Tags</h1>
        </div>
      </div>

      {petTags.length ? (
        <Table className="mt-3">
          <TableCaption>
            {petTags?.length
              ? "A list of all pet tags."
              : "No QR collar tags added yet. Scan the QR code on the collar tag to register your pet."}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[20px]"></TableHead>
              <TableHead className="min-w-[100px]">Registered Pet</TableHead>
              <TableHead className="">Tag View</TableHead>
              <TableHead className="text-right">Edit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {petTags?.map((petTag, idx) => (
              <TableRow key={idx}>
                <TableCell className="font-medium">
                  <Link
                    className="cursor-pointer hover:underline"
                    href={`/dashboard/pets/${petTag.id}`}
                  >
                    {idx + 1}
                  </Link>
                </TableCell>
                <TableCell>{petTag?.pet?.name}</TableCell>
                <TableCell className="text-right">
                  <Link
                    href={`/pt/${petTag.qrCodeId}?recordLocation=false`}
                    className="flex items-center justify-start text-sm text-blue-700 hover:underline"
                  >
                    <span>View</span>
                  </Link>
                </TableCell>
                <TableCell>
                  <Link
                    href={`/dashboard/pet-tags/${petTag.id}`}
                    className="flex justify-end opacity-70 hover:opacity-50"
                  >
                    <Pencil strokeWidth={3} size={18} />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="flex h-[80vh] w-full flex-col items-center justify-center gap-2 py-2 text-center text-lg text-foreground/80">
          <span>
            No <span className="font-semibold">Pet tags</span> added yet. Scan{" "}
            <span className="font-semibold">QR code</span> on the pet tag to
            register it with your pet.
          </span>
        </div>
      )}
    </div>
  );
}
