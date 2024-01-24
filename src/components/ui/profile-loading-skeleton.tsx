import Image from "next/image";
import { Skeleton } from "./skeleton";

export default function ProfileLoadingSkeleton() {
  return (
    <div className="flex h-[90vh] w-full flex-col items-center justify-center">
      <Image
        src="/loading-cute-animated-cat-1.gif"
        alt="Animated Cat"
        width={300}
        height={300}
        unoptimized={true}
      />
    </div>
  );
}
