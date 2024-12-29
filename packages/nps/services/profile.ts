import { GameProfile } from "../messageStructs/GameProfile.js";

export const gameProfiles: GameProfile[] = [];

export function getGameProfilesForCustomerId(
	customerId: number,
): GameProfile[] {
	const profiles: GameProfile[] = [];
	for (const profile of gameProfiles.values()) {
		if (profile.customerId === customerId) {
			profiles.push(profile);
		}
	}
	return profiles;
}

export function getCustomerId(profileId: number): number {
	for (const profile of gameProfiles.values()) {
		if (profile.profileId === profileId) {
			return profile.customerId;
		}
	}
	return -1;
}

export function gameProfileExists(profileName: string): boolean {
	for (const profile of gameProfiles.values()) {
		if (profile.profileName === profileName) {
			return true;
		}
	}
	return false;
}



export function deleteGameProfile(profileId: number): void {
	for (const [index, profile] of gameProfiles.entries()) {
		if (profile.profileId === profileId) {
			gameProfiles.splice(index, 1);
			return;
		}
	}
}

export function createGameProfile(): GameProfile {
	const profile = GameProfile.new();

	return profile;
}
