import { newArray } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { fromEvent, Observable, interval } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.scss']
})
export class PracticeComponent implements OnInit {

  constructor() { }
  currentTime$: Observable<string>;

  currentCounts$: Observable<string>;

  ngOnInit(): void {
    fromEvent(document, 'click')
      .pipe(
        filter((_, index) => index % 2 === 0),
        map((event: MouseEvent) => ({ x: event.x, y: event.y }))
      )
      .subscribe((position) => {
        console.log(`x: ${position.x}, y: ${position.y}`);
      });


      this.currentTime$ = interval(1000)
      .pipe(
        map(() => new Date().toLocaleTimeString())
      );

      this.currentCounts$ = interval(100)
      .pipe(
        map(() => new Date().toLocaleTimeString())
      );
  }
}
