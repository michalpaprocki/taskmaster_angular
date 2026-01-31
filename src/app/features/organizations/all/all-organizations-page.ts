import { Component, inject, signal } from "@angular/core";
import { OrganizationService } from "../../../core/services/organization.service";

import { toSignal } from "@angular/core/rxjs-interop";
import { catchError, of, tap } from "rxjs";
import { RouterLinkWithHref } from "@angular/router";



@Component({
    selector: 'all-organizations-page',
    styleUrl: 'all-organizations-page.scss',
    templateUrl: 'all-organizations-page.html',
    imports: [RouterLinkWithHref],
    standalone: true
})

export class AllOrganizationsPage {
    constructor() {}

    errMessage = signal('')
    orgService = inject(OrganizationService)

    organizations = toSignal(
             this.orgService.fetchOrganizations().pipe(
                tap(orgs => this.orgService.saveOrganizations(orgs)),
                catchError(err => {
                    this.errMessage.set(err.error?.message ?? "Could not fetch Organizations")
                    return of([])
                })
             ), { initialValue: []}
    )

}

