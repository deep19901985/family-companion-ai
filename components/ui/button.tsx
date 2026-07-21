import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 focus-visible:shadow-focus disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-primary via-primary to-accent text-primary-foreground shadow-soft hover:-translate-y-0.5 hover:shadow-premium",
        secondary:
          "border border-white/60 bg-card/80 text-foreground shadow-soft backdrop-blur hover:-translate-y-0.5 hover:bg-white",
        accent:
          "bg-gradient-to-r from-secondary to-warning text-secondary-foreground shadow-soft hover:-translate-y-0.5 hover:shadow-premium",
        ghost: "text-foreground hover:bg-muted/80 hover:-translate-y-0.5",
        soft:
          "border border-primary/20 bg-primary/10 text-primary hover:-translate-y-0.5 hover:bg-primary/20"
      },
      size: {
        default: "h-11",
        sm: "h-10 px-3",
        lg: "h-12 px-5 text-base",
        icon: "h-11 w-11 px-0"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
