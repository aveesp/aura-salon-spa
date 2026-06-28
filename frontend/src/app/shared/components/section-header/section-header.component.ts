import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section-header',
  standalone: true,
  template: `
<div class="flex flex-col items-center text-center gap-3 mb-12">
  @if (tag) {
    <p class="section-tag">{{ tag }}</p>
  }
  <h2 class="section-title">{{ title }}</h2>
  <div class="divider-gold mx-auto"></div>
  @if (subtitle) {
    <p class="section-subtitle mt-2">{{ subtitle }}</p>
  }
</div>
  `,
})
export class SectionHeaderComponent {
  @Input() tag = '';
  @Input() title = '';
  @Input() subtitle = '';
}
