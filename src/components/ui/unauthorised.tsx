export default function Unauthorised() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div className="text-3xl font-semibold text-red-500">401</div>
      <div className="text-2xl font-semibold text-primary">Unauthorised</div>
    </div>
  );
}
