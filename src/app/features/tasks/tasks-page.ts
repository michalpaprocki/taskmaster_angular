import { NgIf } from "@angular/common";
import { Component, inject, signal } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLinkWithHref } from "@angular/router";
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
    // user = signal<any | null>(null);
    defaultDeadline = this.getTomorow()
    private formBuilder = inject(FormBuilder);
    private router = inject(Router);
    private auth = inject(AuthService);


    createTaskForm = this.formBuilder.group({
        title: ['', [Validators.required, Validators.minLength(5)]],
        description: ['', [Validators.required, Validators.minLength(10)]],
        deadline: [this.getTomorow(), Validators.required]
    })

    onSubmit() {
    this.errMessage.set('');
    }


    getTomorow(){
    const date = new Date()
    date.setDate(date.getDate()+1)
    return date.toISOString().slice(0,10)
    }
}
