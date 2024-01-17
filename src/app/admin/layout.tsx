export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="px-5 py-5">
      <div className="rounded-md border bg-white p-4">{children}</div>
    </div>
  );
}
