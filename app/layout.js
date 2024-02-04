import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Particles Blob Animation Generator - Create Dynamic and Vibrant Backgrounds",
  description: "Design captivating and dynamic backgrounds with the Particles Blob Animation Generator. Customize particle size, animation duration, and colors to generate unique animated blobs for your web projects. Easy HTML and CSS integration for stunning visual effects.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
