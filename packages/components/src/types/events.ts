export interface StrataValueChangeDetail<T> {
  value: T;
}

export type StrataInputEvent<T> = CustomEvent<StrataValueChangeDetail<T>>;
export type StrataChangeEvent<T> = CustomEvent<StrataValueChangeDetail<T>>;

export interface ThemeChangeEvent extends CustomEvent {
  detail: {
    theme: "light" | "dark";
  };
}

export type ThemeMode = "light" | "dark";

declare global {
  interface HTMLElementEventMap {
    "strata-input": StrataInputEvent<unknown>;
    "strata-change": StrataChangeEvent<unknown>;
  }
  interface WindowEventMap {
    "theme-change": ThemeChangeEvent;
  }
}
