"use client";

import { AuthForm } from "@/components/form/AuthForm";
import { LoginSchema } from "@/lib/validations";

export default function loginPage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center gap-6 justify-center bg-zinc-50 font-sans ">
      <div className="w-full text-center">
        <h1 className="font-bold text-2xl">Welcome back</h1>
        <p className="text-gray-500">
          Sign in with your email and password to continue.
        </p>
      </div>
      <div className="flex items-center w-full  justify-center">
        <AuthForm
          formType="LOGIN"
          schema={LoginSchema}
          defaultValues={{
            email: "",
            password: "",
          }}
        />
      </div>
    </div>
  );
}
