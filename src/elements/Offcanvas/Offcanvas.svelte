<svelte:options
  customElement={{
    tag: "wc-offcanvas",
  }}
/>

<script lang="ts">
  let showOffcanvas = $state(false);

  function toggleOffcanvas() {
    showOffcanvas = !showOffcanvas;
    if (showOffcanvas) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }
</script>

<button onclick={toggleOffcanvas} class="cursor-pointer border-0 bg-white p-0"
  ><slot name="open" /></button
>

{#if showOffcanvas}
  <div class="fixed top-0 left-0 w-full h-full bg-black/75 z-50">
    <div class="relative h-full w-80 bg-white p-4 z-1">
      <button
        onclick={toggleOffcanvas}
        class="absolute right-0 top-0 cursor-pointer border-0 bg-white p-0"
        aria-label="Close offcanvas"
      >
        <span class="i-ri-close-line block h-6 w-6"></span>
      </button>
      <div><slot name="content" /></div>
    </div>
  </div>
{/if}
