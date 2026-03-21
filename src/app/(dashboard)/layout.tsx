'use client'
import { AppSidebar } from "@/components/app-sidebar"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

import data from "./data.json"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import LogoLoader from "@/components/loaders/logoloader"
import { useVariants } from "@/providers/main-provider/variants-provider"

export default function Layout() {
  const router = useRouter();
  const [ok, setOk] = useState(false);
  const { variant } = useVariants()
  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      router.replace("/login");
    } else {
      setOk(true);
    }
  }, [router]);

  if (!ok) return <LogoLoader />;
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 52)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant={variant} className="border-border bg-background" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {/* <SectionCards /> */}


            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
