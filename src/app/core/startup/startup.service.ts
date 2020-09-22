import { Injectable, Injector, Inject } from '@angular/core';
import { ArrayService } from '@delon/util';
import { HttpClient } from '@angular/common/http';
import { zip } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MenuService, SettingsService, TitleService, ALAIN_I18N_TOKEN } from '@delon/theme';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { ACLService } from '@delon/acl';
import { TranslateService } from '@ngx-translate/core';
import { I18NService } from '../i18n/i18n.service';

import { NzIconService } from 'ng-zorro-antd/icon';
import { ICONS } from '../../../style-icons';
import { ICONS_AUTO } from '../../../style-icons-auto';

/**
 * Used for application startup
 * Generally used to get the basic data of the application, like: Menu Data, User Data, etc.
 */
@Injectable()
export class StartupService {
  constructor(
    iconSrv: NzIconService,
    private menuService: MenuService,
    private translate: TranslateService,
    @Inject(ALAIN_I18N_TOKEN) private i18n: I18NService,
    private settingService: SettingsService,
    private aclService: ACLService,
    private titleService: TitleService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private httpClient: HttpClient,
    private arrayService: ArrayService
  ) {
    iconSrv.addIcon(...ICONS_AUTO, ...ICONS);
  }

  private viaHttp(resolve: any, reject: any) {
    zip(
      this.httpClient.get<any>('/user/basic/current'),
      this.httpClient.get(`/assets/tmp/i18n/${this.i18n.defaultLang}.json?_allow_anonymous=true`),
      this.httpClient.post('/authority/menu/list', { authorityMenuTyped: 'menu' })
    ).pipe(
      catchError((res) => {
        console.warn(`StartupService.load: Network request failed`, res);
        resolve(null);
        return [];
      })
    ).subscribe(([userData, langData, menuData]) => {
      // Setting language data
      this.translate.setTranslation(this.i18n.defaultLang, langData);
      this.translate.setDefaultLang(this.i18n.defaultLang);

      const currentUser = userData.data;
      const user: any = {
        name: currentUser.nickName,
        avatar: './assets/tmp/img/2.png',
        userName: currentUser.username,
        ...userData
      };

      // Application data
      // const res: any = appData;
      // Application information: including site name, description, year
      // this.settingService.setApp(res.app);
      this.setLayoutFixed();
      // User information: including name, avatar, email address
      this.settingService.setUser(user);
      // ACL: Set the permissions to full, https://ng-alain.com/acl/getting-started
      this.aclService.set({
        ability: currentUser.permissions
      });
      // Menu data, https://ng-alain.com/theme/menu

      this.arrayService.visitTree(menuData.data, (item) => {
        if (item.icon) {
          item.icon = `svg:${item.icon}`;
          item.acl = {
            ability: [item.menuCode]
          };
        }
      });
      const menu = [{
        text: '',
        group: true,
        hideInBreadcrumb: true,
        children: menuData.data
      }];
      this.menuService.add(menu);
      // Can be set page suffix title, https://ng-alain.com/theme/title
      // this.titleService.suffix = res.app.name;
    },
      () => { },
      () => {
        resolve(null);
      });
  }

  private setAcl(privileges: any[]) {
    if (privileges && privileges.length > 0) {
      const codes = privileges.map(item => {
        return item.code;
      });

      this.aclService.set({
        ability: codes
      });
    }
  }

  private viaMockI18n(resolve: any, reject: any) {
    this.httpClient
      .get(`assets/tmp/i18n/${this.i18n.defaultLang}.json`)
      .subscribe(langData => {
        this.translate.setTranslation(this.i18n.defaultLang, langData);
        this.translate.setDefaultLang(this.i18n.defaultLang);

        this.viaMock(resolve, reject);
      });
  }

  private viaMock(resolve: any, reject: any) {
    zip(
      this.httpClient.get<any>('/user/current'),
      this.httpClient.get(`./assets/tmp/i18n/${this.i18n.defaultLang}.json?_allow_anonymous=true`),
      this.httpClient.get('./assets/tmp/app-data.json')
    ).pipe(
      catchError((res) => {
        console.warn(`StartupService.load: Network request failed`, res);
        resolve(null);
        return [];
      })
    ).subscribe(([userData, langData, appData]) => {
      // Setting language data
      this.translate.setTranslation(this.i18n.defaultLang, langData);
      this.translate.setDefaultLang(this.i18n.defaultLang);

      const user: any = {
        name: userData.displayName,
        avatar: './assets/tmp/img/2.png',
        ...userData
      };
      // Application information: including site name, description, year
      this.settingService.setApp(appData.app);
      // User information: including name, avatar, email address
      this.settingService.setUser(user);
      this.setLayoutFixed();
      // ACL: Set the permissions to full, https://ng-alain.com/acl/getting-started
      this.aclService.setFull(true);
      // Menu data, https://ng-alain.com/theme/menu
      this.menuService.add(appData.menu);
      // Can be set page suffix title, https://ng-alain.com/theme/title
      this.titleService.suffix = appData.app.name;
    },
      () => { },
      () => {
        resolve({});
      });
  }

  /**
   * 默认fixed=false
   */
  private setLayoutFixed(isFixed = false): void {
    this.settingService.layout.fixed = isFixed;
  }

  load(): Promise<any> {
    // only works with promises
    // https://github.com/angular/angular/issues/15088
    return new Promise((resolve, reject) => {
      // http
      this.viaHttp(resolve, reject);
      // mock：请勿在生产环境中这么使用，viaMock 单纯只是为了模拟一些数据使脚手架一开始能正常运行
      // this.viaMock(resolve, reject);

    });
  }
}
