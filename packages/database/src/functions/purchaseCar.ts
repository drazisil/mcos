import { getServerLogger } from 'rusty-motors-shared';
import { buildVehiclePartTree } from '../models/VehiclePartTree.js';

export async function purchaseCar(
    playerId: number,
    dealerId: number,
    brandedPardId: number,
    skinId: number,
    tradeInCarId: number,
): Promise<number> {
    getServerLogger('purchaseCar').debug(
        `Player ${playerId} is purchasing car from dealer ${dealerId} with branded part ${brandedPardId} and skin ${skinId} and trading in car ${tradeInCarId}`,
    );


    const parts = await buildVehiclePartTree({
        brandedPartId: brandedPardId,
        skinId,
        isStock: true,
        ownedLotId: dealerId,
        ownerID: playerId,
    });

    getServerLogger('purchaseCar').debug(
        { parts },
        `Built vehicle part tree for player ${playerId}`,
    );

    return 1000;
}
