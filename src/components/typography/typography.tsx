import { PropsWithChildren } from "react";

const TypographyVariants = {
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
type TextVariants = keyof typeof TypographyVariants.variants;

export default function Typography({ variants = "default", children }: PropsWithChildren<HTMLParagraphElement> & { variants?: TextVariants }) {
  return <p className={`text ${variants}`}>{children}</p>;
}
