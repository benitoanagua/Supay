<svelte:options
  customElement={{
    tag: "wc-sticky",
  }}
/>

<script lang="ts">
  import { tick } from "svelte";
  import { fade } from "svelte/transition";
  import { windowScrollStore } from "svelte-legos";

  const position = windowScrollStore();
  let el: HTMLElement | null = $state(null);
  let isVisible = $state(false);

  $effect(() => {
    if (el) {
      const checkVisibility = async () => {
        await tick();
        if (el) {
          isVisible = $position.y > el.getBoundingClientRect().top;
        }
      };

      checkVisibility();

      // Also check on scroll
      const unsubscribe = position.subscribe(() => {
        checkVisibility();
      });

      return unsubscribe;
    }
  });
</script>

<div bind:this={el}>
  {#if isVisible}
    <div transition:fade={{ delay: 250, duration: 300 }}>
      <slot />
    </div>
  {/if}
</div>
