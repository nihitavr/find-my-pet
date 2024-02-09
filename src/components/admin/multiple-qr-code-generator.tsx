"use client";

import { useRef, useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { api } from "~/lib/trpc/react";
import { QRCodeSVG } from "qrcode.react";

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
import { Download } from "lucide-react";
import { type PetTag } from "@prisma/client";
import Loader from "../ui/loader";

export default function MultipleQrCodeGenerator() {
  const tableRef = useRef<any>();

  const [qrCount, setQrCount] = useState(1);
  const [qrUrl, setQrUrl] = useState("");
  const [qrLevel, setQrLevel] = useState("m");

  const [isGenerating, setIsGenerating] = useState(false);

  const [petTags, setPetTags] = useState<(PetTag & { qrUrl: string })[]>([]);
  const generateQrCodes = api.admin.generatePetTagIds.useMutation();

  const downloadSvg = (index: number) => {
    const svgs = tableRef.current.querySelectorAll("svg");
    const svgElement = svgs[index];

    if (svgElement) {
      const serializer = new XMLSerializer();
      const source = serializer.serializeToString(svgElement);
      const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "qrcode.svg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else {
      console.error("SVG element not found.");
    }
  };

  const onClickGenerate = async () => {
    let petTags;
    if (qrUrl) {
      petTags = [{ registrationCode: "123456" }];
    } else {
      setIsGenerating(true);
      petTags = await generateQrCodes.mutateAsync({
        qrCount,
      });
      setIsGenerating(false);
    }
    setPetTags(petTags as (PetTag & { qrUrl: string })[]);
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
            min={1}
            value={qrCount}
            onChange={(event) => setQrCount(parseInt(event.target.value, 10))}
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
          <Label>QR Level (l , m, q or h) - (7%, 15%, 25%, 30%)</Label>
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
          <Button
            disabled={!qrCount || isGenerating ? true : false}
            className="flex !w-72 items-center justify-center gap-2"
            onClick={onClickGenerate}
          >
            <span>Generate</span>
            <div className={`${isGenerating ? "inline" : "hidden"}`}>
              <Loader className="h-5 w-5 border-2" show={isGenerating} />
            </div>
          </Button>
        </div>
      </div>

      <div ref={tableRef}>
        <Table className="mt-10">
          <TableCaption>A list of all generated QR Tags.</TableCaption>
          <TableHeader>
            <TableRow className="grid grid-cols-11">
              <TableHead className="col-span-1"></TableHead>
              <TableHead className="col-span-2">QR Code Id</TableHead>
              <TableHead className="col-span-4">Download Url</TableHead>
              <TableHead className="col-span-3">QR SVG</TableHead>
              <TableHead className="col-span-1">Download</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {petTags?.map((petTag, idx) => (
              <TableRow className="grid grid-cols-11" key={idx}>
                <TableCell className="col-span-1">{idx + 1}</TableCell>
                <TableCell className="col-span-2">{petTag.qrCodeId}</TableCell>
                <TableCell className="col-span-4 break-words">
                  <span>{`https://findmypet.in/pt/${petTag.qrCodeId}/qr-code`}</span>
                </TableCell>
                <TableCell className="col-span-3">
                  <QRCodeSVG
                    bgColor={"transparent"}
                    value={`https://findmypet.in/pt/${petTag.qrCodeId}`}
                    size={512}
                    fgColor={"#000000"}
                    level={qrUrl ? qrLevel.toUpperCase() : "M"}
                    includeMargin={false}
                    className="h-32 w-32"
                  />
                </TableCell>
                <TableCell className="col-span-1 break-words text-center">
                  <Download
                    className="cursor-pointer hover:opacity-85"
                    onClick={() => {
                      downloadSvg(idx);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
