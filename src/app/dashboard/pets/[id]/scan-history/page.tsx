import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { api } from "~/lib/trpc/server";
import { MapPin } from "lucide-react";
import { dateToISTString } from "~/lib/utils";

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
      <h1 className="text-xl font-semibold">
        <span className="text-primary">{pet?.name}&apos;s</span> scan history
      </h1>
      <Table className="mt-5">
        <TableCaption>Last 10 Scan history for {pet?.name}</TableCaption>
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
                {dateToISTString(scan.scannedAt)}
              </TableCell>
              <TableCell className="col-span-5 pl-12">
                <a
                  href={`https://www.google.com/maps/search/${(
                    scan?.geoCode as any
                  )?.latitude},${(scan?.geoCode as any)?.longitude}`}
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
