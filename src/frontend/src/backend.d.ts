import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Greeting {
    message: string;
    recipientName: string;
}
export interface backendInterface {
    createGreeting(linkId: string, recipientName: string, message: string): Promise<void>;
    getGreeting(linkId: string): Promise<Greeting>;
    listAllGreetings(): Promise<Array<[string, Greeting]>>;
}
