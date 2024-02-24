import { cn, getDiscountedPrice } from "~/lib/utils";

export function Price({
  className,
  price,
  discount,
}: {
  className?: string;
  price: number;
  discount: number;
}) {
  return (
    <div
      className={cn("flex items-center gap-3 text-foreground/90", className)}
    >
      <span className="line-through">&#8377; {price}</span>
      <span className="font-semibold text-primary">
        &#8377; {getDiscountedPrice(price, discount)}
      </span>
    </div>
  );
}
