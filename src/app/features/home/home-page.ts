import { Component, effect, OnInit, PLATFORM_ID, signal, inject } from "@angular/core";
import { RouterLinkWithHref } from "@angular/router";
import { AuthService } from "../../core/services/auth.service";

import { isPlatformBrowser, NgIf } from "@angular/common";

@Component({
  selector: 'home-page',
  imports: [RouterLinkWithHref, NgIf],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
    standalone: true,
})
export class HomePage {
    auth = inject(AuthService);
}