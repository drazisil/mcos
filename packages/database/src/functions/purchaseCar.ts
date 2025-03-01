import { getServerLogger } from 'rusty-motors-shared';
import { buildVehiclePartTree } from '../models/VehiclePartTree.js';
import { createNewCar } from './createNewCar.js';

export async function purchaseCar(
    playerId: number,
    dealerId: number,
    brandedPardId: number,
    skinId: number,
    tradeInCarId: number,
): Promise<number> {
try {
    getServerLogger('purchaseCar').debug(
        `Player ${playerId} is purchasing car from dealer ${dealerId} with branded part ${brandedPardId} and skin ${skinId} and trading in car ${tradeInCarId}`,
    );

    if (dealerId === 6) {
        // This is a new stock car and likeley does not exist in the server yet
        // We need to create the car and add it to the player's lot

        // Create the new car
        const newCarId = await createNewCar(
            brandedPardId,
            skinId,
            playerId,
        );

        getServerLogger('purchaseCar').debug(
            `Player ${playerId} purchased car with ID ${newCarId}`,
        );

        return newCarId;
    }
    
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
} catch (error) {
    getServerLogger('purchaseCar').error(
        { error },
        `Error purchasing car for player ${playerId}`,
    );
    throw error;
}
}
