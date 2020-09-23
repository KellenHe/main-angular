import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-qiankun',
  templateUrl: './qiankun.component.html',
})
export class IntroduceQiankunComponent implements OnInit {

  constructor(private http: _HttpClient) { }

  ngOnInit() {
  }

}
