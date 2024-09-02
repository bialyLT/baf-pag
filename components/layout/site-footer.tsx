import * as React from "react";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn("border-t", className)}>
      <div className="border-t py-4">
        <div className="container flex max-w-full items-center justify-between">
          <span className="text-muted-foreground text-sm">
            Copyright &copy; 2024. All rights reserved.
          </span> 
          <p className="text-left text-sm text-muted-foreground">
            Programado por{" "}
            <Link
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
             Liam Bialy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
