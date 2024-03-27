import { Instagram, Mail, Phone } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="justify relative flex flex-col-reverse items-start justify-between gap-5 p-5 md:flex-row md:gap-10 md:px-28 md:py-10">
      <div className="flex flex-col gap-2">
        {/* Instagram */}
        <a
          className="flex w-min items-center justify-start gap-2  text-foreground hover:text-foreground/80"
          href="https://instagram.com/findmypet.qr"
          target="_blank"
        >
          <Instagram className="h-4 cursor-pointer" />
          <span>findmypet.qr</span>
        </a>

        {/* Email */}
        <div className="flex items-center gap-2">
          <Mail className="h-4" />
          <span>findmypet.in@gmail.com</span>
        </div>

        {/* Phone num */}
        <div className="flex items-center gap-2">
          <Phone className="h-4" />
          <span>+91 6363822930</span>
        </div>

        <p className="mt-5 font-semibold">Find My Pet</p>
        <p>Copyright &copy; 2024 Find My Pet</p>
      </div>
      <div className="flex w-60 flex-col items-start gap-1">
        <h3 className="text-base font-bold">Company</h3>
        <Link
          className="mt-2 text-foreground/80 hover:text-foreground"
          href={"/privacy-policy.html"}
        >
          Privacy Policy
        </Link>
        <Link
          className="text-foreground/80 hover:text-foreground"
          href={"/terms-and-conditions.html"}
        >
          Terms of Service
        </Link>
      </div>
    </footer>
  );
}
