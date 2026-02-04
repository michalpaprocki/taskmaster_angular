import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { User } from "../../models/user.model";


@Injectable({
  providedIn: 'root',
})
export class UserService {
    BE_URL = environment.BE_URL

    constructor(private http:HttpClient){}

    getUsers(){
        return this.http.get<User[]>(this.BE_URL+"/users", { withCredentials: true })
    }
}