import { Button } from "@/components/ui/button";

type Props = {
  page: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
};

export default function DataTablePagination({
  page,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
}: Props) {
  if (totalItems === 0) {
    return null;
  }

  const startIndex = (page - 1) * pageSize;

  return (
    <div className="mt-4 flex items-center justify-between">
      <p className="text-sm text-muted-foreground">
        Showing{" "}
        <span className="font-medium text-foreground">
          {startIndex + 1}–{Math.min(startIndex + pageSize, totalItems)}
        </span>{" "}
        of {totalItems}
      </p>

      <div className="flex gap-2">
        <Button
          variant="outline"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
        >
          Previous
        </Button>

        <Button
          variant="outline"
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
