<script lang="ts">
  import Card from '$lib/Wrapper/Card.svelte';
  import Text from '$lib/Wrapper/Text.svelte';
</script>

<div class="w-full flex justify-center">
  <div class="w-1/3 mt-10">
    <Card>
      <div class="text-center">
        <Text text="HELLO *WORLD!*" size="large" />
      </div>
      <Text
        typewriter={{ enable: true, speed: 0.3 }}
        text="*Lorem ipsum* #dolor sit amet _consectetur adipisicing_ elit. Cupiditate
      minus dolores _voluptatem_, voluptates repellat ex quidem modi iusto
      ratione _architecto repellendus_ -possimus blanditiis temporibus- adipisci
      quo, qui odit non voluptas!#"
      />
      <div class="mt-4" />
    </Card>
  </div>
</div>
