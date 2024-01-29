import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "~/lib/trpc/react";
import Header from "../components/header";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "~/components/ui/toaster";
import { SessionProvider } from "next-auth/react";
import { getServerAuthSession } from "~/lib/auth";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Find My Pet - QR Code Collar Tags for Pets",
  icons: [{ rel: "icon", url: "/find-my-pet-logo-dark.svg" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
  session: any;
}) {
  const session = await getServerAuthSession();

  return (
    <html lang="en">
      <body
        className={`font-sans ${inter.variable} bg-background text-foreground`}
      >
        <TRPCReactProvider cookies={cookies().toString()}>
          <Header session={session} />
          <main className="mt-14">{children}</main>
        </TRPCReactProvider>
        <SpeedInsights />
        <Toaster />
      </body>
    </html>
  );
}
