import type { Metadata } from "next";
import { Geist, Geist_Mono, Pacifico } from "next/font/google";
import "@/styles/globals.css";
import { JobsProvider, ThemeProvider } from "@/lib/providers";
import ClientLayout from "@/components/ClientLayout";

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-pacifico",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Joblo.ai",
  description: "Your AI-powered job search platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light dark" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pacifico.variable} antialiased`}
      >
        <ThemeProvider>
          <JobsProvider>
            <ClientLayout>{children}</ClientLayout>
          </JobsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
