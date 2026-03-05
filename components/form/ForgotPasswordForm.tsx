"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldContent,
} from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { ROUTES } from "@/constants/routes";
import { ForgotPasswordSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Button } from "../ui/button";
import { forgotPassword } from "@/actions/auth";
import { toast } from "sonner";
import ForgotPasswordSuccess from "./ForgotPasswordSuccess";

export default function ForgotPasswordForm({
  sentEmail,
  setSentEmail,
}: {
  sentEmail: string | null;
  setSentEmail: Dispatch<SetStateAction<string | null>>;
}) {
  const formId = "forgot-password-form";

  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function handleSubmit(data: z.infer<typeof ForgotPasswordSchema>) {
    const result = await forgotPassword(data);

    if (!result.success) {
      toast.error(result.message, { position: "top-center" });
      return;
    }
    toast.success("Password reset email sent. Please check your inbox.", { position: "top-center" });
    setSentEmail(data.email);
  }

  if (sentEmail) {
    return (
      <ForgotPasswordSuccess
        email={sentEmail}
        onReset={() => {
          setSentEmail(null);
          form.reset({ email: "" });
        }}
      />
    );
  }

  return (
    <Card className="w-full max-w-md bg-background text-text-secondary">
      <CardContent>
        <form id={formId} onSubmit={form.handleSubmit(handleSubmit)}>
          <FieldGroup className="gap-5">
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="reset-email">Email</FieldLabel>
                  <FieldContent>
                    <Input
                      {...field}
                      id="reset-email"
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
            <Field orientation="horizontal">
              <Button
                type="submit"
                form={formId}
                className="flex-1 cursor-pointer text-background"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Sending..." : "Send"}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="justify-center">
        <p className="text-sm text-text-secondary">
          Remembered your password?{" "}
          <Link href={ROUTES.LOGIN} className="text-primary hover:underline">
            Back to login
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
