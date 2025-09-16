<svelte:options
  customElement={{
    tag: "wc-menu",
    props: {
      dark: { reflect: false, type: "Boolean", attribute: "dark" },
      home: { reflect: true, type: "String", attribute: "home" },
    },
  }}
/>

<script lang="ts">
  let { dark = false, home = "#" } = $props();

  let isOpen = $state(false);
  let isMobile = $state(false); // Cambiado de const a let con $state

  function toggleMobileMenu() {
    isOpen = !isOpen;
  }

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

<div class="md:hidden flex justify-between">
  <button
    class="border-0 p-1 {dark
      ? 'bg-neutral-900 text-white'
      : 'bg-white text-neutral-900'}"
    onclick={toggleMobileMenu}
    aria-label="Toggle menu"
  >
    <span
      class="{'block h-6 w-6'} {!isOpen ? 'i-ri-menu-line' : 'i-ri-close-line'}"
    ></span>
  </button>
  <a href={home}>
    <slot name="logo" />
  </a>
  <slot name="search" />
</div>

<div
  class="list-none pl-0 {!isOpen
    ? 'hidden md:inline-flex'
    : 'inline-flex'} {isMobile // Cambiado de $isMobile a isMobile
    ? 'flex-col w-full pt-8 pb-4 gap-y-4'
    : 'flex-row gap-x-4'}"
>
  <slot />
</div>
