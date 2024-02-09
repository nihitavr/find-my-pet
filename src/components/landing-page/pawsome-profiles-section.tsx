import Image from "next/image";

export default async function PawsomeProfilesSection() {
  return (
    <div className="p-5 py-10 md:px-28">
      <h1 className="text-center text-3xl font-semibold md:text-4xl">
        Pawsome Pet Profiles
      </h1>
      <div className="pt-1 text-center text-lg text-primary">
        Pawsome profiles for your awesome pets.
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 md:pt-5">
        <div className="w-full px-5 md:translate-x-5 md:px-0">
          <div className="relative h-96 w-full">
            <Image
              fill
              src={"/pawsome-profiles-image-1.png"}
              alt="pawsome profiles image 1"
              className="max-w-min object-contain"
            />
          </div>
        </div>
        <div className="-mt-24 px-5 md:mt-0 md:-translate-x-6 md:px-0">
          <div className="relative h-96 w-full">
            <Image
              fill
              src={"/pawsome-profiles-image-2.png"}
              alt="pawsome profiles image 2"
              className="max-w-min object-contain"
            />
          </div>
        </div>
        <div className="-mt-24 px-5 md:mt-0 md:translate-x-6 md:px-0">
          <div className="relative h-96 w-full">
            <Image
              fill
              src={"/pawsome-profiles-image-3.png"}
              alt="pawsome profiles image 3"
              className="max-w-min object-contain"
            />
          </div>
        </div>
        <div className="-mt-24 px-5 md:mt-0 md:-translate-x-5 md:px-0">
          <div className="relative h-96 w-full">
            <Image
              fill
              src={"/pawsome-profiles-image-4.png"}
              alt="pawsome profiles image 4"
              className="max-w-min object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
