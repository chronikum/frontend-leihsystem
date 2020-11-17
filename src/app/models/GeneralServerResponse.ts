/**
 * General server response
 * - indicates if response was successful
 */
export interface GeneralServerResponse {
    success: boolean,
    message?: string,
}