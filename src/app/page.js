"use client";
import React from "react";
import Error from "./error";
import ErrorBoundary from "./ErrorBoundary";
import Home from "./home/page";

export default function page() {
  return (
    <div>
      <ErrorBoundary fallback={<Error />}>
        <Home />
      </ErrorBoundary>
    </div>
  );
}
