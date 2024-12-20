import Image from "next/image";

export default function ProfileLoadingSkeleton() {
  return (
    <div className="flex h-[80vh] w-full flex-col items-center justify-center">
      <Image
        src="/loading-cute-animated-cat.gif"
        alt="Animated Cat"
        width={300}
        height={300}
        unoptimized={true}
      />
    </div>
  );
}
