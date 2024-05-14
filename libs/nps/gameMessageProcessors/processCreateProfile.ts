import { GameMessage } from "../messageStructs/GameMessage.js";
import type { GameSocketCallback } from "./index.js";
import { GameProfile } from "nps";
import { getServerLogger } from "shared";
import type { UserStatus } from "nps";
import { addGameProfile } from "nps";

const log = getServerLogger();

export async function processCreateProfile(
    connectionId: string,
    userStatus: UserStatus,
    message: GameMessage,
    socketCallback: GameSocketCallback,
): Promise<void> {
    log.setName("nps:processCreateProfile");
    // Log the request
    log.info(`ProcessCreateProfile request: ${message.toString()}`);

    const createProfileMessage = GameProfile.fromBytes(
        message.getDataAsBuffer(),
    );

    // Log the request
    log.info(
        `ProcessCreateProfile request: ${createProfileMessage.toString()}`,
    );

    // Add the profile
    addGameProfile(createProfileMessage);


    // TODO: Send the response
    const response = new GameMessage(257);
    response.header.setId(0x601);

    response.setData(message.getData());

    // Log the response
    log.info(`ProcessCreateProfile response: ${response.toString()}`);

    socketCallback([response.serialize()]);
    log.resetName();
    return Promise.resolve();
}
