export default function Loader({
  show,
  flexible,
}: {
  show: boolean;
  flexible?: boolean;
}) {
  return show ? (
    !flexible ? (
      <div
        className="mx-auto h-10 w-10 animate-spin
        rounded-full border-4 border-black border-t-white "
      ></div>
    ) : (
      <div
        className="mx-auto h-full
        w-full animate-spin rounded-full border-4 border-t-white "
      ></div>
    )
  ) : null;
}
