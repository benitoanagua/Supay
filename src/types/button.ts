export type ButtonVariant =
  | "filled"
  | "outlined"
  | "text"
  | "elevated"
  | "tonal";
export type ButtonSize = "small" | "medium" | "large";
export type ButtonColor =
  | "primary"
  | "secondary"
  | "error"
  | "success"
  | "warning";
export type ButtonType = "button" | "submit" | "reset";

export interface ButtonProps {
  label: string;
  variant: ButtonVariant;
  size: ButtonSize;
  color: ButtonColor;
  disabled?: boolean;
  loading?: boolean;
  href?: string;
  type?: ButtonType;
  icon?: string;
  trailingIcon?: boolean;
  fullWidth?: boolean;
}
