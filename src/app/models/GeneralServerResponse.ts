import { Item } from './Item';

/**
 * General server response
 * - indicates if response was successful
 */
export interface GeneralServerResponse {
    success: boolean,
    message?: string,
    userCount?: number,
    items?: Item[],
}