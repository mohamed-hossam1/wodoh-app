import { SIDELINKS } from "@/constants/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideLinks() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-5">
      {SIDELINKS.map((link) => {
        const IconComponent = link.icon;
        return (
          <Link
            href={link.href}
            key={link.title}
            className={`flex gap-2 items-center text-text-secondary `}
          >
            <IconComponent
              className={`${pathname === link.href && "text-primary"}`}
            />
            <p
              className={`font-bold text-lg ${pathname === link.href && "text-text-color"}`}
            >
              {link.title}
            </p>
          </Link>
        );
      })}
    </div>
  );
}
