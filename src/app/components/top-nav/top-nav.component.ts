import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent {
  @Input() isDarkMode = false;
  @Output() darkModeToggle = new EventEmitter<void>();

  showProfileMenu = false;

  onDarkModeToggle(): void {
    this.darkModeToggle.emit();
  }

  toggleProfileMenu(): void {
    this.showProfileMenu = !this.showProfileMenu;
  }
}
