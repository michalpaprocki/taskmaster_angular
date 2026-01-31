import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `<router-outlet/>`
})
export class App implements OnInit {
  protected readonly title = signal('taskmaster_fe');
  private auth = inject(AuthService);
  private platformId = inject(PLATFORM_ID);
  private route = inject(ActivatedRoute)

  ngOnInit(): void {
    this.route.data.subscribe()
  }
}
