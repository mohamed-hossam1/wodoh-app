import ResetPasswordForm from "@/components/form/ResetPasswordForm";

export default function resetPasswordPage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center gap-6 justify-center  font-sans ">
      <div className="w-full text-center">
        <h1 className="font-bold text-2xl">Reset your password</h1>
        <p className="text-text-secondary">
          Enter your new password below to update your account password.
        </p>
      </div>
      <div className="flex items-center w-full  justify-center">
        <ResetPasswordForm />
      </div>
    </div>
  );
}
