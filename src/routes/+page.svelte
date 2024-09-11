<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import { useItemsContext } from '$lib/context/itemsContext.svelte.js';
	import type { Item } from '$lib/server/mock-data/store.js';

	let text = $state('');

	const itemsCtx = useItemsContext();

	async function handleNewItemInline() {
		const item = await createItem(text);
		text = '';
		if (item) {
			console.log(`goto: /items/${item.id}/about`, "{ invalidateAll: true }");
			goto(`/items/${item.id}/about`, { invalidateAll: true });
		}
	}

	async function handleNewItemThen() {
		const item = await createItem(text);
		text = '';
		if (item) {
			console.log(`invalidateAll`);
			invalidateAll().then(() => {
				console.log(`goto: /items/${item.id}/about`, "invalidateAll().then(...)");
				goto(`/items/${item.id}/about`);
			});
		}
	}

	async function createItem(text: string) {
		return await fetch('/items', {
			method: 'POST',
			body: JSON.stringify({ text }),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(async (x) => (x.ok ? ((await x.json()) as Item) : undefined));
	}
</script>

<div>
	<div style="flex:1; display:flex; flex-direction:column;">
		{#each itemsCtx.items as item (item.id)}
			<a href="/items/{item.id}/about">Go To Item {item.text}</a>
		{/each}
	</div>
	<div style="flex:1; width:400px; display:flex; flex-direction:column;">
		<input bind:value={text} />
		<div style="flex:1; display:flex; flex-direction:row;">
			<button type="button" onclick={handleNewItemInline}>
				Add Item ({'{ invalidateAll:true }'})
			</button>

			<button type="button" onclick={handleNewItemThen}>
				Add Item invalidateAll().then(...)
			</button>
		</div>
	</div>
</div>
