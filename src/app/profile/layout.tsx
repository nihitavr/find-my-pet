export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="px-5 py-5">{children}</div>;
}
