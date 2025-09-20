"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  FileUp,
  Search,
  LayoutDashboard,
  FileText,
  Settings,
  Users,
  BookOpen,
} from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Cargar Expediente",
    href: "/upload",
    icon: FileUp,
  },
  {
    name: "Expedientes",
    href: "/files",
    icon: FileText,
  },
  {
    name: "Búsqueda Semántica",
    href: "/search",
    icon: Search,
  },
  {
    name: "Prompt Studio",
    href: "/prompt-studio",
    icon: BookOpen,
  },
];

const adminNavigation = [
  {
    name: "Administración",
    href: "/admin",
    icon: Users,
  },
  {
    name: "Configuración",
    href: "/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col bg-card border-r">
      <div className="flex h-16 items-center px-6">
        <h1 className="text-xl font-bold text-primary">Pergaminos IDP</h1>
      </div>
      
      <Separator />
      
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link key={item.name} href={item.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3",
                  isActive && "bg-primary text-primary-foreground hover:bg-primary/90"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Button>
            </Link>
          );
        })}
        
        <Separator className="my-4" />
        
        {adminNavigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link key={item.name} href={item.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3",
                  isActive && "bg-primary text-primary-foreground hover:bg-primary/90"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Button>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}