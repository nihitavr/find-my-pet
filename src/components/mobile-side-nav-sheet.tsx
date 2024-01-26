import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "~/components/ui/sheet";
import { Avatar, AvatarFallback } from "./ui/avatar";
import Image from "next/image";
import SignOut from "./sign-out";
import Link from "next/link";
import { Dog, LayoutDashboard, SquareUserRound, Tags } from "lucide-react";
import SignIn from "./sign-in";

export function MobileSideNavSheet({
  isSignedIn,
  image,
  fallbackLetter,
}: {
  isSignedIn: boolean;
  image?: string;
  fallbackLetter: string;
}) {
  return (
    <Sheet>
      {isSignedIn ? (
        <SheetTrigger asChild>
          <Avatar>
            {image ? (
              <Image src={image} alt="Avatar" width={50} height={50} />
            ) : (
              <AvatarFallback>{fallbackLetter}</AvatarFallback>
            )}
          </Avatar>
        </SheetTrigger>
      ) : (
        <SignIn />
      )}
      <SheetContent>
        <SheetHeader className="flex flex-row gap-2">
          <div className="relative h-12 w-40">
            <Image
              src="/find-my-pet-logo-dark-long.svg"
              alt="Logo"
              className="rounded-lg"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </SheetHeader>
        <div className="mt-8 flex flex-col gap-5">
          <SheetClose asChild>
            <Link
              href="/dashboard"
              className="flex items-center gap-3 rounded-md p-2 hover:bg-secondary"
            >
              <LayoutDashboard className="h-8 w-8" strokeWidth={1.3} />
              <span>Dashboard</span>
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href="/dashboard/owner-profile"
              className="flex items-center gap-3 rounded-md p-2 hover:bg-secondary"
            >
              <SquareUserRound className="h-8 w-8" strokeWidth={1.3} />
              <span>Owner Profile</span>
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href="/dashboard/pets"
              className="flex items-center gap-3 rounded-md p-2 hover:bg-secondary"
            >
              <Dog className="h-8 w-8" strokeWidth={1.3} />
              <span>Pets</span>
            </Link>
          </SheetClose>

          <SheetClose asChild>
            <Link
              href="/dashboard/pet-tags"
              className="flex items-center gap-3 rounded-md p-2 hover:bg-secondary"
            >
              <Tags className="h-8 w-8" strokeWidth={1.3} />
              <span>Pet Tags</span>
            </Link>
          </SheetClose>
        </div>
        <SheetFooter className="mt-8">
          <SheetClose asChild>
            <SignOut />
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
