import { ReactNode } from "react";

import { ClientProviders } from "./ClientProviders";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ConvexAuthNextjsServerProvider>
      <html lang="en">
        <body>
          <ClientProviders>{children}</ClientProviders>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
