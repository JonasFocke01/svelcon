<script>
  import '../app.css';
  import Text from '$lib/Wrapper/Text.svelte';
</script>

<div class="bg-warning w-full h-full transition duration-500">
  <div class="w-full h-full flex flex-col space-y-4 pt-40">
    <div class="text-center">
      <Text
        text={`We encountered an error while trying to load the page.`}
        textcolor="error"
      />
    </div>
  </div>
</div>
