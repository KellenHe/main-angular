import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'header-theme',
  template: `
    <div nz-dropdown [nzDropdownMenu]="langMenu" nzPlacement="bottomRight">
      <i nz-icon nzType="svg:magic"></i>
      {{ 'menu.theme' | translate }}
      <i nz-icon nzType="down"></i>
    </div>
    <nz-dropdown-menu #langMenu="nzDropdownMenu">
      <ul nz-menu>
        <li
          nz-menu-item
          (click)="change('dark')"
        >
          {{ 'menu.dark' | translate }}
        </li>
        <li
          nz-menu-item
          (click)="change('default')"
        >
          {{ 'menu.default' | translate }}
        </li>
      </ul>
    </nz-dropdown-menu>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderThemeComponent {
  constructor() { }

  change(theme: string) {
    if (theme === 'dark') {
      const style = document.createElement('link');
      style.type = 'text/css';
      style.rel = 'stylesheet';
      style.id = 'dark-theme';
      style.href = 'assets/style.dark.css';
      document.body.append(style);
    } else {
      const dom = document.getElementById('dark-theme');
      if (dom) {
        dom.remove();
      }
    }
  }
}
