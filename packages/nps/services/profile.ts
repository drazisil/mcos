import { ProfileSchema } from "rusty-motors-database";
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

export async function addGameProfile(profile: GameProfile): Promise<void> {
	await ProfileSchema.create({
		customer_id: profile.customerId,
		profile_name: profile.profileName,
		server_id: profile.serverId,
		create_stamp: profile.createStamp,
		last_login_stamp: profile.lastLoginStamp,
		number_games: profile.numberGames,
		profile_id: profile.profileId,
		is_online: profile.isOnline,
		game_purchase_stamp: profile.gamePurchaseStamp,
		game_serial_number: profile.gameSerialNumber,
		time_online: profile.timeOnline,
		time_in_game: profile.timeInGame,
		game_blob: profile.gameBlob.toString(),
		personal_blob: profile.personalBlob.toString(),
		picture_blob: profile.pictureBlob.toString(),
		dnd: profile.dnd,
		game_start_stamp: profile.gameStartStamp,
		current_key: profile.currentKey,
		profile_level: profile.profileLevel,
		shard_id: profile.shardId,
	});
	
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
