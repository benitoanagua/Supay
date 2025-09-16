<svelte:options
  customElement={{
    tag: "wc-menu-item",
    props: {
      url: { reflect: true, type: "String", attribute: "url" },
      current: { reflect: false, type: "Boolean", attribute: "current" },
      dark: { reflect: false, type: "Boolean", attribute: "dark" },
    },
  }}
/>

<script lang="ts">
  let { url = "#", current = false, dark = false } = $props();

  let isMobile = $state(false); // Cambiado de const a let con $state

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

    // Escuchar cambios en la media query
    mediaQuery.addEventListener("change", updateIsMobile);

    // Cleanup - remover el event listener cuando el componente se destruya
    return () => {
      mediaQuery.removeEventListener("change", updateIsMobile);
    };
  });
</script>

<div class="uppercase">
  <a
    class="no-underline font-sans {current
      ? 'text-red-500'
      : dark
        ? 'text-white'
        : 'text-neutral-900'} {isMobile // Cambiado de $isMobile a isMobile
      ? 'text-lg font-500'
      : 'text-xs font-700 tracking-wide'}"
    href={url}><slot /></a
  >
</div>
