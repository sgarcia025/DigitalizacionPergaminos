"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Bell, 
  User, 
  Moon, 
  Sun, 
  Building2,
  ChevronDown 
} from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

// Mock data - replace with real tenant data
const mockTenants = [
  { id: "1", name: "Empresa Alpha", slug: "alpha" },
  { id: "2", name: "Corporación Beta", slug: "beta" },
  { id: "3", name: "Industrias Gamma", slug: "gamma" },
];

export function Topbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [currentTenant, setCurrentTenant] = useState(mockTenants[0]);
  const [showTenantDropdown, setShowTenantDropdown] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      {/* Global Search */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar expedientes, documentos..."
            className="pl-10"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Tenant Selector */}
        <div className="relative">
          <Button
            variant="outline"
            onClick={() => setShowTenantDropdown(!showTenantDropdown)}
            className="gap-2"
          >
            <Building2 className="h-4 w-4" />
            <span className="hidden sm:inline">{currentTenant.name}</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
          
          {showTenantDropdown && (
            <div className="absolute right-0 top-12 z-50 w-64 rounded-md border bg-popover p-1 shadow-md">
              {mockTenants.map((tenant) => (
                <Button
                  key={tenant.id}
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {
                    setCurrentTenant(tenant);
                    setShowTenantDropdown(false);
                  }}
                >
                  <Building2 className="h-4 w-4 mr-2" />
                  {tenant.name}
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        {mounted && (
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
        )}

        {/* Notifications */}
        <Button variant="ghost" size="icon">
          <Bell className="h-4 w-4" />
        </Button>

        {/* User Menu */}
        <Button variant="ghost" size="icon">
          <User className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}