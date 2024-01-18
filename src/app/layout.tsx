import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "~/lib/trpc/react";
import Navbar from "../components/navbar";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Find My Pet - QR Code Collar Tags for Pets",
  icons: [{ rel: "icon", url: "/find-my-pet-logo.svg" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`font-sans ${inter.variable} bg-primary-light text-primary`}
      >
        <TRPCReactProvider cookies={cookies().toString()}>
          <Navbar />
          {children}
        </TRPCReactProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
