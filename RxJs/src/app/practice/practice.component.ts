import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.scss']
})
export class PracticeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    fromEvent (document, 'click')
    .pipe(
      filter((_, index) => index % 2 === 0),
      map((event: MouseEvent) => ({ x: event.x, y: event.y }))
    )
    .subscribe((position) => {
      console.log(`x: ${position.x}, y: ${position.y}`);
    });
  }
}
