import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Label } from "~/components/ui/label";
import { api } from "~/lib/trpc/server";
import { MapPin } from "lucide-react";

export default async function PetScanHistory({
  params: { id },
}: {
  params: {
    id: string;
  };
}) {
  const pet = await api.pet.getPetProfile.query({ id });
  const scanHistory = await api.pet.getPetScanHistory.query({ petId: id });

  return (
    <div>
      <h1 className="text-xl font-semibold">{pet?.name}'s scan history</h1>
      <Table className="mt-5">
        <TableCaption>A list of your pets.</TableCaption>
        <TableHeader>
          <TableRow className="grid grid-cols-11">
            <TableHead className="col-span-1"></TableHead>
            <TableHead className="col-span-5">Scanned Time</TableHead>
            <TableHead className="col-span-5">Scan Location</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {scanHistory?.map((scan, idx) => (
            <TableRow className="grid grid-cols-11" key={idx}>
              <TableCell className="col-span-1">{idx + 1}</TableCell>
              <TableCell className="col-span-5">
                {scan.scannedAt?.toUTCString()}
              </TableCell>
              <TableCell className="col-span-5 pl-12">
                <a
                  href={`https://www.google.com/maps/search/${scan?.geoCode?.latitude},${scan?.geoCode?.longitude}`}
                  target="_blank"
                >
                  <MapPin />
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
