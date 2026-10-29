import { z } from "zod";
import { validatePassword } from "@/lib/password-validation";

export const profileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(80, "Name can be up to 80 characters."),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required."),
    newPassword: z.string().min(1, "New password is required."),
    confirmPassword: z.string().min(1, "Confirm your new password."),
  })
  .superRefine((values, ctx) => {
    const result = validatePassword(values.newPassword);
    if (!result.ok) {
      ctx.addIssue({
        code: "custom",
        path: ["newPassword"],
        message: result.errors[0] ?? "Password does not meet the policy.",
      });
    }
    if (values.newPassword && values.newPassword === values.currentPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["newPassword"],
        message: "Choose a password you haven’t used here.",
      });
    }
    if (values.newPassword !== values.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Passwords do not match.",
      });
    }
  });

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
