import { Poppins } from "next/font/google";
import "./globals.css";
import Script from "next/script";

// Import the Poppins font with different weights
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata = {
  title: "X Niagara - Tech & Marketing Excellence",
  description:
    "Your partner for web development, digital marketing, and software solutions in the Niagara Region.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className={poppins.className}>
        {children}
        {/* FontAwesome script for icons */}
        <Script
          src="https://kit.fontawesome.com/1234567890.js"
          crossOrigin="anonymous"
        />
        <Script src="/scripts/font-check.js" />
      </body>
    </html>
  );
}
