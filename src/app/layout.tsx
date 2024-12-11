import "~/styles/globals.css";

import { Suspense } from "react";
import { GeistSans } from "geist/font/sans";

import { Toaster } from "~/components/ui/sonner";

import { Providers } from "./provider";

const metaTitle = "Paneful";
const metaDescription = "A canvas for testing your responsive designs";

export const metadata = {
  title: metaTitle,
  description: metaDescription,
  creator: "Daniel Weston",
  publisher: "Daniel Weston",
  authors: [{ name: "Daniel Weston", url: "https://danielaweston.com" }],
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    title: metaTitle,
    description: metaDescription,
    url: "/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: metaTitle,
    description: metaDescription,
    creator: "@itsdanweston",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Providers>
          <Suspense>{children}</Suspense>
        </Providers>
        <Toaster richColors />
      </body>
    </html>
  );
}
