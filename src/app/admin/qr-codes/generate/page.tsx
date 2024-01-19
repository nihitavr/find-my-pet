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

export default function GenerateQrcode() {
  const [numberOfQrCodes, setNumberOfQrCodes] = useState(4);
  const [petTags, setPetTags] = useState<{ registrationCode: string }[]>([]);
  const generateQrCodes = api.admin.generateQrCodes.useMutation();

  const onClickGenerate = async () => {
    const petTags = await generateQrCodes.mutateAsync({ numberOfQrCodes });
    setPetTags(petTags);

    // const qrCodeCanvas = document.querySelector("canvas");

    // const qrCodeDataUri = qrCodeCanvas.toDataURL("image/jpg", 0.3);
  };

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-xl font-semibold">Generate QR Codes</h1>
      <div className="flex flex-col gap-1">
        <div className="flex w-80 gap-3">
          <Input
            type="number"
            value={numberOfQrCodes}
            onChange={(event) => setNumberOfQrCodes(+event.target.value)}
          />
          <Button onClick={onClickGenerate}>Generate</Button>
        </div>
        <span className="text-sm">
          By clicking generate you will generate N QR codes.
        </span>
      </div>

      {/* <MyDocument petTags={petTags} /> */}

      <Table className="mt-3">
        <TableCaption>A list of your pets.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10"></TableHead>
            <TableHead>Registration Code</TableHead>
            <TableHead>QR Code (string)</TableHead>
            <TableHead>Qr Code</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {petTags?.map((petTag, idx) => (
            <TableRow key={idx}>
              <TableCell>{idx + 1}</TableCell>
              <TableCell>{petTag.registrationCode}</TableCell>
              {/* <TableCell>{petTag.qrCode}</TableCell> */}
              <TableCell>
                <QRCodeCanvas
                  value={"https://findmypet.in/pt/" + petTag.registrationCode}
                  size={100}
                  bgColor={"#ffffff"}
                  fgColor={"#000000"}
                  level={"L"}
                  includeMargin={false}
                  imageSettings={{
                    src: "/find-my-pet-logo-white.svg",
                    x: undefined,
                    y: undefined,
                    height: 24,
                    width: 24,
                    excavate: true,
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
