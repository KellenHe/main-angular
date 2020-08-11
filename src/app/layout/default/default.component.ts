import { DOCUMENT } from '@angular/common';
import {
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  Renderer2,
  NgZone
} from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { SettingsService, Menu, WINDOW, MenuService } from '@delon/theme';
import { updateHostClass } from '@delon/util';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'layout-default',
  templateUrl: './default.component.html',
  styles: [`
    .cscs-sidebar {
      min-height: 100vh;
    }
  `]
})
export class LayoutDefaultComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  isFetching = false;
  list: Menu[] = [];

  constructor(
    private router: Router,
    msgSrv: NzMessageService,
    public settings: SettingsService,
    private el: ElementRef,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private doc: any,
    @Inject(WINDOW) private win: Window,
    private ngZone: NgZone,
    private menuService: MenuService
  ) {
    // scroll to top in change page
    router.events.pipe(takeUntil(this.unsubscribe$)).subscribe((evt) => {
      if (!this.isFetching && evt instanceof RouteConfigLoadStart) {
        this.isFetching = true;
      }
      if (evt instanceof NavigationError || evt instanceof NavigationCancel) {
        this.isFetching = false;
        if (evt instanceof NavigationError) {
          msgSrv.error(`无法加载${evt.url}路由`, { nzDuration: 1000 * 3 });
        }
        return;
      }
      if (!(evt instanceof NavigationEnd || evt instanceof RouteConfigLoadEnd)) {
        return;
      }
      if (this.isFetching) {
        setTimeout(() => {
          this.isFetching = false;
        }, 100);
      }
    });
  }

  get collapsed() {
    return this.settings.layout.collapsed;
  }

  private setClass() {
    const { el, doc, renderer, settings } = this;
    const layout = settings.layout;
    updateHostClass(el.nativeElement, renderer, {
      ['alain-default']: true,
      [`alain-default__fixed`]: layout.fixed,
      [`alain-default__collapsed`]: layout.collapsed,
    });

    doc.body.classList[layout.colorWeak ? 'add' : 'remove']('color-weak');
  }

  ngOnInit() {
    const { settings, unsubscribe$ } = this;
    settings.notify.pipe(takeUntil(unsubscribe$)).subscribe(() => this.setClass());
    this.setClass();
    this.getMenu();
  }

  ngOnDestroy() {
    const { unsubscribe$ } = this;
    unsubscribe$.next();
    unsubscribe$.complete();
  }

  to(item: Menu) {
    if (item.disabled) {
      return;
    }

    if (item.externalLink) {
      if (item.target === '_blank') {
        this.win.open(item.externalLink);
      } else {
        this.win.location.href = item.externalLink;
      }
      return false;
    }
    this.ngZone.run(() => this.router.navigateByUrl(item.link));
  }

  getMenu() {
    const { menuService } = this;
    if (menuService.menus && menuService.menus.length > 0) {
      this.list = menuService.menus[0].children;
    } else {
      this.list = [];
    }
  }

  toggleCollapsedSidebar() {
    this.settings.setLayout('collapsed', !this.settings.layout.collapsed);
  }
}
