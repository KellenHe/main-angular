import { Component, OnInit, OnDestroy } from '@angular/core';
import { _HttpClient } from '@delon/theme';
// qiankun
import { loadMicroApp } from 'qiankun';

@Component({
  selector: 'app-user-container',
  template: `
    <div id="subapp-container"></div>
  `
})
export class UserContainerComponent implements OnInit, OnDestroy {

  microApp;

  constructor(public http: _HttpClient) { }

  ngOnInit() {
    this.microApp = loadMicroApp(
      {
        name: 'react-app',
        entry: '//localhost:8000/',
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
