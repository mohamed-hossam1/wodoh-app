import Link from "next/link";
import { MailCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ROUTES } from "@/constants/routes";

export default function VerifyEmailCard() {
  return (
    <Card className="w-full max-w-md">
      <div className="mx-auto">
        <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <MailCheck className="size-6" />
        </div>
      </div>
      <CardContent className="space-y-3 text-sm text-muted-foreground">
        <p>
          If you don&apos;t see the email within a few minutes, check your spam
          or promotions folder.
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
  );
}
