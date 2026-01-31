import { Component, inject, OnInit, signal } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterLinkWithHref } from "@angular/router";
import { TaskService } from "../../../core/services/task.service";




@Component({
    selector: 'all-tasks-page',
    styleUrl: 'all-tasks-page.scss',
    imports: [ReactiveFormsModule, RouterLinkWithHref],
    templateUrl: './all-tasks-page.html',
    standalone: true
})

export class AllTasksPage implements OnInit{
    taskService = inject(TaskService)

    ngOnInit(): void {
        this.taskService.loadTasks()
    }

    errMessage = signal('')
}