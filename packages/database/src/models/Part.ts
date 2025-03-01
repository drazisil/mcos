export type TPart = {
    partId: number;
    parentPartId: number | null;
    brandedPartId: number;
    percentDamage: number;
    itemWear: number;
    attachmentPointId: number | null;
    ownerID: number | null;
    partName: string | null;
    repairCost: number;
    scrapValue: number;
};