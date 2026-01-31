
import { Component, inject, signal } from "@angular/core";
import { FormArray, FormBuilder, FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { OrganizationService } from "../../../core/services/organization.service";
import { Organization } from "../../../models/organization.model";
import { createOrganization } from "../../../utils/model.utils";
import { User } from "../../../models/user.model";
import { UserService } from "../../../core/services/user.service";




@Component({
    selector: 'create-organization-page',
    imports: [ReactiveFormsModule],
    styleUrl: 'create-organization-page.scss',
    templateUrl: 'create-organization-page.html'
})

export class CreateOrganizationPage {
    constructor() {}
    errMessage = signal('')
    successMessage = signal('')
    isOpen = false;
    orgsanizations = signal<Organization[]>([])
    users = signal<User[]>([])

    
    private formBuilder = inject(FormBuilder);
    private orgService = inject(OrganizationService)
    private userService = inject(UserService)
    createOrgForm = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        description: ['', [Validators.nullValidator]],
        members: this.formBuilder.array([])

    })
    
    onSubmit() {
        this.errMessage.set('')
        const {name , description, members} = this.createOrgForm.value;
        // @ts-ignore
        const organization = createOrganization({name: name!, description: description!, members: members?.length > 0 ? members!.map(a => a.id):[]})

        this.orgService.createOrganization(organization).subscribe({
            next: (org) => {

                // @ts-ignore
                this.successMessage.set(`Organization ${org.name} successfully created`)
            },
            error: err => this.errMessage.set(err.error?.message ?? 'Could not create organization')
        })
    }
    showUsers() {
        this.isOpen=!this.isOpen
        if(this.users().length == 0) {
            this.userService.getUsers().subscribe({
                next: users => {this.users.set(users)},
                error: err => {
                    this.errMessage.set(err.error?.message)
                }
            })
        }
    }
    // vvery nice pattern with signals
    addMember(user:User) {
        this.users.update(arr => arr.filter(u => u.id !== user.id))
        this.membersFormArray.push(new FormControl(user));
        
    }
    removeMember(user:User) {
        this.users.update(arr => [...arr, user])
        const index = this.membersFormArray.controls.findIndex(m => m.value.id === user.id);
        if (index > -1) this.membersFormArray.removeAt(index);
    }
    get membersFormArray() {
        return this.createOrgForm.get('members') as FormArray;
    }
    get getFormMembers() {
        return this.membersFormArray.value
    }

}