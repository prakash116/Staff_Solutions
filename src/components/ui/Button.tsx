import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg" | "sm";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  /** Optional leading or trailing icon node. */
  icon?: ReactNode;
  iconPosition?: "start" | "end";
}

type LinkProps = BaseProps & { href: string; external?: boolean; onClick?: () => void };
type NativeProps = BaseProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & { href?: undefined };

export type ButtonProps = LinkProps | NativeProps;

const base =
  "inline-flex items-center justify-center gap-2 rounded-control font-semibold whitespace-nowrap select-none " +
  "transition-[background-color,color,border-color,box-shadow,transform] duration-200 ease-out-expo " +
  "active:scale-[0.985] disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-foreground shadow-control hover:bg-primary-hover hover:shadow-[0_10px_28px_-10px_rgba(0,123,167,0.7)]",
  secondary:
    "glass text-foreground hover:bg-surface-hover hover:border-border-strong",
  ghost: "text-foreground hover:bg-muted-surface",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-[0.95rem]",
  lg: "h-12 px-6 text-base sm:h-13 sm:px-7",
};

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className, children, icon, iconPosition = "end" } = props;
  const classes = cn(base, variants[variant], sizes[size], className);
  const content = (
    <>
      {icon && iconPosition === "start" ? <span aria-hidden="true" className="shrink-0">{icon}</span> : null}
      <span>{children}</span>
      {icon && iconPosition === "end" ? <span aria-hidden="true" className="shrink-0">{icon}</span> : null}
    </>
  );

  if (props.href !== undefined) {
    const { href, external, onClick } = props;
    if (external) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer" onClick={onClick}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {content}
      </Link>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { variant: _v, size: _s, className: _c, children: _ch, icon: _i, iconPosition: _ip, href: _h, ...rest } = props;
  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  );
}

export const PrimaryButton = (props: ButtonProps) => <Button {...props} variant="primary" />;
export const SecondaryButton = (props: ButtonProps) => <Button {...props} variant="secondary" />;
