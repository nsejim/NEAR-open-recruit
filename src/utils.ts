import { RNG } from "near-sdk-as";

export function generateUniqueId(prefix: string, ids: string[]): string {
    const roll = new RNG<u32>(1, u32.MAX_VALUE);
    const id =  `${prefix}-${roll.next().toString()}`;
    if (ids.includes(id)) {
        return generateUniqueId(prefix, ids);
    }
    return id;
}