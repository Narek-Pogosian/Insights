import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background shadow hover:bg-primary/90",
        outline: "border shadow-sm hover:bg-background-muted",
        ghost: "hover:bg-background-muted",
        destructive: "bg-red-700 hover:bg-red-700/90 text-white",
        link: "text-primary underline-offset-4 underline",
      },
      size: {
        default: "px-4 py-2",
        sm: "rounded py-1.5 px-3 text-xs",
        lg: "rounded py-2 text-lg px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, loading, children, ...props },
    ref,
  ) => {
    if (asChild) {
      return (
        <Slot ref={ref} {...props}>
          <>
            {React.Children.map(
              children as React.ReactElement,
              (child: React.ReactElement) => {
                return React.cloneElement(child, {
                  className: cn(buttonVariants({ variant, size }), className),
                  children: (
                    <>
                      {loading && (
                        <Loader2
                          className={cn(
                            "h-4 w-4 animate-spin",
                            children && "mr-2",
                          )}
                        />
                      )}
                      {/* eslint-disable-next-line */}
                      {child.props.children}
                    </>
                  ),
                });
              },
            )}
          </>
        </Slot>
      );
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={loading}
        ref={ref}
        {...props}
      >
        <>
          {loading && (
            <Loader2
              className={cn("h-4 w-4 animate-spin", children && "mr-2")}
            />
          )}
          {children}
        </>
      </button>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
