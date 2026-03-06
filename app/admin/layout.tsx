import AdminShell from "@/components/AdminShell";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="absolute left-0 w-full h-full bg-primary/10 blur-[250px]  -z-50" />
      <AdminShell>{children}</AdminShell>
    </>
  );
}
