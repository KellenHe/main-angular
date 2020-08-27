import { Component, OnInit, OnDestroy } from '@angular/core';
import { ThemeEventService, THEME_EVENTS } from '@core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-color-demo',
  templateUrl: 'color.component.html',
  styleUrls: ['color.component.less']
})
export class ColorDemoComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  curTheme = localStorage.getItem('site-theme') || 'default';

  themeMap = {
    default: {
      navbarBg: '#1F3B72',
      navbarSubBg: '#0f295c',
      navbarActiveBg: '#405c92',
      textColor: '#252d3e',
      textColor85: 'rgba(37, 45, 62, 0.85)',
      textColor65: 'rgba(37, 45, 62, 0.65)',
      textColor45: 'rgba(37, 45, 62, 0.45)',
      disabled: 'rgba(37, 45, 62, 0.25)',
      bodyBg: '#f2f3f4',
      borderColor: '#d9d9d9',
      borderColorSplit: '#e8e8e8',
      cardBg: '#fff',
      popupBg: '#fff',
      tableHeadBg: '#f7fafe',
      tableHoverBg: '#eaf8fd'
    },
    dark: {
      navbarBg: '#3a3d4d',
      navbarSubBg: '#2A2D3C',
      navbarActiveBg: '#686c7f',
      textColor: '#fff',
      textColor85: 'rgba(255, 255, 255, 0.85)',
      textColor65: 'rgba(255, 255, 255, 0.65)',
      textColor45: 'rgba(255, 255, 255, 0.45)',
      disabled: 'rgba(255, 255, 255, 0.25)',
      bodyBg: '#292b39',
      borderColor: '#6b6d79',
      borderColorSplit: '#575967',
      cardBg: '#3a3d4d',
      popupBg: '#4D5060',
      tableHeadBg: '#474a5f',
      tableHoverBg: '#3e475f'
    }
  };

  constructor(private themeService: ThemeEventService) { }

  ngOnInit() {
    this.subscription = this.themeService.subscribe(
      data => {
        this.curTheme = data.name === THEME_EVENTS.default ? 'default' : 'dark';
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
