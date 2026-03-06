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
import { login, register, signInWithGoogle } from "@/actions/auth";
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
  const [oauthLoading, setOauthLoading] = useState(false);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  async function handleSubmit(data: z.infer<typeof schema>) {
    const result = await (isSignIn ? login(data) : register(data));
    console.log(result)

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

  async function handleGoogleSignIn() {
    if (oauthLoading) return;
    setOauthLoading(true);

    try {
      const result = await signInWithGoogle({
        mode: isSignIn ? "login" : "register",
      });

      if (!result.success) {
        toast.error(result.message, { position: "top-center" });
        return;
      }

      const url = result.data?.url;
      if (!url) {
        toast.error("Unable to start Google sign in.", {
          position: "top-center",
        });
        return;
      }

      window.location.assign(url);
    } finally {
      setOauthLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md bg-background text-text-color">
      <CardContent>
        <div className="flex flex-col gap-5">
          <Button
            type="button"
            variant="outline"
            className="w-full cursor-pointer"
            onClick={handleGoogleSignIn}
            disabled={oauthLoading || form.formState.isSubmitting}
          >
            <svg
              aria-hidden="true"
              className="size-4"
              viewBox="0 0 48 48"
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.7 1.22 9.2 3.2l6.88-6.88C35.9 2.1 30.3 0 24 0 14.6 0 6.56 5.4 2.64 13.3l7.98 6.2C12.5 12.7 17.8 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.5 24.5c0-1.6-.14-2.8-.44-4.1H24v7.7h12.7c-.26 2.1-1.66 5.3-4.76 7.4l7.3 5.7c4.3-4 6.86-9.9 6.86-16.7z"
              />
              <path
                fill="#FBBC05"
                d="M10.62 28.6c-.52-1.56-.82-3.22-.82-4.9s.3-3.34.8-4.9l-7.98-6.2C.92 15.9 0 19.8 0 23.7c0 3.9.92 7.8 2.62 11.1l8-6.2z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.3 0 11.6-2.1 15.46-5.7l-7.3-5.7c-2 1.4-4.66 2.3-8.16 2.3-6.2 0-11.5-3.2-13.38-8.8l-8 6.2C6.56 42.6 14.6 48 24 48z"
              />
            </svg>
            {oauthLoading ? "Redirecting..." : "Continue with Google"}
          </Button>

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <div className="h-px flex-1 bg-border" />
            <span>or</span>
            <div className="h-px flex-1 bg-border" />
          </div>

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
        </div>
      </CardContent>

      <CardFooter>
        <Field orientation="horizontal">
          <Button
            type="submit"
            form={formId}
            className="flex-1 cursor-pointer text-background"
            disabled={form.formState.isSubmitting || oauthLoading}
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
