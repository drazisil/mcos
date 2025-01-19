import { BytableMessage } from "./BytableMessage";
import { GamePacket } from "rusty-motors-shared-packets";

export function binary(): string {
    return "";
}

export function fromGamePacket(gamePacket: GamePacket): BytableMessage {
    const bytable = new BytableMessage();
    bytable.deserialize(gamePacket.serialize());
    return bytable;
}

export function toGamePacket(bytable: BytableMessage): GamePacket {
    const gamePacket = new GamePacket();
    gamePacket.deserialize(bytable.serialize());
    return gamePacket;
}
