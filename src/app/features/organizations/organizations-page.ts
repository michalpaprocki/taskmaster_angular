import { Component } from "@angular/core";
import { RouterLinkWithHref } from "@angular/router";


@Component({
    selector: 'organizations-page',
    templateUrl: 'organizations-page.html',
    styleUrl: 'organizations-page.scss',
    imports:[RouterLinkWithHref],
    standalone: true
})

export class OrganizationsPage {
    constructor() {}


}