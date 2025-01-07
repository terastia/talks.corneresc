import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Observable, delay, map } from 'rxjs';
import { Artifact } from 'src/app/interfaces/stories.interface';

@Component({
  selector: 'app-stories',
  imports: [],
  templateUrl: './stories.component.html',
  styles: ``
})
export class StoriesComponent implements OnInit {
  _route = inject(ActivatedRoute);

  ngOnInit(): void {
    this._route.data.subscribe(({ data }: Data) => {
      const fact = data as { record: Observable<Artifact[]> };
      // this.artifacts$ = fact.record;
      console.log(fact.record)
      // do something with your resolved data ...
      fact.record
        .pipe(
          delay(1000),
          map(() => {
            // added loader logic
          }),
        )
        .subscribe();
    });
  }

}
