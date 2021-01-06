import { UserRoles } from "./UserRoles";

/**
 * User Group
 */
export interface Group {
    groupId?: number;
    displayName: string;
    description: string;
    role: UserRoles[];
}
