"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { LockIcon, MailIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuthStore, type AuthUser } from "@/store/auth-store";
import { getHomeRouteForRole } from "@/config/roles";
import { connectSocket } from "@/lib/socket/socket-instance";
import { loginRequest } from "../services/auth-service";
import {
  loginSchema,
  type LoginFormValues,
} from "../schemas/login-schema";

/**
 * Demo admin login — RHF + Zod. Uses `useSearchParams` (page must wrap in Suspense).
 */
export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setSession = useAuthStore((s) => s.setSession);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "demo@example.com",
      password: "password",
    },
  });

  async function onSubmit(values: LoginFormValues) {
    try {
      const data = await loginRequest(values);

      const user: AuthUser = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role,
      };

      setSession({
        accessToken: data.accessToken,
        user,
      });
      connectSocket();

      toast.success(`Welcome back, ${user.name}`);

      const next = searchParams.get("next");
      router.replace(next || getHomeRouteForRole(user.role));
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Login failed. Try again.",
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full space-y-4"
      noValidate
    >
      <Input
        id="email"
        type="email"
        label="Email"
        icon={<MailIcon />}
        placeholder="you@company.com"
        autoComplete="email"
        error={errors.email?.message}
        {...register("email")}
      />

      <div className="space-y-2">
        <Input
          id="password"
          type="password"
          label="Password"
          icon={<LockIcon />}
          placeholder="Enter your password"
          autoComplete="current-password"
          error={errors.password?.message}
          {...register("password")}
        />
        <p className="text-right text-sm">
          <Link
            href="/forgot-password"
            className="font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            Forgot password?
          </Link>
        </p>
      </div>

      <Button
        type="submit"
        fullWidth
        loading={isSubmitting}
        loadingText="Signing in…"
        disabled={!isValid || isSubmitting}
      >
        Sign in
      </Button>
    </form>
  );
}
