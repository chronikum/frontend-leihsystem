import { SubRequest } from "./SubRequest";

/**
 * Represents a registration request
 */
export interface Request {
    requestId: Number, // Unique
    itemIds?: number[], // items which were requested
    responsibleUserId: number, // the user responsible for the requested reservation
    assignedUserId?: number, // this user could be assigned to a request operation
    startDate: number, // start date of the reservation reqeust
    plannedEndDate: number // end date of the reservation request
    note?: string, // notes provided by the user making the request
    // Values above will be deprecated at a point of time. Request will have a collection of SubRequests, specifying
    // which device model was requested how many times
    subRequest?: SubRequest[],
    created: number,
    modified?: number,
    priority?: number,
}
