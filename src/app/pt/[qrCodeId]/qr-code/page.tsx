"use client";

import { useParams, useSearchParams } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import { useRef } from "react";
import { Button } from "~/components/ui/button";
import { SERVER_URL } from "~/lib/constants";

export default function PetTagQrCode() {
  const params = useParams();
  const searchParams = useSearchParams();

  const qrCodeId = params.qrCodeId as string;
  const qrLevel = searchParams.get("qrLevel");

  const url = `${SERVER_URL}/pt/${qrCodeId}`;

  const svgContainerRef = useRef<any>();

  const downloadSvg = () => {
    const svgElement = svgContainerRef.current.querySelector("svg");
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
  };

  return (
    <div
      ref={svgContainerRef}
      className="flex h-[80vh] w-full flex-col items-center justify-center gap-3"
    >
      <QRCodeSVG
        bgColor={"transparent"}
        className="h-80 w-80"
        value={url}
        size={512}
        fgColor={"#000000"}
        level={qrLevel ? qrLevel.toUpperCase() : "M"}
        includeMargin={false}
      />
      <span className="w-80 break-words">{url}</span>
      <Button className="w-80 md:w-80" onClick={downloadSvg}>
        Download
      </Button>
    </div>
  );
}
