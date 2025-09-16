<svelte:options
  customElement={{
    tag: "wc-card",
    props: {
      heading: { reflect: true, type: "Number", attribute: "heading" },
    },
  }}
/>

<script lang="ts">
  import { elementSizeStore } from "svelte-legos";

  let {
    title,
    url,
    excerpt,
    feature_image,
    tag_name,
    tag_url,
    author_name,
    author_url,
    author_profile_image,
    media_align = "left",
    media_width = "is-half",
    heading = 1,
    density = "normal",
    aspect_ratio = "monitor",
    reading_time,
    published_at,
  } = $props();

  let meta_width: HTMLElement | null = $state(null);
  let image_width: HTMLElement | null = $state(null);

  const meta_size = $derived(elementSizeStore(meta_width));
  const image_size = $derived(elementSizeStore(image_width));
</script>

<div
  class="flex gap-4 {media_align === 'left' && density !== 'normal'
    ? 'flex-row'
    : media_align === 'left' && density === 'normal'
      ? 'flex-col md:flex-row'
      : media_align === 'right' && density !== 'normal'
        ? 'flex-row-reverse'
        : media_align === 'right' && density === 'normal'
          ? 'flex-col-reverse md:flex-row-reverse'
          : media_align === 'top'
            ? 'flex-col'
            : 'flex-col-reverse'}"
>
  {#if feature_image}
    <figure
      class="m-0 line-height-0 overflow-hidden {!(
        media_align === 'left' || media_align === 'right'
      ) ||
      (media_align === 'left' && density === 'normal') ||
      (media_align === 'right' && density === 'normal')
        ? 'flex-1'
        : media_width === 'is-one-fifth'
          ? 'w-1/5'
          : media_width === 'is-one-quarter'
            ? 'w-1/4'
            : media_width === 'is-one-third'
              ? 'w-1/3'
              : media_width === 'is-two-fifths'
                ? 'w-2/5'
                : 'w-1/2'}"
    >
      <a href={url}>
        <img
          src={feature_image}
          alt={title}
          bind:this={image_width}
          class="w-full object-cover {$image_size.width < 240
            ? 'rounded'
            : $image_size.width >= 240 && $image_size.width <= 440
              ? 'rounded-md'
              : 'rounded-lg'}  {aspect_ratio === 'square'
            ? 'aspect-square'
            : aspect_ratio === 'video'
              ? 'aspect-video'
              : 'aspect-4/3'}"
        />
      </a>
    </figure>
  {/if}

  <div class="flex-1 flex flex-col gap-y-2">
    {#if author_name}
      <div class="flex items-center {author_profile_image ? 'gap-x-2' : ''}">
        {#if author_profile_image}
          <img
            src={author_profile_image}
            alt={author_name}
            class="w-8 h-8 rounded-full"
          />
        {:else}
          <span class="author-bullet"></span>
        {/if}
        <a href={author_url} class="author-link">
          {author_name}
        </a>
      </div>
    {/if}
    <a href={url} class="text-neutral-900 no-underline font-sans">
      <h3
        class="m-0 font-500 {heading === 1
          ? 'headline-1'
          : heading === 2
            ? 'headline-2'
            : heading === 3
              ? 'headline-3'
              : heading === 4
                ? 'headline-4'
                : heading === 5
                  ? 'headline-5'
                  : 'headline-6'}"
      >
        {title}
      </h3>
    </a>
    {#if density === "normal"}
      <p class="my-2 font-serif text-base text-neutral-700">{excerpt}</p>
    {/if}
    {#if tag_name && density !== "minimal"}
      <div class="post-meta" bind:this={meta_width}>
        <span class="capitalize after:content-['•'] after:ml-2 after:mr-1"
          >{published_at}</span
        >
        <span
          class="{$meta_size.width > 240
            ? `after:content-['•'] after:ml-2 after:mr-1`
            : null} ">{reading_time}</span
        >
        {#if $meta_size.width > 240}
          <a
            href={tag_url}
            class="text-neutral-900 no-underline bg-neutral-100 py-.5 px-3 rounded-full"
            >{tag_name}
          </a>
        {/if}
      </div>
    {/if}
  </div>
</div>
