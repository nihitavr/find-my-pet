import { Skeleton } from "~/components/ui/skeleton";

export default function ProductLoading() {
  return (
    <div className="flex flex-col gap-2 p-3 md:flex-row md:py-10">
      <Skeleton className="aspect-[7/5] w-full rounded-lg bg-slate-200" />
      <div className="flex gap-2">
        <Skeleton className="aspect-square basis-1/4 rounded-md" />
        <Skeleton className="aspect-square basis-1/4 rounded-md" />
        <Skeleton className="aspect-square basis-1/4 rounded-md" />
        <Skeleton className="aspect-square basis-1/4 rounded-md" />
      </div>
      <Skeleton className="mt-2 h-8 w-2/3 rounded-md" />
      <Skeleton className="h-4 w-1/3 rounded-md" />
      <Skeleton className="h-5 w-full rounded-md" />
      <Skeleton className="h-5 w-full rounded-md" />
      <Skeleton className="h-5 w-full rounded-md" />
      <Skeleton className="h-5 w-full rounded-md" />
      <Skeleton className="mt-2 h-8 w-1/3 rounded-md" />
      <Skeleton className="mt-2 h-10 w-full rounded-md bg-slate-300" />
    </div>
  );
}
