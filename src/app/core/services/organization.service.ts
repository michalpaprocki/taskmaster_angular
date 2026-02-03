import { Injectable, signal } from "@angular/core";
import { environment } from "../../../../envs/environment";
import { HttpClient } from "@angular/common/http";

import { Organization } from "../../models/organization.model";
import { Observable, switchMap, tap } from "rxjs";



@Injectable({
  providedIn: 'root',
})
export class OrganizationService {
    BE_URL = environment.BE_URL
    organizations = signal<Organization[]>([])
    loaded = signal(false)
    loading = signal(false)

    constructor(private http:HttpClient){}

    loadOrgs() {
        if(this.loaded() || this.loading()) return

        this.loading.set(true)
        this.fetchOrganizations().subscribe({
            next: orgs => {
                this.organizations.set(orgs),
                this.loaded.set(false)
            },
            error: () => {
                this.loading.set(false)
            },
            complete: () => [
                this.loading.set(true)
            ]
        })
    }
    fetchOrganizations() {
        return this.http.get<Organization[]>(this.BE_URL+"/organizations", { withCredentials: true })
    }
    createOrganization(organization: Organization) {
        return this.http.post(this.BE_URL+"/organization", organization, { withCredentials: true })
    
    }
    getOrganizations() {
    if (!this.loaded() && !this.loading()) {
        this.loadOrgs();
    }

    return this.organizations();
    }
    saveOrganizations(organizations: Organization[]) {
        this.organizations.set(organizations)
    }
    findOrganization(id: string) {
        const org = this.organizations().find(org => org.id == id);
        if (!org) {
            return null
        } else {
            return org

        }
    }
    findUserOrganizations(name:string) {
        return this.organizations().filter(org => org.memberships.some(member=> member.name == name && member.role == "MEMBER"))
    }
    findOwnerOrganizations(name:string) {
        return this.organizations().filter(org => org.memberships.some(member=> member.name == name && member.role == "OWNER"))
    }
    findOrganizationByName(name: string) {
        return this.organizations().find(org => org.name == name)
    }
    getOwner(id: string) {
        
        const org:Organization|null = this.findOrganization(id)
       
        if(org != null) {
            const owner = org.memberships!.find(member => member.role === "OWNER")
    
            if(owner != undefined){
                return owner
            }
            return null
        } else {
            return null
        }
    }
    joinOrganization(organization: Organization):Observable<Organization>{
        return this.http.post<Organization>(this.BE_URL+"/organization/"+organization.id+"/members", {}, {withCredentials: true})
        
    }
    leaveOrganization(organization: Organization):Observable<Organization> {
        return this.http.delete<Organization>(this.BE_URL+"/organization/"+organization.id+"/members", {withCredentials: true})
    }
    refreshOrganization(organization: Organization) {
        return this.http.get<Organization>(this.BE_URL+"/organization/"+organization.id, { withCredentials: true })
    }

    getOrganizationBySlug(organization:Organization):Observable<Organization> {
        return this.http.get<Organization>(this.BE_URL+"/organization/"+organization.id, {withCredentials:true})
    }

}