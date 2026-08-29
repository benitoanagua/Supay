import type { StrataChangeEvent, StrataInputEvent } from "./events.js";

export type StringValueEvent = StrataInputEvent<string> | StrataChangeEvent<string>;
export type NumberValueEvent = StrataInputEvent<number> | StrataChangeEvent<number>;
export type BooleanValueEvent = StrataInputEvent<boolean> | StrataChangeEvent<boolean>;

export interface PaginationChangeEvent extends CustomEvent<{ page: number; pages: number }> {}

export interface SwitchChangeEvent extends CustomEvent<{ checked: boolean }> {}

export interface CheckboxChangeEvent extends CustomEvent<{ checked: boolean }> {}

declare global {
  interface HTMLElementEventMap {
    "pagination-change": PaginationChangeEvent;
  }
}
