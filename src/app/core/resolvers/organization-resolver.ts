import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Organization } from "../../models/organization.model";

import { createOrganization } from "../../utils/model.utils";
import { OrganizationService } from "../services/organization.service";


@Injectable({providedIn: 'root'})
export class OrganizationResolver implements Resolve<Organization | null> {
    orgService = inject(OrganizationService)

    resolve(route: ActivatedRouteSnapshot) {
        const slug = route.paramMap.get('slug')
        const org = createOrganization({id: slug!})

        return this.orgService.getOrganizationBySlug(org)
    }
}