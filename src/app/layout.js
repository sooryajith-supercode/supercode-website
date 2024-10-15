"use client"
import React from "react";
import localFont from "next/font/local";
import "./globals.css";
import Main from "./Main";
import { ReactLenis } from "@studio-freight/react-lenis";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const ppRightGrotesk = localFont({
  src: "./fonts/PPRightGrotesk-Regular.woff",
  variable: "--font-pprightgrotesk-regular",
  weight: "100 900",
});


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      // className={ppRightGrotesk.className}
      >
        <Main>
          <ReactLenis root options={{ lerp: 0.08 }}>
            {children}
          </ReactLenis>
        </Main>
      </body>
    </html >
  );
}

