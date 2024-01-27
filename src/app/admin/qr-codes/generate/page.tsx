"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { api } from "~/lib/trpc/react";
import { QRCodeCanvas } from "qrcode.react";

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

export default function GenerateQrcode() {
  const [qrCount, setQrCount] = useState(5);
  const [qrUrl, setQrUrl] = useState("");
  const [qrLevel, setQrLevel] = useState("m");

  const [petTags, setPetTags] = useState<
    { registrationCode: string; qrUrl: string }[]
  >([]);
  const generateQrCodes = api.admin.generateQrCodes.useMutation();

  const onClickGenerate = async () => {
    let petTags;
    if (qrUrl) {
      petTags = [{ registrationCode: "123456", qrUrl: qrUrl }];
    } else {
      petTags = await generateQrCodes.mutateAsync({
        qrCount,
      });
    }

    setPetTags(petTags);
  };

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-center text-xl font-semibold">Generate QR Codes</h1>
      <div className="flex flex-col items-center gap-5">
        <div className="w-full">
          <Label>QR Count</Label>
          <Input
            disabled={!!qrUrl}
            type="number"
            value={qrCount}
            onChange={(event) => setQrCount(+event.target.value)}
          />
        </div>
        <div className="w-full">
          <Label>QR Url(optional)</Label>
          <Input
            value={qrUrl}
            placeholder="https://findmypet.in/pt/123456"
            onChange={(event) => setQrUrl(event.target.value)}
          />
        </div>
        <div className="w-full">
          <Label>QR Level (l, m , q or h)</Label>
          <Input
            value={qrLevel}
            placeholder="l, m , q or h"
            onChange={(event) => setQrLevel(event.target.value)}
          />
        </div>
        <div className="flex w-full flex-col items-center gap-2">
          <span className="text-sm">
            By clicking generate you will generate{" "}
            <span className="font-semibold">{qrUrl ? 1 : qrCount}</span> QR
            codes.
          </span>
          <Button className="!w-72" onClick={onClickGenerate}>
            Generate
          </Button>
        </div>
      </div>

      <div>
        <Table className="mt-10">
          <TableCaption>A list of your pets.</TableCaption>
          <TableHeader>
            <TableRow className="grid grid-cols-10">
              <TableHead className="col-span-1"></TableHead>
              <TableHead className="col-span-3">Registration Code</TableHead>
              <TableHead className="col-span-3">QR Code</TableHead>
              <TableHead className="col-span-3">QR Url</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {petTags?.map((petTag, idx) => (
              <TableRow className="grid grid-cols-10" key={idx}>
                <TableCell className="col-span-1">{idx + 1}</TableCell>
                <TableCell className="col-span-3">
                  {petTag.registrationCode}
                </TableCell>
                <TableCell className="col-span-3">
                  <QRCodeCanvas
                    value={petTag.qrUrl}
                    size={100}
                    bgColor={"#ffffff"}
                    fgColor={"#000000"}
                    level={qrUrl ? qrLevel.toUpperCase() : "L"}
                    includeMargin={false}
                  />
                </TableCell>
                <TableCell className="col-span-3 break-words">
                  <span>{petTag.qrUrl}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
