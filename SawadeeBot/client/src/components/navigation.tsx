import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Navigation() {
  const { user } = useAuth();
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log("Search query:", searchQuery);
  };

  const getInitials = (firstName?: string, lastName?: string) => {
    const first = firstName?.charAt(0) || "";
    const last = lastName?.charAt(0) || "";
    return (first + last).toUpperCase() || "U";
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex-shrink-0">
              <Link href="/">
                <h1 className="text-2xl font-bold text-primary cursor-pointer" data-testid="text-logo">
                  LearnStream
                </h1>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-6">
                <Link href="/">
                  <a 
                    className={`px-3 py-2 text-sm font-medium transition-colors ${
                      location === "/" 
                        ? "text-foreground" 
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    data-testid="link-home"
                  >
                    หน้าหลัก
                  </a>
                </Link>
                <a 
                  href="#structured-packs" 
                  className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm font-medium transition-colors"
                  data-testid="link-packs"
                >
                  คอร์สเรียน
                </a>
                <a 
                  href="#general-content" 
                  className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm font-medium transition-colors"
                  data-testid="link-general"
                >
                  เนื้อหาทั่วไป
                </a>
                <a 
                  href="#dashboard" 
                  className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm font-medium transition-colors"
                  data-testid="link-progress"
                >
                  ความคืบหน้า
                </a>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="relative hidden md:block">
              <Input
                type="text"
                placeholder="ค้นหาคอร์ส หรือ ตำแหน่งงาน..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pr-10"
                data-testid="input-search"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                data-testid="button-search"
              >
                <i className="fas fa-search"></i>
              </button>
            </form>

            {/* User Profile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="flex items-center space-x-3 hover:bg-transparent"
                  data-testid="button-user-menu"
                >
                  <div className="hidden md:block text-right">
                    <p className="text-sm font-medium text-foreground" data-testid="text-user-name">
                      {user?.firstName && user?.lastName 
                        ? `${user.firstName} ${user.lastName}`
                        : user?.email?.split('@')[0] || "ผู้ใช้"}
                    </p>
                    {user?.position && (
                      <p className="text-xs text-muted-foreground" data-testid="text-user-position">
                        {user.position}
                      </p>
                    )}
                  </div>
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user?.profileImageUrl} alt="Profile" />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-sm font-semibold">
                      {getInitials(user?.firstName, user?.lastName)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem className="cursor-pointer" data-testid="menu-profile">
                  <i className="fas fa-user mr-2"></i>
                  โปรไฟล์
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" data-testid="menu-achievements">
                  <i className="fas fa-trophy mr-2"></i>
                  ความสำเร็จ
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" data-testid="menu-settings">
                  <i className="fas fa-cog mr-2"></i>
                  การตั้งค่า
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="cursor-pointer text-destructive focus:text-destructive"
                  onClick={() => window.location.href = '/api/logout'}
                  data-testid="menu-logout"
                >
                  <i className="fas fa-sign-out-alt mr-2"></i>
                  ออกจากระบบ
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
