import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isDarkMode = false;
  showAdminShell = true;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event) => {
      this.updateShell(event.urlAfterRedirects);
    });
  }

  ngOnInit(): void {
    const saved = localStorage.getItem('eduflow-theme');
    if (saved === 'dark') {
      this.isDarkMode = true;
      this.applyTheme();
    }
    this.updateShell(this.router.url);
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme();
    localStorage.setItem('eduflow-theme', this.isDarkMode ? 'dark' : 'light');
  }

  private updateShell(url: string): void {
    this.showAdminShell = !url.startsWith('/login')
      && !url.startsWith('/student')
      && !url.startsWith('/teacher')
      && !url.startsWith('/parent');
  }

  private applyTheme(): void {
    document.documentElement.setAttribute('data-theme', this.isDarkMode ? 'dark' : 'light');
  }
}
