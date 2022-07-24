<!-- @component
  Displays the text preformatted

  **How to format**
  
  _You can use the following syntax:_
  
  * \*bold\*
  * \_underline\_
  * \#italic\#
  * \-strikeTrhough\-
  * ! ignore next char
  * eg.: '\*Hello \_World\_\* \#This \_is \#is an\_ \-example\-\#'
  
  **text**
  * string
  * default: Hello World
  * the text to display

  **size**
  * string: 'small' | 'medium' | 'large'
  * default: 'medium'
  * the size in wich the text should be displayed
  
  **textColor**
  * string: 'primary' | 'secondary' | 'accent' | 'success' | 'error' | 'warning' | 'info' | 'surface' | 'text' | 'black'
  * default 'text'
  * the color in wich the text should be displayed

  **typewriterSpeed**
  * number
  * default: 0
  * if greater than 0, the text will be displayed typewriter style
-->
<script lang="ts">
  import { onMount } from 'svelte';

  interface enrichedText {
    letter?: string;
    word?: string;
    bold: boolean;
    italic: boolean;
    strikeThrough: boolean;
    underline: boolean;
  }
  export let text = '-This- *is* _a_ #test#!!';
  export let size: 'small' | 'medium' | 'large' = 'medium';
  export let textColor:
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'success'
    | 'error'
    | 'warning'
    | 'info'
    | 'surface'
    | 'text'
    | 'black' = 'text';
  export let typewriterSpeed: number = 0;

  let tokenStack = [];
  let letters: Array<enrichedText> = [];
  let words: Array<enrichedText> = [];
  let displayWords: Array<enrichedText> = [];

  let animate = false;

  onMount(() => {
    animate = true;
  });

  //tokenize the text
  $: {
    console.log(text);
    if (text) {
      tokenStack = [];
      letters = [];
      words = [];
      let nextBold = false;
      let nextItalic = false;
      let nextStrikeThrough = false;
      let nextUnderline = false;
      let word: string = '';
      let ignore = false;

      tokenStack = text.split('');
      for (let i = 0; i < tokenStack.length; i++) {
        if (!ignore && tokenStack[i] === '!') {
          ignore = true;
        } else if (!ignore && tokenStack[i] === '*') {
          nextBold = !nextBold;
        } else if (!ignore && tokenStack[i] === '_') {
          nextUnderline = !nextUnderline;
        } else if (!ignore && tokenStack[i] === '-') {
          nextStrikeThrough = !nextStrikeThrough;
        } else if (!ignore && tokenStack[i] === '#') {
          nextItalic = !nextItalic;
        } else {
          letters.push({
            letter: tokenStack[i],
            bold: nextBold,
            italic: nextItalic,
            strikeThrough: nextStrikeThrough,
            underline: nextUnderline
          });
          ignore = false;
        }
      }
      letters = letters.map((letter) =>
        letter.letter === ' '
          ? {
              letter: '\xa0',
              bold: letter.bold,
              italic: letter.italic,
              strikeThrough: letter.strikeThrough,
              underline: letter.underline
            }
          : letter
      );
      letters = [
        ...letters,
        {
          letter: '\xa0',
          bold: false,
          italic: false,
          strikeThrough: false,
          underline: false
        }
      ];
      for (let i = 0; i < letters.length; i++) {
        if (letters[i].letter === '\xa0') {
          if (word.length > 0) {
            words.push({
              word: word + '\xa0',
              bold: letters[i - 1].bold,
              italic: letters[i - 1].italic,
              strikeThrough: letters[i - 1].strikeThrough,
              underline: letters[i - 1].underline
            });
            word = '';
          }
        } else {
          word += letters[i].letter;
        }
      }
      displayWords = words;
      words = words;
    }
  }

  function typewriterWords(node: any, {}) {
    if (typewriterSpeed > 0) {
      const children = Array.from(node.children[0].children);
      const duration = children.length / (typewriterSpeed * 0.01);
      return {
        duration,
        tick: (t) => {
          const howMuchWordsToDisplay = Math.floor(children.length * t);
          displayWords = words.slice(0, howMuchWordsToDisplay);
        }
      };
    }
  }

  function typewriterLetters(node: any, {}) {
    if (typewriterSpeed > 0) {
      const text = node.textContent;
      const duration = text.length / (typewriterSpeed * 0.1);
      return {
        duration,
        tick: (t) => {
          const i = text.length * t;
          node.textContent = text.slice(0, i);
        }
      };
    }
  }
</script>

{#if animate}
  {#key words}
    <div
      in:typewriterWords
      name={text
        .replaceAll('#', '')
        .replaceAll('*', '')
        .replaceAll('_', '')
        .replaceAll('-', '')
        .replaceAll(' ', '')}
      class="text-text"
      class:text-text={textColor === 'text'}
      class:text-error={textColor === 'error'}
      class:text-success={textColor === 'success'}
      class:text-warning={textColor === 'warning'}
      class:text-info={textColor === 'info'}
      class:text-primary={textColor === 'primary'}
      class:text-secondary={textColor === 'secondary'}
      class:text-accent={textColor === 'accent'}
      class:text-surface={textColor === 'surface'}
      class:text-black={textColor === 'black'}
    >
      <div class=" flex flex-row flex-wrap">
        {#each displayWords as word, i}
          <!-- TODO: the size propperty could also be given for each word -->
          <p
            in:typewriterLetters
            class:text-sm={size === 'small'}
            class:text-xl={size === 'medium'}
            class:text-4xl={size === 'large'}
            class:italic={word.italic}
            class:line-through={word.strikeThrough}
            class:font-bold={word.bold}
            class:underline={word.underline}
          >
            {word.word}
          </p>
        {/each}
      </div>
    </div>
  {/key}
{/if}
