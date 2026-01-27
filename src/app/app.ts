import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `<router-outlet/>`
})
export class App {
  protected readonly title = signal('taskmaster_fe');
 private auth = inject(AuthService);
  private platformId = inject(PLATFORM_ID);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.auth.hasValidSession().subscribe({
        next: valid => {
          if (valid) {
            this.auth.fetchUser().subscribe();
          }
        },
        error: () => {
          this.auth.clearUser();
        }
      });
    }
  }
}
