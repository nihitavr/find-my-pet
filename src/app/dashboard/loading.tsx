import ProfileFormLoadingSkeleton from "~/components/ui/profile-form-loading-skeleton";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="p-5">
      <ProfileFormLoadingSkeleton />
    </div>
  );
}
