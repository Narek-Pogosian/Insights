import * as React from "react";
import { cn } from "@/lib/utils";

// eslint-disable-next-line
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex w-full rounded border bg-background-input px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-foreground-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 [&:not(:focus)]:aria-[invalid=true]:border-red-500/50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };

// eslint-disable-next-line
interface InputControlProps extends React.InputHTMLAttributes<HTMLDivElement> {}
export function InputControl({
  children,
  className,
  ...rest
}: InputControlProps) {
  return (
    <div className={cn("space-y-1", className)} {...rest}>
      <>{children}</>
    </div>
  );
}
