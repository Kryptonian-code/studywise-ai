import { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  GraduationCap, LayoutDashboard, FolderOpen, FileText, Upload,
  BarChart3, Clock, Settings, LogOut, Menu, X, ChevronDown, User,
  BookOpen, Users, MessageSquare,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Projects", icon: FolderOpen, href: "/dashboard/projects" },
  { label: "Documents", icon: FileText, href: "/dashboard/documents" },
  { label: "Uploads", icon: Upload, href: "/dashboard/uploads" },
  { label: "Scoring", icon: BarChart3, href: "/dashboard/scoring" },
  { label: "Deadlines", icon: Clock, href: "/dashboard/deadlines" },
  { label: "Blog", icon: BookOpen, href: "/dashboard/blog" },
];

const bottomItems = [
  { label: "Settings", icon: Settings, href: "/dashboard/settings" },
];

export const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUserName(data.user?.user_metadata?.full_name || data.user?.email || "User");
    });
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const NavLink = ({ item }: { item: typeof navItems[0] }) => {
    const active = location.pathname === item.href;
    return (
      <Link
        to={item.href}
        onClick={() => setSidebarOpen(false)}
        className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
          active
            ? "bg-sidebar-accent text-sidebar-primary"
            : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
        }`}
      >
        <item.icon className="h-4 w-4" />
        {item.label}
      </Link>
    );
  };

  const Sidebar = () => (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
          <GraduationCap className="h-4 w-4 text-sidebar-primary-foreground" />
        </div>
        <span className="font-display text-base font-bold">StudyWise AI</span>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => (
          <NavLink key={item.href} item={item} />
        ))}
      </nav>
      <div className="border-t border-sidebar-border px-3 py-3 space-y-1">
        {bottomItems.map((item) => (
          <NavLink key={item.href} item={item} />
        ))}
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
      <div className="border-t border-sidebar-border px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sidebar-accent text-xs font-bold">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{userName}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 lg:block">
        <Sidebar />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-foreground/20" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-64">
            <Sidebar />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center gap-4 border-b border-border px-6">
          <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex-1" />
          <Button variant="hero" size="sm" asChild>
            <Link to="/dashboard/projects/new">New Project</Link>
          </Button>
        </header>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
};
