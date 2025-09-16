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
  import { mediaQuery } from "svelte-legos";

  let { url = "#", current = false, dark = false } = $props();

  const isMobile = mediaQuery("(max-width: 767px)");
</script>

<div class="uppercase">
  <a
    class="no-underline font-sans {current
      ? 'text-red-500'
      : dark
        ? 'text-white'
        : 'text-neutral-900'} {$isMobile
      ? 'text-lg font-500'
      : 'text-xs font-700 tracking-wide'}"
    href={url}><slot /></a
  >
</div>
