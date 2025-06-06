import "~/styles/globals.css";

import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist } from "next/font/google";
import { PHProvider } from "./_providers/posthog-provider";

export const metadata: Metadata = {
  title: "Drive Clone",
  description: "Made with love through T3 Theo",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${geist.variable}`}>
        <body>
          <PHProvider>{children}</PHProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
