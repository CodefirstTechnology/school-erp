import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-brand-logo',
  templateUrl: './brand-logo.component.html',
  styleUrls: ['./brand-logo.component.css']
})
export class BrandLogoComponent {
  @Input() variant: 'sidebar' | 'auth' = 'sidebar';
  @Input() tag = '';
  @Input() iconOnly = false;
  @Input() iconSize = 36;

  get iconSrc(): string {
    return this.variant === 'sidebar' || this.variant === 'auth'
      ? 'assets/brand/schoolmate/schoolmate-icon-mark.svg'
      : 'assets/brand/schoolmate/schoolmate-icon.svg';
  }
}
