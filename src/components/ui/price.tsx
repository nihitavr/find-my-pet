"use client";
import { useOnScreen } from "~/lib/hooks/screen.hooks";
import { cn, getDiscountedPrice } from "~/lib/utils";
import StrikeAnimation from "./animation/strike-animation";
import WipeAnimation from "./animation/wipe-animation";

export default function Price({
  className,
  price,
  discount,
  animate,
}: {
  className?: string;
  price: number;
  discount: number;
  animate?: boolean;
}) {
  const [ref, visible] = useOnScreen({ threshold: 1 });

  return (
    <div
      ref={ref}
      className={cn("flex items-center gap-3 text-foreground/90", className)}
    >
      <OriginalPrice price={price} animate={animate && visible} />
      <DiscountedPrice
        price={price}
        discount={discount}
        animate={animate && visible}
        className={animate ? "opacity-0" : ""}
      />
    </div>
  );
}

const OriginalPrice = ({
  price,
  className,
  animate,
}: {
  price: number;
  className?: string;
  animate?: boolean;
}) => {
  return animate ? (
    <StrikeAnimation animationDuration={0.7}>&#8377; {price}</StrikeAnimation>
  ) : (
    <span className={cn("line-through", className)}>&#8377; {price}</span>
  );
};

const DiscountedPrice = ({
  price,
  discount,
  className,
  animate,
}: {
  price: number;
  discount: number;
  className?: string;
  animate?: boolean;
}) => {
  return animate ? (
    <WipeAnimation
      className="font-semibold text-primary opacity-0"
      animationDelay={0.75}
      animationDuration={1}
    >
      &#8377; {getDiscountedPrice(price, discount)}
    </WipeAnimation>
  ) : (
    <span className={cn("font-semibold text-primary", className)}>
      &#8377; {getDiscountedPrice(price, discount)}
    </span>
  );
};
