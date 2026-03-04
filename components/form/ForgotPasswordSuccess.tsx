"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { Button } from "../ui/button";

type ForgotPasswordSuccessProps = {
  email: string;
  onReset: () => void;
};

export default function ForgotPasswordSuccess({
  email,
  onReset,
}: ForgotPasswordSuccessProps) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle>Check your email</CardTitle>
        <CardDescription>
          If an account exists for {email}, we sent a password reset link.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 text-sm text-muted-foreground">
        <p>
          Open your inbox and follow the instructions to reset your password.
        </p>
        <p>If you do not see the email, check your spam folder.</p>
      </CardContent>
      <CardFooter className="flex-col gap-3">
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={onReset}
        >
          Send another link
        </Button>
        <Link
          href={ROUTES.LOGIN}
          className="text-sm text-primary hover:underline"
        >
          Back to login
        </Link>
      </CardFooter>
    </Card>
  );
}
