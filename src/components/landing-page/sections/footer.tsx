import { Instagram, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="justify relative flex flex-col-reverse items-start justify-between gap-5 p-5 md:flex-row md:gap-10 md:px-28 md:py-10">
      <div>
        <a href="https://instagram.com/findmypet.qr" target="_blank">
          <Instagram className="cursor-pointer hover:opacity-70" />
        </a>
        <p className="mt-5 font-semibold">Find My Pet</p>
        <p>Copyright &copy; 2024 Find My Pet</p>
      </div>
      <div className="mr-28">
        <div className="flex items-center py-2">
          <Mail className="h-4 pr-2" />
          <p className="m-0 pr-4 text-sm">findmypet.in@gmail.com</p>
        </div>

        {/* phone num */}
        <div className="flex items-center">
          <Phone className="h-4 pr-2" />
          <p className="m-0 pr-4 text-sm">+91 6363822930</p>
        </div>
      </div>
    </footer>
  );
}
