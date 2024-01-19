import AuthCheck from "~/components/auth-check";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthCheck>
      <div className="p-2 md:p-5">
        <div className="rounded-md border bg-white p-4">{children}</div>
      </div>
    </AuthCheck>
  );
}
