import type { Metadata } from "next";

import "98.css";
import "./style.css";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Edit Away Message",
  description: "I am away from my computer right now.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
      </Head>
      <body>{children}</body>
    </html>
  );
}
