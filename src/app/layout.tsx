import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JST ENTERPRISES | Engineering & Facility Maintenance",
  description:
    "Integrated building, hospital, electrical, civil and facility maintenance services by HST ENTERPRISES.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
