import { DeviceModel } from "./DeviceModel";


/**
 * Represents the requested amount of specific devices 
 */
export interface SubRequest {
    count: number, // This is the amount of devices requested
    deviceModelIdentifier: number, // This is the device model which references the DeviceModel
    deviceModel?: DeviceModel, // This is a property used within components to minimize server communication
}