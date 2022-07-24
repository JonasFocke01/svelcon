import { writable } from 'svelte/store';

export const currentLanguage = writable<string>();

export const allLanguages = writable<Array<{ language: string }>>([]);
