import { Link, useNavigate } from "react-router-dom";
import { Search, User, Menu, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";

const Header = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Success",
      description: "Logged out successfully",
    });
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <div className="h-6 w-6 rounded-full border-2 border-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold leading-none">GunAccessoryHub</span>
              <span className="text-xs text-muted-foreground">Gear Talk & Builds</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-4">
            <Link to="/categories">
              <Button variant="ghost" size="sm">Categories</Button>
            </Link>
            <Link to="/vendor-directory">
              <Button variant="ghost" size="sm">Vendors</Button>
            </Link>
            <Link to="/rules">
              <Button variant="ghost" size="sm">Rules</Button>
            </Link>
            <Link to="/about">
              <Button variant="ghost" size="sm">About</Button>
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search posts..."
                className="w-64 pl-9 bg-background"
              />
            </div>
          </div>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="default" size="sm" className="hidden sm:flex gap-2">
                  <User className="h-4 w-4" />
                  Account
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/auth">
              <Button variant="default" size="sm" className="hidden sm:flex">
                <User className="h-4 w-4 mr-2" />
                Login
              </Button>
            </Link>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link to="/categories">Categories</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/vendor-directory">Vendors</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/rules">Rules</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/about">About</Link>
              </DropdownMenuItem>
              {user ? (
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem asChild>
                  <Link to="/auth">Login / Sign Up</Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
