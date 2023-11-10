import "./globals.scss";
import { Providers } from "./providers";
import { inter, SFMono } from "../assets/fonts";

export const metadata = {
  title: "Multi Link Opener",
  description: "A web tool for opening multiple links.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${SFMono.variable} font-sans`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
