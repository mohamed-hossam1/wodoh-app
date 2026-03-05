"use client";

import { AuthForm } from "@/components/form/AuthForm";
import { RegisterSchema } from "@/lib/validations";

export default function registerPage() {
  return (
    <div className="min-h-screen flex flex-col  items-center gap-6 justify-center font-sans ">
      <div className="w-full text-center">
        <h1 className="font-bold text-2xl text-text-color">Register your account</h1>
        <p className="text-text-secondary">
          Please fill in the following information to register your account.
        </p>
      </div>
      <div className="flex items-center w-full justify-center">
        <AuthForm
          formType="REGISTER"
          schema={RegisterSchema}
          defaultValues={{
            name: "",
            email: "",
            password: "",
          }}
        />
      </div>
    </div>
  );
}
