import { UserRoles } from './UserRoles';


/**
 * Represents user
 */
export interface User {
    userId?: string,
    username: string,
    firstname: string,
    surname: string,
    phone?: string,
    matrikelnumber?: string,
    email?: string,
    password?: string,
    lastLogin?: number,
    session?: string,
    isLDAP?: boolean
}
