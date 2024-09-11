<script lang="ts">
	import { createItemsContext, stateFrom } from '$lib/context/itemsContext.svelte.js';

	const { data, children } = $props();
	const items = stateFrom(() => data.items);
	createItemsContext({
		get items() {
			return items.data;
		}
	});

    $inspect({layoutItems: items.data})
</script>


{@render children()}