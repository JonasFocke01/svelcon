<script lang="ts">
  import '../app.css';
  import { SvelteToast } from '@zerodevx/svelte-toast';
</script>

<SvelteToast />

<div class="bg-primary min-h-screen">
  <slot />
</div>
