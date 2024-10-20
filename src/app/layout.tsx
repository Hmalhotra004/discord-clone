import ModalProvider from "@/components/providers/ModalProvider";
import SocketProvider from "@/components/providers/SocketProvider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";

const openSans = Open_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Discord",
  // description: "Generated by create next app",
};

const font = `${openSans.className}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        suppressHydrationWarning
      >
        <body className={cn(font, `bg-white dark:bg-[#313338]`)}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            storageKey="discord-theme"
            disableTransitionOnChange
          >
            <SocketProvider>
              <ModalProvider />
              {children}
            </SocketProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
