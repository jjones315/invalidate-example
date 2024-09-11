export interface Item {
	id: number;
	text: string;
}

const items: Item[] = [];

export async function addItem(text: string) {
	await wait(500);
	items.push({
		id: items.length + 1,
		text
	});

	return items[items.length - 1];
}

export async function getAllItems() {
	await wait(1000);
	return items;
}

export async function getItem(id: number) {
	await wait(500);
	return items.find((x) => x.id === id);
}

// emulate networking
function wait(delay: number) {
	return new Promise<void>((resolve) => setTimeout(() => resolve(), delay));
}
