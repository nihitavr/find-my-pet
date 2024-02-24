import { Skeleton } from "~/components/ui/skeleton";

export default function ProductLoading() {
  return (
    <div className="flex flex-col gap-2 p-3 md:flex-row md:px-6 md:py-10">
      <div className="flex h-full w-full flex-col gap-2 md:w-3/4">
        <Skeleton className="aspect-[6/5] w-full rounded-md bg-slate-200" />
        <div className="flex gap-2">
          <Skeleton className="hidden aspect-square basis-1/4 rounded-md md:inline md:basis-1/5" />
          <Skeleton className="aspect-square basis-1/4 rounded-md md:basis-1/5" />
          <Skeleton className="aspect-square basis-1/4 rounded-md md:basis-1/5" />
          <Skeleton className="aspect-square basis-1/4 rounded-md md:basis-1/5" />
          <Skeleton className="aspect-square basis-1/4 rounded-md md:basis-1/5" />
        </div>
      </div>
      <div className="flex h-full w-full flex-col gap-2">
        <Skeleton className="mt-2 h-8 w-2/3 rounded-md" />
        <Skeleton className="h-4 w-1/3 rounded-md" />
        <Skeleton className="h-5 w-full rounded-md" />
        <Skeleton className="h-5 w-full rounded-md" />
        <Skeleton className="h-5 w-full rounded-md" />
        <Skeleton className="h-5 w-full rounded-md" />
        <Skeleton className="mt-2 h-8 w-1/3 rounded-md" />
        <Skeleton className="mt-2 h-10 w-full rounded-md bg-slate-300 md:w-32" />
      </div>
    </div>
  );
}
