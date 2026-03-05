import Link from "next/link";
import { PartyPopper } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ROUTES } from "@/constants/routes";

export default function WelcomeCard() {
  return (
    <Card className="w-full max-w-md bg-background ">
      <div className="mx-auto">
        <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <PartyPopper className="size-6" />
        </div>
      </div>
      <CardContent className="space-y-3 text-sm text-text-secondary">
        <p>You can go straight to your dashboard to start working..</p>
      </CardContent>
      <CardFooter className="flex w-full flex-col gap-3 ">
        <Button asChild className="w-full text-background">
          <Link href={ROUTES.ADMIN} prefetch={false}>
            Go to dashboard
          </Link>
        </Button>

        <Button
          asChild
          variant="outline"
          className="w-full text-text-color bg-secondary"
        >
          <Link href={ROUTES.LOGIN}>Sign in with another account</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
