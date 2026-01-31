import { Component, inject, OnInit, signal } from "@angular/core";
import { TaskService } from "../../../core/services/task.service";
import { ActivatedRoute } from "@angular/router";
import { createTask } from "../../../utils/model.utils";

@Component({
    selector: 'edit-task-page',
    styleUrl: 'edit-task-page.scss',
    templateUrl: 'edit-task-page.html',
    imports: [],
    standalone: true
})

export class EditTaskPage implements OnInit{
    taskService = inject(TaskService)

    route = inject(ActivatedRoute)

    taskSlug = signal('')
    successMessage = signal('')
    errMessage = signal('')
    ngOnInit(): void {
         this.taskSlug.set(this.route.snapshot.paramMap.get('slug')!)

    }
    // delete(id: string) {
    //     const task = createTask({id: id})
    //     this.taskService.deleteTask(task).subscribe({
    //         next: data => {
    //             this.successMessage.set("Task deleted")
    //         },
    //         error: err => {
    //             this.errMessage.set(err.error?.message)
    //         }
    //     })
    // }
}