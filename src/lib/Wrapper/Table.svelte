<script lang="ts" context="module">
  export type ExplainColumns = Array<ExplainColumn>;
  export type showButtons = Array<showButton>;

  interface ExplainColumn {
    id?: string;
    key: string;
    heading: string;
    sortable?: boolean;
    nextSortOrder?: 'asc' | 'desc';
  }

  interface showButton {
    headline: string;
    text: string;
    onClick: (rowData: Object) => void;
  }
</script>

<!-- @component
  Displays a table of items that can be selected if wanted

  How to use: You can hand this component any array of objects for the rows, but you have to specify the shown columns in an second array.

  **data**
  * Array<Object: any>
  * default !No default!
  * the rowdata of the table

  **explainColumns**
  * Array<ExplainColumn>
  * default !No default!
  * an explanation for the columns of the table
  * here you can say, wich and how columns are shown
  
  **headline**
  * string
  * default ''
  * the headline of the headline of the component
  
  **displayRowButtons**
  * Array<{headline: string, text: string, onClick: Function(rowData: Object)}>
  * default []
  * if not empty, buttons are displayed for each row

  **filterable**
  * boolean
  * default false
  * if true, a filterbox will appear
-->
<script lang="ts">
  import Button from '$lib/Input/Button.svelte';
  import Textfield from '$lib/Input/Textfield.svelte';
  import Card from './Card.svelte';
  import Text from './Text.svelte';

  export let filterable = false;

  export let headline: string = '';
  export let displayRowButtons: showButtons = [];

  export let data: Array<any>;
  export let explainColumns: ExplainColumns;

  let filterString: string;

  function sort(column: ExplainColumn) {
    if (column.sortable) {
      if (column.nextSortOrder === 'asc') {
        data.sort((a, b) =>
          a[column.key] < b[column.key]
            ? -1
            : a[column.key] > b[column.key]
            ? 1
            : 0
        );
        column.nextSortOrder = 'desc';
      } else {
        data.sort((a, b) =>
          a[column.key] > b[column.key]
            ? -1
            : a[column.key] < b[column.key]
            ? 1
            : 0
        );
        column.nextSortOrder = 'asc';
      }
    }
    data = data;
  }
</script>

{#if explainColumns && explainColumns[0].key}
  <Card>
    <div class="flex flex-row">
      <h3 class:italic={filterString}>{headline}</h3>
      {#if filterable}
        <div class="ml-auto mb-3">
          <Textfield bind:value={filterString} placeholder="Filter" />
          {filterString}
        </div>
      {/if}
    </div>
    <table class="w-full text-lg text-text">
      <thead>
        <tr>
          {#key data}
            {#each explainColumns as column}
              <th class="cursor-pointer" on:click={() => sort(column)}>
                {column.heading}
                {#if column.nextSortOrder === 'asc'}
                  ▼
                {:else if column.nextSortOrder === 'desc'}
                  ▲
                {/if}
              </th>
            {/each}
            {#each displayRowButtons as button}
              <th>{button.headline}</th>
            {/each}
          {/key}
        </tr>
      </thead>
      <tbody>
        {#each filterString ? data.filter( (e) => Object.entries(e).find( (t) => (t[1] ? t[1]
                          .toString()
                          .toLowerCase()
                          .indexOf(filterString.toLowerCase()) > -1 : false) ) ) : data as row}
          <tr
            class="hover:bg-secondary even:bg-surface odd:bg-secondary odd:bg-opacity-80"
          >
            {#each explainColumns as column}
              <td>
                <Text text={row[column.key]} />
              </td>
            {/each}
            {#each displayRowButtons as button}
              <td>
                <Button
                  size="small"
                  on:click={() => button.onClick(row)}
                  text={button.text}
                />
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </Card>
{/if}
