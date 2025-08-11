import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Header from "./composants/header";
import Footer from "./composants/footer";
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Société Ivoirienne de Télédiffusion",
  description: "Société Ivoirienne de Télédiffusion",
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${robotoMono.variable} antialiased`}
      >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <Header />
        {children}
        <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
