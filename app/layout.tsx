import type { Metadata } from "next";
import "@radix-ui/themes/styles.css";
import "./globals.css";
import { Theme } from "@radix-ui/themes";
import { Inter } from "next/font/google";
import NavBar from "./NavBar";
import AuthProvider from "./auth/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Members- App",
  description:
    "This App is designed to register members and take notes unique to each member",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Theme radius="large">
            <NavBar />
            <main className="p-5">{children}</main>
          </Theme>
        </AuthProvider>
      </body>
    </html>
  );
}
