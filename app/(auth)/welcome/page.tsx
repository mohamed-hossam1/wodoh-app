"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PartyPopper } from "lucide-react";
import { toast } from "sonner";

import { handleAuthCallback } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ROUTES } from "@/constants/routes";

export default function WelcomePage() {
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        await handleAuthCallback();
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Verification failed.";
        toast.error(message, { position: "top-center" });
      } finally {
        setIsProcessing(false);
      }
    };

    run();
  }, []);

  return (
    <div className="min-h-screen w-full bg-zinc-50 font-sans px-4">
      <div className="mx-auto flex min-h-screen w-full max-w-md items-center">
        <Card className="w-full">
          <CardHeader className="items-center gap-3 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <PartyPopper className="size-6" />
            </div>
            <CardTitle className="text-xl">
              {isProcessing ? "Finalizing your account..." : "Welcome aboard"}
            </CardTitle>
            <CardDescription>
              {isProcessing
                ? "We're finishing setup and preparing your workspace."
                : "Your email is verified and your workspace is ready."}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            You can go straight to your dashboard to start working.
          </CardContent>
          <CardFooter className="flex w-full flex-col gap-3">
            <Button asChild className="w-full" disabled={isProcessing}>
              <Link href={ROUTES.ADMIN}>Go to dashboard</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full"
              disabled={isProcessing}
            >
              <Link href={ROUTES.LOGIN}>Sign in with another account</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
