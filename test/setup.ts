import { afterEach, vi } from "vitest";

class ResizeObserverMock {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

if (!globalThis.ResizeObserver) {
  vi.stubGlobal("ResizeObserver", ResizeObserverMock);
}

if (!window.matchMedia) {
  window.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })) as typeof window.matchMedia;
}

if (!HTMLElement.prototype.scrollTo) {
  HTMLElement.prototype.scrollTo = function scrollTo(options?: ScrollToOptions | number, y?: number) {
    if (typeof options === "number") {
      this.scrollLeft = options;
      if (typeof y === "number") this.scrollTop = y;
      return;
    }
    if (options?.left !== undefined) this.scrollLeft = options.left;
    if (options?.top !== undefined) this.scrollTop = options.top;
  };
}

afterEach(() => {
  document.body.innerHTML = "";
  document.documentElement.removeAttribute("data-theme");
  document.documentElement.classList.remove("light", "dark");
  localStorage.clear();
  vi.useRealTimers();
});
