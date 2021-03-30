import { SubRequest } from "./SubRequest";
import { User } from "./User";

/**
 * Represents a registration request
 */
export interface Request {
    requestId?: Number, // Unique
    startDate: number, // start date of the reservation reqeust
    plannedEndDate: number // end date of the reservation request
    note?: string, // notes provided by the user making the request
    subRequest?: SubRequest[], // Submitted subrequests - can be undefined
    deviceCount?: number, // Device count if request is simple request
    created?: number,
    requestingUser?: number, // the user requesting the reservation. only available under certain circumstances
    modified?: number,
    userCreated?: number,
    priority?: number,
    requestingUserFull?: User,
}
