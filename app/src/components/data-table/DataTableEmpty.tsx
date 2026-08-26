import type { LucideIcon } from "lucide-react";

import { TableCell, TableRow } from "@/components/ui/table";

type Props = {
  colSpan: number;
  icon?: LucideIcon;
  title: string;
  description?: string;
};

export default function DataTableEmpty({
  colSpan,
  icon: Icon,
  title,
  description,
}: Props) {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="py-12">
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          {Icon && <Icon className="size-8" />}
          <p>{title}</p>

          {description && (
            <p className="text-sm">{description}</p>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}
