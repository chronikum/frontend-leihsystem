import { Group } from './Group';
import { Item } from './Item';
import { Request } from './Request';
import { User } from './User';
import { UserRoles } from './UserRoles';

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
    request?: Request,
    groups?: Group[],
    roles: UserRoles[],
    users: User[],
    errorCode: number, // If -1 error connection error to database
}