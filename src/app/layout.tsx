import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/server/trpc/react";
import { BackgroundBoxes } from "~/ui/background-boxes";

import { Toaster } from 'sonner';
import { Websocket } from "./_components/Websocket";

export const metadata: Metadata = {
  title: "Nicks LT Showcase",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="overflow-hidden">
        <TRPCReactProvider>
          <BackgroundBoxes />
          {children}
          <Toaster position="bottom-right" />
          <Websocket />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
