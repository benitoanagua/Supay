<svelte:options
  customElement={{
    tag: "wc-sticky",
  }}
/>

<script lang="ts">
  import { fade } from "svelte/transition";

  let el: HTMLElement | null = $state(null);
  let isVisible = $state(false);

  $effect(() => {
    // Solo ejecutar en el cliente
    if (typeof window === "undefined" || !el) return;

    const checkVisibility = () => {
      if (el) {
        const rect = el.getBoundingClientRect();
        // El elemento es visible si está dentro del viewport
        isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      }
    };

    // Verificar inicialmente
    checkVisibility();

    // Escuchar eventos de scroll
    window.addEventListener("scroll", checkVisibility, { passive: true });

    // También verificar en resize por si acaso
    window.addEventListener("resize", checkVisibility, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener("scroll", checkVisibility);
      window.removeEventListener("resize", checkVisibility);
    };
  });
</script>

<div bind:this={el}>
  {#if isVisible}
    <div transition:fade={{ delay: 250, duration: 300 }}>
      <slot />
    </div>
  {/if}
</div>
