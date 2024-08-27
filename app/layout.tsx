import type { Metadata } from "next";
import "./globals.css";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "@/theme";

export const metadata: Metadata = {
  title: "Sorting Algorithm Visualizer",
  description:
    "Interactive tool to visualize and learn about various sorting algorithms including Bubble Sort, Quick Sort, Merge Sort, and more.",
  keywords:
    "sorting algorithms, algorithm visualization, bubble sort, quick sort, merge sort, computer science, programming",
  authors: [
    { name: "Apetrei Florin Sebastian", url: "https://yourwebsite.com" },
  ],
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <ChakraProvider>{children}</ChakraProvider>
      </body>
    </html>
  );
}
