import { Injectable, signal } from "@angular/core"
import { environment } from "../../../environments/environment";
import { Task } from "../../models/task.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class TaskService {
    BE_URL = environment.BE_URL
    loaded = signal(false)
    loading = signal(false)
    tasks = signal<Task[]>([])
    constructor(private http:HttpClient){}

    loadTasks() {
    if(this.loaded() || this.loading()) return

    this.loading.set(true)
    this.fetchTasks().subscribe({
        next: tasks => {
            this.tasks.set(tasks),
            this.loaded.set(false)
        },
        error: () => {
            this.loading.set(false)
        },
        complete: () => [
            this.loading.set(true)
        ]
        })
    }
    createTask(task: Task) {
        return this.http.post<Task>(this.BE_URL+"/api/task", task, {withCredentials: true})

    }
    fetchTasks(){
        return this.http.get<Task[]>(this.BE_URL+"/api/tasks", {withCredentials: true})
    }
    fetchTask(task: Task) {
        return this.http.get<Task>(this.BE_URL+"/api/task/"+task.id, {withCredentials: true})
    }
    getAllTasks() {
        if (this.loaded() && !this.loading()){
            return this.tasks();
        }

        return this.tasks();
    }
    deleteTask(task: Task) {
        return this.http.delete<Task>(this.BE_URL+"/api/task/"+task.id, {withCredentials: true})
    }
}