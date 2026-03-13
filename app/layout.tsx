import type { Metadata } from "next";
import "./globals.css";
import Providers from "./provider";

export const metadata: Metadata = {
  title: "Sigillium",
  description: "Platformă acreditată pentru generarea și validarea certificatelor profesionale",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
