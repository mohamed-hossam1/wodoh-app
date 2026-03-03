import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

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
import { register, signIn } from "@/actions/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type AuthFormProps = {
  schema: any;
  defaultValues: any;
  formType: "SIGN_IN" | "REGISTER";
};

export function AuthForm({ schema, defaultValues, formType }: AuthFormProps) {
  const isSignIn = formType === "SIGN_IN";
  const formId = "auth-form";
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });
  const router = useRouter();

  async function handleSubmit(data: z.infer<typeof schema>) {
    const result = await (isSignIn ? signIn(data) : register(data));

    if (!result.success) {
      toast.error(result.message, { position: "top-center" });
      return;
    }

    toast.success(
      isSignIn ? "Successful login" : "Account created successfully",
      {
        position: "top-center",
      },
    );
    router.replace("/");
  }

  return (
    <>
      <Card className=" w-2xl ">
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
                        placeholder="you@company.com"
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
                    <FieldContent>
                      <Input
                        {...field}
                        id="auth-password"
                        type="password"
                        aria-invalid={fieldState.invalid}
                        placeholder={
                          isSignIn
                            ? "Your password"
                            : "Create a strong password"
                        }
                        autoComplete={
                          isSignIn ? "current-password" : "new-password"
                        }
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </FieldContent>
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Field orientation="horizontal">
            <Button
              type="submit"
              form={formId}
              className="flex-1 cursor-pointer"
            >
              {isSignIn ? "Sign in" : "Create account"}
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </>
  );
}
