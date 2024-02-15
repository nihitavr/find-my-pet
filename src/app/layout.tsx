// TODO: This is done because when building the app, it throws Dynamic server usage exception.
// This is a workaround to fix it. In future we should fix it properly.
export const dynamic = "force-dynamic";

import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "~/lib/trpc/react";
import Header from "../components/header";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "~/components/ui/toaster";
import { getServerAuthSession } from "~/lib/auth";

import type { Metadata, Viewport } from "next";

const APP_NAME = "Find My Pet";
const APP_DEFAULT_TITLE = "Find My Pet - QR Code Collar Tags for Pets";
const APP_TITLE_TEMPLATE = "%s";
const APP_DESCRIPTION =
  "Find your lost pet with a QR code collar tag. Buy and scan our QR code collar tag for pet parent.";
const APP_LOGO = "/find-my-pet-logo-small.svg";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  icons: [{ rel: "icon", url: APP_LOGO }],
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    startupImage: APP_LOGO,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

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
