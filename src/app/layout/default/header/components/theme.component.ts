import { Component, ChangeDetectionStrategy, Renderer2, OnInit, OnDestroy } from '@angular/core';
import { ThemeEventService, THEME_EVENTS } from '@core';

type SiteTheme = 'default' | 'dark';

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
          (click)="onThemeChange('dark')"
        >
          {{ 'menu.dark' | translate }}
        </li>
        <li
          nz-menu-item
          (click)="onThemeChange('default')"
        >
          {{ 'menu.default' | translate }}
        </li>
      </ul>
    </nz-dropdown-menu>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderThemeComponent implements OnInit, OnDestroy {
  theme: SiteTheme = 'default';
  private el: HTMLLinkElement;

  constructor(private renderer: Renderer2, private themeService: ThemeEventService) { }

  ngOnInit() {
    this.initTheme();
  }

  private initTheme(): void {
    this.theme = (localStorage.getItem('site-theme') as SiteTheme) || 'default';
    this.onThemeChange(this.theme);
  }

  onThemeChange(theme: SiteTheme): void {
    this.themeService.emit({
      name: theme === 'default' ? THEME_EVENTS.default : THEME_EVENTS.dark
    });
    this.theme = theme;
    this.renderer.setAttribute(document.body, 'data-theme', theme);
    const dom = document.getElementById('site-theme');
    if (dom) {
      dom.remove();
    }
    localStorage.removeItem('site-theme');
    if (theme !== 'default') {
      const el = (this.el = document.createElement('link'));
      el.type = 'text/css';
      el.rel = 'stylesheet';
      el.id = 'site-theme';
      el.href = `assets/style.${theme}.css`;

      localStorage.setItem('site-theme', theme);
      document.body.append(el);
    }
  }

  ngOnDestroy(): void {
    if (this.el) {
      document.body.removeChild(this.el);
    }
  }
}
