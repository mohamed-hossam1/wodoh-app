"use client";
import ForgotPasswordForm from "@/components/form/ForgotPasswordForm";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [sentEmail, setSentEmail] = useState<string | null>(null);
  return (
    <div className="min-h-screen w-full flex flex-col items-center gap-6 justify-center bg-zinc-50 font-sans ">
      {!sentEmail && (
        <div className="w-full text-center">
          <h1 className="font-bold text-2xl">Forgot your password?</h1>
          <p className="text-gray-500">
            Enter your email and we will send you a reset link.
          </p>
        </div>
      )}

      <div className="flex items-center w-full  justify-center">
        <ForgotPasswordForm sentEmail={sentEmail} setSentEmail={setSentEmail} />
      </div>
    </div>
  );
}
