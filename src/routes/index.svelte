<script lang="ts">
  import { fly } from 'svelte/transition';
  import Checkbox from '$lib/Input/Checkbox.svelte';
  import Date from '$lib/Input/Date.svelte';
  import Dropdown from '$lib/Input/Dropdown.svelte';
  import NormalButton from '$lib/Input/NormalButton.svelte';
  import Number from '$lib/Input/Number.svelte';
  import Password from '$lib/Input/Password.svelte';
  import RadioGroup from '$lib/Input/RadioGroup.svelte';
  import SmallButton from '$lib/Input/SmallButton.svelte';
  import Textarea from '$lib/Input/Textarea.svelte';
  import Textfield from '$lib/Input/Textfield.svelte';
  import Card from '$lib/Wrapper/Card.svelte';
  import InplacePopup from '$lib/Wrapper/InplacePopup.svelte';
  import List from '$lib/Wrapper/List.svelte';
  import MediaQuery from '$lib/Wrapper/MediaQuery.svelte';
  import Table from '$lib/Wrapper/Table.svelte';
  import Text from '$lib/Wrapper/Text.svelte';

  let showPopup = false;
</script>

<div class="w-full flex justify-center">
  <div class="w-1/3 mt-10">
    <Card padding="p-4">
      <div class="text-center">
        <Text text="HELLO *WORLD!*" size="large" />
      </div>
      <Text
        typewriter={{ enable: true, speed: 0.3 }}
        text="*Lorem ipsum* #dolor sit -amet- _consectetur adipisicing_ elit.#"
      />
    </Card>
  </div>
</div>
