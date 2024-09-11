import { getAllItems } from "$lib/server/mock-data/store";

export async function load({  }) {
    return {
        items: await getAllItems()
    }
}   
