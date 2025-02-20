/**
 * Aligns the given value to the nearest multiple of 8.
 *
 * @param value - The number to be aligned.
 * @returns The aligned value, which is the smallest multiple of 8 that is greater than or equal to the input value.
 */
export function align8(value: number) {
	return value + (8 - (value % 8));
}


export class MCOProtocol {
    
}
