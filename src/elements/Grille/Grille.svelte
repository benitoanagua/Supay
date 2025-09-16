<svelte:options
  customElement={{
    tag: "wc-grille",
    props: {
      desktop: { reflect: true, type: "Number", attribute: "desktop" },
      mobile: { reflect: true, type: "Number", attribute: "mobile" },
      gap: { reflect: true, type: "String", attribute: "gap" },
    },
  }}
/>

<script lang="ts">
  import { tick } from "svelte";

  let { desktop = 3, mobile = 3, gap = "medium" } = $props();

  // Reemplazo nativo para mediaQuery
  let isMobile = $state(false);
  let parent: HTMLElement | null = $state(null);

  $effect(() => {
    // Solo ejecutar en el cliente (navegador)
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(max-width: 767px)");

    // Función para actualizar el estado
    const updateIsMobile = () => {
      isMobile = mediaQuery.matches;
    };

    // Establecer valor inicial
    updateIsMobile();

    // Escuchar cambios
    mediaQuery.addEventListener("change", updateIsMobile);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener("change", updateIsMobile);
    };
  });

  const gridRendering = () => {
    if (!parent) return;

    const slot = parent.querySelector("slot");
    if (!slot) return;

    const nodos = slot
      .assignedNodes()
      .filter(
        (node: Node): node is HTMLElement =>
          node.nodeType === Node.ELEMENT_NODE && node instanceof HTMLElement
      );

    nodos.forEach((nodo: HTMLElement, i: number) => {
      const dsk = grid(desktop, i, nodos.length);
      const mbl = grid(mobile, i, nodos.length);

      const padding = gap === "small" ? 8 : gap === "medium" ? 16 : 24;

      nodo.style.boxSizing = "content-box";

      if (isMobile) {
        // Cambiado de $isMobile a isMobile
        let widthM = Math.floor(
          (parent!.clientWidth - 2 * padding * (mobile - 1)) / mobile
        );
        let borderM = (i + 1) % mobile !== 0 ? 1 : 0;
        nodo.style.width = `${widthM - borderM}px`;
      } else {
        let widthd = Math.floor(
          (parent!.clientWidth - 2 * padding * (desktop - 1)) / desktop
        );
        let borderD = (i + 1) % desktop !== 0 ? 1 : 0;
        nodo.style.width = `${widthd - borderD}px`;
      }

      let right = false;
      let bottom = false;

      if (
        (dsk.col < desktop - 1 && !isMobile) || // Cambiado de $isMobile a isMobile
        (mbl.col < mobile - 1 && isMobile) // Cambiado de $isMobile a isMobile
      ) {
        nodo.style.paddingRight = `${padding}px`;
        nodo.style.marginRight = `${padding}px`;
        nodo.style.borderRight = `1px solid rgb(245, 245, 245)`;
        right = true;
      }

      if (
        (dsk.row < dsk.rows && !isMobile) || // Cambiado de $isMobile a isMobile
        (mbl.row < mbl.rows && isMobile) // Cambiado de $isMobile a isMobile
      ) {
        nodo.style.paddingBottom = `${padding}px`;
        nodo.style.marginBottom = `${padding}px`;
        nodo.style.borderBottom = `1px solid rgb(245, 245, 245)`;
        bottom = true;
      }

      if (right && bottom) {
        nodo.style.borderImage = `linear-gradient(315deg, white ${Math.round(
          (2 * padding * Math.sqrt(2)) / 4 + 1
        )}px, rgb(245, 245, 245) 0) 1`;
      }
    });
  };

  const grid = (breakpoint: number, index: number, length: number) => {
    let divInt = ~~(length / breakpoint);
    let divMod = length % breakpoint;
    let rows = divMod > 0 ? divInt + 1 : divInt;
    let row = ~~(index / breakpoint) + 1;
    let col = index - ~~(index / breakpoint) * breakpoint;
    return { rows, row, col };
  };

  $effect(() => {
    if (parent) {
      gridRendering();
    }
  });

  $effect(() => {
    // Re-render when mobile breakpoint changes
    if (parent && isMobile !== undefined) {
      // Cambiado de $isMobile a isMobile
      tick().then(() => gridRendering());
    }
  });
</script>

<div bind:this={parent} class="flex flex-wrap">
  <slot />
</div>
