
import { Component, inject, signal } from "@angular/core";
import { Form, FormArray, FormBuilder, FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLinkWithHref } from "@angular/router";
import { AuthService } from "../../../core/services/auth.service";
import { User } from "../../../models/user.model";

import { OrganizationService } from "../../../core/services/organization.service";
import { Organization } from "../../../models/organization.model";
import { createTask } from "../../../utils/model.utils";
import { TaskService } from "../../../core/services/task.service";



@Component({
    selector: 'tasks-page',
    styleUrl: './create-task-page.scss',
    imports: [ReactiveFormsModule],
    templateUrl: './create-task-page.html',
    standalone: true
})

// in future, fetch only those orgs user owns or is some kind of director 

export class CreateTaskPage {
constructor(){}

    errMessage = signal('');
    successMessage = signal('');
    users= signal<User[]>([])
    defaultDeadline = this.getTomorow()

    private formBuilder = inject(FormBuilder);
    private router = inject(Router);
    private auth = inject(AuthService);
    private taskService = inject(TaskService)
    private orgService = inject(OrganizationService);

    isOpen =signal(false)
    organizations = signal<Organization[]>([])


    // todo better validation messages
    createTaskForm = this.formBuilder.group({
        title: ['', [Validators.required, Validators.minLength(5)]],
        description: ['', [Validators.required, Validators.minLength(10)]],
        deadline: [this.getTomorow(), Validators.required],
        assignedOrganizations: this.formBuilder.array([])
    })

    onSubmit() {
        this.errMessage.set('');
        this.successMessage.set('');

        const {title, description, deadline, assignedOrganizations} = this.createTaskForm.value
        // @ts-ignore
        const task = createTask({title: title!, description: description!, deadline: new Date(deadline!), assignedOrganizations: assignedOrganizations?.length > 0 ? assignedOrganizations!.map(a => a.id):[]})
       this.taskService.createTask(task).subscribe({
        next: (task) => {
            this.successMessage.set("Task "+task.title+" create successfully")
        },
        error: (err) => {
            this.errMessage.set(err.error?.message)
        }
       })
    }


    getTomorow(){
    const date = new Date()
    date.setDate(date.getDate()+1)
    return date.toISOString().slice(0,10)
    }

    showOrgs() {
        if(this.isOpen() == true){
            this.resetFormOrgs()
        }
        this.organizations.set(this.orgService.getOrganizations())
        this.isOpen.set(!this.isOpen())
        if(this.organizations().length == 0) {
            this.orgService.fetchOrganizations().subscribe({
                next: orgs => {this.organizations.set(orgs)},
                error: err => {this.errMessage.set(err.error?.message)}
            })
        }
    }

    addOrg(org:Organization) {

        this.organizations.update(arr => arr.filter(o => o.id !== org.id))
        this.orgsFormArray.push(new FormControl(org));
        }

    removeOrg(org:Organization) {

        this.organizations.update(arr => [...arr, org])
        const index = this.orgsFormArray.controls.findIndex(o => o.value.id === org.id);
        if (index > -1) this.orgsFormArray.removeAt(index);
    
    }
    get orgsFormArray() {
        return this.createTaskForm.get('assignedOrganizations') as FormArray;
    }
    get getFormOrgs() {
        return this.orgsFormArray.value
    }
    resetFormOrgs() {
        // maybe filter orgs by form array value
        this.orgsFormArray.clear()
    }
   
}
