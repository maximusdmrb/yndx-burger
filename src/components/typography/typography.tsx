import { HTMLAttributes, PropsWithChildren } from "react";

const typographyVariants = {
  variants: {
    default: "text_type_main-default",
    large: "text_type_main-large",
    medium: "text_type_main-medium",
    small: "text_type_main-small",
    inactive: "text_type_main-default text_color_inactive",
    digits: "text_type_digits-default",
    digits_medium: "text_type_digits-medium",
    digits_large: "text_type_digits-large",
  },
};
type TextVariants = keyof typeof typographyVariants.variants;

export default function Typography({ variants = "default", children, className = "" }: PropsWithChildren<HTMLAttributes<HTMLParagraphElement>> & { variants?: TextVariants }) {
  return <p className={`text ${typographyVariants.variants[variants]} ${className}`}>{children}</p>;
}
