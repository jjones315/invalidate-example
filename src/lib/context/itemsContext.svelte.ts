
import type { Item } from "$lib/server/mock-data/store";
import { getContext, setContext } from "svelte";

interface ItemsContextSource {
    items: Item[];
}

export class ItemsContext {
    #src: ItemsContextSource = {} as ItemsContextSource;

    readonly items = $derived(this.#src.items);
    constructor(source: ItemsContextSource) {
        this.#src = source;
    }

    findItem(itemId: number) {
        return this.items.find(x => x.id === itemId);
    }
}

const ITEMS_CONTEXT_KEY = Symbol("$site/items");

export function useItemsContext() {
    return getContext<ItemsContext>(ITEMS_CONTEXT_KEY);
}

export function createItemsContext(init: ItemsContextSource) {
    return setContext(ITEMS_CONTEXT_KEY, new ItemsContext(init));
}

export function stateFrom<T>(source: () => T) {
    let data = $state(source());

    $effect(() => {
        data = source();
    });

    return {
        get data() {
            return data;
        },
    };
}