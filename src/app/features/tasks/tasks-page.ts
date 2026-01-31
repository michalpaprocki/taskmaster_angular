import { NgIf } from "@angular/common";
import { Component, inject, signal } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterLinkWithHref } from "@angular/router";
import { AuthService } from "../../core/services/auth.service";



@Component({
    selector: 'tasks-page',
    styleUrl: './tasks-page.scss',
    imports: [ReactiveFormsModule, RouterLinkWithHref, NgIf],
    templateUrl: './tasks-page.html',
    standalone: true
})

export class TasksPage {
constructor(){}
    errMessage = signal('');
    defaultDeadline = this.getTomorow()

    private auth = inject(AuthService);
  

    onSubmit() {
    this.errMessage.set('');
    }


    getTomorow(){
    const date = new Date()
    date.setDate(date.getDate()+1)
    return date.toISOString().slice(0,10)
    }
}
