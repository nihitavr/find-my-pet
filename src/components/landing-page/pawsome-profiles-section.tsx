import Image from "next/image";

export default async function PawsomeProfilesSection() {
  return (
    <div className="p-5 md:px-28 md:pb-10">
      <h1 className="text-center text-3xl font-semibold md:text-4xl">
        Pawsome Pet Profiles
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4">
        <div className="w-full px-5 md:px-0 md:pl-5">
          <div className="relative h-96 w-full">
            <Image
              fill
              src={"/pawsome-profiles-image-1.png"}
              alt="pawsome profiles image 1"
              className="max-w-min object-contain"
            />
          </div>
        </div>
        <div className="-mt-24 px-5 md:mt-0 md:px-0 md:pr-5">
          <div className="relative h-96 w-full">
            <Image
              fill
              src={"/pawsome-profiles-image-2.png"}
              alt="pawsome profiles image 1"
              className="max-w-min object-contain"
            />
          </div>
        </div>
        <div className="-mt-24 px-5 md:mt-0 md:px-0 md:pl-5">
          <div className="relative h-96 w-full">
            <Image
              fill
              src={"/pawsome-profiles-image-3.png"}
              alt="pawsome profiles image 1"
              className="max-w-min object-contain"
            />
          </div>
        </div>
        <div className="-mt-24 px-5 md:mt-0 md:px-0 md:pr-5">
          <div className="relative h-96 w-full">
            <Image
              fill
              src={"/pawsome-profiles-image-4.png"}
              alt="pawsome profiles image 1"
              className="max-w-min object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
