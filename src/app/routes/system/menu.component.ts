import { Component, OnInit, OnDestroy } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { ActivatedRoute } from '@angular/router';
import { environment } from '@env/environment';
// qiankun
import { loadMicroApp } from 'qiankun';

@Component({
  selector: 'app-menu-container',
  template: `
    <div id="subapp-container"></div>
  `
})
export class MenuContainerComponent implements OnInit, OnDestroy {

  microApp;

  constructor(public http: _HttpClient, private activatedRouter: ActivatedRoute) { }

  ngOnInit() {
    this.microApp = loadMicroApp(
      {
        name: 'react-app',
        entry: environment.reactAppAddress,
        container: '#subapp-container',
      }
    );
  }

  ngOnDestroy() {
    if (this.microApp) {
      this.microApp.unmount();
    }
  }
}
