
import { ItemOwnership } from './ItemOwnership';
import { Reservation } from './Reservation';

/**
 * Describes Item used in inventory
 * - also describes the ownership and the availability
 * - an item holds all the reservations ids which were applied before
 */
export interface Item {
    name: string, // Device name
    internalName?: string,
    serialNumber?: string,
    ownership: ItemOwnership,
    ownershipIdentifier: string,
    creationDate: number,
    modificationDate?: number,
    description?: string,
    caIdentifier?: string, // ZfM asset tag
    model?: string,
    notes?: string,
    managed: boolean, // MDM
    available: boolean,
    plannedReservationsIds?: number[],
    itemId: number,
    requiredRolesToReserve: string[],
    currentReservationId?: string,
    rowPosition?: number,
    generatedUniqueIdentifier?: string,
    modelIdentifier?: number, // the associated device model id
}
