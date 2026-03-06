export default function Grid() {
  return (
    <>
      <div className="hidden dark:block ">
        <div
          className="absolute inset-0 opacity-[0.03] -z-10 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(#fff 1.5px, transparent 1.5px), linear-gradient(90deg, #fff 1.5px, transparent 1.5px)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute top-[20%] left-[-20%] w-[70%] h-[70%] bg-primary/6 blur-[200px] rounded-full -z-50 " />
        <div className="absolute bottom-[20%] right-[-20%] w-[70%] h-[70%] bg-primary/6 blur-[200px] rounded-full -z-50" />
      </div>
      <div className=" block dark:hidden ">
        <div
          className="absolute inset-0 opacity-[0.03] -z-10 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(#000 1.5px, transparent 1.5px), linear-gradient(90deg, #000 1.5px, transparent 1.5px)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute top-[5%] left-[7.5%] w-[85%] h-[90%] bg-primary/10 blur-[200px] rounded-full -z-50" />
      </div>
    </>
  );
}
