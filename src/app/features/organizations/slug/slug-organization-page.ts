import { Component, computed, effect, inject, OnInit, signal } from "@angular/core";
import { ActivatedRoute, RouterLinkWithHref } from "@angular/router";
import { AuthService } from "../../../core/services/auth.service";
import { User } from "../../../models/user.model";
import { OrganizationService } from "../../../core/services/organization.service";
import { Organization } from "../../../models/organization.model";
import { Memberships } from "../../../models/memberships.model";

import { createOrganization } from "../../../utils/model.utils";
import { tap } from "rxjs";


@Component({
    selector: 'slug-organization-page',
    styleUrl: 'slug-organization-page.scss',
    templateUrl: 'slug-organization-page.html',
    standalone: true,
    imports: [RouterLinkWithHref]
})

export class SlugOrganizationPage implements OnInit{
    constructor(public route: ActivatedRoute) {
        effect(() => {

            if(this.user()!=null && this.organization()!= null){

                this.owner.set(this.orgService.getOwner(this.organization()?.id!))
                this.canJoinOrg.set(this.checkIfCanJoinOrg())

            }
  
        })

    }
    auth = inject(AuthService)
    orgService = inject(OrganizationService)
    
    owner = signal<Memberships|null>(null)
    orgSlug = signal<string|null>(null)
    organization = computed<Organization|null>(() => this.orgService.findOrganization(this.route.snapshot.paramMap.get('slug')!))
    user = signal<User|null>(this.auth.user())
    errMessage = signal('')
    successMessage = signal('')
    canJoinOrg = signal(false)
    
    ngOnInit(): void {
        this.orgService.loadOrgs()
        this.orgSlug.set(this.route.snapshot.paramMap.get('slug'))
    }
    join() {
        this.errMessage.set('')
        this.successMessage.set('')
        const org = createOrganization({id: this.organization()?.id, members: [this.user()?.id]})
        this.orgService.joinOrganization(org).pipe(
            tap((updatedOrg) => 
            this.orgService.organizations.update((prev) => prev.map(o => o.id === updatedOrg.id ? updatedOrg : o)))
        )
        .subscribe({
            next: () => {
                this.successMessage.set("Joined successfully")
                
            },
            error: (err) => {
               this.errMessage.set(err.error?.message)
            }
        })
    }
    leave() {
        this.errMessage.set('')
        this.successMessage.set('')
        const org = createOrganization({id: this.organization()?.id})
        this.orgService.leaveOrganization(org).pipe(
            tap((updatedOrg) => 
                this.orgService.organizations.update((prev) => prev.map(o => o.id === updatedOrg.id ? updatedOrg : o))
            )
        )
        .subscribe({
            next: ()=> {
                this.successMessage.set("Left successfully")
            },
            error: (err) => {
                this.errMessage.set(err.error?.message)
            }
        })
    }
    private checkIfCanJoinOrg() {

        const u = this.user()
        const o = this.owner()
        const org = this.organization()
        if(!o || !u || !org) return false

        const isNotOwner = u.id !== o.id
        const notInMembers = !org.memberships.some(m => m.name === u.name)
        return isNotOwner && notInMembers 
           
    }
}