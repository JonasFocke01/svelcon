<script lang="ts">
  import Button from '$lib/Input/Button.svelte';
  import Checkbox from '$lib/Input/Checkbox.svelte';
  import Date from '$lib/Input/Date.svelte';
  import Dropdown from '$lib/Input/Dropdown.svelte';
  import Number from '$lib/Input/Number.svelte';
  import Password from '$lib/Input/Password.svelte';
  import RadioGroup from '$lib/Input/RadioGroup.svelte';
  import SegmentedInput from '$lib/Input/SegmentedInput.svelte';
  import Textarea from '$lib/Input/Textarea.svelte';
  import Textfield from '$lib/Input/Textfield.svelte';
  import LoadingSpinner from '$lib/utilities/LoadingSpinner.svelte';
  import Badge from '$lib/Wrapper/Badge.svelte';
  import Card from '$lib/Wrapper/Card.svelte';
  import InplacePopup from '$lib/Wrapper/InplacePopup.svelte';
  import List from '$lib/Wrapper/List.svelte';
  import MediaQuery from '$lib/Wrapper/MediaQuery.svelte';
  import Table from '$lib/Wrapper/Table.svelte';
  import Text from '$lib/Wrapper/Text.svelte';

  let showPopup = false;
  let animateText = true;
  let buttonClicked = false;

  $: {
    animateText = animateText;
    setTimeout(() => {
      animateText = true;
    }, 100);
  }
</script>

<div class="flex flex-wrap w-full p-10 space-x-4 space-y-6">
  <Card padding="p-4">
    <svelte:fragment slot="Headder">
      <Text text="Button" size="large" />
    </svelte:fragment>
    <Button
      text="Hello World"
      on:click={() => (buttonClicked = !buttonClicked)}
      bgColor={buttonClicked ? 'error' : 'accent'}
    />
  </Card>
  <Card padding="p-4">
    <svelte:fragment slot="Headder">
      <Text text="Checkbox" size="large" />
    </svelte:fragment>
    <Checkbox disabled showDisabledIcon />
  </Card>
  <Card padding="p-4">
    <svelte:fragment slot="Headder">
      <Text text="Date" size="large" />
    </svelte:fragment>
    <Date disabled showDisabledIcon />
  </Card>
  <Card padding="p-4">
    <svelte:fragment slot="Headder">
      <Text text="Dropdown" size="large" />
    </svelte:fragment>
    <Dropdown disabled showDisabledIcon options={['TREE', 'FOREST']} />
  </Card>
  <Card padding="p-4">
    <svelte:fragment slot="Headder">
      <Text text="Number" size="large" />
    </svelte:fragment>
    <Number disabled showDisabledIcon />
  </Card>
  <Card padding="p-4">
    <svelte:fragment slot="Headder">
      <Text text="Password" size="large" />
    </svelte:fragment>
    <Password disabled showDisabledIcon />
  </Card>
  <Card padding="p-4">
    <svelte:fragment slot="Headder">
      <Text text="RadioGroup" size="large" />
    </svelte:fragment>
    <RadioGroup
      disabled
      label="HALLO"
      showDisabledIcon
      items={['Hello', 'World', 'Tree', 'Forest']}
    />
  </Card>
  <Card padding="p-4">
    <svelte:fragment slot="Headder">
      <Text text="SegmentedInput" size="large" />
    </svelte:fragment>
    <SegmentedInput label="HALLO" disabled showDisabledIcon segmentCount={4} />
  </Card>
  <Card padding="p-4">
    <svelte:fragment slot="Headder">
      <Text text="Textarea" size="large" />
    </svelte:fragment>
    <Textarea disabled showDisabledIcon label="HALLO" />
  </Card>
  <Card padding="p-4">
    <svelte:fragment slot="Headder">
      <Text text="Textfield" size="large" />
    </svelte:fragment>
    <Textfield />
  </Card>
  <Card padding="p-4">
    <svelte:fragment slot="Headder">
      <Text text="Badge" size="large" />
    </svelte:fragment>
    <Badge text="4">
      <Text text="Hello World" />
    </Badge>
  </Card>
  <Card padding="p-4">
    <svelte:fragment slot="Headder">
      <Text text="InplacePopup" size="large" />
    </svelte:fragment>
    <Button text="Popup" on:click={() => (showPopup = !showPopup)} />
    {#if showPopup}
      <InplacePopup
        rounded
        padding="p-2"
        on:outsideClick={() => (showPopup = false)}
      >
        <Text text="Hello World" />
      </InplacePopup>
    {/if}
  </Card>
  <Card padding="p-4">
    <svelte:fragment slot="Headder">
      <Text text="MediaQuery" size="large" />
    </svelte:fragment>
    <MediaQuery query="desktop">
      <Text text="Im only visible on Desktop" />
    </MediaQuery>
  </Card>
  <Card padding="p-4">
    <svelte:fragment slot="Headder">
      <Text text="List" size="large" />
    </svelte:fragment>
    <List inputItemsString={['Tree', 'Forest']} />
  </Card>
  <Card padding="p-4">
    <svelte:fragment slot="Headder">
      <Text text="Table" size="large" />
    </svelte:fragment>
    <Table
      data={[
        { test: 'Hello', test2: 'World', test3: 'Hello' },
        { test: 'World', test2: 'Hello', test3: 'World' }
      ]}
      explainColumns={[
        { key: 'test', heading: 'HW' },
        { key: 'test2', heading: 'WH' },
        { key: 'test3', heading: '' }
      ]}
    />
  </Card>
  <Card padding="p-4">
    <svelte:fragment slot="Headder">
      <Text text="Text" size="large" />
    </svelte:fragment>
    {#if animateText}
      <div class="cursor-pointer" on:click={() => (animateText = false)}>
        <Text
          text="*Click* #me# to _animate the Typewriter effect!!_"
          typewriterSpeed={0.3}
        />
      </div>
    {/if}
  </Card>
  <Card padding="p-4">
    <svelte:fragment slot="Headder">
      <Text text="LoadingSpinner" size="large" />
    </svelte:fragment>
    <LoadingSpinner speed={0.9} />
  </Card>
</div>
