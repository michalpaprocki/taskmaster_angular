

export interface Task {
    id: string
    title: string;
    description:string
    deadline: Date
    assignedOrgs?: string[]|unknown[]
    createdAt?: Date
    updatedAt?: Date

}
