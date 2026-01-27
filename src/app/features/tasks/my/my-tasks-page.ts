import { NgIf } from "@angular/common";
import { Component } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterLinkWithHref } from "@angular/router";




@Component({
    selector: 'my-tasks-page',
    styleUrl: './my-tasks-page.scss',
    imports: [ReactiveFormsModule, RouterLinkWithHref, NgIf],
    templateUrl: './my-tasks-page.html',
    standalone: true
})

export class MyTasksPage {

}