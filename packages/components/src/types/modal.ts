export type ModalSize = "small" | "medium" | "large" | "xlarge" | "full";

export type ModalPosition = "center" | "top" | "bottom" | "left" | "right";

export type ModalVariant =
  | "default"
  | "minimal"
  | "bordered"
  | "outlined"
  | "glass"
  | "accent-top"
  | "accent-left";

export type ModalAnimation =
  | "slide-up"
  | "slide-down"
  | "slide-left"
  | "slide-right"
  | "zoom"
  | "flip"
  | "fade";

export interface ModalProps {
  open: boolean;
  title?: string;
  size?: ModalSize;
  position?: ModalPosition;
  variant?: ModalVariant;
  animation?: ModalAnimation;
  closeOnOverlay?: boolean;
  closeOnEscape?: boolean;
  showClose?: boolean;
  preventScroll?: boolean;
}

export interface ModalOpenEvent extends CustomEvent {
  detail: Record<string, never>;
}

export interface ModalCloseEvent extends CustomEvent {
  detail: Record<string, never>;
}

export interface ModalBeforeCloseEvent extends CustomEvent {
  detail: Record<string, never>;
}

declare global {
  interface HTMLElementEventMap {
    "modal-open": ModalOpenEvent;
    "modal-close": ModalCloseEvent;
    "modal-before-close": ModalBeforeCloseEvent;
  }
}
