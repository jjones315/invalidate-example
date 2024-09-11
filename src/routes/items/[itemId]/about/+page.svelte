<script lang="ts">
	import { useItemsContext } from '$lib/context/itemsContext.svelte.js';

    let {data} = $props();

    const itemsCtx = useItemsContext();
    const item = $derived(itemsCtx.findItem(data.itemId));
</script>

id: {item.id}
text: {item.text}