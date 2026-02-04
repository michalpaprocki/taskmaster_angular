import { Organization } from "./organization.model";
import { User } from "./user.model";


export interface Task {
    id: string
    title: string;
    description:string
    creator: {name: string}|undefined
    deadline: Date
    status: string
    assignedOrganizations?: string[]|Organization[]
    createdAt?: Date
    updatedAt?: Date

}
