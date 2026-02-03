export const prerender = false;
export const renderMode = 'client'

import { Component, inject, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Organization } from "../../../models/organization.model";



@Component({
    selector: 'edit-organization-page',
    templateUrl: 'edit-organization-page.html',
    styleUrl: 'edit-organization-page.scss',
    standalone: true
})

export class EditOrganizationPage implements OnInit {
    private route = inject(ActivatedRoute)
    organization!: Organization;
    ngOnInit(): void {
        this.route.data.subscribe(data => {
            this.organization = data['org']
        })
    }
}