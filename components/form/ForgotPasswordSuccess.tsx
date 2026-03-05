"use client";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { Button } from "../ui/button";
import { CircleCheck } from "lucide-react";

type ForgotPasswordSuccessProps = {
  email: string;
  onReset: () => void;
};

export default function ForgotPasswordSuccess({
  email,
  onReset,
}: ForgotPasswordSuccessProps) {
  return (
    <Card className="w-full max-w-md bg-background">
      <div className="mx-auto">
        <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CircleCheck className="size-6"  />
        </div>
      </div>
      <CardContent className="space-y-4 text-sm text-text-secondary">
        <p>
          Open your inbox and follow the instructions to reset your password.
        </p>
        <p>If you do not see the email, check your spam folder.</p>
      </CardContent>
      <CardFooter className="flex-col gap-3">
        <Button
          type="button"
          variant="outline"
          className="w-full bg-secondary text-text-color"
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
