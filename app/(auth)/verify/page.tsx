import VerifyEmailCard from "@/components/card/VerifyEmailCard";

export default function VerifyPage() {
  return (
    <>
      <div className="min-h-screen w-full flex flex-col items-center gap-6 justify-center font-sans ">
        <div className="w-full text-center">
          <h1 className="font-bold text-2xl">Verify your email</h1>
          <p className="text-text-secondary">
            We sent a verification link to your inbox.
          </p>
        </div>
        <div className="flex items-center w-full  justify-center">
          <VerifyEmailCard />
        </div>
      </div>
    </>
  );
}
