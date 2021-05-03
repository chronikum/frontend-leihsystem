
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
    creationDate: number,
    modificationDate?: number,
    description?: string,
    caIdentifier?: string, // ZfM asset tag
    model?: string,
    notes?: string,
    managed: boolean, // MDM
    available?: boolean,
    plannedReservationsIds?: number[],
    itemId: number,
    currentReservationId?: string,
    rowPosition?: number,
    generatedUniqueIdentifier?: string,
    modelIdentifier?: number, // the associated device model id
    deviceModelName?: string, // only used in tables to enable the filter functionalty
}
