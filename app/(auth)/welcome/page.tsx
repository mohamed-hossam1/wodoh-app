import WelcomeCard from "@/components/card/WelcomeCard";

export default function WelcomePage() {
  return (
    <>
      <div className="min-h-screen w-full flex flex-col items-center gap-6 justify-center  font-sans ">
        <div className="w-full text-center">
          <h1 className="font-bold text-2xl">Welcome aboard</h1>
          <p className="text-text-secondary">
            Your email is verified and your workspace is ready.
          </p>
        </div>
        <div className="flex items-center w-full  justify-center">
          <WelcomeCard />
        </div>
      </div>
    </>
  );
}
