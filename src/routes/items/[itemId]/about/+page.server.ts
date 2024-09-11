import { getItem } from '$lib/server/mock-data/store';

export async function load({ params, parent }) {
    
    // awaiting parent has no effect.
    //const {items} = await parent();

    
    const itemId = Number(params.itemId);
    return {
        itemId,
    };
}