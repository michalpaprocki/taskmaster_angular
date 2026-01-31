import { inject } from "@angular/core";
import { CanMatchFn, Router } from "@angular/router";
import { map, of, switchMap } from "rxjs";
import { AuthService } from "../services/auth.service";
import { OrganizationService } from "../services/organization.service";
import { createOrganization } from "../../utils/model.utils";


// TODO fix 404 flash - move to resolver


export const orgGuard: CanMatchFn = (route, segments) => {
    const auth = inject(AuthService)
    const orgService = inject(OrganizationService)


    const orgId = segments[1]?.path
    const org = orgService.findOrganization(orgId)
    const user = auth.user()
    const isAuthorized = org?.memberships.some(m => m.role === "OWNER" && m.name === user?.name) ?? false
    if (!orgId) {
        return false
    }

    if (isAuthorized) {
        return true
    } else {
        const orgModel = createOrganization({id: orgId})
        return auth.loadUser().pipe(
          switchMap(user => {
            if(!user) return of(false)
                return orgService.getOrganizationBySlug(orgModel).pipe(
            map(org => org.memberships.some(m => m.role === "OWNER" && m.name === user?.name))
            ) ?? false //return false if nothing found in memberships
        })
        )
    }
}