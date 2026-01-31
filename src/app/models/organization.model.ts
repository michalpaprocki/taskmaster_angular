import { Memberships } from "./memberships.model";

export interface Organization {
    id: string
    name: string;
    description?:string
    memberships: Memberships[]
    createdAt?: Date
    updatedAt?: Date
    members?: string[]|unknown[]
}
