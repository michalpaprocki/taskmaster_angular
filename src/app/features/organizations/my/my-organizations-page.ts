import { Component, computed, effect, inject, OnInit, signal } from "@angular/core";
import { OrganizationService } from "../../../core/services/organization.service";


import { RouterLinkWithHref } from "@angular/router";
import { Organization } from "../../../models/organization.model";
import { AuthService } from "../../../core/services/auth.service";
import { User } from "../../../models/user.model";
import { Memberships } from "../../../models/memberships.model";


@Component({
    selector: 'my-organizations-page',
    styleUrl: 'my-organizations-page.scss',
    templateUrl: 'my-organizations-page.html',
    imports: [RouterLinkWithHref],
    standalone: true
})

export class MyOrganizationsPage implements OnInit{
    constructor() {
        effect(() => {
             if(this.user()!=null){
                console.log(this.orgService.getOrganizations())
                this.userOrganizations.set(this.orgService.findUserOrganizations(this.user()?.name!))
                this.ownerOrganizations.set(this.orgService.findOwnerOrganizations(this.user()?.name!))
                console.log(this.orgService.findUserOrganizations(this.user()?.name!))

             }
        })
    }

    errMessage = signal('')
    orgService = inject(OrganizationService)
    auth = inject(AuthService)
    user = signal<User|null>(null)
    userOrganizations = signal<Organization[]>([])
    ownerOrganizations = signal<Organization[]>([])

    owner = signal<Memberships|null>(null)
 
    ngOnInit(): void {
        
        this.orgService.loadOrgs()
        this.user.set(this.auth.user())

    }
}

