import Link from "next/link";
import { MailCheck } from "lucide-react";

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

export default function VerifyPage() {
  return (
    <div className="min-h-screen w-full bg-zinc-50 font-sans px-4">
      <div className="mx-auto flex min-h-screen w-full max-w-md items-center">
        <Card className="w-full">
          <CardHeader className="items-center gap-3 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <MailCheck className="size-6" />
            </div>
            <CardTitle className="text-xl">Verify your email</CardTitle>
            <CardDescription>
              We sent a verification link to your inbox. Click the link to
              activate your account and finish setting up your workspace.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              If you don&apos;t see the email within a few minutes, check your
              spam or promotions folder.
            </p>
            <p>
              Once your email is verified, you can sign in and continue to your
              dashboard.
            </p>
          </CardContent>
          <CardFooter className="flex w-full flex-col gap-3">
            <Button asChild className="w-full">
              <Link href={ROUTES.LOGIN}>Back to sign in</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href={ROUTES.REGISTER}>Use a different email</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
