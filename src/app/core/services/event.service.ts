import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

interface GlobalEvent {
  name: number;
  payload?: any;
}

interface EventService<T> {
  eventEmit: Subject<T>;
  emit(evt: T): any;
  subscribe(handler): Subscription;
}

export enum THEME_EVENTS {
  default = 0,
  dark = 1
}

@Injectable()
export class ThemeEventService implements EventService<GlobalEvent> {
  public eventEmit: Subject<GlobalEvent>;

  constructor() {
    this.eventEmit = new Subject();
  }

  emit(evt: GlobalEvent) {
    return this.eventEmit.next(evt);
  }

  subscribe(handler) {
    return this.eventEmit.subscribe(handler);
  }
}
