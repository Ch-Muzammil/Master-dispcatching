"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Laptop, LogOut, ShieldCheck, Smartphone } from "lucide-react";
import { formatRelativeTime } from "@/lib/format-relative-time";
import { useUnsavedChangesWarning } from "@/hooks/use-unsaved-changes-warning";
import { useAuthStore } from "@/store/auth-store";
import {
  AdminFormSection,
  AdminPageHeader,
  notifyDemoMode,
  SettingToggle,
} from "@/components/admin";
import { ConfirmDialog } from "@/components/ui/AlertDialog";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { UserAvatar } from "@/components/ui/Avatar";
import { Input, PasswordField } from "@/components/ui/Input";
import {
  changePasswordSchema,
  profileSchema,
  type ChangePasswordFormValues,
  type ProfileFormValues,
} from "../schemas/account-schema";
import type { AccountProfile, AccountSession } from "../types";

function sessionIcon(kind: AccountSession["kind"]) {
  return kind === "mobile" ? Smartphone : Laptop;
}

export function AccountView({
  profile,
  sessions,
}: {
  profile: AccountProfile;
  sessions: AccountSession[];
}) {
  const user = useAuthStore((state) => state.user);
  const name = user?.name ?? profile.name;
  const email = user?.email ?? profile.email;
  const [twoFactor, setTwoFactor] = useState(profile.twoFactor);
  const [signOutOthers, setSignOutOthers] = useState(false);

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name },
  });

  const passwordForm = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
  });

  useUnsavedChangesWarning(profileForm.formState.isDirty || passwordForm.formState.isDirty);

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="Account"
        description="Your profile, password, and the devices signed in to this portal."
      />

      <div className="grid gap-6 lg:grid-cols-3 lg:items-start">
        <div className="flex flex-col gap-6 lg:sticky lg:top-24">
          <aside className="rounded-xl border bg-card p-6 shadow-xs">
            <div className="flex flex-col items-center gap-4 text-center">
              <UserAvatar name={name} size="lg" />
              <div className="min-w-0">
                <p className="font-display text-lg font-bold">{name}</p>
                <p className="truncate text-sm text-muted-foreground">{email}</p>
                <p className="mt-1 text-xs font-semibold tracking-wide text-primary uppercase">
                  {profile.role}
                </p>
              </div>
              <dl className="w-full space-y-2 rounded-lg border bg-background p-3 text-left text-xs">
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Last sign-in</dt>
                  <dd className="font-semibold">
                    <time dateTime={profile.lastLoginAt}>
                      {formatRelativeTime(profile.lastLoginAt, { locale: "en-US" })}
                    </time>
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Active sessions</dt>
                  <dd className="font-semibold tabular-nums">{sessions.length}</dd>
                </div>
              </dl>
            </div>
          </aside>

          <AdminFormSection title="Two-factor authentication">
            <SettingToggle
              id="two-factor"
              icon={<ShieldCheck className="size-4" aria-hidden />}
              label="Authenticator app"
              hint="Required on every sign-in with a 6-digit code from your phone."
              checked={twoFactor}
              onCheckedChange={(checked) => {
                setTwoFactor(checked);
                notifyDemoMode(checked ? "Enabling two-factor" : "Disabling two-factor");
              }}
            />
          </AdminFormSection>
        </div>

        <div className="flex flex-col gap-6 lg:col-span-2">
          <form
            onSubmit={profileForm.handleSubmit((values) => {
              notifyDemoMode("Your profile");
              profileForm.reset(values);
            })}
            noValidate
          >
            <AdminFormSection title="Profile" description="How your name appears in the admin.">
              <Input
                id="account-name"
                label="Full name"
                placeholder="Your name"
                maxLength={80}
                error={profileForm.formState.errors.name?.message}
                {...profileForm.register("name")}
              />
              <div className="space-y-1.5">
                <Input
                  id="account-email"
                  label="Email"
                  value={email}
                  readOnly
                  className="bg-muted/50"
                />
                <p className="text-xs text-muted-foreground">
                  Sign-in email can’t be changed here.
                </p>
              </div>
              <div className="flex justify-end">
                <Button
                  type="submit"
                  loading={profileForm.formState.isSubmitting}
                  disabled={profileForm.formState.isSubmitting || !profileForm.formState.isDirty}
                >
                  Save profile
                </Button>
              </div>
            </AdminFormSection>
          </form>

          <form
            onSubmit={passwordForm.handleSubmit(() => {
              notifyDemoMode("Your new password");
              passwordForm.reset();
            })}
            noValidate
          >
            <AdminFormSection
              title="Change password"
              description="Uses the same password policy as reset. Other sessions would be signed out."
            >
              <Input
                id="current-password"
                type="password"
                label="Current password"
                placeholder="Enter your current password"
                autoComplete="current-password"
                error={passwordForm.formState.errors.currentPassword?.message}
                {...passwordForm.register("currentPassword")}
              />
              <Controller
                name="newPassword"
                control={passwordForm.control}
                render={({ field }) => (
                  <PasswordField
                    id="new-password"
                    label="New password"
                    placeholder="Create a new password"
                    autoComplete="new-password"
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    error={passwordForm.formState.errors.newPassword?.message}
                  />
                )}
              />
              <Controller
                name="confirmPassword"
                control={passwordForm.control}
                render={({ field }) => (
                  <PasswordField
                    id="confirm-password"
                    label="Confirm new password"
                    placeholder="Re-enter the new password"
                    autoComplete="new-password"
                    showRules="never"
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    error={passwordForm.formState.errors.confirmPassword?.message}
                  />
                )}
              />
              <div className="flex justify-end">
                <Button
                  type="submit"
                  loading={passwordForm.formState.isSubmitting}
                  disabled={passwordForm.formState.isSubmitting || !passwordForm.formState.isDirty}
                >
                  Update password
                </Button>
              </div>
            </AdminFormSection>
          </form>

          <AdminFormSection title="Active sessions">
            <div className="space-y-3">
              {sessions.map((session) => {
                const Icon = sessionIcon(session.kind);
                return (
                  <div
                    key={session.id}
                    className="flex items-center gap-3 rounded-lg border bg-background px-4 py-3"
                  >
                    <Icon className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">
                        {session.device}
                        {session.current ? (
                          <Badge variant="secondary" className="ml-2 align-middle">
                            This device
                          </Badge>
                        ) : null}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {session.location} ·{" "}
                        <time dateTime={session.lastActiveAt}>
                          {session.current
                            ? "Active now"
                            : formatRelativeTime(session.lastActiveAt, { locale: "en-US" })}
                        </time>
                      </p>
                    </div>
                    {!session.current ? (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => notifyDemoMode(`Signing out ${session.device}`)}
                      >
                        Sign out
                      </Button>
                    ) : null}
                  </div>
                );
              })}
              <Button
                type="button"
                variant="outline"
                className="w-full text-destructive hover:text-destructive"
                icon={<LogOut />}
                onClick={() => setSignOutOthers(true)}
              >
                Sign out all other sessions
              </Button>
            </div>
          </AdminFormSection>
        </div>
      </div>

      <ConfirmDialog
        open={signOutOthers}
        onOpenChange={setSignOutOthers}
        title="Sign out other sessions?"
        description="You’ll stay signed in on this device. Every other browser and phone would have to sign in again."
        confirmLabel="Sign out others"
        destructive
        onConfirm={() => notifyDemoMode("Signing out other sessions")}
      />
    </div>
  );
}
