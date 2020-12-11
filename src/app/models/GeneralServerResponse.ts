import { Item } from './Item';
import { User } from './User';

/**
 * General server response
 * - indicates if response was successful
 */
export interface GeneralServerResponse {
    success: boolean,
    message?: string,
    userCount?: number,
    items?: Item[],
    user?: User,
}