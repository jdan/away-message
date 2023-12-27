import type { Metadata } from "next";

import "98.css";
import "./style.css";

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
      <body>{children}</body>
    </html>
  );
}
