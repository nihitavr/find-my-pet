import AuthCheck from "~/components/auth-check";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthCheck>
      <div className="flex flex-col items-center p-2 md:p-5">
        <div className="w-full rounded-md border bg-white p-4 md:w-2/3">
          {children}
        </div>
      </div>
    </AuthCheck>
  );
}
