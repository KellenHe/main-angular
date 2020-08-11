import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-introduce',
  templateUrl: './introduce.component.html',
})
export class IntroduceComponent implements OnInit {

  constructor(private http: _HttpClient) { }

  ngOnInit() {
  }

}
