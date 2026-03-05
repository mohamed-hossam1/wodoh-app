"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldContent,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { login, register } from "@/actions/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";

type AuthFormProps = {
  schema: any;
  defaultValues: any;
  formType: "LOGIN" | "REGISTER";
};

export function AuthForm({ schema, defaultValues, formType }: AuthFormProps) {
  const isSignIn = formType === "LOGIN";
  const formId = "auth-form";
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  async function handleSubmit(data: z.infer<typeof schema>) {
    const result = await (isSignIn ? login(data) : register(data));

    if (!result.success) {
      toast.error(result.message, { position: "top-center" });
      return;
    }

    toast.success(
      isSignIn
        ? "Successful login"
        : "Check your email and click the verification link to activate your account.",
      { position: "top-center" },
    );
    isSignIn ? router.replace(ROUTES.ADMIN) : router.replace(ROUTES.VERIFY);
  }

  return (
    <Card className="w-full max-w-md bg-background text-text-color">
      <CardContent>
        <form id={formId} onSubmit={form.handleSubmit(handleSubmit)}>
          <FieldGroup className="gap-5">
            {!isSignIn && (
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="auth-name">Name</FieldLabel>
                    <FieldContent>
                      <Input
                        {...field}
                        id="auth-name"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter your name"
                        autoComplete="name"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </FieldContent>
                  </Field>
                )}
              />
            )}

            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="auth-email">Email</FieldLabel>
                  <FieldContent>
                    <Input
                      {...field}
                      id="auth-email"
                      type="email"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your email"
                      autoComplete="email"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="auth-password">Password</FieldLabel>
                  <FieldContent className="relative">
                    <Input
                      {...field}
                      id="auth-password"
                      type={showPassword ? "text" : "password"}
                      aria-invalid={fieldState.invalid}
                      placeholder={
                        isSignIn ? "Your password" : "Create a strong password"
                      }
                      autoComplete={
                        isSignIn ? "current-password" : "new-password"
                      }
                      className="pr-10"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </FieldContent>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {isSignIn && (
              <div className="flex justify-end">
                <Link
                  href={ROUTES.FORGOTPASSWORD}
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            )}
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter>
        <Field orientation="horizontal">
          <Button
            type="submit"
            form={formId}
            className="flex-1 cursor-pointer text-background"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting
              ? isSignIn
                ? "Signing in..."
                : "Creating account..."
              : isSignIn
                ? "Sign in"
                : "Create account"}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
