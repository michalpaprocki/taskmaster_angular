import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';



import { AuthService } from '../../services/auth.service';
import { FooterComponent } from '../footer/footer-component';


@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, RouterLinkWithHref, FooterComponent],
  templateUrl: 'main-layout.html',
  styleUrl: 'main-layout.scss',
})
export class MainLayout {

  @ViewChild('menu') menu!: ElementRef<HTMLDivElement>;
  isOpen = signal(false)
  height = signal(0)

  constructor(public auth: AuthService) {}

  toggleMenu() {

    this.isOpen.update(v => {
      const next = !v
      
     queueMicrotask(() => {
      this.height.set(
        next ? this.menu.nativeElement.scrollHeight : 0
      )
        next ? this.menu.nativeElement.classList.remove("non-interactive") : this.menu.nativeElement.classList.add("non-interactive")
     })
     return next;}
    )
  }
  
}