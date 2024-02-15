import { Skeleton } from "~/components/ui/skeleton";

export default function PetsListLoadingSkeleton() {
  return (
    <div className="mt-5 flex w-full flex-col items-center">
      <Skeleton className="mt-4 h-6 w-52 rounded-lg bg-slate-200" />
      <div className="w-full p-3 lg:w-2/5">
        <div className="grid grid-cols-2 gap-3 ">
          <Skeleton className="aspect-square rounded-lg bg-slate-200" />
          <Skeleton className="aspect-square rounded-lg bg-slate-200" />
          <Skeleton className="aspect-square rounded-lg bg-slate-200" />
          <Skeleton className="aspect-square rounded-lg bg-slate-200" />
          <Skeleton className="aspect-square rounded-lg bg-slate-200" />
          <Skeleton className="aspect-square rounded-lg bg-slate-200" />
        </div>
      </div>
    </div>
  );
}
