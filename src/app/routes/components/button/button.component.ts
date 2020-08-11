import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-demo',
  templateUrl: 'button.component.html'
})
export class ButtonDemoComponent implements OnInit {
  tabs = [1, 2, 3];

  constructor() { }

  ngOnInit() { }
}
