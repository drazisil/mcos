import ShortUniqueId from "short-unique-id";

const uid = new ShortUniqueId.default();

export type TokenRecord = {
	customerId: number;
	token: string;
};

export const activeTokens = new Map<string, TokenRecord>([]);

export function generateTokenRecord(customerId: number): TokenRecord {
	const token = uid.stamp(34);

	return {
		customerId,
		token,
	};
}

export function generateToken(customerId: number): string {
	if (typeof customerId !== "number") {
		throw new Error("Invalid customer ID");
	}
	const tokenRecord = generateTokenRecord(customerId);
	activeTokens.set(tokenRecord.token, tokenRecord);
	return tokenRecord.token;
}

export function isTokenExpired(token: string): boolean {
	const issuedAt = uid.parseStamp(token).getTime();

	// 30 minutes
	const expirationTime = Date.now() - 1800000;

	if (issuedAt < expirationTime) {
		return true;
	}

	return false;
}

export function getToken(token: string): TokenRecord | undefined {
	if (activeTokens.has(token)) {
		return activeTokens.get(token);
	}
	return undefined;
}

export function deleteToken(token: string): void {
	activeTokens.delete(token);
}

export function deleteExpiredTokens(): void {
	for (const token of activeTokens.keys()) {
		if (isTokenExpired(token)) {
			deleteToken(token);
		}
	}
}

export function getCustomerId(token: string): number | undefined {
	const tokenRecord = getToken(token);
	if (typeof tokenRecord !== "undefined" && !isTokenExpired(token)) {
		return tokenRecord.customerId;
	}
	return undefined;
}
