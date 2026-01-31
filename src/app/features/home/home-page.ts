import { Component, inject } from "@angular/core";
import { RouterLinkWithHref } from "@angular/router";
import { AuthService } from "../../core/services/auth.service";


@Component({
  selector: 'home-page',
  imports: [RouterLinkWithHref],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
    standalone: true,
})
export class HomePage {
    auth = inject(AuthService);
}