"use client";

import { ReactNode } from "react";
import { convex } from "@/lib/convex";

import { ConvexAuthNextjsProvider } from "@convex-dev/auth/nextjs";

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ConvexAuthNextjsProvider client={convex}>
      {children}
    </ConvexAuthNextjsProvider>
  );
}
