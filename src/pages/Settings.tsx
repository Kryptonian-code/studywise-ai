import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Shield, CreditCard } from "lucide-react";

const Settings = () => (
  <DashboardLayout>
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">Settings</h1>
        <p className="mt-1 text-muted-foreground">Manage your account and preferences.</p>
      </div>

      {/* Profile */}
      <div className="rounded-xl border border-border/60 bg-card p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <User className="h-5 w-5 text-primary" />
          <h2 className="font-display text-base font-semibold">Profile</h2>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input placeholder="Your name" />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" placeholder="you@example.com" disabled />
          </div>
          <Button variant="default" size="sm">Save Changes</Button>
        </div>
      </div>

      {/* Subscription */}
      <div className="rounded-xl border border-border/60 bg-card p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <CreditCard className="h-5 w-5 text-gold" />
          <h2 className="font-display text-base font-semibold">Subscription</h2>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Free Plan</p>
            <p className="text-xs text-muted-foreground">3 AI generations/month • 1 project</p>
          </div>
          <Button variant="hero" size="sm">Upgrade</Button>
        </div>
      </div>

      {/* Security */}
      <div className="rounded-xl border border-border/60 bg-card p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <Shield className="h-5 w-5 text-primary" />
          <h2 className="font-display text-base font-semibold">Security</h2>
        </div>
        <Button variant="outline" size="sm">Change Password</Button>
      </div>
    </div>
  </DashboardLayout>
);

export default Settings;
