import { HTMLAttributes, PropsWithChildren } from "react";
import cn from "../../utils/cn";

const typographyVariants = {
  variant: {
    default: "text_type_main-default",
    large: "text_type_main-large",
    medium: "text_type_main-medium",
    small: "text_type_main-small",
    inactive: "text_type_main-default text_color_inactive",
    digits: "text_type_digits-default",
    digits_medium: "text_type_digits-medium",
    digits_large: "text_type_digits-large",
  },
  color: {
    primary: "text-primary",
    secondary: "text-secondary",
  },
};
type TextVariant = keyof typeof typographyVariants.variant;
type ColorVariant = keyof typeof typographyVariants.color;

export default function Typography({ variant = "default", color = "primary", children, className = "", ...props }: PropsWithChildren<HTMLAttributes<HTMLParagraphElement>> & { variant?: TextVariant; color?: ColorVariant }) {
  return (
    <p {...props} className={cn(`text`, typographyVariants.variant[variant], typographyVariants.color[color], className)}>
      {children}
    </p>
  );
}
