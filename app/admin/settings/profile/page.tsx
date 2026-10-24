"use client";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Mail, Pencil, Phone, UserRound } from "lucide-react";
import NavTitle from "@/components/reuseable/nav-title";
import Form from "@/components/reuseable/from";
import { FromInput } from "@/components/reuseable/from-input";
import sonner from "@/components/reuseable/sonner";
import { ChangePassword } from "@/components/common/landing/change-password";
import { Badge, Button } from "@/components/ui";
import { adminProfile } from "@/lib/data";
import { helpers } from "@/lib/helpers";
import { admin_Profile } from "@/schema";

const roleLabels = {
  super_admin: "Super Admin",
  admin: "Admin",
};

const inputStyle = "h-11 border-input bg-card text-foreground";
const labelStyle = "text-sm text-foreground mb-1.5";

const AdminProfilePage = () => {
  const [profile, setProfile] = useState({
    name: adminProfile.name,
    email: adminProfile.email,
    phone: adminProfile.phone,
  });
  const [editing, setEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({ resolver: zodResolver(admin_Profile), defaultValues: profile });

  const handleSubmit = async (values: FieldValues) => {
    setIsLoading(true);
    // TODO: connect update admin profile API (values)
    await new Promise((r) => setTimeout(r, 700));
    setProfile(values as typeof profile);
    setIsLoading(false);
    setEditing(false);
    sonner.success("Profile updated", "Your changes have been saved.");
  };

  const details = [
    { icon: UserRound, label: "Full name", value: profile.name },
    { icon: Mail, label: "Email", value: profile.email },
    { icon: Phone, label: "Phone", value: `+88 ${profile.phone}` },
  ];

  return (
    <div className="space-y-6">
      <NavTitle title="Account Settings" subTitle="Manage your admin profile and password." />

      <div className="rounded-2xl border border-border bg-card">
        {/* ===== Header ===== */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border p-5 sm:p-6">
          <div className="flex items-center gap-4">
            <span className="grid size-16 shrink-0 place-items-center rounded-full bg-black text-2xl font-bold text-white">
              {profile.name.charAt(0)}
            </span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-semibold text-foreground sm:text-xl">{profile.name}</h2>
                <Badge variant={adminProfile.role}>{roleLabels[adminProfile.role]}</Badge>
              </div>
              <p className="truncate text-sm text-muted-foreground">{profile.email}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Admin since {helpers.formatDate(adminProfile.joinedAt, "DD MMM YYYY")}
              </p>
            </div>
          </div>
          {!editing && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                form.reset(profile);
                setEditing(true);
              }}
            >
              <Pencil /> Edit profile
            </Button>
          )}
        </div>

        {/* ===== Body ===== */}
        <div className="p-5 sm:p-6">
          <h3 className="mb-4 text-sm font-semibold text-foreground">Personal information</h3>
          {editing ? (
            <Form from={form} onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
              <FromInput name="name" label="Full name" placeholder="Your full name" className={inputStyle} stylelabel={labelStyle} />
              <FromInput
                name="phone"
                label="Phone number"
                type="tel"
                inputMode="numeric"
                maxLength={11}
                placeholder="01XXXXXXXXX"
                icon={<span className="text-sm font-semibold text-foreground">+88</span>}
                className={`${inputStyle} pl-13`}
                stylelabel={labelStyle}
              />
              <div className="sm:col-span-2">
                <FromInput name="email" type="email" label="Email" placeholder="admin@example.com" className={inputStyle} stylelabel={labelStyle} />
              </div>
              <div className="flex gap-2 sm:col-span-2">
                <Button type="submit" disabled={isLoading}>
                  {isLoading && <Loader2 className="animate-spin" />} Save changes
                </Button>
                <Button type="button" variant="outline" onClick={() => setEditing(false)}>
                  Cancel
                </Button>
              </div>
            </Form>
          ) : (
            <dl className="grid gap-3 sm:grid-cols-2">
              {details.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3 rounded-xl border border-border p-3.5">
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-secondary text-primary">
                    <Icon className="size-4.5" />
                  </span>
                  <div className="min-w-0">
                    <dt className="text-xs text-muted-foreground">{label}</dt>
                    <dd className="truncate text-sm font-medium text-foreground">{value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>

      <ChangePassword />
    </div>
  );
};

export default AdminProfilePage;
