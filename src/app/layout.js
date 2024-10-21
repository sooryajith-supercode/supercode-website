"use client"
import React from "react";
import "./globals.css";
import Main from "./Main";
import { ReactLenis } from "@studio-freight/react-lenis";


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

