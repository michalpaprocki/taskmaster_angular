import { NgIf } from "@angular/common";
import { Component } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterLinkWithHref } from "@angular/router";




@Component({
    selector: 'all-tasks-page',
    styleUrl: 'all-tasks-page.scss',
    imports: [ReactiveFormsModule, RouterLinkWithHref, NgIf],
    templateUrl: './all-tasks-page.html',
    standalone: true
})

export class AllTasksPage {

}