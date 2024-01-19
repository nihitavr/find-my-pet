import { Skeleton } from "./skeleton";

export default function ProfileFormLoadingSkeleton() {
  return (
    <div className="flex flex-col gap-8">
      <Skeleton className="h-[25px] w-1/2 rounded-lg bg-slate-200" />
      <div className="flex flex-col gap-3">
        <Skeleton className="h-[20px] w-32 flex-shrink rounded-md" />
        <Skeleton className="h-[35px] w-full rounded-md" />
      </div>
      <div className="flex flex-col gap-3">
        <Skeleton className="h-[20px] w-32 flex-shrink rounded-md" />
        <Skeleton className="h-[35px] w-full rounded-md" />
      </div>
      <div className="flex flex-col gap-3">
        <Skeleton className="h-[20px] w-32 flex-shrink rounded-md" />
        <Skeleton className="h-[35px] w-full rounded-md" />
      </div>
    </div>
  );
}
