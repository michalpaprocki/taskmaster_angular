import { User } from "./user.model";


export interface Task {
    id: string
    title: string;
    description:string
    creator: {name: string}|undefined
    deadline: Date
    status: string
    assignedOrgs?: string[]|unknown[]
    createdAt?: Date
    updatedAt?: Date

}
