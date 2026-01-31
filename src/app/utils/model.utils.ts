import { Organization } from "../models/organization.model";
import { Task } from "../models/task.model";


export const createOrganization = (organization:Partial<Organization>):Organization => {
    return {
        id: organization.id ?? "",
        description: organization.description ?? '',
        name: organization.name ?? '',
        memberships: organization.memberships ?? [],
        createdAt: organization.createdAt ?? new Date(),
        updatedAt: organization.updatedAt ?? new Date(),
        members: organization.members ?? []
        }
    }
export const createTask = (task: Partial<Task>):Task => {
    return {
        creator: task.creator,
        status: task.status ?? "PENDING",
        id: task.id ?? "",
        assignedOrgs: task.assignedOrgs ?? [],
        title: task.title ?? "",
        deadline: task.deadline ?? new Date(),
        description: task.description ?? "",
        createdAt: task.createdAt ?? new Date(),
        updatedAt: task.updatedAt ?? new Date(),
    }
}