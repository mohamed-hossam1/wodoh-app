import { ROUTES } from "@/constants/routes";
import { Eye } from "lucide-react";
import Link from "next/link";

type TableHeader = {
  key: string;
  label: string;
  align?: "left" | "center" | "right";
};

type TableCellValue = string | number | boolean | null;

type TableProps = {
  headers: TableHeader[];
  data: Record<string, TableCellValue>[];
};

export default function Table({ headers, data }: TableProps) {
  const renderCell = (headerKey: string, value: TableCellValue) => {
    if (headerKey === "actions") {
      if (!value) return null;
      return (
        <Link
          href={ROUTES.ADMIN}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-text-secondary hover:text-text-color"
          aria-label="View project"
        >
          <Eye />
        </Link>
      );
    }

    if (headerKey === "status") {
      return <span className="text-primary">{value}</span>;
    }

    return value;
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold">Latest Projects</h2>
          <p className="text-sm text-text-secondary">
            Overview of your active projects
          </p>
        </div>
        <div className="sm:flex-none">
          <Link
            href={ROUTES.PROJECTS}
            type="button"
            className="inline-flex items-center justify-center rounded-xl border border-border bg-secondary px-4 py-2 text-sm font-semibold text-text-color"
          >
            View All
          </Link>
        </div>
      </div>
      <div className="mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-2xl border border-border bg-secondary shadow-sm">
              <table className="min-w-full divide-y divide-border/70">
                <thead className="bg-background">
                  <tr>
                    {headers.map((header, headerIndex) => (
                      <th
                        key={header.key}
                        scope="col"
                        className={[
                          headerIndex === 0
                            ? "py-3 pr-3 pl-4 sm:pl-6"
                            : "px-3 py-3",
                          headerIndex === headers.length - 1
                            ? "pr-4 sm:pr-6"
                            : "",
                          header.align === "center"
                            ? "text-center"
                            : header.align === "right"
                              ? "text-right"
                              : "text-left",
                          "text-sm font-semibold ",
                        ].join(" ")}
                      >
                        {header.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/70">
                  {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {headers.map((header, cellIndex) => (
                        <td
                          key={`${rowIndex}-${header.key}`}
                          className={[
                            cellIndex === 0
                              ? "py-4 pr-3 pl-4 sm:pl-6"
                              : "px-3 py-4",
                            cellIndex === headers.length - 1
                              ? "pr-4 sm:pr-6"
                              : "",
                            header.align === "center"
                              ? "text-center"
                              : header.align === "right"
                                ? "text-right"
                                : "text-left",
                            cellIndex === 0 ? "font-medium" : "",
                            "text-sm whitespace-nowrap text-text-secondary",
                          ].join(" ")}
                        >
                          {renderCell(header.key, row[header.key])}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
