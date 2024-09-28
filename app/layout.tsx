import { inter } from "./components/fonts";
import { Metadata } from "next";
import { ThemeProvider } from "./components/theme-provider";
import "./components/globals.css";

export const metadata: Metadata = {
  title: "Aircraft Scanner",
  description:
    "Mobile app that can identify any aircraft from a photo and provide detailed information about it.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-[--light-background] dark:bg-[--dark-background] text-[--light-foreground] dark:text-[--dark-foreground] items-center justify-center relative h-dvh`}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
      </body>
    </html>
  );
}
