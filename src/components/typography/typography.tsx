import { HTMLAttributes, PropsWithChildren } from "react";

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
  color: {},
};
type TextVariant = keyof typeof typographyVariants.variant;

export default function Typography({ variant = "default", children, className = "", ...props }: PropsWithChildren<HTMLAttributes<HTMLParagraphElement>> & { variant?: TextVariant }) {
  return (
    <p {...props} className={`text ${typographyVariants.variant[variant]} ${className}`}>
      {children}
    </p>
  );
}
