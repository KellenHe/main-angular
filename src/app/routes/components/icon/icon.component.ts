import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NzMessageService } from 'ng-zorro-antd/message';

export interface Categories {
  direction: string[];
  business: string[];
  control: string[];
  other: string[];
  menu: string[];
}

@Component({
  selector: 'app-icon-demo',
  templateUrl: 'icon.component.html',
  styles: [
    `
      .anticons-list {
        font-size: 24px;
      }
    `,
    `
      .anticons-list i {
        margin-right: 16px;
      }
    `
  ]
})
export class IconDemoComponent implements OnInit {
  categoryNames: string[] = [];
  i18nMap = {
    direction: 'component.icon.dir.sug',
    business: 'component.icon.business',
    control: 'component.icon.control',
    other: 'component.icon.other',
    menu: 'component.icon.menu'
  };
  iconMap: Categories = {
    direction: [
      'collapsed',
      'expand',
      'left',
      'right',
      'collapsed1',
      'expand1',
      'left1',
      'right1',
      'maximize',
      'minimize',
      'upload',
      'download',
      'up',
      'down',
      'active',
      'unsubscribe',
      'export',
      'import',
      'good_outline',
      'good_fill',
      'edit',
      'edit1',
      'filter_outline',
      'filter_fill',
      'focus_outline',
      'focus_fill',
      'right2',
      'down1',
      'save',
      'delete',
      'undo',
      'refresh',
      'more',
      'attachment',
      'infomation_outline',
      'infomation_fill',
      'checked_outline',
      'checked_fill',
      'clear_outline',
      'clear_fill',
      'add_outline',
      'add_fill',
      'remove_outline',
      'remove_fill',
      'example'
    ],
    business: [
      'finance_warning',
      'position',
      'law',
      'bond_s',
      'nonstandard',
      'calendar',
      'list',
      'mail',
      'view',
      'history',
      'desktop',
      'market_warning',
      'excel',
      'negative_opinions',
      'web',
      'data',
      'script',
      'rating',
      'ranking',
      'company_s',
      'relationship',
      'negative_announcement',
      'submit',
      'order',
      'subnode',
      'product',
      'comments',
      'review',
      'publish',
      'bar',
      'location',
      'permission',
      'warning_outline',
      'warning_fill',
      'reset_pwd',
      'private',
      'customer',
      'role_management',
      'customer1',
      'integrity',
      'lock',
      'unlock',
      'user',
      'role_fill',
      'circle',
      'date'
    ],
    control: [
      'radio_unchecked',
      'radio_checked',
      'radio_unchecked_disable',
      'radio_checked_disable',
      'uncheck',
      'checked',
      'uncheck_disable',
      'checked_disable',
      'indeterminate',
      'tree_collapsed',
      'tree_expand',
      'sort',
      'row_column_change',
      'table',
      'copy',
      'settings'
    ],
    other: [
      'person',
      'company',
      'bond',
      'magic'
    ],
    menu: [
      'home',
      'search',
      'combination',
      'model',
      'management',
      'user1',
      'bell',
      'graph',
      'map',
      'data_integration',
      'development',
      'service',
      'resource',
      'quality',
      'connect',
      'workflow'
    ]
  } as Categories;

  constructor(@Inject(DOCUMENT) private dom: any, private message: NzMessageService) { }

  ngOnInit() {
    this.categoryNames = Object.keys(this.iconMap);
  }

  onIconClick(e: MouseEvent, icon: string): void {
    const target = e.target as HTMLElement;
    const copiedString = `<i nz-icon nzType="svg:${icon}" class="cscsicon"></i>`;
    this._copy(copiedString).then(() => {
      setTimeout(() => {
        this.message.success('copied');
      }, 500);
    });
  }

  private _copy(value: string): Promise<string> {
    const promise = new Promise<string>((resolve): void => {
      let copyTextArea = (null as any) as HTMLTextAreaElement; // tslint:disable-line:no-any
      try {
        copyTextArea = this.dom.createElement('textarea');
        copyTextArea.style.height = '0px';
        copyTextArea.style.opacity = '0';
        copyTextArea.style.width = '0px';
        this.dom.body.appendChild(copyTextArea);
        copyTextArea.value = value;
        copyTextArea.select();
        this.dom.execCommand('copy');
        resolve(value);
      } finally {
        if (copyTextArea && copyTextArea.parentNode) {
          copyTextArea.parentNode.removeChild(copyTextArea);
        }
      }
    });

    return promise;
  }
}
