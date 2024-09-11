import { addItem } from '$lib/server/mock-data/store';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({request}) => {
    const text = await request.json().then(x => x.text as string);
    if(typeof text === "string"){
        const result = await addItem(text);
        return json(result, { status: 201 });
    }
    return json({ error: "Expected text to be a string"}, { status: 400 });
};