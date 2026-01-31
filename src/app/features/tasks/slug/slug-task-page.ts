import { Component, inject, OnInit, signal } from "@angular/core";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { Task } from "../../../models/task.model";
import { TaskService } from "../../../core/services/task.service";
import { createTask } from "../../../utils/model.utils";

@Component({
    selector: 'slug-task-page',
    styleUrl: 'slug-task-page.scss',
    templateUrl: 'slug-task-page.html',
    imports: [],
    standalone: true
})

export class SlugTaskPage implements OnInit{
    router = inject(Router)
    route = inject(ActivatedRoute)
    taskService = inject(TaskService)

    errMessage = signal('')
    task = signal<Task|null>(null)
    taskSlug = signal<string|null>(null)

    ngOnInit(): void {
        this.taskSlug.set(this.route.snapshot.paramMap.get('slug'))
        const task = createTask({id: this.route.snapshot.paramMap.get('slug')!})
        this.taskService.fetchTask(task).subscribe({
            next: task => {this.task.set(task)},
            error: err => this.errMessage.set(err.error?.message)
            })
    }
}